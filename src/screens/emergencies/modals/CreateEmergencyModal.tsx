import Button from '@wd/components/Button/Button';
import Checkbox from '@wd/components/Checkbox/Checkbox';
import CustomModal from '@wd/components/CustomModal/CustomModal';
import FormInput from '@wd/components/Input/FormInput';
import FormTextArea from '@wd/components/Input/FormTextArea';
import FormSelect from '@wd/components/Select/FormSelect';
import Text from '@wd/components/Text/Text';
import { UploadFileItem } from '@wd/components/UploadFileItem/UploadFileItem';
import { CreateSOSAlertDto } from '@wd/generated/models/CreateSOSAlertDto';
import { enumToOptions } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import { EmergencyTypeEnum } from '@wd/utils/types';
import useFileSelect from '@wd/utils/useFileSelect';
import { useLocation } from '@wd/utils/useLocation/useLocation';
import { Formik } from 'formik';
import { MapPinIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import useCreateOrUpdateEmergency from '../hooks/useCreateOrUpdateEmergency';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  callback?: () => void;
}

const emergencyTypeOptions = enumToOptions(EmergencyTypeEnum);

const CreateEmergencyModal = ({ isOpen, onClose, callback }: Props) => {
  const { theme } = useTheme();
  const { userLocation, updateUserLocation } = useLocation();

  const images = useFileSelect({
    selectionLimit: 5,
    mediaType: 'photo',
    allowedTypes: ['image/webp', 'image/jpeg', 'image/png', 'image/jpg'],
  });
  const videos = useFileSelect({
    selectionLimit: 5,
    mediaType: 'video',
    allowedTypes: ['video/mp4', 'video/mpeg', 'video/quicktime'],
  });
  const audios = useFileSelect({
    selectionLimit: 5,
    mediaType: 'document',
    allowedTypes: ['audio/mpeg', 'audio/mp4', 'audio/wav'] as any,
  });

  const { isLoading, createOrUpdateEmergency } = useCreateOrUpdateEmergency({
    onSuccess: () => {
      images.setSelectedFiles([]);
      videos.setSelectedFiles([]);
      audios.setSelectedFiles([]);
      callback?.();
      onClose();
    },
  });

  const initialValues: CreateSOSAlertDto = {
    subject: '',
    description: '',
    emergencyType: 'other',
    locationDescription: '',
    isGeneralEmergency: false,
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create SOS Alert"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          subject: Yup.string().required('Subject is required'),
          description: Yup.string(),
          emergencyType: Yup.string()
            .oneOf(emergencyTypeOptions.map(o => o.value))
            .required('Emergency type is required'),
          locationDescription: Yup.string(),
          isGeneralEmergency: Yup.boolean(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          createOrUpdateEmergency(
            { ...values },
            images.selectedFiles,
            videos.selectedFiles,
            audios.selectedFiles,
            userLocation.latitude,
            userLocation.longitude,
          );
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <View className="flex-1">
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <View className="gap-4">
                <FormInput
                  label="Subject"
                  name="subject"
                  placeholder="Enter alert subject"
                  required
                />
                <FormTextArea
                  label="Description"
                  name="description"
                  placeholder="Describe the emergency"
                />
                <FormInput
                  label="Location Description"
                  name="locationDescription"
                  placeholder="Describe the location"
                />

                <View>
                  <Button
                    IconLeft={<MapPinIcon color={theme.blue.DEFAULT} size={18} />}
                    label="Pick My Current Location"
                    onPress={updateUserLocation}
                    pale
                  />
                  {userLocation.latitude && userLocation.longitude ? (
                    <Text className="mt-2 text-xs text-gray-500">
                      Lat: {userLocation.latitude}, Long: {userLocation.longitude}
                    </Text>
                  ) : null}
                </View>

                <FormSelect
                  label="Emergency Type"
                  name="emergencyType"
                  options={emergencyTypeOptions}
                  placeholder="Select emergency type"
                  required
                />

                <Checkbox
                  label="General Emergency?"
                  onValueChange={val => {
                    void setFieldValue('isGeneralEmergency', !!val);
                  }}
                  value={!!values.isGeneralEmergency}
                />

                <UploadFileItem
                  files={images.selectedFiles}
                  onPress={images.openFilePicker}
                  setFiles={images.setSelectedFiles}
                  title="Images"
                />
                <UploadFileItem
                  files={videos.selectedFiles}
                  onPress={videos.openFilePicker}
                  setFiles={videos.setSelectedFiles}
                  title="Videos"
                />
                <UploadFileItem
                  files={audios.selectedFiles}
                  onPress={audios.openFilePicker}
                  setFiles={audios.setSelectedFiles}
                  title="Audios"
                />
              </View>
            </KeyboardAwareScrollView>

            <View className="flex-row justify-between gap-2 py-4">
              <Button
                label="Cancel"
                onPress={onClose}
                pale
                style={{ width: '48%' }}
              />
              <Button
                isLoading={isLoading}
                label="Create Alert"
                onPress={handleSubmit}
                style={{ width: '48%' }}
              />
            </View>
          </View>
        )}
      </Formik>
    </CustomModal>
  );
};

export default CreateEmergencyModal;
