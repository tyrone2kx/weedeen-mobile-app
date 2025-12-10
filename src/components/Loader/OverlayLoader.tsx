import { FC } from 'react';
import { View } from 'react-native';
import Loader from './Loader';

type OverlayLoaderProps = {
  isLoading?: boolean;
};

const OverlayLoader: FC<OverlayLoaderProps> = ({ isLoading }) => {
  return isLoading ? (
    <View className="absolute h-full w-full items-center justify-center bg-white/80">
      <View className="h-[120px] w-[120px] items-center justify-center rounded-xl bg-white">
        <Loader section />
      </View>
    </View>
  ) : null;
};

export default OverlayLoader;
