let state = {
  employees: [],
  viewMode: 'table',
  language: 'en'
};

let listeners = [];

export const store = {
  getState: () => state,

  setState: (newState) => {
    state = { ...state, ...newState };
    listeners.forEach(listener => listener(state));
  },

  subscribe: (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }
};
