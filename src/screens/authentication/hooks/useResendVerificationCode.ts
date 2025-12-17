import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@wd/generated';
import { handleError, Notify } from '@wd/utils/helpers';

const useResendVerificationCode = () => {
  const { isPending: isResending, mutate: resendLink } = useMutation({
    mutationFn: AuthService.authControllerResendVerificationLink,
    onSuccess: () => {
      Notify({
        type: 'success',
        message: 'Verification link sent successfully',
      });
    },
    onError: error => {
      handleError(error);
    },
  });
  return {
    isResending,
    resendLink,
  };
};

export default useResendVerificationCode;
