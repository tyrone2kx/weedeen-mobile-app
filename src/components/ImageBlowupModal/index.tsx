import { Notify } from '@wd/utils/helpers';
import { Theme } from '@wd/utils/Theme';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';

import { Buffer } from 'buffer'; // Required for base64 encoding
import { FileSystem } from 'react-native-file-access';

import { X } from 'lucide-react-native';
import { VideoView, useVideoPlayer } from 'react-native-video';
import { WebView } from 'react-native-webview';
import Button from '../Button/Button';
import EmptyState from '../EmptyState/EmptyState';
import Icon from '../Icon/Icon';

interface IProps {
  blowUpIsOpen: boolean;
  resourceType: 'image' | 'pdf' | 'video';
  resourceUrl?: string;
  handleCloseBlowUp: () => void;
}

const isAndroid = Platform.OS === 'android';
const { height, width } = Dimensions.get('screen');

const ImageBlowupModal = ({
  resourceType,
  blowUpIsOpen,
  resourceUrl,
  handleCloseBlowUp,
}: IProps) => {
  const handleDownloadFile = async () => {
    if (!resourceUrl) return;

    try {
      const fileName = resourceUrl.split('/').pop() || 'file';
      const filePath = `${FileSystem.documentDirectory}/${fileName}`;

      Notify({ type: 'success', message: 'Downloading...' });

      // 1. Download
      const response = await fetch(resourceUrl);
      if (!response.ok) throw new Error('Failed to download file');

      // 2. Convert to base64
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const base64Data = Buffer.from(arrayBuffer).toString('base64');

      // 3. Save to device
      await FileSystem.writeFile(filePath, base64Data, 'base64');

      // (Optional) Copy to Downloads so user can see it
      if (isAndroid) {
        await FileSystem.cpExternal(filePath, fileName, 'downloads');
      }

      Notify({ type: 'success', message: 'File saved successfully' });
    } catch (err) {
      console.error('File download error:', err);
      Notify({ type: 'error', message: 'Download failed' });
    }
  };

  const player = useVideoPlayer(
    {
      uri: resourceUrl || '',
    },
    _player => {
      _player.play();
    },
  );

  return (
    <Modal
      animationType="slide"
      onRequestClose={handleCloseBlowUp}
      style={{ flex: 1 }}
      transparent
      visible={blowUpIsOpen}
    >
      <View className="flex-1 bg-[#000]/80">
        <View className="absolute right-2 top-10 z-10 flex-row items-center gap-3">
          <TouchableOpacity
            activeOpacity={0.8}
            className="h-12 w-12 items-center justify-center rounded-full bg-green-300"
            onPress={handleDownloadFile}
          >
            <Icon
              color={Theme.colors.green.DEFAULT}
              name="download"
              size={24}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            className="h-12 w-12 items-center justify-center rounded-full bg-red-300"
            onPress={handleCloseBlowUp}
          >
            <X color={Theme.colors.red.DEFAULT} size={24} />
          </TouchableOpacity>
        </View>

        {resourceUrl ? (
          <View className="flex-1 items-center justify-center">
            {resourceType === 'image' ? (
              <Image
                source={{ uri: resourceUrl }}
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
              />
            ) : resourceType === 'pdf' ? (
              <View className="mt-16 flex-1">
                <WebView
                  javaScriptEnabled
                  renderLoading={() => (
                    <ActivityIndicator color="black" size="small" />
                  )}
                  scalesPageToFit
                  source={{
                    uri: isAndroid
                      ? `https://docs.google.com/gview?embedded=true&url=${resourceUrl}`
                      : resourceUrl,
                  }}
                  startInLoadingState
                  style={{
                    flex: 1,
                    width,
                    height: height * 0.7,
                  }}
                />
              </View>
            ) : (
              <VideoView
                controls
                player={player}
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </View>
        ) : (
          <EmptyState
            Action={<Button label="Close" onPress={handleCloseBlowUp} />}
            description="Unable to load resource"
            title="Loading Failed"
          />
        )}
      </View>
    </Modal>
  );
};

export default ImageBlowupModal;
