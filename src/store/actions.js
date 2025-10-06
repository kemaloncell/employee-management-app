import { store } from './store.js';


export function addEmployee(employee) {
  const state = store.getState();

  const newId = state.employees.length > 0
    ? Math.max(...state.employees.map(e => e.id)) + 1
    : 1;

  const newEmployee = {
    id: newId,
    ...employee,
    createdAt: new Date().toISOString(),
  };

  store.setState({
    employees: [...state.employees, newEmployee],
  });

  return newEmployee;
}

export function updateEmployee(id, updates) {
  const state = store.getState();

  const updatedEmployees = state.employees.map(employee =>
    employee.id === id
      ? { ...employee, ...updates, updatedAt: new Date().toISOString() }
      : employee
  );

  store.setState({
    employees: updatedEmployees,
  });
}

export function deleteEmployee(id) {
  const state = store.getState();

  const filteredEmployees = state.employees.filter(
    employee => employee.id !== id
  );

  store.setState({
    employees: filteredEmployees,
  });
}

export function getEmployeeById(id) {
  const state = store.getState();
  return state.employees.find(employee => employee.id === id);
}

export function setViewMode(mode) {
  store.setState({ viewMode: mode });
}

export function setLanguage(lang) {
  store.setState({ language: lang });
}
