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

const TopTab: React.FC<Props> = ({
  tabs,
  activeTab,
  activeTheme = Theme.colors.blue.DEFAULT,
  activeTextColor = Theme.colors.blue.DEFAULT,
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
                color:
                  tab.label === activeTab
                    ? activeTextColor
                    : Theme.colors.gray[500],
                ...textStyle,
              }}
              weight={tab.label === activeTab ? 'semibold' : 'medium'}
            >
              {tab.label}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  ) : (
    // Segmented control: track with a white active pill (matches mockup).
    <View style={[styles.track, style]}>
      {tabs.map(tab => {
        const active = tab.label === activeTab;
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex-1 flex-row items-center justify-center gap-x-2"
            key={tab.label}
            onPress={tab.onPress}
            style={[
              styles.segment,
              active ? styles.segmentActive : null,
              buttonStyle,
            ]}
          >
            {tab.icon}
            <Text
              style={{
                color: active ? activeTextColor : Theme.colors.gray[500],
                ...textStyle,
              }}
              weight={active ? 'semibold' : 'medium'}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
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
  track: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.gray[100],
    borderRadius: 14,
    padding: 4,
    gap: 4,
  },
  segment: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  segmentActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#101828',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});

export default remapProps(TopTab, {
  className: 'style',
  buttonStyle: 'buttonStyle',
  textStyle: 'textStyle',
});
