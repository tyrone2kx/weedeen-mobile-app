import { useNavigation } from '@react-navigation/native';
import Tag, { TagVariant } from '@wd/components/Tag/Tag';
import Text from '@wd/components/Text/Text';
import { Store } from '@wd/generated';
import { RoutesEnum } from '@wd/navigation/enum';
import { ShopNowStackScreenProps } from '@wd/navigation/types';
import useTheme from '@wd/utils/theme/useTheme';
import { StoreIcon } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
  store: Store;
  onPress?: () => void;
  /** Show the store's approval status as an overlay badge (used on My Stores). */
  showStatus?: boolean;
}

const resolveStatus = (
  status?: string,
): { title: string; variant: TagVariant } | null => {
  const s = (status || '').toLowerCase();
  if (!s || s.includes('active') || s.includes('approved')) return null;
  if (s.includes('pending')) return { title: 'Pending approval', variant: 'warning' };
  if (s.includes('reject')) return { title: 'Rejected', variant: 'danger' };
  return { title: status!.replaceAll('_', ' '), variant: 'neutral' };
};

const ShopItem = ({ store, onPress, showStatus }: Props) => {
  const { theme } = useTheme();
  const navigation =
    useNavigation<
      ShopNowStackScreenProps<RoutesEnum.SHOP_NOW_SCREEN>['navigation']
    >();

  const status = showStatus ? resolveStatus(store.status) : null;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={
        onPress ||
        (() =>
          navigation.navigate(RoutesEnum.SINGLE_SHOP_SCREEN, { id: store.id }))
      }
      style={[styles.container, { borderColor: theme.gray[200] }]}
    >
      <View style={[styles.imageWrapper, { backgroundColor: theme.blue[300] }]}>
        {status ? (
          <View style={styles.statusBadge}>
            <Tag title={status.title} variant={status.variant} />
          </View>
        ) : null}
        {store.logo ? (
          <Image source={{ uri: store.logo }} style={styles.image} />
        ) : (
          <View
            className="items-center justify-center rounded-full bg-white"
            style={{ width: 64, height: 64 }}
          >
            <StoreIcon color={theme.blue.DEFAULT} size={30} />
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text intent="h4" numberOfLines={1} weight="bold">
          {store.name}
        </Text>
        <Text
          intent="sm"
          numberOfLines={2}
          style={{ color: theme.gray[500], marginTop: 4 }}
        >
          {store.description || 'No description available.'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#fff',
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  statusBadge: { position: 'absolute', top: 12, left: 12, zIndex: 2 },
  content: { padding: 16 },
});

export default ShopItem;
