/**
 * Actions Unit Tests
 *
 * Tests all store actions including:
 * - addEmployee: Creating new employee records
 * - updateEmployee: Updating existing records
 * - deleteEmployee: Removing records
 * - getEmployeeById: Finding specific employee
 * - setViewMode: Changing view mode (table/list)
 * - setLanguage: Changing application language
 */

import { expect } from '@open-wc/testing';
import {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
  setViewMode,
  setLanguage
} from '../src/store/actions.js';
import { store } from '../src/store/store.js';

describe('Actions', () => {
  beforeEach(() => {
    localStorage.clear();
    store.setState({ employees: [], viewMode: 'table', language: 'en' });
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('addEmployee', () => {
    it('should add a new employee to the store', () => {
      const employeeData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        phone: '532 123 45 67',
        department: 'Tech',
        position: 'Senior'
      };

      const newEmployee = addEmployee(employeeData);
      const state = store.getState();

      expect(state.employees).to.have.lengthOf(1);
      expect(newEmployee).to.have.property('id');
      expect(newEmployee.firstName).to.equal('John');
    });

    it('should generate unique IDs', () => {
      const employee1 = addEmployee({ firstName: 'John' });
      const employee2 = addEmployee({ firstName: 'Jane' });

      expect(employee1.id).to.not.equal(employee2.id);
      expect(employee2.id).to.be.greaterThan(employee1.id);
    });

    it('should add createdAt timestamp', () => {
      const employee = addEmployee({ firstName: 'John' });
      expect(employee).to.have.property('createdAt');
      expect(new Date(employee.createdAt)).to.be.instanceOf(Date);
    });

    it('should handle first employee correctly (ID = 1)', () => {
      const employee = addEmployee({ firstName: 'John' });
      expect(employee.id).to.equal(1);
    });

    it('should continue ID sequence after existing employees', () => {
      store.setState({
        employees: [
          { id: 1, firstName: 'John' },
          { id: 5, firstName: 'Jane' }
        ]
      });

      const employee = addEmployee({ firstName: 'Bob' });
      expect(employee.id).to.equal(6);
    });
  });

  describe('updateEmployee', () => {
    beforeEach(() => {
      addEmployee({ id: 1, firstName: 'John', lastName: 'Doe' });
    });

    it('should update existing employee', () => {
      updateEmployee(1, { firstName: 'Jane' });
      const state = store.getState();

      expect(state.employees[0].firstName).to.equal('Jane');
      expect(state.employees[0].lastName).to.equal('Doe');
    });

    it('should add updatedAt timestamp', () => {
      updateEmployee(1, { firstName: 'Jane' });
      const state = store.getState();

      expect(state.employees[0]).to.have.property('updatedAt');
      expect(new Date(state.employees[0].updatedAt)).to.be.instanceOf(Date);
    });

    it('should not affect other employees', () => {
      addEmployee({ id: 2, firstName: 'Jane', lastName: 'Smith' });
      updateEmployee(1, { firstName: 'Johnny' });

      const state = store.getState();
      expect(state.employees[1].firstName).to.equal('Jane');
    });

    it('should handle non-existent employee gracefully', () => {
      updateEmployee(999, { firstName: 'Ghost' });
      const state = store.getState();

      expect(state.employees).to.have.lengthOf(1);
      expect(state.employees[0].firstName).to.equal('John');
    });

    it('should merge updates with existing data', () => {
      updateEmployee(1, { email: 'newemail@test.com' });
      const state = store.getState();

      expect(state.employees[0].firstName).to.equal('John');
      expect(state.employees[0].email).to.equal('newemail@test.com');
    });
  });

  describe('deleteEmployee', () => {
    beforeEach(() => {
      addEmployee({ id: 1, firstName: 'John' });
      addEmployee({ id: 2, firstName: 'Jane' });
      addEmployee({ id: 3, firstName: 'Bob' });
    });

    it('should delete employee by id', () => {
      deleteEmployee(2);
      const state = store.getState();

      expect(state.employees).to.have.lengthOf(2);
      expect(state.employees.find(e => e.id === 2)).to.be.undefined;
    });

    it('should keep other employees intact', () => {
      deleteEmployee(2);
      const state = store.getState();

      expect(state.employees.find(e => e.id === 1)).to.exist;
      expect(state.employees.find(e => e.id === 3)).to.exist;
    });

    it('should handle non-existent employee gracefully', () => {
      deleteEmployee(999);
      const state = store.getState();

      expect(state.employees).to.have.lengthOf(3);
    });

    it('should handle deleting last employee', () => {
      deleteEmployee(1);
      deleteEmployee(2);
      deleteEmployee(3);

      const state = store.getState();
      expect(state.employees).to.have.lengthOf(0);
    });
  });

  describe('getEmployeeById', () => {
    beforeEach(() => {
      addEmployee({ id: 1, firstName: 'John', email: 'john@test.com' });
      addEmployee({ id: 2, firstName: 'Jane', email: 'jane@test.com' });
    });

    it('should return employee by id', () => {
      const employee = getEmployeeById(1);
      expect(employee).to.exist;
      expect(employee.firstName).to.equal('John');
    });

    it('should return undefined for non-existent id', () => {
      const employee = getEmployeeById(999);
      expect(employee).to.be.undefined;
    });

    it('should return correct employee when multiple exist', () => {
      const employee = getEmployeeById(2);
      expect(employee.firstName).to.equal('Jane');
      expect(employee.email).to.equal('jane@test.com');
    });
  });

  describe('setViewMode', () => {
    it('should update view mode to table', () => {
      setViewMode('table');
      const state = store.getState();
      expect(state.viewMode).to.equal('table');
    });

    it('should update view mode to list', () => {
      setViewMode('list');
      const state = store.getState();
      expect(state.viewMode).to.equal('list');
    });

    it('should persist view mode change', () => {
      setViewMode('list');
      const savedData = localStorage.getItem('employee_management_data');
      const savedState = JSON.parse(savedData);

      expect(savedState.viewMode).to.equal('list');
    });
  });

  describe('setLanguage', () => {
    it('should update language to English', () => {
      setLanguage('en');
      const state = store.getState();
      expect(state.language).to.equal('en');
    });

    it('should update language to Turkish', () => {
      setLanguage('tr');
      const state = store.getState();
      expect(state.language).to.equal('tr');
    });

    it('should persist language change', () => {
      setLanguage('tr');
      const savedData = localStorage.getItem('employee_management_data');
      const savedState = JSON.parse(savedData);

      expect(savedState.language).to.equal('tr');
    });
  });
});
