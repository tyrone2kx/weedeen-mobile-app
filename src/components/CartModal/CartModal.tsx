import { useMutation } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { OrderService } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { formatNairaWithKobo, handleError, Notify } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import { Formik } from 'formik';
import { ShoppingCartIcon } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import * as Yup from 'yup';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import EmptyState from '../EmptyState/EmptyState';
import FormInput from '../Input/FormInput';
import FormTextArea from '../Input/FormTextArea';
import SideSheet from '../Slider/SideSheet';
import Tag from '../Tag/Tag';
import Text from '../Text/Text';
import CartProduct from './components/CartProduct';

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  showInvoice?: (id: number) => void;
}

const CartModal = ({ isOpen = false, onClose, showInvoice }: Props) => {
  const { theme } = useTheme();
  const [activeView, setActiveView] = useState<'items' | 'checkout'>('items');
  const cartItems = useAppSelector(state => state.cart.cartItems);
  const user = useAppSelector(state => state.user?.currentUser);
  const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
  const address = user?.unitLabel || '';

  const totalAmount = (cartItems || []).reduce((total, item) => {
    return total + (item.product.price || 0) * item.quantity;
  }, 0);

  const ref = useRef<any>(null);
  const deliveryHandler = useDisclosure(true);
  const flatFee = user?.organization?.defaultDeliveryFee || 500;

  const { isPending, mutate: createInvoice } = useMutation({
    mutationFn: (
      deliveryDetails:
        | {
            deliveryAddress: string;
            receiverName: string;
            deliveryPhoneNo: string;
            additionalNotes: string;
          }
        | undefined,
    ) =>
      apiWrapper(() =>
        OrderService.orderControllerCreate({
          requestBody: {
            items: (cartItems || []).map(item => ({
              productId: item.product.id?.toString(),
              quantity: item.quantity,
              unitPrice: item.product.price || 0,
            })),
            hasDelivery: deliveryHandler.isOpen,
            deliveryAddress: deliveryDetails?.deliveryAddress,
            receiverName: deliveryDetails?.receiverName,
            deliveryPhoneNo: deliveryDetails?.deliveryPhoneNo,
            additionalNotes: deliveryDetails?.additionalNotes,
          },
        }),
      ),
    onSuccess: data => {
      Notify({
        title: 'Invoice Created',
        message: 'Your invoice has been created successfully.',
        type: 'success',
      });
      showInvoice?.(data.id);
      onClose();
    },
    onError: error => {
      handleError(error);
    },
  });

  return (
    <SideSheet isVisible={isOpen} onClose={onClose} side="right">
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        {activeView === 'items' && (
          <View className="flex-1">
            <View className="mb-6 flex-row items-center justify-between">
              <Text className="font-semibold text-lg text-gray-700" intent="h3">
                My Shopping Cart
              </Text>
              <Tag
                color={'#E3F2FD'}
                textStyle={{ color: '#1976D2' }}
                title={formatNairaWithKobo(totalAmount)}
              />
            </View>

            {!cartItems?.length ? (
              <EmptyState
                description="You havn't added any item to your cart."
                icon={<ShoppingCartIcon color={'#FFFFFF'} size={20} />}
                section
                title="Empty Cart"
              />
            ) : (
              <ScrollView>
                {cartItems.map(item => (
                  <CartProduct item={item} key={item.product.id} />
                ))}
              </ScrollView>
            )}
          </View>
        )}

        {activeView === 'checkout' && (
          <View>
            <Text
              className="font-semibold text-lg text-gray-700 mb-6"
              intent="h3"
            >
              My Shopping Cart
            </Text>
            <View className="mb-4">
              <Text>
                You are about to pay the sum of{' '}
                <Text className="font-semibold text-2xl">
                  {formatNairaWithKobo(totalAmount)}
                </Text>{' '}
                for the selected items. Please provide delivery information.
                Delivery costs a flat fee of{' '}
                <Text className="font-semibold">
                  {formatNairaWithKobo(flatFee)}
                </Text>
                .
              </Text>
            </View>
            <View>
              <View className="flex gap-2 items-center mb-4">
                <Checkbox
                  onValueChange={e => deliveryHandler.setIsOpen(e as boolean)}
                  value={deliveryHandler.isOpen}
                />
                <Text className="text-sm">
                  {deliveryHandler.isOpen
                    ? "Uncheck if you don't need delivery"
                    : 'Check this if you need delivery'}
                </Text>
              </View>
              {deliveryHandler.isOpen && (
                <View>
                  <Formik
                    initialValues={{
                      deliveryAddress: address || '',
                      receiverName: fullName || '',
                      deliveryPhoneNo: user?.phoneNo || '',
                      additionalNotes: '',
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      createInvoice(values);
                      setSubmitting(false);
                    }}
                    validationSchema={Yup.object().shape({
                      deliveryAddress: Yup.string().required(
                        'Delivery Address is required',
                      ),
                      receiverName: Yup.string().required(
                        'Receiver Name is required',
                      ),
                      deliveryPhoneNo: Yup.string()
                        .required('Phone Number is required')
                        .matches(/^\d{10}$/, 'Phone Number must be 10 digits'),
                      additionalNotes: Yup.string(),
                    })}
                  >
                    {({ handleSubmit }) => (
                      <View>
                        <View>
                          <FormInput
                            label="Delivery Address"
                            name="deliveryAddress"
                            placeholder="Enter full address"
                          />
                          <FormInput
                            label="Receiver Name"
                            name="receiverName"
                            placeholder="Enter Receiver Name"
                          />
                          <FormInput
                            label="Phone Number"
                            name="deliveryPhoneNo"
                            placeholder="Enter Phone Number"
                            type="phone-pad"
                          />
                          <FormTextArea
                            label="Additional Notes"
                            name="additionalNotes"
                            placeholder="Enter any additional notes"
                          />
                        </View>
                        <Pressable
                          onPress={() => handleSubmit()}
                          ref={ref}
                          style={{ display: 'none' }}
                        />
                      </View>
                    )}
                  </Formik>
                </View>
              )}
            </View>
          </View>
        )}

        <View
          className="border-t mt-4 p-4 rounded-b-xl gap-2 justify-between items-center"
          style={{ borderColor: theme.gray.DEFAULT }}
        >
          <Button
            label={activeView === 'items' ? 'Close' : 'Back to Cart'}
            onPress={() => {
              if (activeView === 'items') {
                onClose();
              } else {
                setActiveView('items');
              }
            }}
            pale
          />
          <Button
            backgroundColor={theme.green[500]}
            className="bg-green-600"
            disabled={!cartItems?.length}
            isLoading={isPending}
            label={activeView === 'items' ? 'Checkout' : 'Continue to Payment'}
            onPress={() => {
              if (activeView === 'items') {
                setActiveView('checkout');
              } else {
                if (deliveryHandler.isOpen) ref?.current?.press();
                else {
                  createInvoice(undefined);
                }
              }
            }}
          />
        </View>
      </View>
    </SideSheet>
  );
};

export default CartModal;
