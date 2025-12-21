import { useQueryClient } from '@tanstack/react-query';
import Button from '@wd/components/Button/Button';
import CustomModal from '@wd/components/CustomModal/CustomModal';
import FormInput from '@wd/components/Input/FormInput';
import FormTextArea from '@wd/components/Input/FormTextArea';
import FormSelect from '@wd/components/Select/FormSelect';
import Text from '@wd/components/Text/Text';
import { VisitorAccess } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { globalStyles } from '@wd/utils/GlobalStyles';
import { enumToOptions } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import { VisitorTypeEnum } from '@wd/utils/types';
import useCopyToClipboard from '@wd/utils/useCopyToClipboard';
import { Formik } from 'formik';
import { CheckIcon, CopyIcon } from 'lucide-react-native';
import moment from 'moment';
import { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import useVisitorMutations from '../hooks/useVisitorMutations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  visitor?: VisitorAccess;
}

const CreateInviteModal = ({ isOpen, onClose: close, visitor }: Props) => {
  const org = useAppSelector(state => state.user?.currentUser?.organization);
  const [code, setCode] = useState('');
  const onClose = () => {
    setCode('');
    close();
  };
  const queryClient = useQueryClient();
  const initialValues = {
    visitorName: visitor?.visitorName || '',
    visitorPhone: visitor?.visitorPhone || '',
    visitorType: visitor?.visitorType || '',
    purposeOfVisit: visitor?.purposeOfVisit || '',
    accessCodeExpiry: visitor?.accessCodeExpiry
      ? moment(visitor.accessCodeExpiry).diff(
          moment(visitor.createdAt),
          'minutes',
        )
      : 60, // Default to 60 minutes
  };

  const { isCreating, createAccess, isUpdating, updateAccess } =
    useVisitorMutations();

  const textToCopy = `Your access code to ${org?.name} is: ${code}.`;
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const { theme } = useTheme();

  return (
    <CustomModal
      enforceMinHeight={false}
      isOpen={isOpen}
      onClose={onClose}
      title={`${visitor ? 'Update' : 'Generate'} Access Code`}
    >
      {!code ? (
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            const requestBody = {
              ...values,
              visitorType: values.visitorType as VisitorTypeEnum,
              accessCodeExpiry: moment()
                .add(Number(values.accessCodeExpiry), 'minutes')
                .toISOString(),
            };
            if (visitor) {
              updateAccess({
                id: visitor.id,
                requestBody,
              });
              setSubmitting(false);
              return;
            }
            createAccess(requestBody, {
              onSuccess: data => {
                setCode(data.accessCode || '');
              },
            });
            setSubmitting(false);
          }}
          validateOnChange
          validationSchema={Yup.object().shape({
            visitorName: Yup.string().required('Guest Name is required'),
            visitorPhone: Yup.string().required('Guest Phone No is required'),
            visitorType: Yup.string().required('Relationship is required'),
            purposeOfVisit: Yup.string().required(
              'Purpose of Visit is required',
            ),
            accessCodeExpiry: Yup.number()
              .required('Code Expiry is required')
              .min(1, 'Code Expiry must be at least 1 minute'),
          })}
        >
          {({ handleSubmit }) => {
            return (
              <View className="">
                <KeyboardAwareScrollView
                  contentContainerStyle={
                    globalStyles.scroll_view_content_container
                  }
                  showsVerticalScrollIndicator={false}
                >
                  <View className="gap-4">
                    <FormInput
                      label="Guest Name"
                      name="visitorName"
                      placeholder="Enter Guest Name"
                      required
                    />
                    <FormInput
                      label="Guest Phone No"
                      name="visitorPhone"
                      placeholder="Enter Guest Phone No"
                      type="phone-pad"
                    />
                    <FormSelect
                      label="Relationship"
                      name="visitorType"
                      options={enumToOptions(VisitorTypeEnum)}
                      placeholder="Select Relationship"
                      required
                    />
                    <FormTextArea
                      label="Purpose of Visit"
                      name="purposeOfVisit"
                      placeholder="Purpose of visit"
                    />
                    <FormInput
                      label="Code Expiry (Minutes)"
                      name="accessCodeExpiry"
                      placeholder="Code Expires After"
                      required
                      type="number-pad"
                    />
                    <Button
                      isLoading={isCreating || isUpdating}
                      label={'Generate Invite'}
                      onPress={handleSubmit}
                    />
                  </View>
                </KeyboardAwareScrollView>
              </View>
            );
          }}
        </Formik>
      ) : (
        <View className="flex flex-col items-center justify-center gap-4">
          <Text>Access Code</Text>

          <Button
            IconLeft={
              isCopied ? (
                <CheckIcon color="green" />
              ) : (
                <CopyIcon color={theme.blue.DEFAULT} />
              )
            }
            label={`${isCopied ? 'Copied!' : code}`}
            onPress={() => copyToClipboard(textToCopy)}
            pale
          />
        </View>
      )}
    </CustomModal>
  );
};

export default CreateInviteModal;
