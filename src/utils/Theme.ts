import { light } from './theme/colors';

export const Theme = {
  passport: {
    green: '#12B76A',
    orange: '#F79009',
    blue: '#2563EB',
    yellow: '#F5C518',
    purple: '#7C3AED',
    pale_orange: '#FFA588',
    brown: '#854F28',
    gray: '#98A2B3',
  },
  green: '#039855',
  red: '#D92D20',
  amber: '#DC6803',
  primary: '#2563EB',

  colors: light,
} as const;

export const Sizes = {
  SIXTEEN: 16,
  EIGHTEEN: 18,
  THIRTY: 30,
  FIFTY: 50,
};
