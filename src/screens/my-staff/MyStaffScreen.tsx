/* eslint-disable @typescript-eslint/no-shadow */
import Button from '@wd/components/Button/Button';
import ConfirmationModal from '@wd/components/ConfirmationModal/ConfirmationModal';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import Header from '@wd/components/Header';
import Loader from '@wd/components/Loader/Loader';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import StatCard from '@wd/components/StatCard/StatCard';
import { Staff } from '@wd/generated';
import { RoutesEnum } from '@wd/navigation/enum';
import { MyStaffStackScreenProps } from '@wd/navigation/types';
import { globalStyles } from '@wd/utils/GlobalStyles';
import { Theme } from '@wd/utils/Theme';
import useTheme from '@wd/utils/theme/useTheme';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import { Contact2Icon, UserIcon } from 'lucide-react-native';
import React, { FC, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import StaffItem from './components/StaffItem';
import useGetAllStaff from './hooks/useGetAllStaff';
import useStaffMutations from './hooks/useStaffMutations';
import CreateStaffModal from './modals/CreateStaffModal';

const MyStaffScreen: FC<
  MyStaffStackScreenProps<RoutesEnum.MY_STAFF_SCREEN>
> = ({ navigation }) => {
  const { isLoading, staff, isRefetching, refetch } = useGetAllStaff();
  const addHandler = useDisclosure();
  const deactivateHandler = useDisclosure();
  const deleteHandler = useDisclosure();

  const onView = (staff: Staff) => {
    navigation.navigate(RoutesEnum.STAFF_PROFILE_SCREEN, { id: staff.id });
  };

  const [activeStaff, setActiveStaff] = useState<Staff | null>(null);
  const { deleteController, createOrUpdateController } = useStaffMutations({
    staffId: activeStaff?.id,
  });

  const onEdit = (staff: Staff) => {
    setActiveStaff(staff);
    addHandler.onOpen();
  };

  const onDeactivate = (staff: Staff) => {
    setActiveStaff(staff);
    deactivateHandler.onOpen();
  };

  const onDelete = (staff: Staff) => {
    setActiveStaff(staff);
    deleteHandler.onOpen();
  };

  const onClose = () => {
    setActiveStaff(null);
    addHandler.onClose();
    deactivateHandler.onClose();
    deleteHandler.onClose();
  };

  const { theme } = useTheme();

  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: theme.white[400],
        }}
      />
      <Header headerTitle="My Staff" navigation={navigation} />
      <View className="p-4 relative" style={globalStyles.screen}>
        <View className="flex-row gap-2 justify-between">
          <StatCard
            className="flex-1"
            icon={<UserIcon color={theme.blue.DEFAULT} size={40} />}
            isLoading={isLoading}
            title="Total Staff"
            value={staff.length}
          />
        </View>

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
          ) : !staff.length ? (
            <EmptyState
              Action={<Button label="Add Staff" onPress={addHandler.onOpen} />}
              description="You have no staff. Click the button below to add a staff."
              icon={<Contact2Icon size={40} />}
              section
              title="No staff found."
            />
          ) : (
            <View style={{ flex: 1, marginTop: 20 }}>
              {staff.map((item, index) => (
                <StaffItem
                  key={`${item.id || ''}${index}`}
                  onDeactivate={() => onDeactivate(item)}
                  onDelete={() => onDelete(item)}
                  onEdit={() => onEdit(item)}
                  onView={() => onView(item)}
                  staff={item}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
      <CreateStaffModal
        isOpen={addHandler.isOpen}
        onClose={onClose}
        staff={activeStaff || undefined}
      />
      <ConfirmationModal
        buttonColor={activeStaff?.isActive ? Theme.red : Theme.green}
        description={`Are you sure you want to ${activeStaff?.isActive ? 'deactivate' : 'activate'} this staff? This action can be reversed.`}
        isLoading={createOrUpdateController.isLoading}
        isOpen={deactivateHandler.isOpen}
        onClose={onClose}
        onConfirm={() =>
          void createOrUpdateController.createOrUpdateStaff(
            {
              firstName: activeStaff?.firstName || '',
              lastName: activeStaff?.lastName || '',
              email: activeStaff?.email || '',
              phoneNumber: activeStaff?.phoneNumber || '',
              isActive: !activeStaff?.isActive,
              role: activeStaff?.role || '',
              gender: activeStaff?.gender,
              specialInstruction: activeStaff?.specialInstruction || '',
            },
            [],
            onClose,
          )
        }
        title={`${activeStaff?.isActive ? 'Deactivate' : 'Activate'} Staff`}
      />
      <ConfirmationModal
        description={`Are you sure you want to delete ${activeStaff?.firstName} ${activeStaff?.lastName}? This action cannot be reversed.`}
        isLoading={deleteController.isPending}
        isOpen={deleteHandler.isOpen}
        onClose={onClose}
        onConfirm={() =>
          deleteController.mutate(activeStaff?.id || '', { onSuccess: onClose })
        }
        title={`Delete Staff`}
      />
    </>
  );
};

export default MyStaffScreen;
