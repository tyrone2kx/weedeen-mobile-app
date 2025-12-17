import { useNavigation } from '@react-navigation/native';
import Button from '@wd/components/Button/Button';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Text from '@wd/components/Text/Text';
import { RoutesEnum } from '@wd/navigation/enum';
import { AuthStackScreenProps } from '@wd/navigation/types';
import { globalStyles } from '@wd/utils/GlobalStyles';
import { Theme } from '@wd/utils/Theme';
import usePreventExit from '@wd/utils/usePreventExit/usePreventExit';
import React, { FC, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import { onboardingStyles } from './onboarding.styles';

const { width } = Dimensions.get('screen');

const slides = [
  {
    id: '1',
    image: require('@assets/images/onboarding_1.png'),
    title: 'Your Estate, Your Control',
    subtitle:
      'Manage everything from visitors to shopping and deliveries, all in one secure app',
  },
  {
    id: '2',
    image: require('@assets/images/onboarding_2.png'),
    title: 'Safety at Your Fingertips',
    subtitle:
      'Instant SOS alerts directly to estate security when you need help',
  },
  {
    id: '3',
    image: require('@assets/images/onboarding_3.png'),
    title: 'Seamless Visitor Access',
    subtitle:
      'Generate digital passes for guests with a tap, no more paper hassle',
  },
  {
    id: '4',
    image: require('@assets/images/onboarding_4.png'),
    title: 'Shop Local, Get Delivered',
    subtitle:
      'Order from estate stores and track delivery right to your doorstep',
  },
  {
    id: '5',
    image: require('@assets/images/onboarding_5.png'),
    title: 'Start Your Estate Store',
    subtitle: 'Turn your passion into profit by selling to your neighbors',
  },
  {
    id: '6',
    image: require('@assets/images/onboarding_6.png'),
    title: 'Stay in the Loop',
    subtitle:
      'Receive important estate announcements and community updates instantly',
  },
];

type TItemProps = {
  item: {
    id: string;
    image: ImageSourcePropType;
    title: string;
    subtitle: string;
  };
};

const Slide: FC<TItemProps> = ({ item }) => {
  return (
    <View className="w-[100vw] flex-auto">
      <View className="flex-[0.5] content-center justify-center items-center">
        <Image
          resizeMode="stretch"
          source={item?.image}
          style={{ height: 300, width: '100%' }}
        />
      </View>
      <View className="mt-5 flex-[0.4] items-center">
        <View className="flex flex-row items-start">
          <Image
            className="h-[60px] w-[60px]"
            resizeMode="contain"
            source={require('@assets/images/app-logo.png')}
          />
          <Text className="mt-8 -ml-4 text-blue-600" intent="h2">
            eeden
          </Text>
        </View>
        <View className="mt-12 items-center">
          <Text className="mb-2 max-w-80 text-center" intent="h2">
            {item?.title}
          </Text>
          <Text className="max-w-80 text-center">{item?.subtitle}</Text>
        </View>
      </View>
    </View>
  );
};

const OnboardingScreen: FC<
  AuthStackScreenProps<RoutesEnum.ONBOARDING_SCREEN>
> = () => {
  usePreventExit();

  const navigation =
    useNavigation<
      AuthStackScreenProps<RoutesEnum.ONBOARDING_SCREEN>['navigation']
    >();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const updateCurrentSlideIndex = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  return (
    <>
      <SafeAreaComponent
        isDark
        statusBarProps={{
          backgroundColor: Theme.colors.white.DEFAULT,
        }}
      />
      <View
        style={{
          ...globalStyles.screen,
          backgroundColor: Theme.colors.white.DEFAULT,
        }}
      >
        <FlatList
          data={slides}
          horizontal
          keyExtractor={item => item.id}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          pagingEnabled
          renderItem={({ item }) => <Slide item={item} />}
          showsHorizontalScrollIndicator={false}
          style={globalStyles.flexAuto}
        />
        <View className="pb-8">
          {/* Indicator container */}
          <View className="mb-8 flex-row justify-center">
            {/* Render indicator */}
            {slides.map((slide, index) => (
              <View
                className={`mx-1 h-[8px] w-[8px] rounded-full ${
                  currentSlideIndex === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                key={slide.id}
              />
            ))}
          </View>

          {/* Render buttons */}
          <View style={[onboardingStyles.button_row]}>
            <View style={onboardingStyles.button_wrapper}>
              <Button
                fontStyle={onboardingStyles.alt_button_text}
                label="Sign Up"
                onPress={() => navigation.navigate(RoutesEnum.REGISTER_SCREEN)}
                style={onboardingStyles.alt_button}
              />
            </View>
            <View style={onboardingStyles.button_wrapper}>
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
