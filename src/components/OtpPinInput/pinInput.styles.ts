import { Theme } from '@wd/utils/Theme';
import { StyleSheet } from 'react-native';

export const PinStyles = StyleSheet.create({
  hiddenTextInput: {
    height: 1,
    opacity: 0,
    position: 'absolute',
    width: 1,
  },
  OTPInputSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  otp_input_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  otp_input: {
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    height: 60,
    justifyContent: 'center',
    padding: 10,
    width: 60,
  },
  otp_input_text: {
    color: Theme.colors.blue.DEFAULT,
    fontSize: 22,
    textAlign: 'center',
  },
  otp_input_focused: {
    borderColor: Theme.colors.blue.DEFAULT,
  },
});
