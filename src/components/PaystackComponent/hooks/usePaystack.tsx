import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { Notify } from '@wd/utils/helpers';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import { useState } from 'react';

interface Props {
  amount?: number;
  onSuccess?: (reference: string) => void;
  onCancel?: () => void;
  onError?: (error: any) => void;
}

export interface PaystackConfig {
  reference: string;
  email: string;
  amount: number;
  firstname: string;
  lastname: string;
  phone?: string;
  splitCode?: string;
}

const usePaystack = ({ amount, onSuccess, onCancel, onError }: Props) => {
  const currentUser = useAppSelector(state => state.user.currentUser);
  const hookConfig = {
    reference: '',
    email: currentUser?.email || '',
    amount: (amount || 0) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    firstname: currentUser?.firstName || '',
    lastname: currentUser?.lastName || '',
  };

  const paystackHandle = useDisclosure();
  const [paystackConfig, setPaystackConfig] =
    useState<PaystackConfig>(hookConfig);

  const onPaystackError = e => {
    paystackHandle.onClose();
    Notify({
      type: 'error',
      message: 'A payment gateway error occurred. Please try again.',
    });
    onError?.(e);
    console.log(e);
  };

  const onPaystackSuccess = e => {
    paystackHandle.onClose();
    onSuccess?.(e.data.transactionRef.reference);
  };

  const onPaystackCancel = e => {
    paystackHandle.onClose();
    onCancel?.();
  };

  return {
    paystackConfig,
    paystackHandle,
    setPaystackConfig,
    onPaystackError,
    onPaystackSuccess,
    onPaystackCancel,
    paystackModalProps: {
      ...paystackConfig,
      onSuccess: onPaystackSuccess,
      onCancel: onPaystackCancel,
      onError: onPaystackError,
    },
  };
};

export default usePaystack;
