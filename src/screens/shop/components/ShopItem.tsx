import { useNavigation } from '@react-navigation/native';
import { Store } from '@wd/generated';
import { RoutesEnum } from '@wd/navigation/enum';
import { ShopNowStackScreenProps } from '@wd/navigation/types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  store: Store;
  onPress?: () => void;
}

const ShopItem = ({ store, onPress }: Props) => {
  const navigation =
    useNavigation<
      ShopNowStackScreenProps<RoutesEnum.SHOP_NOW_SCREEN>['navigation']
    >();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={
        onPress ||
        (() =>
          navigation.navigate(RoutesEnum.SINGLE_SHOP_SCREEN, { id: store.id }))
      }
      style={styles.container}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: store.logo || 'https://placehold.co/300' }}
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{store.name}</Text>
        <Text style={styles.description}>
          {store.description || 'No description available.'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // maxWidth: 300,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default ShopItem;
