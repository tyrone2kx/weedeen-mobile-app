import { useMutation } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import Avatar from '@wd/components/Avatar/Avatar';
import Button from '@wd/components/Button/Button';
import { PencilEditIcon } from '@wd/components/icons';
import FormInput from '@wd/components/Input/FormInput';
import Text from '@wd/components/Text/Text';
import { AuthService, UpdateAuthDto } from '@wd/generated';
import { RoutesEnum } from '@wd/navigation/enum';
import { MenuStackScreenProps } from '@wd/navigation/types';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { Notify } from '@wd/utils/helpers';
import { Theme } from '@wd/utils/Theme';
import { Formik } from 'formik';
import { UploadIcon } from 'lucide-react-native';
import React, { FC, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import * as Yup from 'yup';
import useProfileImageUpdate from '../hooks/useProfileImageUpdate';

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

interface Props {
  navigation: MenuStackScreenProps<RoutesEnum.PROFILE_SETTINGS_SCREEN>['navigation'];
}

const ProfileTab: FC<Props> = () => {
  const user = useAppSelector(state => state.user.currentUser);

  const [selectedImage, setSelectedImage] = useState<Asset | null>(null);

  const { changePhoto, isLoading: uploadImageLoading } =
    useProfileImageUpdate();

  const changeUserImage = async (uploadedImage: Asset) => {
    if (uploadedImage) {
      const formData = new FormData();
      formData.append('profilePic', {
        name: uploadedImage?.fileName || '',
        type: uploadedImage?.type || '',
        uri:
          Platform.OS === 'ios'
            ? uploadedImage?.uri?.replace('file://', '')
            : uploadedImage?.uri,
        size: uploadedImage?.fileSize,
      });
      await changePhoto(formData, () => setSelectedImage(null));
    }
  };

  const openImageLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeExtra: true,
      selectionLimit: 1,
    });
    if (result.errorMessage) {
      Notify({ type: 'error', message: result.errorMessage, title: 'Error' });
    }
    if (!result?.didCancel) {
      const images: Asset[] = result?.assets ?? [];
      if (images.length === 1) {
        const image = images[0];

        if (
          image?.fileSize &&
          image?.fileSize > MAX_FILE_SIZE_MB * 1024 * 1024
        ) {
          Notify({
            type: 'error',
            message: 'File size exceeds the maximum limit of 5MB.',
          });
        }

        if (!ALLOWED_IMAGE_TYPES.includes(image?.type || 'image/png')) {
          Notify({
            type: 'error',
            message:
              'Invalid file type. Only JPG, JPEG, PNG, or WEBP are allowed.',
          });
        }
        setSelectedImage(image);
      } else {
        Notify({
          type: 'error',
          message: 'You have reached the upload limit.',
        });
      }
    }
  };

  const hasChanges = (values: { firstName: string; lastName: string }) => {
    return (
      values.firstName !== user?.firstName || values.lastName !== user?.lastName
    );
  };

  const { isPending, mutate } = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: UpdateAuthDto;
    }) =>
      apiWrapper(() =>
        AuthService.authControllerUpdateProfile({ id, requestBody }),
      ),
  });

  return (
    <>
      <View className="mb-6 flex-row gap-2">
        <View className="flex-row items-center justify-center">
          <View className="relative overflow-hidden rounded-full bg-red-300">
            <Avatar image={selectedImage?.uri || user?.profilePic} size={90} />
            <TouchableOpacity
              activeOpacity={0.9}
              className="absolute left-0 top-0 h-full w-full flex-row items-center justify-center rounded-full bg-black/50"
              disabled={uploadImageLoading}
              onPress={openImageLibrary}
            >
              {uploadImageLoading ? (
                <ActivityIndicator color={Theme.colors.white.DEFAULT} />
              ) : (
                <PencilEditIcon color={Theme.colors.white.DEFAULT} size={32} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View className="justify-center">
          <Text>Profile Photo</Text>
          <View className="mt-2 flex-row gap-2">
            <Button
              disabled={!selectedImage}
              IconLeft={<UploadIcon color={'#FFF'} />}
              isLoading={uploadImageLoading}
              label={'Upload image'}
              onPress={() => {
                if (selectedImage) {
                  void changeUserImage(selectedImage);
                }
              }}
              style={{ width: 'auto', paddingHorizontal: 15 }}
            />
            {selectedImage && (
              <Button
                label={'Cancel'}
                onPress={() => setSelectedImage(null)}
                pale
                style={{ width: 'auto', paddingHorizontal: 10 }}
              />
            )}
          </View>
        </View>
      </View>

      <Formik
        initialValues={{
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          email: user?.email,
        }}
        onSubmit={values => {
          mutate({
            id: user?.id || '',
            requestBody: {
              firstName: values.firstName,
              lastName: values.lastName,
            },
          });
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required('First name is required'),
          lastName: Yup.string().required('Last name is required'),
        })}
      >
        {({ values, handleSubmit }) => (
          <View className="flex-1 justify-between">
            <View>
              <View className="flex-row flex-wrap justify-between">
                <View className="mb-4 w-full md:w-[48%]">
                  <FormInput label="First name" name="firstName" />
                </View>
                <View className="mb-4 w-full md:w-[48%]">
                  <FormInput label="Last name" name="lastName" />
                </View>
                <View className="mb-4 w-full">
                  <FormInput
                    editable={false}
                    label="Email"
                    name="email"
                    type="email-address"
                  />
                </View>
                <View className="mt-8 mb-12 h-[1] bg-gray-300" />
              </View>
            </View>

            <Button
              className="mb-6"
              disabled={!hasChanges(values)}
              isLoading={isPending}
              label="Save Changes"
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </>
  );
};

export default ProfileTab;
