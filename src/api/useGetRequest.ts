import { handleError } from '@mh/utils/handleError';
import { returnUpdatedList } from '@mh/utils/helpers';
import { UseQueryResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiWrapper } from '.';

type ServiceFunction<A, B> = (payload: A) => Promise<B>;

interface UseGetRequestOptions<A, B> {
  service: ServiceFunction<A, B>;
  payload?: A;
  page?: number;
  limit?: number;
  searchText?: string;
  enabled?: boolean;
  onSuccess?: (val?: B) => void;
  onError?: (val?: any) => void;
  tag: string;
}

interface UseGetRequestResult<B> {
  loading: boolean;
  isLoading: boolean;
  refetch: (options?: { throwOnError: boolean; cancelRefetch: boolean }) => Promise<UseQueryResult>;
  data?: B;
  onUpdateCallback?: (val: any, key?: string) => void;
  onAddCallback?: (val: B) => void;
  error?: any;
  isRefetching?: boolean;
  isFetching?: boolean;
}

export function useGetRequest<A, B>({
  service,
  payload,
  onSuccess,
  onError,
  tag,
  enabled = true,
}: UseGetRequestOptions<A, B>): UseGetRequestResult<B> {
  const methodName = service.name;
  const queryClient = useQueryClient();
  const queryKey = [tag, { methodName, payload }];

  const info = useQuery({
    queryKey,
    queryFn: async () => {
      const data = await apiWrapper(() => service(payload as A));
      onSuccess?.(data);
      return data;
    },
    enabled,
    throwOnError: (error) => {
      handleError(error);
      onError?.(error);
      return false;
    },
  });

  const onAddCallback = (data) => {
    const list: any = queryClient.getQueryData(queryKey);
    queryClient.setQueryData(queryKey, [...list, data]);
  };

  const onUpdateCallback = (data, key = 'id') => {
    const list: any = queryClient.getQueryData(queryKey);
    const newList = returnUpdatedList(data, list, key);
    queryClient.setQueryData(queryKey, [...newList]);
  };

  return {
    loading: info.isLoading,
    isLoading: info.isLoading,
    refetch: info.refetch,
    data: info.data,
    onAddCallback,
    onUpdateCallback,
    isRefetching: info.isRefetching || info.isFetching,
    isFetching: info.isFetching,
  };
}
