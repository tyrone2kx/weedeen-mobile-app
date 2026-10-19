import { useNavigation } from '@react-navigation/native';
import Button from '@wd/components/Button/Button';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Text from '@wd/components/Text/Text';
import { RoutesEnum } from '@wd/navigation/enum';
import { AuthStackScreenProps } from '@wd/navigation/types';
import { globalStyles } from '@wd/utils/GlobalStyles';
import { Theme } from '@wd/utils/Theme';
import usePreventExit from '@wd/utils/usePreventExit/usePreventExit';
import {
  BellIcon,
  HomeIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  StoreIcon,
  TicketIcon,
} from 'lucide-react-native';
import React, { FC, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';

const { width } = Dimensions.get('screen');

type Slide = {
  id: string;
  Icon: FC<{ color?: string; size?: number }>;
  pill: string;
  dot: string;
  title: string;
  subtitle: string;
};

const slides: Slide[] = [
  {
    id: '1',
    Icon: HomeIcon,
    pill: 'Estate secured',
    dot: Theme.colors.green.DEFAULT,
    title: 'Your Estate, Your Control',
    subtitle:
      'Manage everything from visitors to shopping and deliveries, all in one secure app',
  },
  {
    id: '2',
    Icon: ShieldCheckIcon,
    pill: 'SOS sent to security',
    dot: Theme.colors.red.DEFAULT,
    title: 'Safety at Your Fingertips',
    subtitle: 'Instant SOS alerts directly to estate security when you need help',
  },
  {
    id: '3',
    Icon: TicketIcon,
    pill: '401347',
    dot: Theme.colors.blue.DEFAULT,
    title: 'Seamless Visitor Access',
    subtitle: 'Generate digital passes for guests with a tap, no more paper hassle',
  },
  {
    id: '4',
    Icon: ShoppingBagIcon,
    pill: 'Out for delivery',
    dot: Theme.colors.blue.DEFAULT,
    title: 'Shop Local, Get Delivered',
    subtitle: 'Order from estate stores and track delivery right to your doorstep',
  },
  {
    id: '5',
    Icon: StoreIcon,
    pill: 'Store live',
    dot: Theme.colors.green.DEFAULT,
    title: 'Start Your Estate Store',
    subtitle: 'Turn your passion into profit by selling to your neighbors',
  },
  {
    id: '6',
    Icon: BellIcon,
    pill: 'New announcement',
    dot: Theme.colors.blue.DEFAULT,
    title: 'Stay in the Loop',
    subtitle:
      'Receive important estate announcements and community updates instantly',
  },
];

const Ring = ({ size }: { size: number }) => (
  <View
    style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 1,
      borderColor: 'rgba(37,99,235,0.12)',
    }}
  />
);

const Wordmark = () => (
  <View className="mb-6 flex-row items-center gap-2">
    <View
      className="items-center justify-center rounded-xl"
      style={{ width: 32, height: 32, backgroundColor: Theme.colors.blue.DEFAULT }}
    >
      <HomeIcon color="#fff" size={18} />
    </View>
    <Text intent="h3" style={{ color: Theme.colors.blue.DEFAULT }} weight="extrabold">
      Weedeen
    </Text>
  </View>
);

const Hero: FC<{ slide: Slide }> = ({ slide }) => {
  const { Icon } = slide;
  return (
    <View
      className="mt-4 items-center justify-center rounded-[2rem]"
      style={{ height: 320, backgroundColor: Theme.colors.blue[300] }}
    >
      {/* concentric rings */}
      <Ring size={300} />
      <Ring size={220} />
      {/* soft glow */}
      <View
        style={{
          position: 'absolute',
          width: 150,
          height: 150,
          borderRadius: 75,
          backgroundColor: '#D6E4FF',
        }}
      />
      {/* center tile */}
      <View
        className="items-center justify-center rounded-3xl"
        style={{
          width: 96,
          height: 96,
          backgroundColor: Theme.colors.blue.DEFAULT,
          shadowColor: Theme.colors.blue.DEFAULT,
          shadowOpacity: 0.35,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 12 },
          elevation: 8,
        }}
      >
        <Icon color="#fff" size={44} />
      </View>
      {/* floating pill */}
      <View
        className="absolute flex-row items-center gap-2 rounded-full bg-white px-3.5 py-2.5"
        style={{
          left: 16,
          bottom: 18,
          shadowColor: '#101828',
          shadowOpacity: 0.12,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 4,
        }}
      >
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: slide.dot }} />
        <Text intent="sm" weight="semibold">
          {slide.pill}
        </Text>
      </View>
    </View>
  );
};

const SlideView: FC<{ slide: Slide }> = ({ slide }) => (
  <View style={{ width }} className="flex-auto px-6">
    <Hero slide={slide} />
    <View className="mt-10 items-center">
      <Wordmark />
      <Text className="mb-3 max-w-80 text-center" intent="h1">
        {slide.title}
      </Text>
      <Text
        className="max-w-80 text-center"
        intent="md"
        style={{ color: Theme.colors.gray[500] }}
      >
        {slide.subtitle}
      </Text>
    </View>
  </View>
);

const OnboardingScreen: FC<
  AuthStackScreenProps<RoutesEnum.ONBOARDING_SCREEN>
> = () => {
  usePreventExit();

  const navigation =
    useNavigation<
      AuthStackScreenProps<RoutesEnum.ONBOARDING_SCREEN>['navigation']
    >();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const updateCurrentSlideIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    setCurrentSlideIndex(Math.round(contentOffsetX / width));
  };

  return (
    <>
      <SafeAreaComponent
        statusBarProps={{ backgroundColor: Theme.colors.white.DEFAULT }}
      />
      <View
        style={{ ...globalStyles.screen, backgroundColor: Theme.colors.white.DEFAULT }}
      >
        <FlatList
          data={slides}
          horizontal
          keyExtractor={item => item.id}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          pagingEnabled
          renderItem={({ item }) => <SlideView slide={item} />}
          showsHorizontalScrollIndicator={false}
          style={globalStyles.flexAuto}
        />
        <View className="px-6 pb-8">
          <View className="mb-8 flex-row justify-center">
            {slides.map((slide, index) => (
              <View
                className="mx-1 h-[8px] rounded-full"
                key={slide.id}
                style={{
                  width: currentSlideIndex === index ? 24 : 8,
                  backgroundColor:
                    currentSlideIndex === index
                      ? Theme.colors.blue.DEFAULT
                      : Theme.colors.gray[300],
                }}
              />
            ))}
          </View>

          <View className="flex-row gap-4">
            <View style={{ flex: 1 }}>
              <Button
                label="Sign Up"
                light
                onPress={() => navigation.navigate(RoutesEnum.REGISTER_SCREEN)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                label="Login"
                onPress={() => navigation.navigate(RoutesEnum.LOGIN_SCREEN)}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default OnboardingScreen;
