import { FC, memo } from 'react';
import MarkdownDisplay, {
  MarkdownProps as MarkdownDisplayProps,
} from 'react-native-markdown-display';

import useTheme from '@wd/utils/theme/useTheme';
import { variants } from '../Text/Text';

type MarkdownProps = MarkdownDisplayProps & {
  children: string;
};

const Markdown: FC<MarkdownProps> = ({
  children,
  mergeStyle = true,
  style = {},
  ...rest
}) => {
  const {
    body,
    text,
    paragraph,
    em,
    strong,
    heading1,
    heading2,
    heading3,
    heading4,
    heading5,
    heading6,
    ...restStyles
  } = style;

  const { theme } = useTheme();

  return (
    <MarkdownDisplay
      mergeStyle={mergeStyle}
      style={{
        body: {
          color: theme.black[600],
          ...variants.intent.md,
          ...variants.weight.medium,
          ...body,
        },
        text: {
          ...text,
        },
        paragraph: {
          ...paragraph,
        },
        em: {
          fontStyle: 'normal',
          ...variants.italic.medium,
          ...em,
        },
        strong: {
          fontWeight: 'normal',
          color: theme.black[700],
          ...variants.intent.md,
          ...variants.weight.bold,
          ...strong,
        },
        heading1: {
          color: theme.black[700],
          ...variants.intent.h1,
          ...heading1,
        },
        heading2: {
          color: theme.black[700],
          ...variants.intent.h2,
          ...heading2,
        },
        heading3: {
          color: theme.black[700],
          ...variants.intent.h3,
          ...heading3,
        },
        heading4: {
          color: theme.black[700],
          ...variants.intent.h4,
          ...heading4,
        },
        heading5: {
          color: theme.black[700],
          ...variants.intent.h5,
          ...heading5,
        },
        heading6: {
          color: theme.black[700],
          ...variants.intent.h6,
          ...heading6,
        },
        ...restStyles,
      }}
      {...rest}
    >
      {children}
    </MarkdownDisplay>
  );
};

export default memo(Markdown);
