import useTheme from '@wd/utils/theme/useTheme';
import { FileX2Icon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { IMGView, PDFView } from '../FileIconViews/IconViews';
import Text from '../Text/Text';

interface FileItemProps {
  title: string;
  files: Asset[];
  setFiles: React.Dispatch<React.SetStateAction<Asset[]>>;
  dontSwitchView?: boolean;
  onPress?: () => void;
}

export const UploadFileItem = ({
  files,
  setFiles,
  title,
  dontSwitchView,
  onPress,
}: FileItemProps) => {
  const onRemove = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const { theme } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <Text className="mb-2 text-sm font-semibold text-[#231F20]">{title}</Text>
      <View className="bg-[#F7FAFF] border-2 px-4 rounded-xl border-dashed border-[#D9E6FF] w-full flex-row py-2 gap-2 items-center mb-6">
        {files.length && !dontSwitchView ? (
          <View className="w-full flex flex-wrap py-2">
            {files.map((file, index) =>
              file?.type?.startsWith('image/') ? (
                <IMGView
                  file={file}
                  key={index}
                  onRemove={() => onRemove(index)}
                />
              ) : (
                <PDFView
                  file={file}
                  key={index}
                  onRemove={() => onRemove(index)}
                />
              ),
            )}
          </View>
        ) : (
          <>
            <FileX2Icon color={theme.blue.DEFAULT} size={40} />
            <View>
              <Text className="text-xs text-[#1569EC]">Click a file.</Text>
              <Text className="text-xs">Tap here to view your files.</Text>
            </View>
          </>
        )}
      </View>
    </Pressable>
  );
};
