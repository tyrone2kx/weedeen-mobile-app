import EmptyState from '@wd/components/EmptyState/EmptyState';
import Header from '@wd/components/Header';
import InfiniteScrollView from '@wd/components/InfiniteScrollView/InfiniteScrollView';
import Loader from '@wd/components/Loader/Loader';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Select from '@wd/components/Select/Select';
import StatCard from '@wd/components/StatCard/StatCard';
import Text from '@wd/components/Text/Text';
import { SOSAlert } from '@wd/generated';
import { RoutesEnum } from '@wd/navigation/enum';
import { EmergenciesStackScreenProps } from '@wd/navigation/types';
import { globalStyles } from '@wd/utils/GlobalStyles';
import { enumToOptions } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import { EmergencyTypeEnum, SOSStatusEnum } from '@wd/utils/types';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import { AlertTriangleIcon, ShieldAlertIcon } from 'lucide-react-native';
import { FC, useState } from 'react';
import { RefreshControl, TouchableOpacity, View } from 'react-native';
import EmergencyItem from './components/EmergencyItem';
import useGetEmergencies from './hooks/useGetEmergencies';
import useGetEmergencyStatistics from './hooks/useGetEmergencyStatistics';
import CreateEmergencyModal from './modals/CreateEmergencyModal';
import EmergencyResolutionModal from './modals/EmergencyResolutionModal';
import ViewEmergencyModal from './modals/ViewEmergencyModal';

const EmergenciesScreen: FC<
  EmergenciesStackScreenProps<RoutesEnum.EMERGENCIES_SCREEN>
> = ({ navigation }) => {
  const { theme } = useTheme();
  const { stats, isLoadingStats } = useGetEmergencyStatistics();
  const {
    status,
    setStatus,
    emergencyType,
    setEmergencyType,
    isLoading,
    emergencies,
    infiniteScrollCallback,
    refetch,
    isRefreshing,
    callback,
  } = useGetEmergencies({ includeRelations: true });

  const createHandler = useDisclosure();
  const viewHandler = useDisclosure();
  const resolveHandler = useDisclosure();
  const [activeEmergency, setActiveEmergency] = useState<SOSAlert | undefined>(
    undefined,
  );

  const onView = (alert: SOSAlert) => {
    setActiveEmergency(alert);
    viewHandler.onOpen();
  };

  const onResolve = (alert: SOSAlert) => {
    setActiveEmergency(alert);
    resolveHandler.onOpen();
  };

  return (
    <>
      <SafeAreaComponent
        statusBarProps={{ backgroundColor: theme.white[400] }}
      />
      <Header
        canGoBack
        headerTitle="Emergencies"
        navigation={navigation}
        showRightContent={false}
        transparent={false}
      />
      <View className="relative px-4" style={globalStyles.screen}>
        <InfiniteScrollView
          callback={infiniteScrollCallback}
          fetching={isLoading}
          refreshControl={
            <RefreshControl
              colors={[theme.blue.DEFAULT]}
              onRefresh={refetch}
              progressBackgroundColor={theme.gray[150]}
              refreshing={isRefreshing}
            />
          }
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          {/* SOS hero — raises a new emergency alert. */}
          <View className="mt-4 items-center">
            <View className="items-center justify-center">
              <View
                style={{
                  position: 'absolute',
                  width: 180,
                  height: 180,
                  borderRadius: 90,
                  backgroundColor: 'rgba(217,45,32,0.08)',
                }}
              />
              <TouchableOpacity
                activeOpacity={0.85}
                className="items-center justify-center rounded-full"
                onPress={createHandler.onOpen}
                style={{
                  width: 130,
                  height: 130,
                  backgroundColor: theme.red.DEFAULT,
                  shadowColor: theme.red.DEFAULT,
                  shadowOpacity: 0.4,
                  shadowRadius: 24,
                  shadowOffset: { width: 0, height: 12 },
                  elevation: 8,
                }}
              >
                <ShieldAlertIcon color="#fff" size={40} />
                <Text
                  intent="h3"
                  style={{ color: '#fff', marginTop: 4 }}
                  weight="extrabold"
                >
                  SOS
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              className="mt-4 max-w-80 text-center"
              intent="sm"
              style={{ color: theme.gray[500] }}
            >
              Tap SOS to raise an emergency alert with your location. Only use
              in a genuine emergency.
            </Text>
          </View>

          <View className="mt-6 flex-row gap-2">
            <StatCard
              accent={stats?.pendingAlerts ? 'red' : 'blue'}
              className="flex-1"
              icon={<AlertTriangleIcon color={theme.blue.DEFAULT} size={28} />}
              isLoading={isLoadingStats}
              title="Ongoing Emergencies"
              value={stats?.pendingAlerts || 0}
            />
            <StatCard
              className="flex-1"
              icon={<AlertTriangleIcon color={theme.blue.DEFAULT} size={28} />}
              isLoading={isLoadingStats}
              title="Total Alerts"
              value={stats?.totalAlerts || 0}
            />
          </View>

          <View className="mt-5 flex-row gap-2">
            <View className="flex-1">
              <Select
                onChange={setStatus}
                options={enumToOptions(SOSStatusEnum)}
                placeholder="Filter by status"
                value={status}
              />
            </View>
            <View className="flex-1">
              <Select
                onChange={setEmergencyType}
                options={enumToOptions(EmergencyTypeEnum)}
                placeholder="Filter by type"
                value={emergencyType}
              />
            </View>
          </View>

          <Text className="mb-3 mt-6" intent="h4" weight="bold">
            Your Alerts
          </Text>

          {isLoading ? (
            <Loader style={{ marginVertical: '20%' }} />
          ) : !emergencies.length ? (
            <EmptyState
              description="You have not raised any emergency alerts yet."
              icon={<AlertTriangleIcon color="#fff" size={40} />}
              section
              title="No Emergencies"
            />
          ) : (
            <View style={{ flex: 1 }}>
              {emergencies.map((item, index) => (
                <EmergencyItem
                  item={item}
                  key={`${item.id || ''}${index}`}
                  onResolve={onResolve}
                  onView={onView}
                />
              ))}
            </View>
          )}
        </InfiniteScrollView>
      </View>

      <CreateEmergencyModal
        callback={callback}
        isOpen={createHandler.isOpen}
        onClose={createHandler.onClose}
      />

      {activeEmergency ? (
        <ViewEmergencyModal
          emergency={activeEmergency}
          isOpen={viewHandler.isOpen}
          onClose={() => {
            viewHandler.onClose();
            setActiveEmergency(undefined);
          }}
        />
      ) : null}

      <EmergencyResolutionModal
        callback={callback}
        emergency={activeEmergency}
        isOpen={resolveHandler.isOpen}
        onClose={() => {
          resolveHandler.onClose();
          setActiveEmergency(undefined);
        }}
      />
    </>
  );
};

export default EmergenciesScreen;
