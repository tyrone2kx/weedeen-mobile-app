import Header from '@wd/components/Header';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Text from '@wd/components/Text/Text';
import { RoutesEnum } from '@wd/navigation/enum';
import { MenuStackScreenProps } from '@wd/navigation/types';
import { globalStyles } from '@wd/utils/GlobalStyles';
import useTheme from '@wd/utils/theme/useTheme';
import { PhoneCallIcon, ShieldAlertIcon } from 'lucide-react-native';
import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';

const EmergenciesScreen: FC<
  MenuStackScreenProps<RoutesEnum.EMERGENCIES_SCREEN>
> = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <>
      <SafeAreaComponent statusBarProps={{ backgroundColor: theme.white[400] }} />
      <Header
        canGoBack
        headerTitle="Emergencies"
        navigation={navigation}
        showRightContent={false}
        transparent={false}
      />
      <View
        className="items-center justify-center px-6"
        style={globalStyles.screen}
      >
        <View className="items-center">
          {/* SOS button */}
          <View className="items-center justify-center">
            <View
              style={{
                position: 'absolute',
                width: 240,
                height: 240,
                borderRadius: 120,
                backgroundColor: 'rgba(217,45,32,0.08)',
              }}
            />
            <View
              style={{
                position: 'absolute',
                width: 190,
                height: 190,
                borderRadius: 95,
                backgroundColor: 'rgba(217,45,32,0.12)',
              }}
            />
            <TouchableOpacity
              activeOpacity={0.85}
              className="items-center justify-center rounded-full"
              style={{
                width: 150,
                height: 150,
                backgroundColor: theme.red.DEFAULT,
                shadowColor: theme.red.DEFAULT,
                shadowOpacity: 0.4,
                shadowRadius: 24,
                shadowOffset: { width: 0, height: 12 },
                elevation: 8,
              }}
            >
              <ShieldAlertIcon color="#fff" size={44} />
              <Text intent="h3" style={{ color: '#fff', marginTop: 6 }} weight="extrabold">
                SOS
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="mt-10 text-center" intent="h3" weight="bold">
            Need help now?
          </Text>
          <Text
            className="mt-2 max-w-80 text-center"
            intent="sm"
            style={{ color: theme.gray[500] }}
          >
            Tap SOS to instantly alert estate security with your location. Only
            use in a genuine emergency.
          </Text>

          <TouchableOpacity
            activeOpacity={0.85}
            className="mt-8 flex-row items-center gap-2 rounded-full px-6 py-3.5"
            style={{ borderWidth: 1.5, borderColor: theme.blue.DEFAULT }}
          >
            <PhoneCallIcon color={theme.blue.DEFAULT} size={18} />
            <Text intent="sm" style={{ color: theme.blue.DEFAULT }} weight="semibold">
              Call estate security
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default EmergenciesScreen;
