import Header from '@wd/components/Header';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import TopTab from '@wd/components/TopTab';
import { RoutesEnum } from '@wd/navigation/enum';
import { ShopNowStackScreenProps } from '@wd/navigation/types';
import { globalStyles } from '@wd/utils/GlobalStyles';
import useTheme from '@wd/utils/theme/useTheme';
import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ProductsTab from './tabs/ProductsTab';
import StoreTab from './tabs/StoreTab';

enum TabsEnum {
  PRODUCT_VIEW = 'Products',
  STORE_VIEW = 'Stores',
}

const ShopScreen: FC<ShopNowStackScreenProps<RoutesEnum.SHOP_NOW_SCREEN>> = ({
  navigation,
}) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabsEnum>(TabsEnum.STORE_VIEW);
  const tabItems = [
    {
      label: TabsEnum.STORE_VIEW,
      onPress: () => setActiveTab(TabsEnum.STORE_VIEW),
    },
    {
      label: TabsEnum.PRODUCT_VIEW,
      onPress: () => setActiveTab(TabsEnum.PRODUCT_VIEW),
    },
  ];
  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: theme.white[400],
        }}
      />
      <View className="p-4" style={globalStyles.screen}>
        <Header headerTitle="Shop Now" navigation={navigation} />
        <TopTab
          activeTab={activeTab}
          buttonStyle="border-0"
          style={{ marginBottom: 10 }}
          tabs={tabItems}
        />
        {activeTab === TabsEnum.STORE_VIEW && <StoreTab />}
        {activeTab === TabsEnum.PRODUCT_VIEW && <ProductsTab />}
      </View>
    </>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({});
