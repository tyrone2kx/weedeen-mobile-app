import DetailItem from '@wd/components/DetailItem/DetailItem';
import { IMGView } from '@wd/components/FileIconViews/IconViews';
import Text from '@wd/components/Text/Text';
import { Store } from '@wd/generated';
import useTheme from '@wd/utils/theme/useTheme';
import React from 'react';
import { ScrollView, View } from 'react-native';

interface Props {
  store?: Store;
}

const StoreDetailsTab = ({ store }: Props) => {
  const { theme } = useTheme();
  return (
    <View className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          className="rounded-2xl bg-white px-4"
          style={{ borderWidth: 1, borderColor: theme.gray[200] }}
        >
          <DetailItem description={store?.name} title="Store Name" />
          <DetailItem
            description={
              store?.owner
                ? `${store.owner.firstName} ${store?.owner.lastName}`
                : undefined
            }
            title="Store Owner"
          />
          <DetailItem
            description={`${store?.flat || ''} ${store?.block || ''} ${store?.street || ''}`.trim()}
            title="Store Address"
          />
          <DetailItem description={store?.owner?.phoneNo} title="Contact Number" />
          <DetailItem
            description={store?.description || 'No description provided'}
            last
            title="Store Description"
          />
        </View>

        <Text className="mb-3 mt-6" intent="h4" weight="bold">
          Images
        </Text>
        <View className="flex-row flex-wrap gap-3">
          {store?.images?.length ? (
            store.images.map((img, index) => <IMGView key={index} url={img} />)
          ) : (
            <Text intent="sm" style={{ color: theme.gray[500] }}>
              No images uploaded.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default StoreDetailsTab;
