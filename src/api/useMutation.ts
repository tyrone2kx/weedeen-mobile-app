import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleError } from '@wd/utils/helpers';
import { apiWrapper } from '.';

type ServiceFunction<A, B> = (payload: A) => Promise<B>;

interface UseGetRequestOptions<A, B> {
  service: ServiceFunction<A, B>;
  payload?: A;

  onError?: (val?: any) => void;
  tag: string;
}

interface UseGetRequestResult<B> {
  loading: boolean;
  isLoading: boolean;
  data?: B;
  error?: any;
}

export function useMutateRequest<A, B>({
  service,
  tag,
  onSuccess,
  onError,
  invalidate = true,
}: UseGetRequestOptions<A, B> & {
  invalidate?: boolean;
  onSuccess?: (val?: B) => void;
}): UseGetRequestResult<B> & {
  trigger: (payload: A, options?: { onSuccess?: (data: B) => void }) => void;
  isMutating?: boolean;
} {
  const queryClient = useQueryClient();

  const info = useMutation({
    mutationFn: (payload: A) => apiWrapper(() => service(payload)),
    onSuccess: async data => {
      if (onSuccess) {
        onSuccess(data);
      }
      if (invalidate) {
        await queryClient.invalidateQueries({ queryKey: [tag] });
      }
    },
    onError: (error: any) => {
      handleError(error);
      onError?.(error);
    },
  });

  return {
    loading: info.isPending,
    isLoading: info.isPending,
    isMutating: info.isPending,
    data: info.data,
    trigger: info.mutate,
    error: info.error,
  };
}
