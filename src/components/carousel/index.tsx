import React, { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CarouselProps {
  data: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  itemWidth?: number;
  hideControls?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  onSlideChange?: (index: number) => void;
  className?: string;
}

interface CarouselItemProps {
  children: React.ReactNode;
  className?: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ children, className }) => {
  return (
    <View className={className} style={[styles.carouselItem]}>
      {children}
    </View>
  );
};

const Carousel = ({
  data,
  renderItem,
  itemWidth = SCREEN_WIDTH - 40,
  hideControls = false,
  autoPlay = false,
  autoPlayInterval = 3000,
  showDots = true,
  onSlideChange,
  className,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useSharedValue(0);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const contentOffsetX = event.nativeEvent.contentOffset.x;
      scrollX.value = contentOffsetX;

      const index = Math.round(contentOffsetX / itemWidth);
      if (index !== currentIndex) {
        setCurrentIndex(index);
        onSlideChange?.(index);
      }
    },
    [currentIndex, itemWidth, onSlideChange],
  );

  const scrollPrev = useCallback(() => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToOffset({
        offset: (currentIndex - 1) * itemWidth,
        animated: true,
      });
    }
  }, [currentIndex, itemWidth]);

  const scrollNext = useCallback(() => {
    if (currentIndex < data.length - 1) {
      flatListRef.current?.scrollToOffset({
        offset: (currentIndex + 1) * itemWidth,
        animated: true,
      });
    }
  }, [currentIndex, data.length, itemWidth]);

  const canScrollPrev = currentIndex > 0;
  const canScrollNext = currentIndex < data.length - 1;

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoPlay || data.length <= 1) return;

    const interval = setInterval(() => {
      if (currentIndex === data.length - 1) {
        // Loop back to start
        flatListRef.current?.scrollToOffset({
          offset: 0,
          animated: true,
        });
      } else {
        scrollNext();
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, currentIndex, data.length, scrollNext]);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const index = viewableItems[0].index || 0;
        setCurrentIndex(index);
      }
    },
    [],
  );

  return (
    <View className={className} style={[styles.container]}>
      {/* Main Carousel Content */}
      <View style={styles.carouselWrapper}>
        <FlatList
          contentContainerStyle={[
            styles.flatListContent,
            { paddingHorizontal: (SCREEN_WIDTH - itemWidth) / 2 },
          ]}
          data={data}
          decelerationRate="fast"
          getItemLayout={(_, index) => ({
            length: itemWidth,
            offset: itemWidth * index,
            index,
          })}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          onScroll={handleScroll}
          onViewableItemsChanged={onViewableItemsChanged}
          pagingEnabled
          ref={flatListRef}
          renderItem={({ item, index }) => (
            <CarouselItem>{renderItem(item, index)}</CarouselItem>
          )}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          snapToInterval={itemWidth}
          viewabilityConfig={viewabilityConfig}
        />
      </View>

      {/* Dots Indicator */}
      {showDots && data.length > 1 && (
        <View style={styles.dotsContainer}>
          {data.map((_, index) => {
            const isActive = index === currentIndex;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const dotStyle = useAnimatedStyle(() => {
              return {
                width: withSpring(isActive ? 24 : 8, {
                  damping: 15,
                  stiffness: 150,
                }),
                backgroundColor: withSpring(isActive ? '#000' : '#ccc', {
                  damping: 15,
                  stiffness: 150,
                }),
              };
            });

            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  flatListRef.current?.scrollToOffset({
                    offset: index * itemWidth,
                    animated: true,
                  });
                }}
                style={styles.dotWrapper}
              >
                <Animated.View style={[styles.dot, dotStyle]} />
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Navigation Controls */}
      {!hideControls && data.length > 1 && (
        <>
          <TouchableOpacity
            disabled={!canScrollPrev}
            onPress={scrollPrev}
            style={[
              styles.controlButton,
              styles.prevButton,
              !canScrollPrev && styles.disabledButton,
            ]}
          >
            <Icon
              color={canScrollPrev ? '#000' : '#ccc'}
              name="arrow-left"
              size={20}
            />
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!canScrollNext}
            onPress={scrollNext}
            style={[
              styles.controlButton,
              styles.nextButton,
              !canScrollNext && styles.disabledButton,
            ]}
          >
            <Icon
              color={canScrollNext ? '#000' : '#ccc'}
              name="arrow-right"
              size={20}
            />
          </TouchableOpacity>
        </>
      )}

      {/* Counter Indicator */}
      {data.length > 1 && (
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>
            {currentIndex + 1} / {data.length}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  carouselWrapper: {
    overflow: 'hidden',
    borderRadius: 12,
  },
  flatListContent: {
    alignItems: 'center',
  },
  carouselItem: {
    width: SCREEN_WIDTH - 40, // Default item width
    marginHorizontal: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 6,
  },
  dotWrapper: {
    padding: 4,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  controlButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  prevButton: {
    left: 10,
  },
  nextButton: {
    right: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  counterContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  counterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Carousel;
export { CarouselItem };
