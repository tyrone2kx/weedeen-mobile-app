import Button from '@wd/components/Button/Button';
import CustomModal from '@wd/components/CustomModal/CustomModal';
import DatePicker from '@wd/components/DatePicker/DatePicker';
import FormTextArea from '@wd/components/Input/FormTextArea';
import FormSelect from '@wd/components/Select/FormSelect';
import Text from '@wd/components/Text/Text';
import { SOSAlert } from '@wd/generated';
import { enumToOptions, Notify } from '@wd/utils/helpers';
import { SOSStatusEnum } from '@wd/utils/types';
import { Formik } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import useCreateOrUpdateEmergency from '../hooks/useCreateOrUpdateEmergency';

interface Props {
  emergency?: SOSAlert;
  isOpen: boolean;
  onClose: () => void;
  callback?: () => void;
  isFalseAlarm?: boolean;
}

const statusOptions = enumToOptions({
  RESOLVED: SOSStatusEnum.RESOLVED,
  CANCELLED: SOSStatusEnum.CANCELLED,
});

const EmergencyResolutionModal = ({
  emergency,
  isOpen,
  onClose,
  callback,
  isFalseAlarm,
}: Props) => {
  const [resolvedAt, setResolvedAt] = useState<Date>(
    emergency?.resolvedAt ? new Date(emergency.resolvedAt) : new Date(),
  );

  const { isLoading, createOrUpdateEmergency } = useCreateOrUpdateEmergency({
    emergencyId: emergency?.id,
    onSuccess: () => {
      callback?.();
      onClose();
    },
  });

  const initialValues = {
    status:
      emergency?.status === SOSStatusEnum.RESOLVED ||
      emergency?.status === SOSStatusEnum.CANCELLED
        ? emergency.status
        : SOSStatusEnum.RESOLVED,
    resolutionDetails: '',
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={isFalseAlarm ? 'Mark as False Alarm' : 'Resolve Emergency'}
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          status: isFalseAlarm
            ? Yup.mixed().notRequired()
            : Yup.string()
                .oneOf([SOSStatusEnum.RESOLVED, SOSStatusEnum.CANCELLED])
                .required('Status is required'),
          resolutionDetails: Yup.string().required(
            'Resolution details are required',
          ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (!resolvedAt) {
            Notify({ type: 'error', message: 'Resolution date is required' });
            setSubmitting(false);
            return;
          }
          createOrUpdateEmergency(
            {
              ...values,
              isFalseAlarm,
              resolvedAt: moment(resolvedAt).toISOString(),
            },
            [],
            [],
            [],
          );
          setSubmitting(false);
        }}
      >
        {({ handleSubmit }) => (
          <View className="flex-1">
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <View className="gap-4">
                {!isFalseAlarm ? (
                  <FormSelect
                    label="Status"
                    name="status"
                    options={statusOptions}
                    placeholder="Select status"
                    required
                  />
                ) : null}

                <View>
                  <Text className="mb-1 text-sm font-semibold text-gray-700">
                    Resolution Date
                  </Text>
                  <DatePicker
                    onChange={date => setResolvedAt(moment(date).toDate())}
                    placeholder="Select resolution date"
                    value={resolvedAt ? moment(resolvedAt) : undefined}
                  />
                </View>

                <FormTextArea
                  label="Resolution Details"
                  name="resolutionDetails"
                  placeholder="Describe how the emergency was resolved"
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
                label="Resolve Emergency"
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

export default EmergencyResolutionModal;
