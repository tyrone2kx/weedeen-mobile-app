import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import Button from '@wd/components/Button/Button';
import CustomModal from '@wd/components/CustomModal/CustomModal';
import FormInput from '@wd/components/Input/FormInput';
import FormTextArea from '@wd/components/Input/FormTextArea';
import Text from '@wd/components/Text/Text';
import { CreateDeliveryDto, Delivery, DeliveryService } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { handleError, Notify } from '@wd/utils/helpers';
import { Formik } from 'formik';
import { ArrowDownIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  delivery?: Delivery;
}

const RequestRiderModal = ({ isOpen, onClose, delivery }: Props) => {
  const queryClient = useQueryClient();
  const user = useAppSelector(state => state.user?.currentUser);
  const defaultAddress = `${user?.street || ''} ${user?.block || ''} ${user?.flatNumber || ''}`;
  const initialValues = {
    additionalNotes: delivery?.additionalNotes || '',
    pickUpAddress: delivery?.pickUpAddress || defaultAddress,
    pickUpName: delivery?.pickUpName || `${user?.firstName} ${user?.lastName}`,
    pickUpPhoneNo: delivery?.pickUpPhoneNo || user?.phoneNo || '',
    deliveryAddress: delivery?.deliveryAddress || '',
    receiverName: delivery?.receiverName || '',
    deliveryPhoneNo: delivery?.deliveryPhoneNo || '',
  };

  const { isPending, mutate } = useMutation({
    mutationFn: (requestBody: CreateDeliveryDto) =>
      apiWrapper(() =>
        DeliveryService.deliveryControllerCreate({ requestBody }),
      ),
    onSuccess: () => {
      Notify({
        title: 'Rider Requested',
        message: 'The rider has been requested successfully.',
        type: 'success',
      });
      void queryClient.invalidateQueries({ queryKey: ['deliveries'] });
      void queryClient.invalidateQueries({
        queryKey: ['deliveries-statistics'],
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
      title={delivery ? 'Edit Details' : 'Request Rider'}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          mutate(values);
          setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
          pickUpAddress: Yup.string().required('Pick Up Address is required'),
          pickUpName: Yup.string().required('Contact Person is required'),
          pickUpPhoneNo: Yup.string()
            .required('Phone Number is required')
            .matches(/^\d{11}$/, 'Phone Number must be 11 digits'),
          deliveryAddress: Yup.string().required(
            'Delivery Address is required',
          ),
          receiverName: Yup.string().required('Receiver Name is required'),
          deliveryPhoneNo: Yup.string()
            .required('Phone Number is required')
            .matches(/^\d{11}$/, 'Phone Number must be 11 digits'),
          additionalNotes: Yup.string(),
        })}
      >
        {({ handleSubmit }) => (
          <KeyboardAwareScrollView>
            <View>
              <Text className="mb-2 text-sm font-semibold">Pick Up</Text>
              <View className="mb-4 p-3 rounded-md border-2 border-dashed">
                <FormInput
                  className="mb-4"
                  label="Address"
                  name="pickUpAddress"
                  placeholder="Enter full address"
                />
                <FormInput
                  className="mb-4"
                  label="Contact Person"
                  name="pickUpName"
                  placeholder="Enter Contact Person"
                />
                <FormInput
                  className="mb-4"
                  label="Phone Number"
                  name="pickUpPhoneNo"
                  placeholder="Enter Phone Number"
                  type="phone-pad"
                />
              </View>
              <View className="flex justify-center">
                <ArrowDownIcon className="text-gray-400" />
              </View>
              <Text className="mb-2 text-sm font-semibold">Drop Off</Text>
              <View className="mb-4 p-3 rounded-md border-2 border-dashed">
                <FormInput
                  className="mb-4"
                  label="Delivery Address"
                  name="deliveryAddress"
                  placeholder="Enter full address"
                />
                <FormInput
                  className="mb-4"
                  label="Receiver Name"
                  name="receiverName"
                  placeholder="Enter Receiver Name"
                />
                <FormInput
                  className="mb-4"
                  label="Phone Number"
                  name="deliveryPhoneNo"
                  placeholder="Enter Phone Number"
                  type="phone-pad"
                />
              </View>
              <FormTextArea
                className="mb-4"
                label="Additional Notes"
                name="additionalNotes"
                placeholder="Enter any additional notes"
              />
            </View>
            <View className="py-4 flex-row gap-2">
              <Button
                label="Cancel"
                onPress={onClose}
                pale
                style={{
                  width: '48%',
                }}
              />
              <Button
                isLoading={isPending}
                label="Request Rider"
                onPress={handleSubmit}
                style={{
                  width: '48%',
                }}
              />
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </CustomModal>
  );
};

export default RequestRiderModal;
