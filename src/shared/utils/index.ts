export const removeEmptyFields = (obj: any): any => {
  const newObj = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '' && !Array.isArray(value)) {
      newObj[key] = value;
    } else if (Array.isArray(value) && value.length > 0) {
      newObj[key] = value;
    }
  });

  return newObj;
}

export const normalizePhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/[\s()-]/g, '');
}

export const formatPhoneNumber = (phoneNumber: string) => {
  let digitsOnly = phoneNumber.replace(/\D/g, '');

  if (digitsOnly.startsWith('8')) {
    digitsOnly.replace(/^8/, '7');
  } else if (digitsOnly.startsWith('+7')) {
    digitsOnly = '+7' + digitsOnly;
  }

  // Форматируем номер в требуемый формат
  return digitsOnly.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
}