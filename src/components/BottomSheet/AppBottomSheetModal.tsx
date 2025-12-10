import useTheme from '@wd/utils/theme/useTheme';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BottomSheetScrollViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';
import { remapProps } from 'nativewind';
import React, { FC, ReactNode, RefObject, useMemo } from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from '../Text/Text';
import { CloseIcon } from '../icons';

type AppBottomSheetModalProps = Omit<
  BottomSheetModalProps,
  'children' | 'snapPoints' | 'index'
> & {
  breakpoints: BottomSheetModalProps['snapPoints'];
  startingBreakpointIndex?: BottomSheetModalProps['index'];
  content?: ReactNode;
  bottomSheetRef: RefObject<BottomSheetModal>;
  headerTitle?: string;
  headerComponent?: ReactNode;
  borderTopColor?: string;
  onDismiss?: BottomSheetModalProps['onDismiss'];
  renderContentInScrollView?: boolean;
  contentContainerStyle?: BottomSheetScrollViewProps['contentContainerStyle'];
  wrapperStyle?: ViewStyle & string;
  headerContainerStyle?: ViewStyle;
  handleClose?: () => void;
  hideHeader?: boolean;
};

export const BackdropComponent: FC<BottomSheetBackdropProps> = (props) => {
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

const AppBottomSheetModal: FC<AppBottomSheetModalProps> = ({
  breakpoints,
  content,
  bottomSheetRef,
  headerTitle,
  headerComponent,
  borderTopColor,
  startingBreakpointIndex = 0,
  onDismiss,
  renderContentInScrollView = true,
  contentContainerStyle,
  wrapperStyle,
  headerContainerStyle,
  handleClose,
  hideHeader = false,
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

  const { theme } = useTheme();

  return (
    <BottomSheetModal
      backdropComponent={BackdropComponent}
      backgroundComponent={null}
      enablePanDownToClose={false}
      handleComponent={null}
      index={startingBreakpointIndex}
      onDismiss={() => {
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
        }
        onDismiss?.();
      }}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      style={styles.sheet_wrapper}
      {...props}
    >
      <View
        className="flex-auto bg-white-400"
        style={[borderTopStyle, wrapperStyle, { paddingTop: top }]}
      >
        {!hideHeader && (
          <View
            className="flex-row items-center justify-between gap-x-4 border-b border-b-gray-200 bg-white px-5 py-4"
            style={headerContainerStyle}
          >
            {headerComponent || (
              <Text
                className="flex-1"
                intent="h3"
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
                if (handleClose) {
                  handleClose();
                } else {
                  bottomSheetRef?.current?.dismiss();
                }
              }}
            >
              <CloseIcon color={theme.black[600]} height={20} width={20} />
            </TouchableOpacity>
          </View>
        )}
        {renderContentInScrollView ? (
          <BottomSheetScrollView
            contentContainerStyle={[
              styles.sheetContentContainer,
              contentContainerStyle,
            ]}
            showsVerticalScrollIndicator={false}
            style={styles.sheetContainer}
          >
            {content}
          </BottomSheetScrollView>
        ) : (
          content
        )}
      </View>
    </BottomSheetModal>
  );
};

export const styles = StyleSheet.create({
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

export default remapProps(AppBottomSheetModal, {
  wrapperStyle: 'wrapperStyle',
  contentContainerStyle: 'contentContainerStyle',
  headerContainerStyle: 'headerContainerStyle',
});
