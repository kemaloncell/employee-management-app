const STORAGE_KEY = 'employee_management_data';

const initialState = {
  employees: [],
  viewMode: 'table',
  language: 'en',
};

function createStore() {
  let state = loadFromStorage() || { ...initialState };
  let subscribers = [];

  function loadFromStorage() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading from storage:', error);
      return null;
    }
  }

  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  function subscribe(callback) {
    subscribers.push(callback);
    return () => {
      subscribers = subscribers.filter(sub => sub !== callback);
    };
  }

  function notify() {
    subscribers.forEach(callback => callback(state));
  }

  function getState() {
    return JSON.parse(JSON.stringify(state));
  }

  function setState(updates) {
    state = { ...state, ...updates };
    saveToStorage();
    notify();
  }

  return {
    getState,
    setState,
    subscribe,
  };
}

export const store = createStore();

export { createStore };
