import {
  isValidNumber,
  PhoneInputState,
} from 'react-native-phone-number-input';

export const isEmailValid = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isPhoneNumberValid = (
  number: string,
  country: PhoneInputState['countryCode'],
) => {
  return isValidNumber(number, country);
};

export const getFormattedPhoneNumber = (
  number: string,
  countryCode: string,
) => {
  if (number === '0') {
    return `+${countryCode}${number}`;
  }

  const strippedNumber = number.replace(/([0]?)(.+)/, '$2');

  return `+${countryCode}${strippedNumber}`;
};

export const slugify = (str: string) => {
  return String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
};

export const isValidNGNPhoneNumber = (phoneNumber?: string) => {
  if (!phoneNumber) {
    return false;
  }

  // If the number starts with +234, split it into two parts
  if (!phoneNumber.startsWith('+234')) {
    return true;
  }

  const phone = phoneNumber.split('+234')[1];

  return isPhoneNumberValid(phone, 'NG');
};
