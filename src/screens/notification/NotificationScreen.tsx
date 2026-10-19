import EmptyState from '@wd/components/EmptyState/EmptyState';
import Header from '@wd/components/Header';
import InfiniteScrollView from '@wd/components/InfiniteScrollView/InfiniteScrollView';
import Loader from '@wd/components/Loader/Loader';
import useGetNotifications from '@wd/components/NotificationModal/hooks/useGetNotifications';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Text from '@wd/components/Text/Text';
import { globalStyles } from '@wd/utils/GlobalStyles';
import useTheme from '@wd/utils/theme/useTheme';
import {
  BellIcon,
  ShieldAlertIcon,
  TicketIcon,
  WalletIcon,
} from 'lucide-react-native';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';

const iconFor = (type: string, color: string) => {
  const t = (type || '').toLowerCase();
  if (t.includes('sos') || t.includes('alert')) return <ShieldAlertIcon color={color} size={20} />;
  if (t.includes('pay') || t.includes('fee') || t.includes('invoice')) return <WalletIcon color={color} size={20} />;
  if (t.includes('visitor') || t.includes('access')) return <TicketIcon color={color} size={20} />;
  return <BellIcon color={color} size={20} />;
};

const NotificationScreen = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme();
  const { notifications, isLoading } = useGetNotifications();

  return (
    <>
      <SafeAreaComponent statusBarProps={{ backgroundColor: theme.white[400] }} />
      <Header
        canGoBack
        headerTitle="Notifications"
        navigation={navigation}
        showRightContent={false}
        transparent={false}
      />
      <View className="p-4 relative" style={globalStyles.screen}>
        <InfiniteScrollView fetching={isLoading} showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {isLoading ? (
            <Loader style={{ marginVertical: '50%' }} />
          ) : !notifications?.length ? (
            <EmptyState
              description="You're all caught up. New alerts and updates will show up here."
              icon={<BellIcon size={34} />}
              section
              title="No notifications"
            />
          ) : (
            <View style={{ marginTop: 8 }}>
              {notifications.map((n: any, index: number) => {
                const unread = !(n.isRead ?? n.read);
                return (
                  <View
                    key={`${n.id || index}`}
                    className="mb-3 flex-row gap-3 rounded-2xl p-4"
                    style={{
                      backgroundColor: unread ? theme.blue[300] : theme.white.DEFAULT,
                      borderWidth: 1,
                      borderColor: unread ? 'transparent' : theme.gray[200],
                    }}
                  >
                    <View
                      className="items-center justify-center rounded-xl"
                      style={{ width: 42, height: 42, backgroundColor: theme.white.DEFAULT }}
                    >
                      {iconFor(n.notificationType, theme.blue.DEFAULT)}
                    </View>
                    <View style={{ flex: 1 }}>
                      <View className="flex-row items-center justify-between">
                        <Text intent="sm" numberOfLines={1} style={{ flex: 1 }} weight="bold">
                          {n.title || 'Notification'}
                        </Text>
                        {unread ? (
                          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: theme.blue.DEFAULT, marginLeft: 8 }} />
                        ) : null}
                      </View>
                      <Text intent="sm" numberOfLines={2} style={{ color: theme.gray[500], marginTop: 2 }}>
                        {n.body || n.message || ''}
                      </Text>
                      <Text intent="xs" style={{ color: theme.gray[400], marginTop: 6 }}>
                        {moment(n.createdAt).fromNow()}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </InfiniteScrollView>
      </View>
    </>
  );
};

export default NotificationScreen;
