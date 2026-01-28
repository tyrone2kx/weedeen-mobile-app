import { PlayCircleIcon } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
  url: string;
  onPress?: () => void;
}

const VideoThumbnail = ({ url, onPress }: Props) => {
  return (
    <TouchableOpacity className="w-[100] h-[100] relative" onPress={onPress}>
      <Image source={{ uri: url }} style={{ width: 100, height: 100 }} />
      <View className="absolute inset-0 items-center justify-center bg-black/30">
        <PlayCircleIcon color="white" size={40} />
      </View>
    </TouchableOpacity>
  );
};

export default VideoThumbnail;

const styles = StyleSheet.create({});
