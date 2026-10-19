import EmptyState from '@wd/components/EmptyState/EmptyState';
import Header from '@wd/components/Header';
import Loader from '@wd/components/Loader/Loader';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Text from '@wd/components/Text/Text';
import { Utility } from '@wd/generated';
import { RoutesEnum } from '@wd/navigation/enum';
import { UtilitiesStackScreenProps } from '@wd/navigation/types';
import { globalStyles } from '@wd/utils/GlobalStyles';
import useTheme from '@wd/utils/theme/useTheme';
import {
  ChevronRightIcon,
  DropletIcon,
  WrenchIcon,
  ZapIcon,
} from 'lucide-react-native';
import { FC } from 'react';
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import useGetUtilities from './hooks/useGetUtilities';

const UtilitiesScreen: FC<
  UtilitiesStackScreenProps<RoutesEnum.UTILITIES_SCREEN>
> = ({ navigation }) => {
  const { isLoading, utilities, refetch, isRefetching } = useGetUtilities();
  const { theme } = useTheme();
  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: theme.white[400],
        }}
      />
      <Header
        canGoBack
        headerTitle="Utilities"
        navigation={navigation}
        transparent={false}
      />
      <View className="p-4 relative" style={globalStyles.screen}>
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={[theme.blue.DEFAULT]}
              onRefresh={refetch}
              progressBackgroundColor={theme.gray[150]}
              refreshing={isRefetching}
            />
          }
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          {isLoading ? (
            <Loader style={{ marginVertical: '50%' }} />
          ) : !utilities?.length ? (
            <EmptyState
              className="h-full"
              description="No utilities available at the moment."
              icon={<WrenchIcon size={34} />}
              title="No Utility"
            />
          ) : (
            <View style={{ flex: 1, marginTop: 20 }}>
              {utilities.map(utility => (
                <UtilityItem
                  item={utility}
                  key={utility.id}
                  onPress={() => {
                    navigation.navigate(RoutesEnum.UTILITY_PROFILE_SCREEN, {
                      id: utility.id,
                    });
                  }}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const UtilityItem = ({
  item,
  onPress,
}: {
  item: Utility;
  onPress: () => void;
}) => {
  const { theme } = useTheme();
  const name = (item.name || '').toLowerCase();
  const Icon = name.includes('water')
    ? DropletIcon
    : name.includes('electric') || name.includes('power')
      ? ZapIcon
      : WrenchIcon;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className="mb-3 flex-row items-center gap-3 rounded-2xl bg-white p-4"
      onPress={onPress}
      style={{
        borderWidth: 1,
        backgroundColor: theme.white.DEFAULT, borderColor: theme.gray[200],
        shadowColor: '#101828',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
      }}
    >
      <View
        className="items-center justify-center rounded-xl"
        style={{ width: 44, height: 44, backgroundColor: theme.blue[300] }}
      >
        <Icon color={theme.blue.DEFAULT} size={22} />
      </View>
      <View style={{ flex: 1 }}>
        <Text intent="md" weight="bold">
          {item.name}
        </Text>
        <Text intent="sm" numberOfLines={2} style={{ color: theme.gray[500] }}>
          {item.description}
        </Text>
      </View>
      <ChevronRightIcon color={theme.gray[400]} size={20} />
    </TouchableOpacity>
  );
};

export default UtilitiesScreen;
