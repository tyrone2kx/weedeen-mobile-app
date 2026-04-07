import DetailItem from '@wd/components/DetailItem/DetailItem';
import Tag from '@wd/components/Tag/Tag';
import { Staff } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { Theme } from '@wd/utils/Theme';
import useCopyToClipboard from '@wd/utils/useCopyToClipboard';
import { CopyIcon } from 'lucide-react-native';
import { View } from 'react-native';

interface Props {
  staff?: Staff;
}

const StaffDetailsTab = ({ staff }: Props) => {
  const accessCode = staff?.visitorAccess?.accessCode || '';
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const org = useAppSelector(state => state.user?.currentUser?.organization);
  return (
    <View className="flex-1 gap-4">
      <DetailItem description={staff?.firstName} title="First Name" />
      <DetailItem description={staff?.lastName} title="Last Name" />
      <DetailItem description={staff?.email} title="Email" />
      <DetailItem description={staff?.phoneNumber} title="Phone Number" />
      <DetailItem
        descriptionComponent={
          accessCode && (
            <div className="mt-2">
              {isCopied ? (
                <Tag color={Theme.green} title="Copied" />
              ) : (
                <Tag
                  color="#666"
                  icon={<CopyIcon className="inline mr-2" size={14} />}
                  onPress={() => {
                    const textToCopy = `Your access code to ${org?.name} is: ${accessCode}.`;
                    copyToClipboard(textToCopy);
                  }}
                  title={accessCode}
                />
              )}
            </div>
          )
        }
        title="Access Code"
      />
      <DetailItem description={staff?.role} title="Role" />
      <DetailItem description={staff?.gender} title="Gender" />
      <DetailItem
        description={staff?.specialInstruction}
        title="Special Instruction"
      />
    </View>
  );
};

export default StaffDetailsTab;
