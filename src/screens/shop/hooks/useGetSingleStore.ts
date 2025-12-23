import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { StoreService } from '@wd/generated';

interface Props {
  storeId?: string;
}

const useGetSingleStore = ({ storeId }: Props) => {
  const { isLoading, data } = useQuery({
    queryKey: ['store', storeId],
    queryFn: () =>
      apiWrapper(() =>
        StoreService.storeControllerFindOne({ id: storeId || '' }),
      ),
    enabled: !!storeId,
  });
  return {
    isLoading,
    store: data,
  };
};

export default useGetSingleStore;
