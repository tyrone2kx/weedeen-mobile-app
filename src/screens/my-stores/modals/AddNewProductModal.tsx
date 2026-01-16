import Button from '@wd/components/Button/Button';
import CustomModal from '@wd/components/CustomModal/CustomModal';
import { IMGView } from '@wd/components/FileIconViews/IconViews';
import FormInput from '@wd/components/Input/FormInput';
import FormTextArea from '@wd/components/Input/FormTextArea';
import { UploadFileItem } from '@wd/components/UploadFileItem/UploadFileItem';
import { Product } from '@wd/generated';
import { Notify } from '@wd/utils/helpers';
import useFileSelect from '@wd/utils/useFileSelect';
import { Formik } from 'formik';
import { View } from 'react-native';
import * as Yup from 'yup';
import useCreateProduct from '../hooks/useCreateProduct';
import useDeleteProductImage from '../hooks/useDeleteProductImage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  storeId: string;
}

const AddNewProductModal = ({
  isOpen,
  onClose: close,
  product,
  storeId,
}: Props) => {
  const { deleteProductImage, isDeletingImage } = useDeleteProductImage();
  const initialValues = {
    name: product?.name || '',
    price: product?.price || 0,
    quantity: product?.quantity || 1,
    category: product?.category || '',
    description: product?.description || '',
    storeId,
  };
  const productImages = product?.images || [];

  const images = useFileSelect({
    selectionLimit: 5,
    allowedTypes: ['image/webp', 'image/jpeg', 'image/png', 'image/jpg'],
    maxSelectionCount: 5,
  });

  const onClose = () => {
    images.setSelectedFiles([]);
    close();
  };

  const { isLoading, createOrUpdateProduct } = useCreateProduct({
    productId: product?.id?.toString(),
    onSuccess: () => {
      onClose();
      images.setSelectedFiles([]);
    },
  });
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? 'Edit Product' : 'Create Product'}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          if (!product && images.selectedFiles.length === 0) {
            Notify({
              title: 'Error',
              message: 'Please select at least one image for the product',
              type: 'error',
            });
            return;
          }
          createOrUpdateProduct(values, images.selectedFiles);
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required'),
          price: Yup.number()
            .required('Unit Price is required')
            .positive('Price must be positive'),
          quantity: Yup.number()
            .required('Available Quantity is required')
            .positive('Quantity must be positive'),
          category: Yup.string(),
          description: Yup.string().required('Description is required'),
        })}
      >
        {({ resetForm, handleSubmit }) => (
          <View>
            <FormInput
              className="mb-4"
              label="Name"
              name="name"
              placeholder="Enter product name"
              required
            />
            <FormInput
              className="mb-4"
              label="Unit Price"
              name="price"
              placeholder="Enter Unit Price"
              required
              type="decimal-pad"
            />
            <View className="flex-row gap-4 mb-4">
              <View className="w-1/2">
                <FormInput
                  className="mb-4"
                  label="Available Quantity"
                  name="quantity"
                  placeholder="Enter Available Quantity"
                  required
                  type="decimal-pad"
                />
              </View>
              <View className="w-1/2">
                <FormInput
                  className="mb-4"
                  label="Category"
                  name="category"
                  placeholder="Enter Category"
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
                files={images.selectedFiles}
                onPress={images.openFilePicker}
                setFiles={images.setSelectedFiles}
                title="Images"
              />
              {productImages.length > 0 && (
                <View className="mt-2 flex-row flex-wrap gap-2">
                  {productImages?.map((image, index) => (
                    <IMGView
                      key={index}
                      onRemove={() =>
                        deleteProductImage({
                          productId: String(product?.id || ''),
                          imageUrl: image || '',
                        })
                      }
                      url={image}
                    />
                  ))}
                </View>
              )}
            </View>

            <View className="flex-row mt-4 gap-2 justify-between">
              <Button
                label={'Cancel'}
                onPress={() => {
                  onClose();
                  resetForm();
                }}
                pale
                style={{ width: '48%' }}
              />
              <Button
                isLoading={isLoading || isDeletingImage}
                label={product ? 'Update Product' : 'Create Product'}
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

export default AddNewProductModal;
