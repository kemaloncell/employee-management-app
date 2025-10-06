export function validateRequired(value) {
  if (!value || !value.trim()) {
    return 'This field is required';
  }
  return null;
}

export function validateEmail(email) {
  if (!email) return 'Email is required';

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return 'Invalid email format';
  }
  return null;
}

export function validatePhone(phone) {
  if (!phone) return 'Phone is required';

  const phonePattern = /^\d{3}\s\d{3}\s\d{2}\s\d{2}$/;
  if (!phonePattern.test(phone)) {
    return 'Invalid phone format (532 123 45 67)';
  }
  return null;
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

export function validateDate(date) {
  if (!date) return 'Date is required';

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
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
    return 'Birth date cannot be in the future';
  }

  if (age < 18) {
    return 'Employee must be at least 18 years old';
  }

  return null;
}

export function validateDateOfEmployment(date) {
  const dateError = validateDate(date);
  if (dateError) return dateError;

  const dateObj = new Date(date);
  const today = new Date();

  if (dateObj > today) {
    return 'Employment date cannot be in the future';
  }

  return null;
}

export function validateUniqueEmail(email, employees, currentEmployeeId = null) {
  const duplicate = employees.find(emp =>
    emp.email.toLowerCase() === email.toLowerCase() &&
    emp.id !== currentEmployeeId
  );

  if (duplicate) {
    return 'This email is already in use';
  }

  return null;
}

export function validateEmployeeForm(formData, employees, employeeId = null) {
  const errors = {};

  const firstNameError = validateRequired(formData.firstName);
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = validateRequired(formData.lastName);
  if (lastNameError) errors.lastName = lastNameError;

  const emailError = validateEmail(formData.email);
  if (emailError) {
    errors.email = emailError;
  } else {
    const uniqueError = validateUniqueEmail(formData.email, employees, employeeId);
    if (uniqueError) errors.email = uniqueError;
  }

  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;

  const dobError = validateDateOfBirth(formData.dateOfBirth);
  if (dobError) errors.dateOfBirth = dobError;

  const doeError = validateDateOfEmployment(formData.dateOfEmployment);
  if (doeError) errors.dateOfEmployment = doeError;

  const deptError = validateRequired(formData.department);
  if (deptError) errors.department = deptError;

  const posError = validateRequired(formData.position);
  if (posError) errors.position = posError;

  return errors;
}
