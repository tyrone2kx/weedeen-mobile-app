import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { VisitorAccessService } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';

interface Props {
  userId?: string;
  passedTenant?: string;
  forUser?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
}

const useGetVisitorsStatistics = ({
  forUser,
  passedTenant = '',
  userId = '',
  startDate,
  endDate,
}: Props) => {
  const user = useAppSelector(state => state.user?.currentUser);

  const { isLoading, data } = useQuery({
    queryKey: ['visitors-statistics', forUser, passedTenant],
    queryFn: () =>
      apiWrapper(() =>
        VisitorAccessService.visitorAccessControllerGetStatistics({
          userId,
          passedTenant,
          startDate: startDate ? startDate.toISOString() : '',
          endDate: endDate ? endDate.toISOString() : '',
        }),
      ),
    enabled: forUser ? !!user?.id : true,
  });
  return {
    isLoading,
    statistics: data,
  };
};

export default useGetVisitorsStatistics;
