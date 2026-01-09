import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Theme } from '@wd/utils/Theme';
import React, { FC, ReactNode, RefObject, useMemo } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from '../Text/Text';
import { CloseIcon } from '../icons';

type AppBottomSheetProps = Omit<
  BottomSheetProps,
  'children' | 'index' | 'snapPoints'
> & {
  breakpoints: string[];
  startingBreakpointIndex?: number;
  content?: ReactNode;
  bottomSheetRef: RefObject<BottomSheetMethods>;
  handleSheetChanges: (index: number) => void;
  enablePanDownToClose?: boolean;
  headerTitle?: string;
  headerComponent?: ReactNode;
  borderTopColor?: string;
  callBackOnClose?: () => void;
};

export const BackdropComponent: FC<BottomSheetBackdropProps> = props => {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      enableTouchThrough={false}
      pressBehavior="none"
    />
  );
};

export const AppBottomSheet: FC<AppBottomSheetProps> = ({
  breakpoints,
  startingBreakpointIndex = 0,
  content,
  bottomSheetRef,
  handleSheetChanges,
  headerTitle,
  headerComponent,
  borderTopColor,
  callBackOnClose,
  enablePanDownToClose = false,
  ...props
}) => {
  const snapPoints = useMemo(() => breakpoints, [breakpoints]);

  const borderTopStyle = borderTopColor
    ? {
        borderTopWidth: 1,
        borderTopColor,
      }
    : {};

  const { top } = useSafeAreaInsets();

  return (
    <BottomSheet
      backdropComponent={BackdropComponent}
      backgroundComponent={null}
      detached={true}
      enablePanDownToClose={enablePanDownToClose}
      handleComponent={null}
      index={startingBreakpointIndex}
      onChange={handleSheetChanges}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      style={styles.sheet_wrapper}
      {...props}
    >
      <View
        className="flex-auto bg-white-300"
        style={[borderTopStyle, { paddingTop: top }]}
      >
        <View className="flex-row items-center justify-between gap-x-4 border-b border-b-gray-200 bg-white px-5 py-4">
          {headerComponent || (
            <Text
              className="flex-1"
              intent="h4"
              numberOfLines={1}
              weight="semibold"
            >
              {headerTitle}
            </Text>
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            className="h-[42px] w-[42px] items-center justify-center rounded-full bg-gray-150"
            onPress={() => {
              callBackOnClose?.();
              bottomSheetRef?.current?.close();
              setTimeout(() => {
                Keyboard.dismiss();
              }, 100);
            }}
          >
            <CloseIcon color={Theme.colors.black[600]} height={20} width={20} />
          </TouchableOpacity>
        </View>
        <BottomSheetScrollView
          contentContainerStyle={[styles.sheetContentContainer]}
          showsVerticalScrollIndicator={false}
          style={styles.sheetContainer}
        >
          {content}
        </BottomSheetScrollView>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheet_wrapper: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  sheetContainer: {
    flex: 1,
  },

  sheetContentContainer: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 64,
    flexGrow: 1,
  },
});
