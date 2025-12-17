import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@wd/generated';
import { handleError, Notify } from '@wd/utils/helpers';

const usePasswordReset = () => {
  const { isPending: isVerifyingResetToken, mutate: verifyResetToken } =
    useMutation({
      mutationFn: AuthService.authControllerVerifyPasswordReset,
      onError: (error: any) => {
        handleError(error);
      },
    });

  const { isPending, mutate: resetPassword } = useMutation({
    mutationFn: AuthService.authControllerResetPassword,
    onSuccess: data => {
      Notify({
        type: 'success',
        message:
          data.message ||
          'Your password reset was successfull. You can proceed to login',
      });
    },
    onError: error => handleError(error),
  });

  return {
    isVerifyingResetToken,
    verifyResetToken,
    isResettingPassword: isPending,
    resetPassword,
  };
};

export default usePasswordReset;
