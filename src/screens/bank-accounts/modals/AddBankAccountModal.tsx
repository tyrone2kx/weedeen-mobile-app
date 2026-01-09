import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import Button from '@wd/components/Button/Button';
import CustomModal from '@wd/components/CustomModal/CustomModal';
import FormInput from '@wd/components/Input/FormInput';
import Loader from '@wd/components/Loader/Loader';
import FormMultiSelect from '@wd/components/Select/FormMultiSelect';
import FormSelect from '@wd/components/Select/FormSelect';
import { BillingService, CreateBankAccountDto } from '@wd/generated';
import useGetStores from '@wd/screens/shop/hooks/useGetStores';
import { handleError, Notify } from '@wd/utils/helpers';
import { SelectOptionType } from '@wd/utils/types';
import { Formik } from 'formik';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import useBanksGet from '../hooks/useBanksGet';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddBankAccountModal = ({ isOpen, onClose }: Props) => {
  const { isLoading, banks } = useBanksGet();
  const { isLoading: loadingStores, stores } = useGetStores({
    forUser: true,
    ignorePagination: true,
  });

  const queryClient = useQueryClient();
  const { isPending, mutate: createBankAccount } = useMutation({
    mutationFn: (requestBody: CreateBankAccountDto) =>
      apiWrapper(() =>
        BillingService.billingControllerCreateBankAccount({
          requestBody,
        }),
      ),
    onSuccess: () => {
      Notify({
        title: 'Bank Account Added',
        message: 'The bank account has been added successfully.',
        type: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: ['bank-accounts'],
      });
      onClose();
    },
    onError: error => {
      handleError(error);
    },
  });

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={'Add New Bank Account'}
    >
      {isLoading || loadingStores ? (
        <div>
          <Loader />
        </div>
      ) : (
        <Formik
          initialValues={{
            bankCode: '',
            accountName: '',
            accountNumber: '',
            stores: [] as SelectOptionType[],
          }}
          onSubmit={(values, { setSubmitting }) => {
            const selectedBank = banks.find(
              bank => bank.code === values.bankCode,
            );
            const bankName = selectedBank ? selectedBank.name : '';
            const storeIds = values.stores.map(store => store?.value);
            createBankAccount({
              bankCode: values.bankCode,
              bankName,
              accountName: values.accountName,
              accountNumber: values.accountNumber,
              storeIds,
              isActive: true,
            });
            setSubmitting(false);
          }}
          validationSchema={Yup.object({
            bankCode: Yup.string().required('Bank is required'),
            accountName: Yup.string().required('Account Name is required'),
            accountNumber: Yup.string()
              .required('Account Number is required')
              .matches(/^\d+$/, 'Account Number must be numeric'),
            stores: Yup.array().required('At least one store must be selected'),
          })}
        >
          {({ handleSubmit }) => (
            <KeyboardAwareScrollView>
              <View>
                <FormSelect
                  className="mb-4"
                  label="Bank"
                  name="bankCode"
                  options={banks.map(item => ({
                    label: item.name,
                    value: item.code,
                  }))}
                  placeholder="Select Bank"
                />
                <FormInput
                  className="mb-4"
                  label="Account Name"
                  name="accountName"
                  placeholder="Enter Account Name"
                />
                <FormInput
                  className="mb-4"
                  label="Account Number"
                  name="accountNumber"
                  placeholder="Enter Account Number"
                />
                <FormMultiSelect
                  className="mb-4"
                  label="Stores"
                  name="stores"
                  options={stores.map(store => ({
                    label: store.name,
                    value: store.id,
                  }))}
                  placeholder="Select applicable stores"
                />

                <View>
                  <Button label="Cancel" onPress={onClose} pale />
                  <Button
                    disabled={isPending}
                    isLoading={isPending}
                    label="Add Account"
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
          )}
        </Formik>
      )}
    </CustomModal>
  );
};

export default AddBankAccountModal;
