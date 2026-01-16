import CustomModal from '@wd/components/CustomModal/CustomModal';
import Tag from '@wd/components/Tag/Tag';
import Text from '@wd/components/Text/Text';
import { UserFee } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import {
  formatNairaWithKobo,
  resolveInvoiceStatusColors,
} from '@wd/utils/helpers';
import moment from 'moment';
import { Dimensions, Image, View } from 'react-native';

interface Props {
  invoice: UserFee;
  isOpen: boolean;
  onClose: () => void;
}

const ViewUserFeeModal = ({ invoice, isOpen, onClose }: Props) => {
  const { height } = Dimensions.get('screen');
  const user = useAppSelector(state => state.user);
  const currentUser = user.currentUser;

  const userAddress = `${currentUser?.flatNumber || ''} ${currentUser?.block || ''} ${currentUser?.street || ''} `;
  const fee = invoice?.fee;
  return (
    <CustomModal
      className="p-0"
      isOpen={isOpen}
      onClose={onClose}
      title="Invoice"
    >
      <View className="w-full p-4 bg-gray-100 flex-row justify-around">
        {
          <>
            <View
              className="w-full md:w-[60%] xl:w-[70%] max-w-[800] bg-gray-50 border-gray-400 border-1 rounded-xl shadow-lg flex-col justify-between"
              style={{
                minHeight: height - 300,
              }}
            >
              <View>
                <View className="p-4 rounded-xl gap-4 justify-between text-[#5E6470]">
                  <View className="flex-row  justify-between ">
                    <View className="flex-row gap-3">
                      <Image
                        className="h-12 w-12 rounded-lg"
                        source={require('@assets/images/weedeen.png')}
                      />
                      <View>
                        <Text className="font-bold text-[#1A1C21] whitespace-nowrap">
                          Weedeen Inc
                        </Text>
                        <Text className="text-xs">hello@weedeen.com</Text>
                      </View>
                    </View>
                    <View>
                      <Tag
                        color={resolveInvoiceStatusColors(
                          invoice?.isPaid ? 'paid' : 'pending',
                        )}
                        title={invoice?.isPaid ? 'Paid' : 'Unpaid'}
                      />
                    </View>
                  </View>

                  <View>
                    <Text className="text-2xl font-bold">Fee</Text>
                    <Text className="text-xs">{invoice?.fee?.title}</Text>
                  </View>
                </View>

                <View className="p-4 justify-between my-2">
                  <View className="flex-row gap-3 text-center">
                    <View className="mb-3">
                      <Text className=" text-[10px]">Invoice Date</Text>
                      <Text className="font-bold">
                        {moment(invoice?.createdAt).format('Do MMM, YYYY')}
                      </Text>
                    </View>
                    <View>
                      <Text className=" text-[10px]">Due Date</Text>
                      <Text className="font-bold">
                        {moment(invoice?.createdAt)
                          .add(1, 'y')
                          .format('Do MMM, YYYY')}
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Text className="text-[10px] text-right mr-4 uppercase">
                      Amount Due
                    </Text>
                    <View className="p-2 px-4 bg-[#E3FA7D]">
                      <Text className="text-right text-[#6735F4] font-semibold text-sm">
                        {formatNairaWithKobo(fee?.amount)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="px-4 text-xs">
                  <View className="flex-row justify-between text-[#5E6470] border-b py-2 mb-4 uppercase text-[10px]">
                    <View className="flex-row space-x-3">
                      <Text>#</Text>
                      <Text>Title/Description</Text>
                    </View>
                  </View>

                  <View className="flex-row justify-between text-[#5E6470] border-b py-2 ">
                    <View className="">
                      <Text className="font-bold">{fee?.description}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View className="p-4 text-[#5E6470] text-xs">
                <Text className="my-6">Thank you for the business!</Text>
              </View>
            </View>
          </>
        }
      </View>
    </CustomModal>
  );
};

export default ViewUserFeeModal;
