/**
 * Store Unit Tests
 *
 * Tests the Redux-like store implementation including:
 * - Initial state management
 * - State updates (setState)
 * - State retrieval (getState)
 * - Subscription mechanism
 * - LocalStorage persistence
 */

import { expect } from '@open-wc/testing';
import { createStore } from '../src/store/store.js';
import { STORAGE_KEY } from '../src/constants/index.js';

describe('Store', () => {
  let store;

  beforeEach(() => {
    localStorage.clear();
    store = createStore();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Initial State', () => {
    it('should have correct initial state structure', () => {
      const state = store.getState();
      expect(state).to.have.property('employees');
      expect(state).to.have.property('viewMode');
      expect(state).to.have.property('language');
      expect(state.employees).to.be.an('array');
      expect(state.employees).to.have.lengthOf(0);
    });

    it('should load state from localStorage if available', () => {
      const savedState = {
        employees: [{ id: 1, firstName: 'John' }],
        viewMode: 'list',
        language: 'tr'
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));

      const newStore = createStore();
      const state = newStore.getState();

      expect(state.employees).to.have.lengthOf(1);
      expect(state.viewMode).to.equal('list');
      expect(state.language).to.equal('tr');
    });
  });

  describe('setState', () => {
    it('should update state correctly', () => {
      store.setState({ viewMode: 'list' });
      const state = store.getState();
      expect(state.viewMode).to.equal('list');
    });

    it('should merge updates with existing state', () => {
      store.setState({ viewMode: 'list' });
      store.setState({ language: 'tr' });
      const state = store.getState();

      expect(state.viewMode).to.equal('list');
      expect(state.language).to.equal('tr');
    });

    it('should save state to localStorage', () => {
      store.setState({ viewMode: 'list' });
      const savedData = localStorage.getItem(STORAGE_KEY);
      const savedState = JSON.parse(savedData);

      expect(savedState.viewMode).to.equal('list');
    });

    it('should handle array updates', () => {
      const employees = [{ id: 1, firstName: 'John' }];
      store.setState({ employees });
      const state = store.getState();

      expect(state.employees).to.have.lengthOf(1);
      expect(state.employees[0].firstName).to.equal('John');
    });
  });

  describe('getState', () => {
    it('should return a copy of state (immutability)', () => {
      const state1 = store.getState();
      const state2 = store.getState();

      expect(state1).to.not.equal(state2);
      expect(state1).to.deep.equal(state2);
    });

    it('should not allow direct state mutation', () => {
      const state = store.getState();
      state.viewMode = 'list';

      const freshState = store.getState();
      expect(freshState.viewMode).to.not.equal('list');
    });
  });

  describe('subscribe', () => {
    it('should notify subscribers on state change', (done) => {
      store.subscribe((state) => {
        expect(state.viewMode).to.equal('list');
        done();
      });

      store.setState({ viewMode: 'list' });
    });

    it('should support multiple subscribers', () => {
      let callCount1 = 0;
      let callCount2 = 0;

      store.subscribe(() => { callCount1++; });
      store.subscribe(() => { callCount2++; });

      store.setState({ viewMode: 'list' });

      expect(callCount1).to.equal(1);
      expect(callCount2).to.equal(1);
    });

    it('should return unsubscribe function', () => {
      let callCount = 0;
      const unsubscribe = store.subscribe(() => { callCount++; });

      store.setState({ viewMode: 'list' });
      expect(callCount).to.equal(1);

      unsubscribe();
      store.setState({ viewMode: 'table' });
      expect(callCount).to.equal(1);
    });

    it('should handle unsubscribe correctly with multiple subscribers', () => {
      let callCount1 = 0;
      let callCount2 = 0;

      const unsubscribe1 = store.subscribe(() => { callCount1++; });
      store.subscribe(() => { callCount2++; });

      store.setState({ viewMode: 'list' });
      expect(callCount1).to.equal(1);
      expect(callCount2).to.equal(1);

      unsubscribe1();
      store.setState({ viewMode: 'table' });
      expect(callCount1).to.equal(1);
      expect(callCount2).to.equal(2);
    });
  });

  describe('LocalStorage Error Handling', () => {
    it('should handle localStorage.getItem errors gracefully', () => {
      const originalGetItem = localStorage.getItem;
      localStorage.getItem = () => { throw new Error('Storage error'); };

      const newStore = createStore();
      const state = newStore.getState();

      expect(state.employees).to.be.an('array');
      localStorage.getItem = originalGetItem;
    });

    it('should handle localStorage.setItem errors gracefully', () => {
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = () => { throw new Error('Storage error'); };

      expect(() => {
        store.setState({ viewMode: 'list' });
      }).to.not.throw();

      localStorage.setItem = originalSetItem;
    });

    it('should handle invalid JSON in localStorage', () => {
      localStorage.setItem(STORAGE_KEY, 'invalid json');
      const newStore = createStore();
      const state = newStore.getState();

      expect(state.employees).to.be.an('array');
    });
  });
});
