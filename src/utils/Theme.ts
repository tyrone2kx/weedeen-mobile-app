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
  green: '#0B7A68',
  red: '#D92D20',
  amber: '#F59E0B',
  primary: '#0057FF',

  colors: light,
} as const;

export const Sizes = {
  SIXTEEN: 16,
  EIGHTEEN: 18,
  THIRTY: 30,
  FIFTY: 50,
};
