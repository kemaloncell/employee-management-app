import { t } from '../locales/index.js';
import { DATE_CONSTRAINTS } from '../constants/index.js';

export function validateRequired(value) {
  if (!value || value.trim() === '') {
    return t('validation.required');
  }
  return null;
}

export function validateEmail(email) {
  const requiredError = validateRequired(email);
  if (requiredError) return requiredError;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return t('validation.email');
  }

  return null;
}

export function validatePhone(phone) {
  const requiredError = validateRequired(phone);
  if (requiredError) return requiredError;

  const phonePattern = /^\d{3}\s\d{3}\s\d{2}\s\d{2}$/;
  if (!phonePattern.test(phone)) {
    return t('validation.phone');
  }

  return null;
}

export function validateDate(date) {
  const requiredError = validateRequired(date);
  if (requiredError) return requiredError;

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return t('validation.date');
  }

  return null;
}

export function validateDateOfBirth(date) {
  const dateError = validateDate(date);
  if (dateError) return dateError;

  const dateObj = new Date(date);
  const today = new Date();
  const age = today.getFullYear() - dateObj.getFullYear();

  if (dateObj > today) {
    return t('validation.dateOfBirthFuture');
  }

  if (age < DATE_CONSTRAINTS.minAge) {
    return t('validation.dateOfBirthAge');
  }

  return null;
}

export function validateDateOfEmployment(date) {
  const dateError = validateDate(date);
  if (dateError) return dateError;

  const dateObj = new Date(date);
  const today = new Date();

  if (dateObj > today) {
    return t('validation.dateOfEmploymentFuture');
  }

  return null;
}

export function validateUniqueEmail(email, employees, currentEmployeeId = null) {
  const duplicate = employees.find(emp =>
    emp.email.toLowerCase() === email.toLowerCase() &&
    emp.id !== currentEmployeeId
  );

  if (duplicate) {
    return t('validation.unique', { field: 'email' });
  }

  return null;
}

export function validateEmployeeForm(formData, employees, currentEmployeeId = null) {
  const errors = {};

  const firstNameError = validateRequired(formData.firstName);
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = validateRequired(formData.lastName);
  if (lastNameError) errors.lastName = lastNameError;

  const emailError = validateEmail(formData.email);
  if (emailError) {
    errors.email = emailError;
  } else {
    const uniqueError = validateUniqueEmail(formData.email, employees, currentEmployeeId);
    if (uniqueError) errors.email = uniqueError;
  }

  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;

  const dobError = validateDateOfBirth(formData.dateOfBirth);
  if (dobError) errors.dateOfBirth = dobError;

  const doeError = validateDateOfEmployment(formData.dateOfEmployment);
  if (doeError) errors.dateOfEmployment = doeError;

  const departmentError = validateRequired(formData.department);
  if (departmentError) errors.department = departmentError;

  const positionError = validateRequired(formData.position);
  if (positionError) errors.position = positionError;

  return errors;
}

export function formatPhoneNumber(phone) {
  if (!phone) return '';

  let digits = phone.replace(/\D/g, '');

  if (digits.startsWith('90') && digits.length > 10) {
    digits = digits.slice(2);
  }

  if (digits.length > 10) {
    digits = digits.slice(0, 10);
  }

  // Format: 532 123 45 67
  if (digits.length <= 3) {
    return digits;
  } else if (digits.length <= 6) {
    return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  } else if (digits.length <= 8) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  } else {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
  }
}
