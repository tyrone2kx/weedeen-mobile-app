import { Theme } from '@wd/utils/Theme';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import uuid from 'react-native-uuid';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export interface IMultiSelectOptionType {
  label: string;
  value: any;
  icon?: any;
  rightIcon?: any;
  extras?: any;
  pid?: string;
}

interface ISelectProps {
  label?: string;
  required?: boolean;
  isSearchable?: boolean;
  onChange?: (val: any) => void;
  value?: IMultiSelectOptionType[];
  options: IMultiSelectOptionType[];
  placeholder?: string;
}

const MultiSelect = ({
  value,
  onChange,
  options,
  required,
  label,
  placeholder,
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

  const [selectedValue, setSelectedValue] = useState(value || []);
  const [top, setTop] = useState(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [menuWidth, setMenuWidth] = useState<any>('90%');
  const ref = useRef(null);
  const inputRef = useRef(null);

  const [displayOptions, setDisplayOptions] = useState<
    IMultiSelectOptionType[]
  >(options.map(item => ({ ...item, pid: uuid.v4() })));

  useEffect(() => {
    if (!displayOptions.length) {
      setVisible(false);
    }
  }, [displayOptions, visible]);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleModal = (focus?: boolean) => {
    // @ts-ignore
    ref?.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setTop(py + h);
      setMenuWidth(_w);
    });
    setVisible(prev => {
      const val = !prev;
      return focus || val;
    });
  };

  useEffect(() => {
    if (!visible) {
      // @ts-ignore
      inputRef?.current?.blur();
      borderWidthValue.value = withTiming(1);
    }
  }, [visible, borderWidthValue]);

  return (
    <>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {required && <Text style={styles.required}>*</Text>}
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
        {selectedValue?.length ? (
          <View
            style={{ flexDirection: 'row', flexWrap: 'wrap', maxWidth: '95%' }}
          >
            {selectedValue.map((item, index) => (
              <View
                key={item.pid}
                style={[
                  styles.pills,
                  { borderColor: Theme.colors.green.DEFAULT },
                ]}
              >
                <Text key={index}> {item.label} </Text>

                <TouchableOpacity
                  onPress={() => {
                    setSelectedValue(prev => {
                      const res = prev?.filter(data => data.pid !== item.pid);
                      setDisplayOptions(prev => [...prev, item]);
                      onChange?.(res);
                      return res;
                    });
                    setVisible(true);
                  }}
                >
                  <Icon
                    color={Theme.colors.green.DEFAULT}
                    name="close-circle"
                    size={18}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text style={{ color: Theme.colors.gray.DEFAULT }}>
            {' '}
            {placeholder}{' '}
          </Text>
        )}

        <Pressable>
          <Icon name="arrow-right" size={18} />
        </Pressable>
      </AnimatedTouchableOpacity>

      {visible && (
        <Modal animationType="none" transparent visible={visible}>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
            }}
            style={styles.overlay}
          >
            <View style={[styles.optionsMenu, { top }]}>
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
                  data={displayOptions}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item: data }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedValue(prev => {
                          const val = [...(prev || []), data];
                          onChange?.(val);
                          setDisplayOptions(prev =>
                            prev.filter(item => item.pid !== data.pid),
                          );
                          return val;
                        });
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
    </>
  );
};

export default MultiSelect;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 18,
    paddingVertical: 10,
    minHeight: 48,
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
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'flex-start',
    width: '100%',
  },
  required: {
    color: 'red',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  pills: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 15,
    borderWidth: 0.5,
    margin: 5,
    alignItems: 'center',
  },
});
