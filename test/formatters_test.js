/**
 * Formatters Unit Tests
 *
 * Tests utility formatting functions:
 * - formatDate: Date string formatting with locale support
 * - formatPhone: Phone number formatting with country code
 */

import { expect } from '@open-wc/testing';
import { formatDate, formatPhone } from '../src/utils/formatters.js';

describe('Formatters', () => {
  describe('formatDate', () => {
    it('should format date string correctly', () => {
      const formatted = formatDate('2024-01-15');
      expect(formatted).to.be.a('string');
      expect(formatted.length).to.be.greaterThan(0);
    });

    it('should handle different date formats', () => {
      const formatted = formatDate('2024-12-31');
      expect(formatted).to.include('2024');
    });

    it('should return empty string for empty input', () => {
      const formatted = formatDate('');
      expect(formatted).to.equal('');
    });

    it('should return empty string for invalid date', () => {
      const formatted = formatDate('invalid-date');
      expect(formatted).to.equal('');
    });

    it('should return empty string for null', () => {
      const formatted = formatDate(null);
      expect(formatted).to.equal('');
    });

    it('should handle undefined', () => {
      const formatted = formatDate(undefined);
      expect(formatted).to.equal('');
    });

    it('should support Turkish locale', () => {
      const formatted = formatDate('2024-01-15', 'tr-TR');
      expect(formatted).to.be.a('string');
    });

    it('should support English locale', () => {
      const formatted = formatDate('2024-01-15', 'en-US');
      expect(formatted).to.be.a('string');
    });
  });

  describe('formatPhone', () => {
    it('should format phone with country code', () => {
      const formatted = formatPhone('532 123 45 67');
      expect(formatted).to.equal('(+90) 532 123 45 67');
    });

    it('should handle different country codes', () => {
      const formatted = formatPhone('532 123 45 67', '+1');
      expect(formatted).to.equal('(+1) 532 123 45 67');
    });

    it('should return empty string for empty input', () => {
      const formatted = formatPhone('');
      expect(formatted).to.equal('');
    });

    it('should return empty string for null', () => {
      const formatted = formatPhone(null);
      expect(formatted).to.equal('');
    });

    it('should handle undefined', () => {
      const formatted = formatPhone(undefined);
      expect(formatted).to.equal('');
    });

    it('should use default country code if not provided', () => {
      const formatted = formatPhone('532 123 45 67');
      expect(formatted).to.include('+90');
    });
  });
});
