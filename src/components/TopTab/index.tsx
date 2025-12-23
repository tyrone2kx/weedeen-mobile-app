import { Theme } from '@wd/utils/Theme';
import { remapProps } from 'nativewind';
import React from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import Text from '../Text/Text';

interface Tab {
  label: string;
  onPress: () => void;
  icon?: React.ReactElement;
}

interface Props {
  tabs: Tab[];
  activeTab: string;
  activeTheme?: string;
  activeTextColor?: string;
  type2?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  style?: ViewStyle;
}

const variants = {
  solid: {
    button: {
      active: '',
      inactive: 'border border-gray-200',
    },
    text: {
      active: '',
      inactive: '',
    },
  },
};

const TopTab: React.FC<Props> = ({
  tabs,
  activeTab,
  activeTheme = Theme.colors.blue.DEFAULT,
  activeTextColor = Theme.colors.white.DEFAULT,
  type2,
  buttonStyle,
  textStyle,
  style,
}) => {
  return type2 ? (
    <View className="flex-row gap-x-3" style={style}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.label}
          onPress={tab.onPress}
          style={[
            styles.tab_2,
            tab.label === activeTab
              ? {
                  borderBottomWidth: 2,
                  borderBottomColor: activeTheme,
                }
              : null,
            buttonStyle,
          ]}
        >
          <View className="flex-row items-center gap-x-2">
            {tab.icon}
            <Text
              style={{
                ...textStyle,
                ...(tab.label === activeTab ? { color: activeTextColor } : {}),
              }}
            >
              {tab.label}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  ) : (
    <View className="flex-row gap-x-3" style={style}>
      {tabs.map(tab => (
        <TouchableOpacity
          activeOpacity={0.8}
          className={`flex-1 items-center justify-center rounded-xl p-2 ${
            tab.label === activeTab
              ? variants.solid.button.active
              : variants.solid.button.inactive
          }`}
          key={tab.label}
          onPress={tab.onPress}
          style={[
            tab.label === activeTab
              ? {
                  backgroundColor: activeTheme,
                }
              : {},
            buttonStyle,
          ]}
        >
          <View className="flex-row items-center gap-x-2">
            {tab.icon}
            <Text
              style={{
                color:
                  tab.label === activeTab
                    ? activeTextColor
                    : Theme.colors.gray.DEFAULT,
                ...textStyle,
              }}
              weight="medium"
            >
              {tab.label}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tab_2: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: -3,
  },
});

export default remapProps(TopTab, {
  className: 'style',
  buttonStyle: 'buttonStyle',
  textStyle: 'textStyle',
});
