import { Theme } from '@wd/utils/Theme';
import { isHtmlString, trimSpacing } from '@wd/utils/html-parser';
import { TColors } from '@wd/utils/theme/colors';
import useTheme from '@wd/utils/theme/useTheme';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import HTMLView from 'react-native-htmlview';
import Text, { variants } from '../Text/Text';

type HtmlProps = {
  removeHtmlStyles?: boolean;
  children: string;
};

const htmlTagStyles = (theme: TColors) =>
  StyleSheet.create({
    body: {
      color: theme.black[600],
      ...variants.intent.base,
    },
    p: {
      color: theme.black[600],
      ...variants.intent.base,
    },
    em: {
      color: theme.black[600],
      ...variants.italic.normal,
    },
    strong: {
      color: theme.black[700],
      ...variants.weight.semibold,
    },
    h1: {
      color: theme.black[700],
      ...variants.intent.h1,
    },
    h2: {
      color: theme.black[700],
      ...variants.intent.h2,
    },
    h3: {
      color: theme.black[700],
      ...variants.intent.h3,
    },
    h4: {
      color: theme.black[700],
      ...variants.intent.h4,
    },
    h5: {
      color: theme.black[700],
      ...variants.intent.h5,
    },
    h6: {
      color: theme.black[700],
      ...variants.intent.h6,
    },
    a: {
      color: Theme.colors.green.DEFAULT,
      textDecorationLine: 'underline',
      ...variants.intent.base,
    },
  });

const HtmlParser: FC<HtmlProps> = ({ removeHtmlStyles = false, children }) => {
  const { theme } = useTheme();

  return (
    <View className="py-2">
      {isHtmlString(children) ? (
        <HTMLView
          stylesheet={removeHtmlStyles ? {} : htmlTagStyles(theme)}
          value={trimSpacing(children)}
        />
      ) : (
        <Text>{children}</Text>
      )}
    </View>
  );
};

export default HtmlParser;
