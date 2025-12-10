import { Sizes, Theme } from '@wd/utils/Theme';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const SectionHeader = ({ title, sub }: { title: string; sub?: string }) => {
  const SCREEN_WIDTH = Dimensions.get('screen').width;
  const percentage = (title.length / SCREEN_WIDTH) * 100;
  return (
    <View style={styles.container}>
      <View style={styles.text_wrapper}>
        <Text style={styles.section_text}>
          {title}
          {sub ? <Text style={styles.section_sub_text}>"{sub}"</Text> : null}
        </Text>
        <View style={[styles.border, { width: `${percentage * 5}%` }]} />
      </View>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: Sizes.THIRTY,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.gray[150],
    paddingVertical: Sizes.SIXTEEN / 2,
  },
  text_wrapper: {
    paddingHorizontal: Sizes.THIRTY,
    position: 'relative',
  },
  section_text: {
    color: Theme.colors.green.DEFAULT,
    fontSize: 14,
  },
  section_sub_text: {
    color: Theme.colors.black[600],
  },
  border: {
    borderTopWidth: 1,
    borderTopColor: Theme.colors.green.DEFAULT,
    width: '40%',
    position: 'absolute',
    left: Sizes.THIRTY,
    bottom: -Sizes.SIXTEEN / 1.8,
  },
});
