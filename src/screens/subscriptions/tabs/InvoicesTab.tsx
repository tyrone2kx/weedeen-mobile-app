import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import Loader from '@wd/components/Loader/Loader';
import Select from '@wd/components/Select/Select';
import { BillingService } from '@wd/generated';
import InvoiceItem from '@wd/screens/orders/components/InvoiceItem';
import useTheme from '@wd/utils/theme/useTheme';
import {
  InvoiceStatusEnum,
  InvoiceTypeEnum,
  SelectOptionType,
} from '@wd/utils/types';
import { ShoppingBagIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

interface Props {
  storeId?: string;
}

const InvoicesTab = ({ storeId }: Props) => {
  const { theme } = useTheme();
  const [status, setStatus] = useState<SelectOptionType>(null);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['invoices', storeId, status],
    queryFn: () =>
      apiWrapper(() =>
        BillingService.billingControllerFindAllInvoices({
          limit: 20,
          page: 1,
          ignorePagination: true,
          status: status?.value,
          storeId: storeId || '',
          invoiceType: InvoiceTypeEnum.SUBSCRIPTION,
        }),
      ),
  });

  const invoices = data?.data || [];

  return (
    <View>
      <View className="mt-8 flex gap-2 flex-wrap justify-between items-center">
        <View className=" gap-2 w-full md:w-auto">
          <Select
            className="min-w-[200px]"
            onChange={setStatus}
            options={[
              { label: 'Pending', value: InvoiceStatusEnum.PENDING },
              { label: 'Completed', value: InvoiceStatusEnum.PAID },
              { label: 'Cancelled', value: InvoiceStatusEnum.CANCELLED },
            ]}
            placeholder="Filter by status"
            value={status}
          />
        </View>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[theme.blue.DEFAULT]}
            onRefresh={refetch}
            progressBackgroundColor={theme.gray[150]}
            refreshing={false}
          />
        }
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        {isLoading ? (
          <Loader style={{ marginVertical: '50%' }} />
        ) : !invoices.length ? (
          <EmptyState
            description="You haven't placed any orders yet."
            icon={<ShoppingBagIcon color={'white'} size={40} />}
            section
            title="No Orders"
          />
        ) : (
          <View style={{ flex: 1, marginTop: 20 }}>
            {invoices.map((item, index) => (
              <InvoiceItem invoice={item} key={`${item.id || ''}${index}`} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default InvoicesTab;

const styles = StyleSheet.create({});
