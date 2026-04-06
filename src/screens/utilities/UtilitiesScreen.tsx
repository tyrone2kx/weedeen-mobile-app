import EmptyState from '@wd/components/EmptyState/EmptyState';
import Header from '@wd/components/Header';
import Loader from '@wd/components/Loader/Loader';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import { Utility } from '@wd/generated';
import { RoutesEnum } from '@wd/navigation/enum';
import { UtilitiesStackScreenProps } from '@wd/navigation/types';
import { globalStyles } from '@wd/utils/GlobalStyles';
import useTheme from '@wd/utils/theme/useTheme';
import { WrenchIcon } from 'lucide-react-native';
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
              icon={<WrenchIcon color="#fff" size={32} />}
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
  return (
    <TouchableOpacity
      className="p-4 rounded-lg border border-l-8 border-l-blue-500 hover:border-l-green-500 hover:shadow-md w-[350px] max-w-full cursor-pointer transition-all"
      onPress={onPress}
    >
      <h3 className="text-lg font-medium mb-2">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>
    </TouchableOpacity>
  );
};

export default UtilitiesScreen;
