import DetailItem from '@wd/components/DetailItem/DetailItem';
import { Utility } from '@wd/generated';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';

interface Props {
  utility: Utility;
}

const UtilityDetailsTab: React.FC<Props> = ({ utility }) => {
  return (
    <View className="flex-1 gap-4">
      <DetailItem description={utility?.name} title="Title" />
      <DetailItem description={`${utility?.amount}`} title="Price Per Unit" />
      <DetailItem
        description={utility?.isActive ? 'Active' : 'Inactive'}
        title="Status"
      />
      <DetailItem
        description={
          utility?.createdBy
            ? `${utility.createdBy.firstName} ${utility.createdBy.lastName}`
            : undefined
        }
        title="Created By"
      />
      <DetailItem
        description={moment(utility.createdAt).format('MMMM Do YYYY HH:mm a')}
        title="Created At"
      />
      <DetailItem
        description={utility?.description || 'No description provided'}
        title="Description"
      />
    </View>
  );
};

export default UtilityDetailsTab;
