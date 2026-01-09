import {
  getFileExtension,
  getFileNameWithoutExtension,
  resolveFileExtension,
} from '@wd/utils/helpers';
import { FileImageIcon, VideoIcon } from 'lucide-react-native';
import { Image, Pressable, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';

export const PDFView = ({
  file,
  onRemove,
  url,
  isVideo = false,
}: {
  file?: Asset;
  url?: string;
  onRemove?: () => void;
  isVideo?: boolean;
}) => {
  return (
    <View className="flex-row bg-white space-x-2 w-[220px] border border-[#E9ECEF] p-2 rounded-xl relative m-1">
      <View className="h-[40px] w-[40px] rounded-lg bg-[#FF5688] flex items-center justify-center ">
        {isVideo ? (
          <VideoIcon color="white" size={16} />
        ) : (
          <FileImageIcon color="white" />
        )}
      </View>
      <View className="flex-1 max-w-[158px]">
        <Text className="font-semibold text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
          {file ? file?.fileName : getFileNameWithoutExtension(url || '')}
        </Text>
        <Text className="uppercase text-sm text-[#868E96] ">
          {file
            ? resolveFileExtension(file?.type)
            : getFileExtension(url || '')}
        </Text>
      </View>
      {onRemove && (
        <View className="h-4 w-4 flex-row items-center justify-center p-[2px] bg-black rounded-full absolute -right-1 -top-2">
          <Pressable onPress={onRemove}>
            <Icon color="white" name="cross-2" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export const IMGView = ({
  file,
  onRemove,
  url,
}: {
  file?: Asset;
  url?: string;
  onRemove?: () => void;
}) => {
  return (
    <View className="flex-row bg-white relative space-x-2 h-[60px] w-[60px] rounded-xl m-1">
      <Image className="h-full w-full rounded-xl" src={file ? file.uri : url} />
      {onRemove && (
        <View className="h-4 w-4 flex-row items-center justify-center p-[2px] bg-black rounded-full absolute -right-1 -top-2">
          <Pressable onPress={onRemove}>
            <Icon color="white" name="cross-2" />
          </Pressable>
        </View>
      )}
    </View>
  );
};
