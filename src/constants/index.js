/**
 * App Constants
 */

export const STORAGE_KEY = 'employee_management_data';

export const DEPARTMENTS = [
  { value: 'Analytics', labelKey: 'departments.analytics' },
  { value: 'Tech', labelKey: 'departments.tech' },
];

export const POSITIONS = [
  { value: 'Junior', labelKey: 'positions.junior' },
  { value: 'Medior', labelKey: 'positions.medior' },
  { value: 'Senior', labelKey: 'positions.senior' },
];

export const PHONE_CONFIG = {
  countryCode: '+90',
  maxLength: 10,
  format: 'XXX XXX XX XX',
  placeholder: '532 123 45 67',
};

export const VIEW_MODES = {
  TABLE: 'table',
  LIST: 'list',
};

export const DATE_CONSTRAINTS = {
  minAge: 18,
  maxAge: 100,
};

export function getDepartmentOptions(t) {
  return DEPARTMENTS.map(dept => ({
    value: dept.value,
    label: t(dept.labelKey),
  }));
}

export function getPositionOptions(t) {
  return POSITIONS.map(pos => ({
    value: pos.value,
    label: t(pos.labelKey),
  }));
}
