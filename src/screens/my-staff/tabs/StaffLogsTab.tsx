import EmptyState from '@wd/components/EmptyState/EmptyState';
import DatePicker from '@wd/components/DatePicker/DatePicker';
import InfiniteScrollView from '@wd/components/InfiniteScrollView/InfiniteScrollView';
import Input from '@wd/components/Input/Input';
import Loader from '@wd/components/Loader/Loader';
import { Table, TD, THead, TRow } from '@wd/components/SimpleTable';
import Tag from '@wd/components/Tag/Tag';
import { Staff } from '@wd/generated';
import useTheme from '@wd/utils/theme/useTheme';
import { ContactIcon, SearchIcon } from 'lucide-react-native';
import moment from 'moment';
import { RefreshControl, View } from 'react-native';
import useGetStaffLogs from '../hooks/useGetStaffLogs';

interface Props {
  staff: Staff;
}

const StaffLogsTab = ({ staff }: Props) => {
  const { theme } = useTheme();
  const {
    searchText,
    setSearchText,
    limit,
    page,
    logs,
    totalElements,
    isLoading,
    setEndDate,
    setStartDate,
    startDate,
    endDate,
    infiniteScrollCallback,
    refetch,
    isRefreshing,
  } = useGetStaffLogs({ staffId: staff.id });

  return (
    <View className="flex-1">
      <View className="mt-4 gap-2">
        <Input
          IconLeft={<SearchIcon color={theme.black[600]} size={18} />}
          onChange={setSearchText}
          placeholder="Search by access code"
          value={searchText}
        />
        <DatePicker
          onChange={date => setStartDate(date ? date.toDate() : null)}
          placeholder="Filter by start date"
          value={startDate ? moment(startDate) : undefined}
        />
        <DatePicker
          onChange={date => setEndDate(date ? date.toDate() : null)}
          placeholder="Filter by end date"
          value={endDate ? moment(endDate) : undefined}
        />
      </View>

      <View className="mt-8 flex-1">
        {isLoading && page <= 1 ? (
          <Loader section />
        ) : totalElements === 0 ? (
          <EmptyState
            description="There are no logs for this staff member yet. Logs will appear here once there is activity."
            icon={<ContactIcon color={theme.white.DEFAULT} size={40} />}
            title="No Logs Found"
          />
        ) : (
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
            <Table>
              <THead>
                <TRow>
                  <TD textProps={{ weight: 'bold' }}>SN</TD>
                  <TD textProps={{ weight: 'bold' }}>Code Used</TD>
                  <TD textProps={{ weight: 'bold' }}>Arrival Time</TD>
                </TRow>
              </THead>

              {logs.map((log, index) => (
                <TRow
                  key={log.id}
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: theme.gray[200],
                  }}
                >
                  <TD textProps={{ weight: 'semibold' }}>
                    {index + 1 + (page - 1) * limit}
                  </TD>
                  <View className="flex-1 border-r border-r-gray-400 p-2 items-center justify-center">
                    <Tag color="#666" title={log.accessCode} />
                  </View>
                  <TD>
                    {moment(log.createdAt).format('Do MMM, YYYY, h:mm:ss a')}
                  </TD>
                </TRow>
              ))}
            </Table>
          </InfiniteScrollView>
        )}
      </View>
    </View>
  );
};

export default StaffLogsTab;
