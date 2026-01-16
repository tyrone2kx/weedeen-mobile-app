import Button from '@wd/components/Button/Button';
import Text from '@wd/components/Text/Text';
import { Billing, Invoice, Plan } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { UserTypeEnum } from '@wd/utils/types';
import useBreakpointValue from '@wd/utils/useBreakpointValue';
import { CheckCircle2 } from 'lucide-react-native';
import { Dimensions, View } from 'react-native';
import useGenerateInvoice from '../hooks/useGenerateInvoice';

interface Props {
  plan?: Plan;
  onSubscribeSuccess?: (invoice: Invoice) => void;
  onCancelSubscription?: (subscription: Billing) => void;
  storeId?: string;
  cannotSubscribe?: boolean;
}

const PlanItem = ({
  plan,
  onSubscribeSuccess,
  onCancelSubscription,
  storeId,
  cannotSubscribe = false,
}: Props) => {
  const { isSubscribing, subscribeToPlan } = useGenerateInvoice();
  const currentOrgSub = useAppSelector(state => state.user.activeSubscription);
  const userSubs = useAppSelector(state => state.user.activeUserSubscriptions);
  const currentUserSub = userSubs?.find(sub => sub.storeId === storeId);
  const activeUserType = useAppSelector(state => state.user.activeUserType);

  const subscription =
    activeUserType === UserTypeEnum.RESIDENT ? currentUserSub : currentOrgSub;
  const isCurrent = subscription?.plan?.id === plan?.id;
  const isFree = isCurrent && plan?.price === 0;

  const { width } = Dimensions.get('screen');
  const planWidth = useBreakpointValue({
    base: width - 40,
    md: 300,
    lg: 350,
  });

  return (
    <View
      className="border mr-4 border-blue-400 p-4 rounded-2xl justify-between"
      style={{ width: planWidth }}
    >
      <View>
        <Text className="font-semibold mb-2">{plan?.name}</Text>
        <Text className="font-bold text-gray-900 text-4xl" intent="h2">
          {plan?.currency} {plan?.price}
        </Text>
        <Text className="text-sm text-[#595959] my-2">{plan?.subtitle}</Text>
        <View className="bg-gray-100 flex-row rounded-lg p-4 my-6">
          <Text className="ml-4 text-sm  text-gray-700">
            {plan?.description}
          </Text>
        </View>

        <View className="mb-10">
          <Text className="text-[#6C6A6A] text-sm mb-4">Features</Text>

          {plan?.features.map((item, index) => (
            <View className="flex-row gap-2 items-center mb-2" key={index}>
              <CheckCircle2 />
              <Text className="text-[#6C6A6A] text-sm">{item}</Text>
            </View>
          ))}
        </View>
      </View>
      <View className="flex gap-2">
        <Button
          className="w-full"
          disabled={(isCurrent && !isFree) || cannotSubscribe}
          isLoading={isSubscribing}
          label={isFree ? 'Upgrade' : isCurrent ? 'Subscribed' : 'Subscribe'}
          onPress={() => {
            if (!isFree && !isCurrent)
              subscribeToPlan(
                { planId: plan?.id || '', storeId },
                { onSuccess: onSubscribeSuccess },
              );
          }}
        />
        {isCurrent && subscription && (
          <Button
            className="w-full"
            label={'Cancel Subscription'}
            onPress={() => onCancelSubscription?.(subscription)}
          />
        )}
      </View>
    </View>
  );
};

export default PlanItem;
