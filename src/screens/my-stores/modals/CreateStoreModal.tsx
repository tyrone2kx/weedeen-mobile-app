import Button from '@wd/components/Button/Button';
import CustomModal from '@wd/components/CustomModal/CustomModal';
import { IMGView } from '@wd/components/FileIconViews/IconViews';
import FormInput from '@wd/components/Input/FormInput';
import FormTextArea from '@wd/components/Input/FormTextArea';
import { UploadFileItem } from '@wd/components/UploadFileItem/UploadFileItem';
import { Store } from '@wd/generated';
import { Notify } from '@wd/utils/helpers';
import useFileSelect from '@wd/utils/useFileSelect';
import { Formik } from 'formik';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import useCreateOrUpdateStore from '../hooks/useCreateOrUpdateStore';
import useDeleteStoreImage from '../hooks/useDeleteStoreImage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  store?: Store;
}

const CreateStoreModal = ({ isOpen, onClose, store }: Props) => {
  const images = useFileSelect({
    selectionLimit: 5,
    allowedTypes: ['image/webp', 'image/jpeg', 'image/png', 'image/jpg'],
    maxSelectionCount: 5,
  });

  const logo = useFileSelect({
    selectionLimit: 1,
    allowedTypes: ['image/webp', 'image/jpeg', 'image/png', 'image/jpg'],
    maxSelectionCount: 1,
  });

  const { deleteStoreImage, isDeletingImage } = useDeleteStoreImage();
  const { isLoading, createOrUpdateStore } = useCreateOrUpdateStore({
    storeId: store?.id,
    onSuccess: () => {
      onClose();
      logo.setSelectedFiles([]);
      images.setSelectedFiles([]);
    },
  });

  const initialValues = {
    name: store?.name || '',
    street: store?.street || '',
    block: store?.block || '',
    flat: store?.flat || '',
    description: store?.description || '',
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={store ? 'Edit Store' : 'Create Store'}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          if (logo.selectedFiles.length === 0) {
            Notify({
              type: 'error',
              message: 'Please upload a logo for the store',
              title: 'Error',
            });
            setSubmitting(false);
            return;
          }
          if (images.selectedFiles.length === 0) {
            Notify({
              type: 'error',
              message: 'Please upload at least one image for the store',
              title: 'Error',
            });
            setSubmitting(false);
            return;
          }
          createOrUpdateStore(values, logo.selectedFiles, images.selectedFiles);
          setSubmitting(false);
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Store name is required'),
          street: Yup.string().required('Street is required'),
          block: Yup.string().required('Block is required'),
          flat: Yup.string().required('Flat is required'),
          description: Yup.string().required('Description is required'),
        })}
      >
        {({ handleSubmit }) => (
          <View className="flex-1">
            <KeyboardAwareScrollView>
              <View>
                <FormInput
                  className="mb-4"
                  label="Store Name"
                  name="name"
                  placeholder="Enter store name"
                />
                <FormInput
                  className="mb-4"
                  label="Street"
                  name="street"
                  placeholder="Enter Street"
                />
                <View className="flex-row gap-4 mb-4">
                  <View className="w-[48%]">
                    <FormInput
                      label="Block"
                      name="block"
                      placeholder="Enter Block"
                    />
                  </View>
                  <View className="w-[48%]">
                    <FormInput
                      className="mb-4"
                      label="Flat"
                      name="flat"
                      placeholder="Enter Flat"
                    />
                  </View>
                </View>
                <FormTextArea
                  className="mb-4"
                  label="Description"
                  name="description"
                  placeholder="What is your store about?"
                />

                <View>
                  <UploadFileItem
                    files={logo.selectedFiles}
                    onPress={logo.openFilePicker}
                    setFiles={logo.setSelectedFiles}
                    title="Logo"
                  />
                  {store?.logo && (
                    <View className="mt-2 flex-row flex-wrap gap-2">
                      <IMGView
                        onRemove={() =>
                          deleteStoreImage({
                            id: store.id,
                            imageUrl: store.logo || '',
                            isLogo: true,
                          })
                        }
                        url={store?.logo}
                      />
                    </View>
                  )}
                </View>

                <View>
                  <UploadFileItem
                    files={images.selectedFiles}
                    onPress={images.openFilePicker}
                    setFiles={images.setSelectedFiles}
                    title="Images"
                  />
                  {store?.images && store.images.length > 0 && (
                    <View className="mt-2 flex-row flex-wrap gap-2">
                      {store?.images?.map((image, index) => (
                        <IMGView
                          key={index}
                          onRemove={() =>
                            deleteStoreImage({
                              id: store.id,
                              imageUrl: image || '',
                              isLogo: false,
                            })
                          }
                          url={image}
                        />
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </KeyboardAwareScrollView>

            <View className="py-4 justify-between flex-row gap-2">
              <Button
                label="Cancel"
                onPress={onClose}
                pale
                style={{ width: '48%' }}
              />
              <Button
                isLoading={isLoading || isDeletingImage}
                label="Create Store"
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

export default CreateStoreModal;
