import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import Avatar from '@wd/components/Avatar/Avatar';
import ConfirmationModal from '@wd/components/ConfirmationModal/ConfirmationModal';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import Header from '@wd/components/Header';
import Loader from '@wd/components/Loader/Loader';
import MenuComponent from '@wd/components/MenuComponent/MenuComponent';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Tag from '@wd/components/Tag/Tag';
import TopTab from '@wd/components/TopTab';
import { UserService } from '@wd/generated';
import { RoutesEnum } from '@wd/navigation/enum';
import { MyStaffStackScreenProps } from '@wd/navigation/types';
import { StatusMaps } from '@wd/utils/constants';
import { globalStyles } from '@wd/utils/GlobalStyles';
import { handleError } from '@wd/utils/helpers';
import { Theme } from '@wd/utils/Theme';
import useTheme from '@wd/utils/theme/useTheme';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import useCreateVisitorAccess from '../visitors/hooks/useCreateVisitorAccess';
import useStaffMutations from './hooks/useStaffMutations';
import CreateStaffModal from './modals/CreateStaffModal';
import StaffDetailsTab from './tabs/StaffDetailsTab';
import StaffLogsTab from './tabs/StaffLogsTab';

enum TabsEnum {
  DETAILS = 'Details',
  LOGS = 'Logs',
}

const StaffProfileScreen: FC<
  MyStaffStackScreenProps<RoutesEnum.STAFF_PROFILE_SCREEN>
> = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { id } = route.params;
  const editHandler = useDisclosure();
  const deactivateHandler = useDisclosure();
  const deleteHandler = useDisclosure();
  const generateCodeHandler = useDisclosure();

  const {
    data: staff,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['staff', id],
    queryFn: () =>
      apiWrapper(() => UserService.userControllerGetStaffById({ id: id })),
    enabled: !!id,
  });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  const { deleteController, createOrUpdateController } = useStaffMutations({
    staffId: staff?.id,
  });

  const controller = useCreateVisitorAccess();
  const status = staff?.isActive ? 'Active' : 'Deactivated';

  const [activeTab, setActiveTab] = useState<TabsEnum>(TabsEnum.DETAILS);
  const tabItems = [
    {
      label: TabsEnum.DETAILS,
      onPress: () => setActiveTab(TabsEnum.DETAILS),
    },
    {
      label: TabsEnum.LOGS,
      onPress: () => setActiveTab(TabsEnum.LOGS),
    },
  ];

  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: theme.white[400],
        }}
      />
      <Header
        canGoBack
        headerTitle={
          `${staff?.firstName} ${staff?.lastName}` || 'Staff Profile'
        }
        navigation={navigation}
        transparent={false}
      />
      <View className="p-4 relative" style={globalStyles.screen}>
        {isLoading ? (
          <Loader section />
        ) : !staff ? (
          <EmptyState
            className="h-full"
            description="An error occurred while fetching the staff member. Please refresh the page or contact support if the issue persists"
            title="An Error Occurred"
          />
        ) : (
          <View className="flex-1">
            <View className="flex-row justify-between py-4">
              <View className="flex-row gap-2">
                <Avatar image={staff.profilePicture} size={50} />

                <View className="flex-col gap-4 md:flex-row">
                  <View>
                    <Text className="font-semibold text-lg">{`${staff.firstName} ${staff.lastName}`}</Text>
                    <Text className="text-sm text-gray-600 max-w-md">
                      {staff.role}
                    </Text>
                  </View>
                  <View>
                    <Tag
                      color={
                        StatusMaps[status.toLowerCase()]?.color || '#6C6A6A'
                      }
                      title={StatusMaps[status.toLowerCase()]?.label || status}
                    />
                  </View>
                </View>
              </View>

              <View className="flex items-center gap-1">
                <MenuComponent
                  id={`staff-${staff.id}`}
                  menuList={[
                    {
                      label: 'Generate New Code',
                      onPress: generateCodeHandler.onOpen,
                    },
                    { label: 'Edit', onPress: editHandler.onOpen },
                    {
                      label: staff?.isActive ? 'Deactivate' : 'Activate',
                      onPress: deactivateHandler.onOpen,
                    },
                    { label: 'Delete', onPress: deleteHandler.onOpen },
                  ]}
                />
              </View>
            </View>

            <View className="flex-1">
              <TopTab
                activeTab={activeTab}
                buttonStyle="border-0"
                style={{ marginBottom: 10 }}
                tabs={tabItems}
              />

              {activeTab === TabsEnum.DETAILS && (
                <StaffDetailsTab staff={staff} />
              )}

              {activeTab === TabsEnum.LOGS && <StaffLogsTab staff={staff} />}
            </View>
          </View>
        )}
      </View>
      <CreateStaffModal
        isOpen={editHandler.isOpen}
        onClose={editHandler.onClose}
        staff={staff}
      />
      <ConfirmationModal
        buttonColor={staff?.isActive ? Theme.red : Theme.green}
        description={`Are you sure you want to ${staff?.isActive ? 'deactivate' : 'activate'} this staff? This action can be reversed.`}
        isLoading={createOrUpdateController.isLoading}
        isOpen={deactivateHandler.isOpen}
        onClose={deactivateHandler.onClose}
        onConfirm={() =>
          void createOrUpdateController.createOrUpdateStaff(
            {
              firstName: staff?.firstName || '',
              lastName: staff?.lastName || '',
              email: staff?.email || '',
              phoneNumber: staff?.phoneNumber || '',
              isActive: !staff?.isActive,
              role: staff?.role || '',
              gender: staff?.gender,
              specialInstruction: staff?.specialInstruction || '',
            },
            [],
            deactivateHandler.onClose,
          )
        }
        title={`${staff?.isActive ? 'Deactivate' : 'Activate'} Staff`}
      />
      <ConfirmationModal
        description={`Are you sure you want to delete ${staff?.firstName} ${staff?.lastName}? This action cannot be reversed.`}
        isLoading={deleteController.isPending}
        isOpen={deleteHandler.isOpen}
        onClose={deleteHandler.onClose}
        onConfirm={() =>
          deleteController.mutate(staff?.id || '', {
            onSuccess: deleteHandler.onClose,
          })
        }
        title={`Delete Staff`}
      />

      <ConfirmationModal
        buttonColor={Theme.primary}
        description={`Are you sure you want to generate a new access code for ${staff?.firstName} ${staff?.lastName}? This will invalidate the old access code and generate a new one.`}
        isLoading={controller.isPending}
        isOpen={generateCodeHandler.isOpen}
        onClose={generateCodeHandler.onClose}
        onConfirm={() => {
          controller.mutate(
            {
              staffId: staff?.id,
              visitorName: `${staff?.firstName} ${staff?.lastName}`,
              visitorPhone: staff?.phoneNumber || '',
              visitorType: 'staff',
              purposeOfVisit: 'Staff Access',
              accessCodeExpiry: moment().add(1, 'month').toISOString(), // 1 month expiry
            },
            {
              onSuccess: () => {
                refetch();
                generateCodeHandler.onClose();
              },
            },
          );
        }}
        title={`Generate New Access Code`}
      />
    </>
  );
};

export default StaffProfileScreen;
