import { Theme } from '@wd/utils/Theme';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
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
import Text from '../Text/Text';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export interface ISelectOptionType {
  label: string;
  value: any;
  icon?: any;
  rightIcon?: any;
  extras?: any;
}

interface ISelectProps {
  style?: ViewStyle;
  label?: string;
  subLabel?: string;
  required?: boolean;
  isSearchable?: boolean;
  onChange?: (val: any) => void;
  value?: ISelectOptionType | null;
  options: ISelectOptionType[];
  placeholder?: string;
  inputValue?: string;
  setInputValue?: (val: string) => void;
}

const Select = ({
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
}: ISelectProps) => {
  const borderWidthValue = useSharedValue(1);

  const reanimtedBorderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      borderWidthValue.value,
      [1, 2],
      [Theme.colors.gray[150], Theme.colors.green.DEFAULT],
    );
    return {
      borderWidth: borderWidthValue.value,
      borderColor,
    };
  });

  const [selectedValue, setSelectedValue] = useState(value);
  const [inputVal, setInputVal] = useState<string>(inputValue || '');
  const [top, setTop] = useState(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [menuWidth, setMenuWidth] = useState<any>('90%');
  const ref = useRef(null);
  const inputRef = useRef(null);

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
    // @ts-ignore
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
      // @ts-ignore
      inputRef?.current?.blur();
      borderWidthValue.value = withTiming(1);
    } else {
      if (isSearchable) {
        // @ts-ignore
        inputRef?.current?.focus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, isSearchable]);

  return (
    <View style={[{ position: 'relative' }, { ...style }]}>
      <View style={styles.labelContainer}>
        <View style={{ flexDirection: 'row' }}>
          {label && <Text style={styles.label}>{label}</Text>}
          {required && <Text style={styles.required}>*</Text>}
        </View>
        {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
      </View>
      <AnimatedTouchableOpacity
        // @ts-ignore
        onPress={() => {
          borderWidthValue.value = withTiming(2);
          handleModal(true);
        }}
        ref={ref}
        style={[
          styles.mainContainer,
          reanimtedBorderStyle,
          { backgroundColor: Theme.colors.white.DEFAULT },
        ]}
      >
        <Text style={styles.input}>
          {inputVal || (
            <Text style={{ color: Theme.colors.gray.DEFAULT }}>
              {' '}
              {placeholder}{' '}
            </Text>
          )}
        </Text>
        <Pressable
          onPress={() => {
            if (isSearchable) {
              setVisible(false);
            }
          }}
        >
          <Icon
            color={Theme.colors.gray.DEFAULT}
            name="arrow-down-1"
            size={18}
          />
        </Pressable>
      </AnimatedTouchableOpacity>

      {visible && (
        <Modal animationType="none" transparent visible={visible}>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              onClose();
            }}
            style={styles.overlay}
          >
            <View style={[styles.optionsMenu, { top }]}>
              {isSearchable && (
                <View
                  style={[
                    styles.mainContainer,
                    {
                      backgroundColor: Theme.colors.white.DEFAULT,
                      width: menuWidth,
                      borderColor: Theme.colors.green.DEFAULT,
                      borderWidth: 2,
                    },
                  ]}
                >
                  <TextInput
                    // @ts-ignore
                    onChangeText={e => {
                      setInputVal(e);
                      setInputValue?.(e);
                    }}
                    placeholder="Select"
                    ref={inputRef}
                    style={[styles.input]}
                    value={inputVal}
                  />
                  <Pressable>
                    <Icon name="arrow-right" size={18} />
                  </Pressable>
                </View>
              )}
              <View
                style={[
                  styles.triangle,
                  { borderBottomColor: Theme.colors.gray[150] },
                ]}
              />
              <View
                style={[
                  styles.optionsContainer,
                  { borderColor: Theme.colors.gray[150], width: menuWidth },
                ]}
              >
                <FlatList
                  data={isSearchable ? filteredOptions : options}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item: data }) => (
                    <TouchableOpacity
                      onPress={() => {
                        onChange?.(data);
                        setSelectedValue(data);
                        setInputVal(data.label);
                        setInputValue?.(data.label);
                        setVisible(false);
                      }}
                      style={[
                        styles.options,
                        { borderColor: Theme.colors.gray[150] },
                      ]}
                    >
                      {data.icon}
                      <Text> {data.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 18,
    paddingVertical: 10,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '90%',
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
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 1,
    maxHeight: 200,
    overflow: 'scroll',
  },
  options: {
    flexDirection: 'row',
    width: '100%',
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  optionsMenu: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 100,
    shadowColor: Theme.colors.gray.DEFAULT,
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
  },
  overlay: {
    width: '100%',
    height: '100%',
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
  label: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: Theme.colors.black[600],
  },
  subLabel: {
    fontSize: 12,
    fontWeight: '400',
  },
});
