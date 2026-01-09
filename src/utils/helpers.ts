import AsyncStorage from '@react-native-async-storage/async-storage';
import { envMode } from '@wd/api';
import { Invoice } from '@wd/generated';
import moment from 'moment';
import { Linking, Platform } from 'react-native';
import { Asset } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import uuidv4 from 'react-native-uuid';
import { TErrorStatusCodes } from './types';

export function getFileExtension(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const extension = pathname.split('.').pop();
    return extension && extension !== pathname ? extension : '';
  } catch {
    return '';
  }
}
export function getFileNameWithoutExtension(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const filename = pathname.split('/').pop();

    if (filename) {
      const decodedFilename = decodeURIComponent(filename); // Decode special characters
      const nameWithoutExtension = decodedFilename
        .split('.')
        .slice(0, -1)
        .join('.');
      // Remove unwanted characters like "%" or similar
      return (
        nameWithoutExtension.replace(/[^a-zA-Z0-9_\- ]+/g, '').trim() || ''
      );
    }

    return '';
  } catch {
    return '';
  }
}
export function getFileNameWithExtension(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const filename = pathname.split('/').pop();

    if (filename) {
      const nameWithoutExtension = decodeURIComponent(filename); // Decode special characters
      // Remove unwanted characters like "%" or similar
      return nameWithoutExtension;
    }

    return '';
  } catch {
    return '';
  }
}

export const findIndexInArray = (
  originalArray,
  objectToFInd,
  key,
  key2?: string,
) => {
  return originalArray.findIndex(item => {
    if (key2) return item[key][key2] === objectToFInd[key][key2];
    else return item[key] === objectToFInd[key];
  });
};

export const returnUpdatedList = (newObj, oldList, key = 'id', key2 = '') => {
  const indexOfLocal = findIndexInArray(oldList, newObj, key, key2);
  if (indexOfLocal !== -1) oldList[indexOfLocal] = newObj;
  return oldList;
};

export const uuid = () => uuidv4.v4();

export const getPasswordScore = (text: string) => {
  return {
    hasSymbol: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(text),
    hasUpperCase: /[A-Z]+/.test(text),
    hasNumber: /[0-9]+/.test(text),
    has8Characters: text.length >= 8,
  };
};

export const resolveRolesBySlug = (slug: string) => {
  switch (slug) {
    case 'claim_officer':
      return 'Claim Officer';
    case 'underwriting_officer':
      return 'Underwriting Officer';
    case 'broker':
      return 'Broker';
    default:
      return 'Member';
  }
};

export const capitalizeFirstLetter = (word: string): string => {
  if (!word) {
    return word; // Return the input as-is if it's empty or undefined
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getHeaders = async (isMultipart = false) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  const tenant = await AsyncStorage.getItem('tenant');
  const res: any = {};
  if (accessToken) res.Authorization = `Bearer ${accessToken}`;
  if (tenant) res['x-tenant-id'] = tenant;
  if (isMultipart) {
    res['Content-Type'] = 'multipart/form-data';
  }
  return res;
};

export function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const resolveInvoiceStatusColors = (
  status: Invoice['status'],
): string => {
  switch (status) {
    case 'paid':
      return '#0B7A68';
    case 'completed':
      return '#0B7A68';
    case 'pending':
      return '#7D6E2E';
    case 'failed':
      return '#F03E3E';
    default:
      return 'gray';
  }
};

export const replaceRouteId = (route: string, id: string | number) => {
  return route.replace(':id', `${id}`);
};

export function invertObject<T extends Record<string, string | number>>(
  obj: T,
): Record<string, keyof T> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [String(value), key]),
  );
}

export function resolveFileExtension(mimeOrName: string = ''): string {
  const upper = mimeOrName.toUpperCase();
  // Handle MIME types
  if (upper.startsWith('APPLICATION/')) {
    const type = upper.replace('APPLICATION/', '');
    if (type.includes('PDF')) return 'PDF';
    if (type.includes('ZIP')) return 'ZIP';
    if (type.includes('MSWORD')) return 'DOC';
    if (
      type.includes(
        'VND.OPENXMLFORMATS-OFFICEDOCUMENT.WORDPROCESSINGML.DOCUMENT',
      )
    )
      return 'DOCX';
    if (type.includes('VND.MS-EXCEL')) return 'XLS';
    if (type.includes('VND.OPENXMLFORMATS-OFFICEDOCUMENT.SPREADSHEETML.SHEET'))
      return 'XLSX';
    if (type.includes('JSON')) return 'JSON';
    return type;
  }
  // Handle image/video/audio types
  if (upper.startsWith('IMAGE/')) return upper.replace('IMAGE/', '');
  if (upper.startsWith('VIDEO/')) return upper.replace('VIDEO/', '');
  if (upper.startsWith('AUDIO/')) return upper.replace('AUDIO/', '');

  // Fallback for extensions
  const ext = mimeOrName.split('.').pop()?.toUpperCase();
  if (ext && ext !== mimeOrName.toUpperCase()) {
    return ext;
  }
  return 'FILE';
}

export function formatNumberWithCommas(value?: string | number): string {
  if (!value) return '';
  const num = typeof value === 'number' ? value : parseFloat(value);
  if (Number.isNaN(num)) return value.toString(); // Return the original value if it's not a number
  return num.toLocaleString('en-US');
}

type OptionType = { label: string; value: string };

function formatLabel(key: string): string {
  return key
    .toLowerCase()
    .split('_')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

export function enumToOptions<T extends Record<string, string>>(
  enumObj: T,
): OptionType[] {
  return Object.entries(enumObj).map(([key, value]) => ({
    label: formatLabel(key),
    value,
  }));
}

export function formatNaira(amount: number): string {
  return `₦${Math.floor(amount).toLocaleString('en-NG')}`;
}

export function formatNairaWithKobo(amount: number = 0): string {
  return `₦${amount.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function generateTransactionReference(prefix = 'TXN') {
  const timestamp = Date.now(); // Current timestamp in milliseconds
  const randomPart = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
  return `${prefix}-${timestamp}-${randomPart}`;
}

export const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60),
  );

  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d`;
  return date.toLocaleDateString();
};

export function lightenHexColor(hex: string, percent: number): string {
  // Ensure the percent is between 0 and 100
  const percentToUse = Math.min(Math.max(percent, 0), 100);

  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // Increase each component by the given percentage
  r = Math.min(Math.round(r * (1 + percentToUse / 100)), 255);
  g = Math.min(Math.round(g * (1 + percentToUse / 100)), 255);
  b = Math.min(Math.round(b * (1 + percentToUse / 100)), 255);

  // Convert RGB back to hex
  const toHex = (c: number) => c.toString(16).padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function darkenHexColor(hex: string, percent: number): string {
  // Ensure the percent is between 0 and 100
  const percentToUse = Math.min(Math.max(percent, 0), 100);

  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // Decrease each component by the given percentage
  r = Math.max(Math.round(r * (1 - percentToUse / 100)), 0);
  g = Math.max(Math.round(g * (1 - percentToUse / 100)), 0);
  b = Math.max(Math.round(b * (1 - percentToUse / 100)), 0);

  // Convert RGB back to hex
  const toHex = (c: number) => c.toString(16).padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function hexToRgb(
  hex: string,
): { r: number; g: number; b: number } | null {
  // Remove the leading hash if present
  const strippedHex = hex.replace(/^#/, '');

  // Parse the hex string
  let bigint: number;
  if (strippedHex.length === 3) {
    // Handle shorthand notation (e.g., #03F)
    bigint = parseInt(
      strippedHex
        .split('')
        .map(char => char + char)
        .join(''),
      16,
    );
  } else if (strippedHex.length === 6) {
    bigint = parseInt(strippedHex, 16);
  } else {
    // Invalid hex string length
    return null;
  }

  // Extract the red, green, and blue components
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

export function hexToRgbString(hex: string) {
  // Remove the leading hash if present
  const strippedHex = hex.replace(/^#/, '');

  // Parse the hex string
  let bigint: number;
  if (strippedHex.length === 3) {
    // Handle shorthand notation (e.g., #03F)
    bigint = parseInt(
      strippedHex
        .split('')
        .map(char => char + char)
        .join(''),
      16,
    );
  } else if (strippedHex.length === 6) {
    bigint = parseInt(strippedHex, 16);
  } else {
    // Invalid hex string length
    return '';
  }

  // Extract the red, green, and blue components
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r} ${g} ${b}`;
}

export const generateUserInitials = (userName: string) => {
  const names = userName.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export interface IPayload {
  type: 'error' | 'success' | 'info';
  message?: string;
  title?: string;
}
export const Notify = ({ type, message, title }: IPayload) => {
  Toast.show({
    type: type || 'error',
    text1: title || type.toUpperCase(),
    text2: message || '',
    visibilityTime: type === 'error' ? 5000 : 3000,
  });
};

interface IObj {
  code: number;
  message: string;
}

export const handleError = (
  err: any,
  obj?: IObj,
  show = true,
  override = false,
) => {
  if (process) {
    if (envMode === 'development') {
      console.error(err);
      console.error({ err });
      console.log('keys: ', Object.keys(err));
      console.log('error1: ', err.body);
      console.log('name: ', err.name);
      console.log('code: ', err.code);
      // console.log('config: ', err.config);
      // console.log('request: ', err.request);
      console.log('error2: ', err.body?.error?.details);
      console.log('error3: ', err.body?.error);
    }
  }

  let { response } = err;
  const { body, status } = err;
  if (body && !response) {
    response = {
      data: body.error || body,
      status: body?.error?.statusCode || body?.status || status,
    };
  }
  let msg;
  let statusCode: TErrorStatusCodes;
  const constMessage =
    'Sorry, an error has occurred, Please try again or if issue persist, contact support.';
  const msgObj = {
    '404': "We can't find the resource you are looking for.",
    '400': 'Sorry, an unexpected error occurred. Please try again.',
    '600':
      'Sorry, an error occurred. Please check your internet connection and try again.',
    '500':
      'Sorry Something went wrong. We have logged this error. If you need immediate assistance, please contact our support.',
    '401': '',
    '403':
      'Sorry, You do not have a permission to access the document or program that you requested',
    '408': 'Sorry, your request took too long to process, please try again.',
    '502':
      "Sorry, we are currently experiencing a glitch with this service. Don't worry we are already aware and service will be restored as soon as possible. If you need immediate assistance, please contact our support.",
    '503':
      "Sorry, we are currently experiencing a glitch with this service. Don't worry we are already aware and service will be restored as soon as possible. If you need immediate assistance, please contact our support.",
    '504': 'Sorry, your request took too long to process, please try again.',
    '409': '',
    '0': '',
  };
  if (response && response instanceof Object) {
    statusCode = response?.status;
    const { data } = response;
    msg = data?.message || data?.error || constMessage;
    // Might fallback to this.
    // msgObj[`${statusCode}`] = msg;
  } else if (err?.name === 'ApiError') {
    statusCode = err?.status;
    msg = err?.body?.message || err?.body?.error || constMessage;
  } else {
    statusCode = 0;
  }
  if (statusCode === 409) {
    msgObj[`${statusCode}`] = msg;
  }
  if (!msgObj[`${statusCode}`]) {
    msgObj[`${statusCode}`] = constMessage;
  }
  if (obj instanceof Object) {
    msgObj[`${obj.code as TErrorStatusCodes}`] = obj.message;
  }
  if (obj instanceof Array) {
    obj.forEach(x => {
      msgObj[`${x.code as TErrorStatusCodes}`] = x.message;
    });
  }
  if (statusCode === 401 && msgObj['401'] === '') {
    return;
  }
  if (show && (statusCode !== 401 || override) && statusCode !== 0) {
    Toast.show({
      type: 'error',
      text1: 'An error occurred',
      text2: msgObj[statusCode],
    });
  }
  return { success: false, statusCode, message: msg };
};

export const isNullish = (val: unknown): val is null | undefined =>
  val === null || val === undefined || val === '';

// Filter out nullish values from an object

export const filterNullishFromObject = <T extends object>(obj: T) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => !isNullish(v)));

export const getDateOnly = (dob?: string) => {
  if (!dob) return undefined;

  return moment(dob).format('YYYY-MM-DD');
};

export const cleanUpResponseText = (text: string) => {
  return text
    .replace(/data:/g, '')
    .replace(/\n/g, '')
    .replace(/event:/g, '')
    .replace(/response_complete/g, '')
    .trim();
};

export const isNotASymbol = (char: string) => {
  return /^[a-zA-Z0-9]+$/.test(char);
};

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function isObjectEmpty<T extends object>(obj?: T): boolean {
  if (!obj) return true;

  return Object.keys(obj).length === 0;
}

export const openExternalLink = async (url: string) => {
  await Linking.openURL(url);
};

/**
 * Transparentizes a hex color by a given percentage
 * @param hexColor - The hex color code (with or without #)
 * @param percentage - The percentage to transparentize (0-100)
 * @returns The transparentized color in rgba format
 */
export function transparentizeColor(
  hexColor: string,
  percentage: number,
): string {
  // Remove the hash if present
  const hex = hexColor.replace('#', '');

  // Ensure percentage is between 0 and 100
  const alpha = Math.max(0, Math.min(percentage, 100)) / 100;

  // Parse hex color
  let r: number, g: number, b: number;

  if (hex.length === 3) {
    // Short hex format (#RGB)
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    // Full hex format (#RRGGBB)
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else if (hex.length === 8) {
    // Hex with alpha (#RRGGBBAA)
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
    // Use existing alpha as base and apply percentage to it
    const existingAlpha = parseInt(hex.substring(6, 8), 16) / 255;
    return `rgba(${r}, ${g}, ${b}, ${existingAlpha * alpha})`;
  } else {
    throw new Error('Invalid hex color format');
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Convert a React Native Asset to a standard File object
 * @param asset - The Asset object from react-native-image-picker
 * @returns Promise<File> - A standard File object
 */
export const assetToFile = (asset: Asset) => {
  return {
    name: asset?.fileName || '',
    type: asset?.type || '',
    uri:
      Platform.OS === 'ios' ? asset?.uri?.replace('file://', '') : asset?.uri,
    size: asset?.fileSize || 0,
  };
};
