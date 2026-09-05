import Button from '@wd/components/Button/Button';
import CustomModal from '@wd/components/CustomModal/CustomModal';
import FormInput from '@wd/components/Input/FormInput';
import { Formik } from 'formik';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import useBeneficiaries from '../hooks/useBeneficiaries';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddBeneficiaryModal = ({ isOpen, onClose }: Props) => {
  const { addBeneficiary } = useBeneficiaries();

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Add Beneficiary">
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '' }}
        validationSchema={Yup.object({
          firstName: Yup.string().required('First name is required'),
          lastName: Yup.string().required('Last name is required'),
          email: Yup.string().email('Invalid email').required('Email is required'),
        })}
        onSubmit={values => {
          addBeneficiary.mutate(values, { onSuccess: onClose });
        }}
      >
        {({ handleSubmit }) => (
          <View className="flex-1">
            <KeyboardAwareScrollView>
              <View className="gap-4">
                <FormInput
                  label="First Name"
                  name="firstName"
                  placeholder="Enter first name"
                />
                <FormInput
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter last name"
                />
                <FormInput
                  label="Email"
                  name="email"
                  placeholder="Enter email"
                  type="email-address"
                />
                <Button
                  isLoading={addBeneficiary.isPending}
                  label="Send Invite"
                  onPress={handleSubmit}
                />
              </View>
            </KeyboardAwareScrollView>
          </View>
        )}
      </Formik>
    </CustomModal>
  );
};

export default AddBeneficiaryModal;
