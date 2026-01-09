import { globalStyles } from '@wd/utils/GlobalStyles';
import useTheme from '@wd/utils/theme/useTheme';
import { remapProps } from 'nativewind';
import React, { FC, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from '../Icon/Icon';

import { SOSAlert } from '@wd/generated';
import ViewInvoiceModal from '@wd/screens/orders/modals/ViewInvoiceModal';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import { MessageSquareIcon, ShoppingCartIcon } from 'lucide-react-native';
import CartModal from '../CartModal/CartModal';
import useGetNotifications from '../NotificationModal/hooks/useGetNotifications';
import NotificationModal from '../NotificationModal/NotificationModal';
import Text from '../Text/Text';

interface IProps {
  headerComponent?: React.ReactElement;
  headerTitle?: string;
  leftContent?: React.ReactElement;
  rightContent?: React.ReactElement;
  showRightContent?: boolean;
  canGoBack?: boolean;
  transparent?: boolean;
  onBack?: () => void;
  navigation: any;
  iconColor?: string;
  style?: ViewStyle;
}

const Header: FC<IProps> = ({
  headerTitle,
  leftContent,
  canGoBack,
  showRightContent = true,
  rightContent,
  transparent = true,
  headerComponent,
  onBack,
  navigation,
  iconColor,
  style,
}) => {
  const bgColorClassName = transparent ? 'bg-transparent' : 'bg-white';

  const textColorClassName = 'text-black-600';

  const { theme } = useTheme();
  const cartHandler = useDisclosure();
  const invoiceHandler = useDisclosure();
  const notificationHandler = useDisclosure();
  const [activeInvoiceId, setActiveInvoiceId] = useState<number | undefined>(
    undefined,
  );
  const { notifications, isLoading, totalElements, totalUnread } =
    useGetNotifications();
  const alerts = notifications.filter(
    item =>
      item.notificationType === 'sos_alert' &&
      (item.metadata as SOSAlert)?.status === 'pending',
  ).length;

  const handleBackPress = () => {
    if (onBack) {
      onBack();
    } else if (navigation?.canGoBack()) {
      navigation?.goBack();
    }
  };

  return (
    <View
      className={`h-[64px] justify-center ${bgColorClassName}`}
      style={[style]}
    >
      <View
        className="flex-row items-center justify-between"
        style={globalStyles.screen_gutter}
      >
        {canGoBack ? (
          <TouchableOpacity
            activeOpacity={0.8}
            className="h-full flex-1 flex-row items-center gap-x-3"
            onPress={handleBackPress}
          >
            {canGoBack ? (
              <Icon
                color={iconColor ?? theme.black[600]}
                name="arrow-left"
                size={25}
              />
            ) : null}
            {leftContent || headerComponent || (
              <Text
                className={`${textColorClassName}`}
                ellipsizeMode="tail"
                intent="h3"
                numberOfLines={1}
                style={{
                  flex: showRightContent ? 0.6 : 0.9,
                }}
                weight="semibold"
              >
                {headerTitle ?? ''}
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          <View className="flex-1 flex-row items-center gap-x-3">
            {leftContent || (
              <Text
                className={`${textColorClassName}`}
                ellipsizeMode="tail"
                intent="h3"
                style={{ flex: showRightContent ? 0.5 : 0.9 }}
                weight="semibold"
              >
                {headerTitle ?? ''}
              </Text>
            )}
          </View>
        )}
        {showRightContent ? (
          <View className="flex-row items-center gap-x-3">
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-gray-150 relative"
              onPress={notificationHandler.onOpen}
              style={styles.header_button}
            >
              <MessageSquareIcon color={theme.black[600]} size={20} />
              <View
                className="p-1 px-2 text-white rounded-full absolute"
                style={{
                  top: 0,
                  right: -2,
                }}
              >
                <Text className="text-xs" style={{ color: theme.red.DEFAULT }}>
                  {totalUnread}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-gray-150"
              onPress={cartHandler.onOpen}
              style={styles.header_button}
            >
              <ShoppingCartIcon color={theme.black[600]} size={20} />
            </TouchableOpacity>
          </View>
        ) : (
          rightContent || null
        )}
      </View>

      <NotificationModal
        isLoading={isLoading}
        isOpen={notificationHandler.isOpen}
        notifications={notifications}
        onClose={notificationHandler.onClose}
        totalElements={totalElements}
      />

      <CartModal
        isOpen={cartHandler.isOpen}
        onClose={cartHandler.onClose}
        showInvoice={id => {
          setActiveInvoiceId(id);
          invoiceHandler.onOpen();
        }}
      />
      {activeInvoiceId && (
        <ViewInvoiceModal
          invoiceId={activeInvoiceId}
          isOpen={invoiceHandler.isOpen}
          onClose={() => {
            invoiceHandler.onClose();
            setActiveInvoiceId(undefined);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header_button: {
    width: 45,
    height: 45,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
});

export default remapProps(Header, {
  className: 'style',
});
