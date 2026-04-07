import CustomDatePicker from '@mh/components/custom-datepicker/CustomDatePicker';
import EmptyState from '@mh/components/empty-state/EmptyState';
import LoaderComponent from '@mh/components/loader/Loader';
import { PaginationComponent } from '@mh/components/pagination-component/PaginationComponent';
import { Staff } from '@mh/generated';
import Input from '@mh/ui/input/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@mh/ui/table';
import Tag from '@mh/ui/tags';
import { ContactIcon, SearchIcon } from 'lucide-react';
import moment from 'moment';
import useGetStaffLogs from '../hooks/useGetStaffLogs';

interface Props {
  staff: Staff;
}

const StaffLogsTab = ({ staff }: Props) => {
  const {
    searchText,
    setSearchText,
    limit,
    setLimit,
    page,
    setPage,
    logs,
    totalPages,
    totalElements,
    isLoading,
    setEndDate,
    setStartDate,
    startDate,
    endDate,
  } = useGetStaffLogs({ staffId: staff.id });
  return (
    <div>
      <section className="mt-4 flex gap-2 flex-wrap justify-between items-center">
        <div className="flex flex-col md:flex-row gap-2 md:items-center w-full md:w-auto">
          <Input
            className="w-full md:w-[200px]"
            placeholder="Search by access code"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            leftIcon={<SearchIcon />}
          />
          <CustomDatePicker
            placeholder="Filter by start date"
            value={startDate}
            onChange={setStartDate}
          />
          <CustomDatePicker
            placeholder="Filter by end date"
            value={endDate}
            onChange={setEndDate}
          />
        </div>
      </section>

      <section className="mt-8">
        {isLoading ? (
          <LoaderComponent isFullScreen />
        ) : totalElements === 0 ? (
          <EmptyState
            icon={<ContactIcon size={40} className="text-white" />}
            title="No Logs Found"
            description="There are no logs for this staff member yet. Logs will appear here once there is activity."
          />
        ) : (
          <>
            <Table>
              <TableHeader className="">
                <TableRow className="bg-[#F7FAFF] hover:bg-[#F7FAFF]">
                  <TableHead className="border">SN</TableHead>
                  <TableHead className="border">Code Used</TableHead>
                  <TableHead className="border">Arrival Time</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="text-[#6C6A6A]">
                {logs.map((log, index) => {
                  return (
                    <TableRow key={log.id}>
                      <TableCell className="border">
                        {/* factor in pagination  */}
                        <span className="font-semibold">{index + 1 + (page - 1) * limit}</span>
                      </TableCell>
                      <TableCell className="border">
                        <Tag hideBullet color="#666" className="cursor-pointer">
                          <div className="flex items-center">{log.accessCode}</div>
                        </Tag>
                      </TableCell>
                      <TableCell className="border">
                        {moment(log.createdAt).format('Do MMM, YYYY, h:mm:ss a')}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <PaginationComponent
              onLimitChange={(val) => {
                setLimit(val);
                setPage(1);
              }}
              onPageChange={setPage}
              totalPages={totalPages}
            />
          </>
        )}
      </section>
    </div>
  );
};

export default StaffLogsTab;
