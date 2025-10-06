export const DEPARTMENTS = {
  ANALYTICS: 'Analytics',
  TECH: 'Tech'
};

export const POSITIONS = {
  JUNIOR: 'Junior',
  MEDIOR: 'Medior',
  SENIOR: 'Senior'
};

export const PHONE_CONFIG = {
  placeholder: '532 123 45 67',
  maxLength: 13
};

export function getDepartmentOptions(t) {
  return [
    { value: DEPARTMENTS.ANALYTICS, label: t('departments.analytics') },
    { value: DEPARTMENTS.TECH, label: t('departments.tech') }
  ];
}

export function getPositionOptions(t) {
  return [
    { value: POSITIONS.JUNIOR, label: t('positions.junior') },
    { value: POSITIONS.MEDIOR, label: t('positions.medior') },
    { value: POSITIONS.SENIOR, label: t('positions.senior') }
  ];
}
