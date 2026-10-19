import Button from '@wd/components/Button/Button';
import Text from '@wd/components/Text/Text';
import { Billing, Invoice, Plan } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import useTheme from '@wd/utils/theme/useTheme';
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
  const { theme } = useTheme();
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
  const planWidth = useBreakpointValue({ base: width - 40, md: 300, lg: 350 });

  return (
    <View
      className="mr-4 justify-between rounded-3xl bg-white p-5"
      style={{
        backgroundColor: theme.white.DEFAULT,
        width: planWidth,
        borderWidth: isCurrent ? 2 : 1,
        borderColor: isCurrent ? theme.blue.DEFAULT : theme.gray[200],
        shadowColor: '#101828',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
      }}
    >
      <View>
        <Text intent="h4" style={{ color: theme.blue.DEFAULT }} weight="bold">
          {plan?.name}
        </Text>
        <Text intent="h1" style={{ marginTop: 6 }} weight="extrabold">
          {plan?.currency} {plan?.price}
        </Text>
        <Text intent="sm" style={{ color: theme.gray[500], marginTop: 6 }}>
          {plan?.subtitle}
        </Text>

        <View
          className="my-6 rounded-xl p-4"
          style={{ backgroundColor: theme.blue[300] }}
        >
          <Text intent="sm" style={{ color: theme.blue[600] }} weight="medium">
            {plan?.description}
          </Text>
        </View>

        <View className="mb-8">
          <Text intent="sm" style={{ color: theme.gray[500], marginBottom: 12 }} weight="medium">
            Features
          </Text>
          {plan?.features.map((item, index) => (
            <View className="mb-3 flex-row items-center gap-2" key={index}>
              <CheckCircle2 color={theme.green[600]} size={18} />
              <Text intent="sm" style={{ flex: 1, color: theme.black[600] }}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View className="gap-2">
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
            label="Cancel Subscription"
            light
            onPress={() => onCancelSubscription?.(subscription)}
          />
        )}
      </View>
    </View>
  );
};

export default PlanItem;
