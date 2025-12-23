import Accordion from '@wd/components/Accordion/Accordion';
import CloseButtonIcon from '@wd/components/Button/CloseButtonIcon';
import Circle from '@wd/components/Circle/Circle';
import ConfirmationModal from '@wd/components/ConfirmationModal/ConfirmationModal';
import DatePicker from '@wd/components/DatePicker/DatePicker';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import Header from '@wd/components/Header';
import InfiniteScrollView from '@wd/components/InfiniteScrollView/InfiniteScrollView';
import Input from '@wd/components/Input/Input';
import Loader from '@wd/components/Loader/Loader';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Select from '@wd/components/Select/Select';
import StatCard from '@wd/components/StatCard/StatCard';
import Text from '@wd/components/Text/Text';
import { VisitorAccess } from '@wd/generated';
import { RoutesEnum } from '@wd/navigation/enum';
import { VisitorsStackScreenProps } from '@wd/navigation/types';
import { globalStyles } from '@wd/utils/GlobalStyles';
import { Notify } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import {
  FilterIcon,
  SearchIcon,
  UserCircleIcon,
  UserIcon,
  UserPlusIcon,
} from 'lucide-react-native';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { RefreshControl, TouchableOpacity, View } from 'react-native';
import VisitorItem from './components/VisitorItem';
import useGetVisitors from './hooks/useGetVisitors';
import useGetVisitorsStatistics from './hooks/useGetVisitorsStatistics';
import useVisitorMutations from './hooks/useVisitorMutations';
import CreateInviteModal from './modals/CreateInviteModal';

const VisitorsScreen: FC<
  VisitorsStackScreenProps<RoutesEnum.VISITORS_SCREEN>
> = ({ navigation }) => {
  const { theme } = useTheme();
  const handler = useDisclosure();
  const {
    searchText,
    setSearchText,
    isLoading,
    status,
    setStatus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    visitors,
    infiniteScrollCallback,
    refetch,
    isRefreshing,
  } = useGetVisitors({ forUser: true });

  const { isLoading: statisticsLoading, statistics } = useGetVisitorsStatistics(
    {
      forUser: true,
      startDate,
      endDate,
    },
  );

  const filterHandler = useDisclosure();

  const [activeVisitor, setActiveVisitor] = useState<VisitorAccess | null>(
    null,
  );
  const deleteHandler = useDisclosure();

  const onDeleteVisitor = (visitor: VisitorAccess) => {
    if (visitor.accessCodeUsed) {
      Notify({
        type: 'error',
        message: 'Cannot delete a used visitor access code.',
      });
      return;
    }
    setActiveVisitor(visitor);
    deleteHandler.onOpen();
  };

  const onEditVisitor = (visitor: VisitorAccess) => {
    if (visitor.accessCodeUsed) {
      Notify({
        type: 'error',
        message: 'Cannot edit a used visitor access code.',
      });
      return;
    }
    setActiveVisitor(visitor);
    handler.onOpen();
  };

  const { deleteAccess, isDeleting } = useVisitorMutations();

  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: theme.white[400],
        }}
      />
      <View className="p-4 relative" style={globalStyles.screen}>
        <Header headerTitle="My Visitors" navigation={navigation} />
        <View className="flex-row gap-2 justify-between">
          <StatCard
            className="flex-1"
            icon={<UserIcon color={theme.blue.DEFAULT} size={40} />}
            isLoading={statisticsLoading}
            title="Total Visitors"
            value={statistics?.totalVisitors}
          />
          <StatCard
            className="flex-1"
            icon={<UserPlusIcon color={theme.blue.DEFAULT} size={40} />}
            isLoading={statisticsLoading}
            title="Incoming Visitors"
            value={statistics?.totalExpectantVisitors}
          />
        </View>

        <View className="mt-8 flex gap-2 flex-wrap justify-between items-center">
          <View className=" gap-2 w-full md:w-auto">
            <Input
              className="w-full md:w-[200px]"
              Icon={
                <TouchableOpacity onPress={filterHandler.toggle}>
                  <FilterIcon color={theme.black[600]} size={18} />
                </TouchableOpacity>
              }
              IconLeft={<SearchIcon />}
              onChange={e => setSearchText(e)}
              placeholder="Seach by guest name"
              value={searchText}
            />
            <Accordion handler={filterHandler} title="Select filters">
              <View className="flex-row justify-between items-center">
                <Text className="mb-4" intent="h4">
                  Advanced Filters
                </Text>

                <CloseButtonIcon onPress={filterHandler.onClose} />
              </View>
              <View className="flex flex-col md:flex-row gap-1 md:items-center w-full md:w-auto">
                <Select
                  className="min-w-[200px]"
                  onChange={setStatus}
                  options={[
                    { label: 'Expecting', value: false },
                    { label: 'Visit Complete', value: true },
                  ]}
                  placeholder="Filter by status"
                  value={status}
                />
                <DatePicker
                  onChange={setStartDate}
                  placeholder="Filter by start date"
                  value={startDate ? moment(startDate) : undefined}
                />
                <DatePicker
                  onChange={setEndDate}
                  placeholder="Filter by end date"
                  value={endDate ? moment(endDate) : undefined}
                />
              </View>
            </Accordion>
          </View>
        </View>

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
          {isLoading ? (
            <Loader style={{ marginVertical: '50%' }} />
          ) : !visitors.length ? (
            <EmptyState
              description="There are no visitors."
              icon={<UserCircleIcon size={40} />}
              section
              title="No Visitors"
            />
          ) : (
            <View style={{ flex: 1, marginTop: 20 }}>
              {visitors.map((item, index) => (
                <VisitorItem
                  key={`${item.id || ''}${index}`}
                  onDelete={() => onDeleteVisitor(item)}
                  onEdit={() => onEditVisitor(item)}
                  visitor={item}
                />
              ))}
            </View>
          )}
        </InfiniteScrollView>
      </View>

      <Circle
        className="absolute right-6 bottom-6 elevation-md"
        color={theme.blue.DEFAULT}
        onPress={handler.onOpen}
        size={70}
      >
        <UserPlusIcon color={theme.white.DEFAULT} />
      </Circle>

      <CreateInviteModal
        isOpen={handler.isOpen}
        onClose={handler.onClose}
        visitor={activeVisitor || undefined}
      />
      <ConfirmationModal
        description={`You are about to delete the visitor access code generated for ${activeVisitor?.visitorName}. This action is irreversible.`}
        enforceMinHeight={false}
        isLoading={isDeleting}
        isOpen={deleteHandler.isOpen}
        onClose={() => {
          deleteHandler.onClose();
          setActiveVisitor(null);
        }}
        onConfirm={() => {
          if (activeVisitor) {
            deleteAccess(activeVisitor.id, {
              onSuccess: () => {
                setActiveVisitor(null);
                deleteHandler.onClose();
              },
            });
          }
        }}
        title="Delete Visitor Access"
      />
    </>
  );
};

export default VisitorsScreen;
