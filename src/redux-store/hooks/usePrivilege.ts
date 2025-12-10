import { useAppSelector } from './useAppSelector';

const usePrivilege = () => {
  const privilege = useAppSelector((state) => state.privileges);
  return privilege;
};

export default usePrivilege;
