export const removeEmptyFields = <T extends Record<string, any>>(obj: T): Partial<T> => {
  const newObj: Partial<T> = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '' && !Array.isArray(value)) {
      newObj[key as keyof T] = value;
    } else if (Array.isArray(value) && value.length > 0) {
      newObj[key as keyof T] = value as T[keyof T];
    }
  });

  return newObj;
};

export const normalizePhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) {
    return '';
  }

  return phoneNumber.replace(/[\s()-]/g, '');
};

export const formatPhoneNumber = (phoneNumber: string) => {
  let digitsOnly = phoneNumber.replace(/\D/g, '');

  if (digitsOnly.startsWith('8')) {
    digitsOnly.replace(/^8/, '7');
  } else if (digitsOnly.startsWith('+7')) {
    digitsOnly = '+7' + digitsOnly;
  }

  // Форматируем номер в требуемый формат
  return digitsOnly.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
};

export const plural = (forms: Array<string>, n: number) => {
  let idx;
  // @see http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html
  if (n % 10 === 1 && n % 100 !== 11) {
    idx = 0; // many
  } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
    idx = 1; // few
  } else {
    idx = 2; // one
  }
  return forms[idx] || '';
};

export function formatDate(date: Date, format: string): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace('dd', day)
    .replace('mm', month)
    .replace('yy', year)
    .replace('hh', hours)
    .replace('MM', minutes)
    .replace('ss', seconds);
}

export const getTimeFromDate = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const createDateWithTime = (time: string): Date => {
  const [hoursStr, minutesStr] = time.split(':');
  
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  
  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error('Переданое время не соответствует формату HH:mm');
  }

  const date = new Date();
  date.setHours(hours, minutes);
  return date;
};

export const areObjectsEqual = <T extends Record<string, any>>(obj1: T, obj2: T): boolean => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};

export const areDateEqualInTime = (date1: Date, date2: Date): boolean => {
  return date1.getTime() === date2.getTime();
};

export const getEnvVariable = (key: string) => {
  if (import.meta.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }

  return import.meta.env[key];
};