import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiWrapper, httpClient } from '@wd/api';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { updateAppUserState } from '@wd/redux-store/reducers/user-reducer';
import { handleError, Notify } from '@wd/utils/helpers';
import useLoading from '@wd/utils/useLoading';
import { useDispatch } from 'react-redux';

const useProfileImageUpdate = () => {
  const loader = useLoading();
  const user = useAppSelector(state => state.user?.currentUser);
  const dispatch = useDispatch();

  const changePhoto = async (formData: FormData, callback?: () => void) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const tenant = await AsyncStorage.getItem('tenant');
    loader.startLoading();
    try {
      const { data: res } = await apiWrapper(() =>
        httpClient.post(`/auth/profile-pic`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
            'x-tenant-id': tenant as string,
          },
        }),
      );
      dispatch(
        updateAppUserState({
          currentUser: {
            ...user!,
            profilePic: res.data.profilePic,
          },
        }),
      );
      Notify({ type: 'success', message: res.message });
      if (callback) {
        callback();
      }
    } catch (error) {
      handleError(error);
    } finally {
      loader.stopLoading();
    }
  };

  return {
    isLoading: loader.loading,
    changePhoto,
  };
};

export default useProfileImageUpdate;
