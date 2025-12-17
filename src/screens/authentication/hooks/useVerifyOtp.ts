import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@wd/generated';
import { updateAppUserState } from '@wd/redux-store/reducers/user-reducer';
import { Notify } from '@wd/utils/helpers';
import { useDispatch } from 'react-redux';

const useVerifyOtp = () => {
  const dispatch = useDispatch();
  const { isPending, mutate } = useMutation({
    mutationFn: AuthService.authControllerVerifyAccount,
    onSuccess: async data => {
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);
      await AsyncStorage.setItem('tenant', data.user.tenant);
      dispatch(
        updateAppUserState({
          currentUser: data.user,
        }),
      );
      //   navigate(RoutesEnum.RESET_PASSWORD + `?token=${token}&invite=true`);
    },
    onError: error => {
      const message =
        error.message ||
        'An error occurred while verifying your account. Please try again.';
      Notify({ message, type: 'error' });
    },
  });
  return {
    isLoading: isPending,
    verifyOtp: mutate,
  };
};

export default useVerifyOtp;
