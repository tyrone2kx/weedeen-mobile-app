import AsyncStorage from '@react-native-async-storage/async-storage';
import { Billing, User } from '@wd/generated';
import { updateUserPrivileges } from '@wd/redux-store/reducers/privilege-reducer';
import { updateAppUserState } from '@wd/redux-store/reducers/user-reducer';
import { Notify } from '@wd/utils/helpers';
import { UserTypeEnum } from '@wd/utils/types';
import { Dispatch, UnknownAction } from 'redux';

export const onSuccessfullLogin = async ({
  user,
  accessToken,
  refreshToken,
  activeSubscription,
  activeUserSubscriptions,
  dispatch,
}: {
  user: User;
  accessToken: string;
  refreshToken: string;
  activeSubscription?: Billing;
  activeUserSubscriptions: Billing[];
  dispatch: Dispatch<UnknownAction>;
}) => {
  await AsyncStorage.setItem('accessToken', accessToken);
  await AsyncStorage.setItem('refreshToken', refreshToken);
  await AsyncStorage.setItem('tenant', user?.tenant);
  dispatch(
    updateAppUserState({
      currentUser: user,
      isLoggedIn: true,
      activeSubscription,
      activeUserSubscriptions,
      activeUserType: user?.roles
        ? (user.roles[0].slug as UserTypeEnum)
        : undefined,
    }),
  );

  if (user?.roles) {
    const payload = user?.roles
      ?.map(role => role.privileges)
      ?.flat()
      .reduce((acc, privilege) => {
        if (!acc[privilege.value]) acc[privilege.value] = true;
        return acc;
      }, {});
    dispatch(updateUserPrivileges(payload));
  }
  Notify({ type: 'success', title: `Welcome back ${user.firstName}!` });
};
