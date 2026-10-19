import { globalStyles } from '@wd/utils/GlobalStyles';
import useTheme from '@wd/utils/theme/useTheme';
import { remapProps } from 'nativewind';
import React, { FC, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from '../Icon/Icon';

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
  eyebrow?: string;
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
  eyebrow,
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
  const { theme } = useTheme();
  const headerBg = transparent ? 'transparent' : theme.white.DEFAULT;
  const circleButtonStyle = [
    styles.circle_button,
    { backgroundColor: theme.white[200], borderColor: theme.gray[200] },
  ];
  const cartHandler = useDisclosure();
  const invoiceHandler = useDisclosure();
  const notificationHandler = useDisclosure();
  const [activeInvoiceId, setActiveInvoiceId] = useState<number | undefined>(
    undefined,
  );
  const { notifications, isLoading, totalElements, totalUnread } =
    useGetNotifications();

  const handleBackPress = () => {
    if (onBack) {
      onBack();
    } else if (navigation?.canGoBack()) {
      navigation?.goBack();
    }
  };

  const titleBlock =
    leftContent || headerComponent || (
      <View style={{ flexShrink: 1 }}>
        {eyebrow ? (
          <Text intent="sm" style={{ color: theme.gray[500] }} weight="medium">
            {eyebrow}
          </Text>
        ) : null}
        <Text
          ellipsizeMode="tail"
          intent={canGoBack ? 'h2' : 'h1'}
          numberOfLines={1}
          style={{ color: theme.black[700] }}
          weight={canGoBack ? 'bold' : 'extrabold'}
        >
          {headerTitle ?? ''}
        </Text>
      </View>
    );

  return (
    <View
      className="min-h-[64px] justify-center"
      style={[{ backgroundColor: headerBg }, style]}
    >
      <View
        className="flex-row items-center justify-between"
        style={globalStyles.screen_gutter}
      >
        <View className="flex-1 flex-row items-center gap-x-3">
          {canGoBack ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleBackPress}
              style={circleButtonStyle}
            >
              <Icon
                color={iconColor ?? theme.black[600]}
                name="arrow-left"
                size={22}
              />
            </TouchableOpacity>
          ) : null}
          {titleBlock}
        </View>

        {showRightContent ? (
          <View className="flex-row items-center gap-x-3">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={notificationHandler.onOpen}
              style={circleButtonStyle}
            >
              <MessageSquareIcon color={theme.black[600]} size={20} />
              {typeof totalUnread === 'number' ? (
                <View style={[styles.badge, { borderColor: theme.white[200] }]}>
                  <Text
                    style={{ color: '#fff', fontSize: 10, lineHeight: 14 }}
                    weight="bold"
                  >
                    {totalUnread}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={cartHandler.onOpen}
              style={circleButtonStyle}
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
  circle_button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAECF0',
    shadowColor: '#101828',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: -3,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: '#F04438',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});

export default remapProps(Header, {
  className: 'style',
});
