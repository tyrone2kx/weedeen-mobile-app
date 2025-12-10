import { StyleSheet } from 'react-native';
import { Theme } from './Theme';

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screen_gutter: {
    flex: 1,
    paddingHorizontal: 18,
  },
  pad_screen_top_sm: {
    paddingTop: 36,
  },
  pad_screen_bottom_sm: {
    paddingBottom: 36,
  },
  pad_touchable_icon: {
    padding: 2,
  },
  scroll_view_content_container: {
    flexGrow: 1,
  },
  screen_vertical_gutter: {
    paddingTop: 18,
    paddingBottom: 36,
  },
  screen_horizontal_gutter: {
    paddingHorizontal: 18,
  },
  floating_icon_button: {
    backgroundColor: Theme.colors.green.DEFAULT,
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    right: 20,
    shadowColor: Theme.colors.gray[400],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  flex1: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
  },
  flexAuto: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  flex: {
    flex: 1,
  },
  screen_top_gutter: {
    paddingTop: 18,
  },
});
