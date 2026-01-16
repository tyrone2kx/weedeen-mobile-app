import DetailItem from '@wd/components/DetailItem/DetailItem';
import { IMGView } from '@wd/components/FileIconViews/IconViews';
import { Store } from '@wd/generated';
import React from 'react';
import { ScrollView, View } from 'react-native';

interface Props {
  store?: Store;
}

const StoreDetailsTab = ({ store }: Props) => {
  return (
    <View className="flex-1 gap-4">
      <ScrollView>
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
          description={`${store?.flat} ${store?.block} ${store?.street}`}
          title="Store Address"
        />
        <DetailItem
          description={store?.owner?.phoneNo}
          title="Contact Number"
        />
        <DetailItem
          description={store?.description || 'No description provided'}
          title="Store Description"
        />
        <DetailItem
          descriptionComponent={
            <View className="flex-row flex-wrap">
              {store?.images?.map((img, index) => (
                <IMGView key={index} url={img} />
              ))}
            </View>
          }
          title={'Images'}
        />
      </ScrollView>
    </View>
  );
};

export default StoreDetailsTab;
