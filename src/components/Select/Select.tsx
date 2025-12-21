import { Theme } from '@wd/utils/Theme';
import { remapProps } from 'nativewind';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  TextInput as RNTextInput,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from '../Icon/Icon';

import useTheme from '@wd/utils/theme/useTheme';
import Text from '../Text/Text';
import { CloseIcon } from '../icons';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export interface ISelectOptionType {
  label: string;
  value: any;
  icon?: any;
  rightIcon?: any;
  extras?: any;
}

export interface ISelectProps {
  style?: ViewStyle;
  label?: string;
  subLabel?: string;
  required?: boolean;
  isSearchable?: boolean;
  onChange?: (data: ISelectOptionType) => void;
  value?: ISelectOptionType | null;
  options: ISelectOptionType[];
  placeholder?: string;
  inputValue?: string;
  setInputValue?: (val: string) => void;
  intent?: 'solid' | 'outline';
  inputContainerStyle?: ViewStyle;
  modalInputContainerStyle?: ViewStyle;
  labelContainerStyle?: ViewStyle;
  className?: string;
  onBlur?: () => void;
  onTouch?: () => void;
}

const variants = {
  intent: {
    solid: {
      inputContainer: {
        backgroundColor: '#FCFCFC',
        borderRadius: 12,
        paddingHorizontal: 18,
        marginTop: 3,
      },
      animatedBorder: {
        start: Theme.colors.gray[300],
        stop: Theme.colors.blue.DEFAULT,
      },
      labelContainer: {
        marginBottom: 1,
      },
    },
    outline: {
      inputContainer: {},
      animatedBorder: {
        start: Theme.colors.gray[300],
        stop: Theme.colors.blue.DEFAULT,
      },
      labelContainer: {},
    },
  },
};

const Select: FC<ISelectProps> = ({
  style,
  isSearchable,
  value,
  onChange,
  options,
  required,
  label,
  placeholder,
  subLabel,
  inputValue,
  setInputValue,
  intent = 'solid',
  inputContainerStyle,
  modalInputContainerStyle,
  labelContainerStyle,
  className = '',
  onBlur,
  onTouch,
}) => {
  const borderWidthValue = useSharedValue(1);

  const reanimtedBorderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      borderWidthValue.value,
      [1, 1.5],
      [
        variants.intent[intent].animatedBorder.start,
        variants.intent[intent].animatedBorder.stop,
      ],
    );

    if (intent === 'solid') {
      return {
        borderWidth: borderWidthValue.value,
        borderColor,
      };
    }

    if (intent === 'outline') {
      return {
        borderWidth: borderWidthValue.value,
        borderBottomColor: borderColor,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
      };
    }

    return {};
  });

  const [selectedValue, setSelectedValue] = useState(value);
  const [inputVal, setInputVal] = useState<string>(inputValue || '');
  const [, setTop] = useState(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [, setMenuWidth] = useState<string | number>('90%');
  const ref = useRef<any>(null);
  const inputRef = useRef<RNTextInput>(null);

  const filteredOptions = useMemo(
    () =>
      options.filter(item =>
        item.label.toLowerCase().includes(inputVal.toLowerCase()),
      ),
    [options, inputVal],
  );

  useEffect(() => {
    setSelectedValue(value);
    setInputVal(value?.label || '');
    setInputValue?.(value?.label || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleModal = (focus?: boolean) => {
    ref?.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setTop(isSearchable ? py : py + h);
      setMenuWidth(_w);
    });
    setVisible(prev => {
      const val = !prev;
      return focus || val;
    });
  };

  const onClose = () => {
    if (!selectedValue) {
      setInputVal('');
      setInputValue?.('');
    } else {
      setInputVal(selectedValue?.label);
      setInputValue?.(selectedValue?.label);
    }
  };

  useEffect(() => {
    if (!visible) {
      inputRef?.current?.blur();
      borderWidthValue.value = withTiming(1);
    } else {
      if (isSearchable) {
        inputRef?.current?.focus();
      }
    }
  }, [visible, isSearchable, borderWidthValue]);

  const hasLabel = label || subLabel;

  const { theme } = useTheme();

  return (
    <View className={`relative ${className}`} style={style}>
      {hasLabel && (
        <View
          className={`w-full flex-col items-start`}
          style={[variants.intent[intent].labelContainer, labelContainerStyle]}
        >
          {label && (
            <View className="flex-row">
              {label && <Text intent="label">{label}</Text>}
              {required && (
                <Text className="ml-0.5 text-red" intent="label">
                  *
                </Text>
              )}
            </View>
          )}
          {subLabel && (
            <Text className="mt-0.5" intent="sm">
              {subLabel}
            </Text>
          )}
        </View>
      )}
      <AnimatedTouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          borderWidthValue.value = withTiming(1.5);
          handleModal(true);
          onTouch?.();
        }}
        ref={ref}
        style={[
          styles.mainContainer,
          { paddingVertical: 10 },
          reanimtedBorderStyle,
          variants.intent[intent].inputContainer,
          inputContainerStyle,
        ]}
      >
        <Text style={styles.input}>
          {inputVal || (
            <Text style={{ color: theme.gray.DEFAULT }}>{placeholder}</Text>
          )}
        </Text>
        <Pressable
          onPress={() => {
            if (isSearchable) {
              setVisible(false);
            }
          }}
        >
          <Icon color={Theme.colors.gray.DEFAULT} name="arrow-down" size={18} />
        </Pressable>
      </AnimatedTouchableOpacity>

      <Modal animationType="slide" visible={visible}>
        <View style={styles.overlay}>
          <View style={{ marginBottom: 20, alignItems: 'flex-end' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setVisible(false);
                onClose();
              }}
            >
              <CloseIcon color={Theme.colors.black[600]} />
            </TouchableOpacity>
          </View>
          <View style={[styles.optionsMenu]}>
            <View
              style={[
                styles.mainContainer,
                {
                  backgroundColor: Theme.colors.white.DEFAULT,
                  width: '100%',
                  borderColor: Theme.colors.blue.DEFAULT,
                  borderWidth: 2,
                  paddingHorizontal: 18,
                  borderRadius: 12,
                },
                modalInputContainerStyle,
              ]}
            >
              <TextInput
                className="text-base"
                onChangeText={e => {
                  if (isSearchable) {
                    setInputVal(e);
                    setInputValue?.(e);
                  }
                }}
                placeholder={placeholder}
                placeholderTextColor={Theme.colors.gray.DEFAULT}
                ref={inputRef}
                style={[styles.input]}
                value={inputVal}
              />
              <Pressable>
                <Icon name="arrow-right" size={18} />
              </Pressable>
            </View>

            <View
              style={[
                styles.triangle,
                { borderBottomColor: Theme.colors.gray[150] },
              ]}
            />

            <View
              className="border-gray-150 bg-white"
              style={[styles.optionsContainer]}
            >
              <FlatList
                data={isSearchable ? filteredOptions : options}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: data }) => (
                  <TouchableOpacity
                    onPress={() => {
                      onChange?.(data);
                      onBlur?.();
                      setSelectedValue(data);
                      setInputVal(data.label);
                      setInputValue?.(data.label);
                      setVisible(false);
                    }}
                    style={[
                      styles.options,
                      { borderColor: Theme.colors.gray[200] },
                    ]}
                  >
                    {data.icon}
                    <Text> {data.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 48,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    width: '90%',
    fontSize: 14,
    height: '100%',
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 0.2,
    borderLeftColor: 'transparent',
    borderRightWidth: 0.2,
    borderRightColor: 'transparent',
    borderBottomWidth: 0.2,
  },
  optionsContainer: {
    marginTop: 20,
    borderRadius: 6,
    borderWidth: 1,
    width: '100%',
    flex: 1,
  },
  options: {
    flexDirection: 'row',
    width: '100%',
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  optionsMenu: {
    flex: 1,
    alignItems: 'center',
    shadowColor: Theme.colors.gray.DEFAULT,
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
  },
  overlay: {
    flex: 1,
    padding: 20,
  },
  labelContainer: {
    flexDirection: 'column',
    marginBottom: 10,
    alignItems: 'flex-start',
    width: '100%',
  },
  required: {
    color: 'red',
    fontWeight: 'bold',
  },
  subLabel: {
    fontSize: 12,
    fontWeight: '400',
  },
});

export default remapProps(Select, {
  className: 'style',
  // inputContainerStyle: 'inputContainerStyle',
  // modalInputContainerStyle: 'modalInputContainerStyle',
  // labelContainerStyle: 'labelContainerStyle',
});
