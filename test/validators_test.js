/**
 * Validators Unit Tests
 *
 * Tests all validation functions including:
 * - validateRequired: Required field validation
 * - validateEmail: Email format and uniqueness validation
 * - validatePhone: Turkish phone number validation
 * - validateDateOfBirth: Birth date validation (age, future date)
 * - validateDateOfEmployment: Employment date validation
 * - formatPhoneNumber: Phone number formatting
 * - validateEmployeeForm: Complete form validation
 */

import { expect } from '@open-wc/testing';
import {
  validateRequired,
  validateEmail,
  validatePhone,
  validateDateOfBirth,
  validateDateOfEmployment,
  formatPhoneNumber,
  validateEmployeeForm,
  validateUniqueEmail
} from '../src/utils/validators.js';

describe('Validators', () => {
  describe('validateRequired', () => {
    it('should return error for empty string', () => {
      const error = validateRequired('');
      expect(error).to.be.a('string');
      expect(error).to.not.be.null;
    });

    it('should return error for whitespace only', () => {
      const error = validateRequired('   ');
      expect(error).to.be.a('string');
    });

    it('should return null for valid value', () => {
      const error = validateRequired('John');
      expect(error).to.be.null;
    });

    it('should return error for null', () => {
      const error = validateRequired(null);
      expect(error).to.be.a('string');
    });

    it('should return error for undefined', () => {
      const error = validateRequired(undefined);
      expect(error).to.be.a('string');
    });
  });

  describe('validateEmail', () => {
    it('should return null for valid email', () => {
      const error = validateEmail('test@example.com');
      expect(error).to.be.null;
    });

    it('should return error for invalid email format', () => {
      const error = validateEmail('invalid-email');
      expect(error).to.be.a('string');
    });

    it('should return error for email without @', () => {
      const error = validateEmail('invalidemail.com');
      expect(error).to.be.a('string');
    });

    it('should return error for email without domain', () => {
      const error = validateEmail('test@');
      expect(error).to.be.a('string');
    });
  });

  describe('validateUniqueEmail', () => {
    it('should return error for duplicate email', () => {
      const existingEmployees = [{ email: 'test@example.com', id: 1 }];
      const error = validateUniqueEmail('test@example.com', existingEmployees);
      expect(error).to.be.a('string');
    });

    it('should allow same email for same employee (edit mode)', () => {
      const existingEmployees = [{ email: 'test@example.com', id: 1 }];
      const error = validateUniqueEmail('test@example.com', existingEmployees, 1);
      expect(error).to.be.null;
    });

    it('should handle case sensitivity correctly', () => {
      const existingEmployees = [{ email: 'test@example.com', id: 1 }];
      const error = validateUniqueEmail('TEST@EXAMPLE.COM', existingEmployees);
      expect(error).to.be.a('string');
    });
  });

  describe('validatePhone', () => {
    it('should return null for valid phone number', () => {
      const error = validatePhone('532 123 45 67');
      expect(error).to.be.null;
    });

    it('should return error for invalid format', () => {
      const error = validatePhone('123456');
      expect(error).to.be.a('string');
    });

    it('should return error for letters', () => {
      const error = validatePhone('abc def gh ij');
      expect(error).to.be.a('string');
    });

    it('should return error for phone without spaces', () => {
      const error = validatePhone('5321234567');
      expect(error).to.be.a('string');
    });

    it('should return error for short numbers', () => {
      const error = validatePhone('532 123 45');
      expect(error).to.be.a('string');
    });

    it('should return error for long numbers', () => {
      const error = validatePhone('532 123 45 67 89');
      expect(error).to.be.a('string');
    });
  });

  describe('validateDateOfBirth', () => {
    it('should return null for valid date (over 18)', () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 25);
      const dateString = date.toISOString().split('T')[0];
      const error = validateDateOfBirth(dateString);
      expect(error).to.be.null;
    });

    it('should return error for future date', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const dateString = futureDate.toISOString().split('T')[0];
      const error = validateDateOfBirth(dateString);
      expect(error).to.be.a('string');
    });

    it('should return error for age under 18', () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 17);
      const dateString = date.toISOString().split('T')[0];
      const error = validateDateOfBirth(dateString);
      expect(error).to.be.a('string');
    });

    it('should accept exactly 18 years old', () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 18);
      date.setDate(date.getDate() - 1);
      const dateString = date.toISOString().split('T')[0];
      const error = validateDateOfBirth(dateString);
      expect(error).to.be.null;
    });

    it('should return error for invalid date format', () => {
      const error = validateDateOfBirth('invalid-date');
      expect(error).to.be.a('string');
    });
  });

  describe('validateDateOfEmployment', () => {
    it('should return null for valid past date', () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 1);
      const dateString = date.toISOString().split('T')[0];
      const error = validateDateOfEmployment(dateString);
      expect(error).to.be.null;
    });

    it('should return null for today', () => {
      const dateString = new Date().toISOString().split('T')[0];
      const error = validateDateOfEmployment(dateString);
      expect(error).to.be.null;
    });

    it('should return error for future date', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const dateString = futureDate.toISOString().split('T')[0];
      const error = validateDateOfEmployment(dateString);
      expect(error).to.be.a('string');
    });

    it('should return error for invalid date format', () => {
      const error = validateDateOfEmployment('invalid-date');
      expect(error).to.be.a('string');
    });
  });

  describe('formatPhoneNumber', () => {
    it('should format 10 digits correctly', () => {
      const formatted = formatPhoneNumber('5321234567');
      expect(formatted).to.equal('532 123 45 67');
    });

    it('should keep already formatted numbers', () => {
      const formatted = formatPhoneNumber('532 123 45 67');
      expect(formatted).to.equal('532 123 45 67');
    });

    it('should remove non-digits', () => {
      const formatted = formatPhoneNumber('532-123-45-67');
      expect(formatted).to.equal('532 123 45 67');
    });

    it('should handle partial input', () => {
      const formatted = formatPhoneNumber('532');
      expect(formatted).to.equal('532');
    });

    it('should handle empty string', () => {
      const formatted = formatPhoneNumber('');
      expect(formatted).to.equal('');
    });

    it('should limit to 10 digits', () => {
      const formatted = formatPhoneNumber('53212345678999');
      expect(formatted).to.equal('532 123 45 67');
    });
  });

  describe('validateEmployeeForm', () => {
    const validFormData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      phone: '532 123 45 67',
      dateOfBirth: '1990-01-01',
      dateOfEmployment: '2020-01-01',
      department: 'Tech',
      position: 'Senior'
    };

    it('should return empty object for valid form', () => {
      const errors = validateEmployeeForm(validFormData, []);
      expect(Object.keys(errors)).to.have.lengthOf(0);
    });

    it('should return errors for missing required fields', () => {
      const errors = validateEmployeeForm({}, []);
      expect(errors).to.have.property('firstName');
      expect(errors).to.have.property('lastName');
      expect(errors).to.have.property('email');
      expect(errors).to.have.property('phone');
    });

    it('should validate email uniqueness', () => {
      const existingEmployees = [{ id: 1, email: 'john@test.com' }];
      const errors = validateEmployeeForm(validFormData, existingEmployees);
      expect(errors).to.have.property('email');
    });

    it('should allow same email in edit mode', () => {
      const existingEmployees = [{ id: 1, email: 'john@test.com' }];
      const errors = validateEmployeeForm(validFormData, existingEmployees, 1);
      expect(errors).to.not.have.property('email');
    });

    it('should validate all fields together', () => {
      const invalidData = {
        firstName: '',
        lastName: '',
        email: 'invalid',
        phone: '123',
        dateOfBirth: '2030-01-01',
        dateOfEmployment: '2030-01-01'
      };
      const errors = validateEmployeeForm(invalidData, []);
      expect(Object.keys(errors).length).to.be.greaterThan(4);
    });
  });
});
