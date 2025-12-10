import { light } from './theme/colors';

export const Theme = {
  passport: {
    green: '#4ABE82',
    orange: '#FD6E5E',
    blue: '#3677FF',
    yellow: '#FFC531',
    purple: '#D156FF',
    pale_orange: '#FFA588',
    brown: '#854F28',
    gray: '#8C8C8C',
  },

  colors: light,
} as const;

export const Sizes = {
  SIXTEEN: 16,
  EIGHTEEN: 18,
  THIRTY: 30,
  FIFTY: 50,
};
