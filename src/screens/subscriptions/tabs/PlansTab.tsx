import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import Loader from '@wd/components/Loader/Loader';
import { Billing, BillingService, Invoice } from '@wd/generated';
import ViewInvoiceModal from '@wd/screens/orders/modals/ViewInvoiceModal';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PlanItem from '../components/PlanItem';

interface Props {
  cannotSubscribe?: boolean;
  isResident: boolean;
  storeId?: string;
}

const PlansTab: React.FC<Props> = ({
  cannotSubscribe,
  isResident,
  storeId,
}) => {
  const queryClient = useQueryClient();

  const handler = useDisclosure();

  const [invoiceId, setInvoiceId] = useState<string>('');
  const [invoice, setInvoice] = useState<Invoice | undefined>(undefined);
  const displayInvoice = (id: string) => {
    setInvoiceId(id);
    handler.onOpen();
  };

  const [subscriptionToCancel, setSubscriptionToCancel] = useState<
    Billing | undefined
  >(undefined);
  const cancelSubscriptionHandler = useDisclosure();

  const { data: plans = [], isLoading: isLoadingPlans } = useQuery({
    queryKey: ['plans'],
    queryFn: () =>
      apiWrapper(() => BillingService.billingControllerFindAllPlans()),
  });

  const filteredPlans = isResident
    ? plans.filter(plan => plan.planType === 'individual')
    : plans.filter(plan => plan.planType === 'organization');

  const onCancelSubscription = (subscription: Billing) => {
    setSubscriptionToCancel(subscription);
    cancelSubscriptionHandler.onOpen();
  };

  const onSubscribeSuccess = (invoice: Invoice) => {
    queryClient.invalidateQueries({ queryKey: ['invoices'] });
    displayInvoice(invoice.id?.toString());
  };

  return (
    <View className="py-6">
      <ScrollView className="" horizontal>
        {isLoadingPlans ? (
          <Loader />
        ) : (
          filteredPlans.map(plan => (
            <PlanItem
              cannotSubscribe={cannotSubscribe}
              key={plan.id}
              onCancelSubscription={onCancelSubscription}
              onSubscribeSuccess={onSubscribeSuccess}
              plan={plan}
              storeId={storeId}
            />
          ))
        )}
      </ScrollView>

      <ViewInvoiceModal
        invoiceId={Number(invoiceId)}
        isOpen={handler.isOpen}
        onClose={() => {
          handler.onClose();
          setInvoiceId('');
          setInvoice(undefined);
        }}
      />
    </View>
  );
};

export default PlansTab;

const styles = StyleSheet.create({});
