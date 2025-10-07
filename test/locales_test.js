/**
 * Locales Unit Tests
 *
 * Tests internationalization (i18n) functionality:
 * - getCurrentLanguage: Get current application language
 * - setCurrentLanguage: Change application language
 * - t: Translation function with parameter substitution
 * - Language switching and persistence
 */

import { expect } from '@open-wc/testing';
import { getCurrentLanguage, setCurrentLanguage, t } from '../src/locales/index.js';

describe('Locales', () => {
  beforeEach(() => {
    setCurrentLanguage('en');
  });

  describe('getCurrentLanguage', () => {
    it('should return current language', () => {
      const lang = getCurrentLanguage();
      expect(lang).to.be.oneOf(['en', 'tr']);
    });

    it('should return default language (en)', () => {
      setCurrentLanguage('en');
      expect(getCurrentLanguage()).to.equal('en');
    });
  });

  describe('setCurrentLanguage', () => {
    it('should change language to Turkish', () => {
      setCurrentLanguage('tr');
      expect(getCurrentLanguage()).to.equal('tr');
    });

    it('should change language to English', () => {
      setCurrentLanguage('en');
      expect(getCurrentLanguage()).to.equal('en');
    });

    it('should dispatch language-changed event', (done) => {
      window.addEventListener('language-changed', (e) => {
        expect(e.detail.lang).to.equal('tr');
        done();
      }, { once: true });

      setCurrentLanguage('tr');
    });
  });

  describe('t (translation function)', () => {
    it('should translate English key', () => {
      setCurrentLanguage('en');
      const translated = t('nav.employees');
      expect(translated).to.equal('Employees');
    });

    it('should translate Turkish key', () => {
      setCurrentLanguage('tr');
      const translated = t('nav.employees');
      expect(translated).to.equal('Çalışanlar');
    });

    it('should handle nested keys', () => {
      setCurrentLanguage('en');
      const translated = t('form.firstName');
      expect(translated).to.be.a('string');
      expect(translated.length).to.be.greaterThan(0);
    });

    it('should return key if translation not found', () => {
      const translated = t('non.existent.key');
      expect(translated).to.equal('non.existent.key');
    });

    it('should return translation with placeholder', () => {
      setCurrentLanguage('en');
      const translated = t('confirmations.deleteMessage');
      expect(translated).to.include('{name}');
    });

    it('should work with Turkish translations', () => {
      setCurrentLanguage('tr');
      const translated = t('form.addTitle');
      expect(translated).to.include('Çalışan');
    });

    it('should handle multiple parameters', () => {
      const translated = t('validation.unique', { field: 'email' });
      expect(translated).to.be.a('string');
    });
  });

  describe('Language Persistence', () => {
    it('should maintain language across calls', () => {
      setCurrentLanguage('tr');
      expect(getCurrentLanguage()).to.equal('tr');
      expect(getCurrentLanguage()).to.equal('tr');
    });

    it('should allow multiple language switches', () => {
      setCurrentLanguage('en');
      expect(getCurrentLanguage()).to.equal('en');

      setCurrentLanguage('tr');
      expect(getCurrentLanguage()).to.equal('tr');

      setCurrentLanguage('en');
      expect(getCurrentLanguage()).to.equal('en');
    });
  });

  describe('Translation Coverage', () => {
    it('should have navigation translations', () => {
      setCurrentLanguage('en');
      expect(t('nav.employees')).to.not.equal('nav.employees');
      expect(t('nav.addNew')).to.not.equal('nav.addNew');
    });

    it('should have form translations', () => {
      setCurrentLanguage('en');
      expect(t('form.firstName')).to.not.equal('form.firstName');
      expect(t('form.lastName')).to.not.equal('form.lastName');
      expect(t('form.email')).to.not.equal('form.email');
    });

    it('should have validation translations', () => {
      setCurrentLanguage('en');
      expect(t('validation.required')).to.not.equal('validation.required');
      expect(t('validation.email')).to.not.equal('validation.email');
    });

    it('should have department translations', () => {
      setCurrentLanguage('en');
      expect(t('departments.tech')).to.not.equal('departments.tech');
      expect(t('departments.analytics')).to.not.equal('departments.analytics');
    });

    it('should have position translations', () => {
      setCurrentLanguage('en');
      expect(t('positions.junior')).to.not.equal('positions.junior');
      expect(t('positions.medior')).to.not.equal('positions.medior');
      expect(t('positions.senior')).to.not.equal('positions.senior');
    });
  });
});
