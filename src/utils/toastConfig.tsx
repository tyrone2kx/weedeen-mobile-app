import { variants } from '@wd/components/Text/Text';
import { FC } from 'react';
import {
  BaseToastProps,
  InfoToast,
  SuccessToast,
  ToastConfig,
  ToastConfigParams,
} from 'react-native-toast-message';
import useTheme from './theme/useTheme';

type TToastComponentProps = ToastConfigParams<BaseToastProps>;

export const SuccessComponent: FC<TToastComponentProps> = props => {
  const { theme } = useTheme();

  return (
    <SuccessToast
      {...props}
      style={{
        backgroundColor: theme.white.DEFAULT,
        borderLeftColor: theme.green.DEFAULT,
      }}
      text1Props={{ allowFontScaling: false }}
      text1Style={[variants.intent.h5, { color: theme.black[700] }]}
      text2NumberOfLines={2}
      text2Props={{ allowFontScaling: false }}
      text2Style={[variants.intent.sm, { color: theme.black[600] }]}
    />
  );
};

export const InfoComponent: FC<TToastComponentProps> = props => {
  const { theme } = useTheme();

  return (
    <InfoToast
      {...props}
      style={{
        backgroundColor: theme.white.DEFAULT,
        borderLeftColor: theme.blue.DEFAULT,
      }}
      text1Props={{ allowFontScaling: false }}
      text1Style={[variants.intent.h5, { color: theme.black[700] }]}
      text2NumberOfLines={2}
      text2Props={{ allowFontScaling: false }}
      text2Style={[variants.intent.sm, { color: theme.black[600] }]}
    />
  );
};

export const ErrorComponent: FC<TToastComponentProps> = props => {
  const { theme } = useTheme();

  return (
    <InfoToast
      {...props}
      style={{
        backgroundColor: theme.white.DEFAULT,
        borderLeftColor: theme.orange.DEFAULT,
      }}
      text1Props={{ allowFontScaling: false }}
      text1Style={[variants.intent.h5, { color: theme.black[700] }]}
      text2NumberOfLines={2}
      text2Props={{ allowFontScaling: false }}
      text2Style={[variants.intent.sm, { color: theme.black[600] }]}
    />
  );
};

export const ToastConfigComponents: ToastConfig = {
  error: props => <ErrorComponent {...props} />,
  success: props => <SuccessComponent {...props} />,
  info: props => <InfoComponent {...props} />,
};
