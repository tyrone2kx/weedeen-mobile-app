import Avatar from '@wd/components/Avatar/Avatar';
import Button from '@wd/components/Button/Button';
import CustomModal from '@wd/components/CustomModal/CustomModal';
import DetailItem from '@wd/components/DetailItem/DetailItem';
import Text from '@wd/components/Text/Text';
import { SOSAlert } from '@wd/generated';
import useTheme from '@wd/utils/theme/useTheme';
import moment from 'moment';
import { FileAudioIcon, MapIcon, VideoIcon } from 'lucide-react-native';
import { Image, Linking, View } from 'react-native';

interface Props {
  emergency: SOSAlert;
  isOpen: boolean;
  onClose: () => void;
}

const ViewEmergencyModal = ({ emergency, isOpen, onClose }: Props) => {
  const { theme } = useTheme();
  const hasLocation = !!emergency?.latitude && !!emergency?.longitude;

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="SOS Alert">
      <View className="gap-1">
        <DetailItem
          description={(emergency?.emergencyType || '').replaceAll('_', ' ')}
          title="Type Of Emergency"
        />
        <DetailItem description={emergency?.subject} title="Subject" />
        <DetailItem
          description={emergency?.description || 'Not provided'}
          title="Description"
        />
        <DetailItem description={emergency?.status} title="Status" />
        {emergency?.isGeneralEmergency ? (
          <DetailItem
            description="This is a general SOS Alert"
            title="General Emergency"
          />
        ) : null}
        {emergency?.locationDescription ? (
          <DetailItem
            description={emergency.locationDescription}
            title="Location Description"
          />
        ) : null}

        {hasLocation ? (
          <View className="px-4 py-2">
            <Text className="text-xs font-semibold capitalize text-gray-600">
              Location
            </Text>
            <Text className="mb-2 text-sm font-bold text-gray-700">
              Lat: {emergency.latitude}, Long: {emergency.longitude}
            </Text>
            <Button
              IconLeft={<MapIcon color={theme.blue.DEFAULT} size={18} />}
              label="Get Directions"
              onPress={() =>
                Linking.openURL(
                  `https://www.google.com/maps/dir/?api=1&destination=${emergency.latitude},${emergency.longitude}`,
                )
              }
              pale
            />
          </View>
        ) : null}

        {emergency?.images?.length ? (
          <View className="px-4 py-2">
            <Text className="mb-2 text-xs font-semibold capitalize text-gray-600">
              Images
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {emergency.images.map((image, index) => (
                <Image
                  className="h-20 w-20 rounded-lg"
                  key={`${image}-${index}`}
                  source={{ uri: image }}
                />
              ))}
            </View>
          </View>
        ) : null}

        {emergency?.videoFiles?.length ? (
          <View className="px-4 py-2">
            <Text className="mb-2 text-xs font-semibold capitalize text-gray-600">
              Videos
            </Text>
            <View className="gap-2">
              {emergency.videoFiles.map((media, index) => (
                <Button
                  IconLeft={<VideoIcon color={theme.blue.DEFAULT} size={18} />}
                  key={`${media}-${index}`}
                  label={`Open video ${index + 1}`}
                  onPress={() => Linking.openURL(media)}
                  pale
                />
              ))}
            </View>
          </View>
        ) : null}

        {emergency?.audioFiles?.length ? (
          <View className="px-4 py-2">
            <Text className="mb-2 text-xs font-semibold capitalize text-gray-600">
              Audio
            </Text>
            <View className="gap-2">
              {emergency.audioFiles.map((media, index) => (
                <Button
                  IconLeft={
                    <FileAudioIcon color={theme.blue.DEFAULT} size={18} />
                  }
                  key={`${media}-${index}`}
                  label={`Open audio ${index + 1}`}
                  onPress={() => Linking.openURL(media)}
                  pale
                />
              ))}
            </View>
          </View>
        ) : null}

        {emergency?.status === 'resolved' ? (
          <>
            <DetailItem
              description={moment(emergency?.resolvedAt).format(
                'MMMM Do YYYY, h:mm a',
              )}
              title="Resolved At"
            />
            <DetailItem
              description={emergency?.resolutionDetails}
              title="Resolution Details"
            />
          </>
        ) : null}

        {emergency?.responses?.length ? (
          <View className="px-4 py-2">
            <Text className="mb-2 text-base font-semibold text-gray-800">
              Responses
            </Text>
            {emergency.responses.map(response => (
              <View
                className="mb-2 rounded-lg border border-gray-200 p-3"
                key={response.id}
              >
                <View className="mb-1 flex-row items-center gap-2">
                  <Avatar
                    name={`${response.responder?.firstName || ''} ${response.responder?.lastName || ''}`.trim()}
                    size={28}
                  />
                  <Text className="text-sm font-semibold text-gray-800">
                    {response.responder?.firstName} {response.responder?.lastName}
                  </Text>
                </View>
                <Text className="text-xs uppercase text-gray-500">
                  {(response.action || '').replaceAll('_', ' ')}
                </Text>
                {response.message ? (
                  <Text className="text-sm text-gray-700">
                    {response.message}
                  </Text>
                ) : null}
                <Text className="mt-1 text-xs text-gray-400">
                  {moment(response.createdAt).format('MMMM Do YYYY, h:mm a')}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        <View className="py-4">
          <Button label="Close" onPress={onClose} pale />
        </View>
      </View>
    </CustomModal>
  );
};

export default ViewEmergencyModal;
