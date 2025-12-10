import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { UserTypeEnum } from './types';

const useUserTypes = () => {
  const user = useAppSelector(state => state.user?.currentUser);
  const activeUserType = useAppSelector(state => state.user?.activeUserType);
  const roles = (user?.roles || []).map(role => role.slug);
  const isAdmin = roles.includes('estate_admin');
  const isResident = roles.includes('resident');
  const isSecurity = roles.includes('security');
  const isRider = roles.includes('rider');
  const isPackager = roles.includes('packager');
  return {
    isAdmin,
    isResident,
    isSecurity,
    isRider,
    isPackager,
    hasMultipleTypes: roles.length > 1,
    userTypes: roles.filter(role => role !== activeUserType) as UserTypeEnum[],
  };
};

export default useUserTypes;
