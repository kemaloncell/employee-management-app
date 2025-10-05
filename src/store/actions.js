import { store } from './store.js';

export function addEmployee(employeeData) {
  const state = store.getState();

  const newEmployee = {
    id: Date.now(),
    ...employeeData
  };

  store.setState({
    employees: [...state.employees, newEmployee]
  });
}

export function updateEmployee(id, updatedData) {
  const state = store.getState();

  const employees = state.employees.map(emp =>
    emp.id === id ? { ...emp, ...updatedData } : emp
  );

  store.setState({ employees });
}

export function deleteEmployee(id) {
  const state = store.getState();
  const employees = state.employees.filter(emp => emp.id !== id);
  store.setState({ employees });
}

export function getEmployeeById(id) {
  const state = store.getState();
  return state.employees.find(emp => emp.id === id);
}

export function setViewMode(mode) {
  if (mode !== 'table' && mode !== 'list') {
    console.warn('Invalid view mode:', mode);
    return;
  }

  store.setState({ viewMode: mode });
}

export function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'tr') {
    console.warn('Invalid language:', lang);
    return;
  }

  store.setState({ language: lang });
}
