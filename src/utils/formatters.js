export function formatDate(dateString, locale = 'tr-TR') {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString(locale);
}

export function formatPhone(phone, countryCode = '+90') {
  if (!phone) return '';
  return `(${countryCode}) ${phone}`;
}
