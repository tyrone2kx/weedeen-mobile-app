import Button from '@wd/components/Button/Button';
import CustomModal from '@wd/components/CustomModal/CustomModal';
import FormInput from '@wd/components/Input/FormInput';
import FormTextArea from '@wd/components/Input/FormTextArea';
import FormSelect from '@wd/components/Select/FormSelect';
import { UploadFileItem } from '@wd/components/UploadFileItem/UploadFileItem';
import { Staff } from '@wd/generated';
import { GenderEnum } from '@wd/utils/types';
import useFileSelect from '@wd/utils/useFileSelect';
import { Formik } from 'formik';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import useStaffMutations from '../hooks/useStaffMutations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  staff?: Staff;
}

const CreateStaffModal = ({ isOpen, onClose, staff }: Props) => {
  const { createOrUpdateController } = useStaffMutations({
    staffId: staff?.id,
  });

  const initialValues = {
    firstName: staff?.firstName || '',
    lastName: staff?.lastName || '',
    email: staff?.email || '',
    phoneNumber: staff?.phoneNumber || '',
    gender: staff?.gender || GenderEnum.MALE,
    role: staff?.role || '',
    specialInstruction: staff?.specialInstruction || '',
    isActive: staff ? staff.isActive : true,
  };

  const images = useFileSelect({
    selectionLimit: 1,
    allowedTypes: ['image/webp', 'image/jpeg', 'image/png', 'image/jpg'],
    maxSelectionCount: 1,
  });

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={staff ? 'Edit Staff' : 'Create Staff'}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={async values => {
          // Always set isActive as described
          const payload = {
            ...values,
            isActive: staff ? staff.isActive : true,
          };
          await createOrUpdateController.createOrUpdateStaff(
            payload,
            images.selectedFiles[0],
            onClose,
          );
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required('First name is required'),
          lastName: Yup.string().required('Last name is required'),
          email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
          phoneNumber: Yup.string().required('Phone number is required'),
          gender: Yup.mixed<GenderEnum>()
            .oneOf(Object.values(GenderEnum))
            .required('Gender is required'),
          role: Yup.string().required('Staff role is required'),
          specialInstruction: Yup.string(),
        })}
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
                <FormInput
                  label="Phone"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  type="phone-pad"
                />

                <FormSelect
                  label="Gender"
                  name="gender"
                  options={[
                    { label: 'Male', value: GenderEnum.MALE },
                    { label: 'Female', value: GenderEnum.FEMALE },
                  ]}
                  placeholder="Select gender"
                />
                <FormInput
                  label="Role"
                  name="role"
                  placeholder="Enter role (e.g., Security, Cleaner)"
                />
                <FormTextArea
                  label="Special Instruction"
                  name="specialInstruction"
                  placeholder="Enter any special instructions for this staff member"
                />
                <View className="w-full">
                  <UploadFileItem
                    files={images.selectedFiles}
                    onPress={images.openFilePicker}
                    setFiles={images.setSelectedFiles}
                    title={
                      staff?.profilePicture
                        ? 'Replace Profile Photo'
                        : 'Profile Photo'
                    }
                  />
                </View>

                <View>
                  <>
                    <Button label="Cancel" onPress={onClose} pale />
                    <Button
                      isLoading={createOrUpdateController.isLoading}
                      label={staff ? 'Update Staff' : 'Create Staff'}
                      onPress={handleSubmit}
                    />
                  </>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        )}
      </Formik>
    </CustomModal>
  );
};

export default CreateStaffModal;
