import { LitElement, html } from 'lit';
import { store } from './store/store.js';
import { addEmployee, updateEmployee, deleteEmployee } from './store/actions.js';

class AppRoot extends LitElement {
  static properties = {
    employees: { type: Array }
  };

  constructor() {
    super();
    this.employees = [];

    const state = store.getState();
    this.employees = state.employees;

    this.unsubscribe = store.subscribe((state) => {
      console.log('State changed:', state);
      this.employees = state.employees;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  _addTestEmployee() {
    addEmployee({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '532 123 45 67',
      dateOfBirth: '1990-01-01',
      dateOfEmployment: '2020-01-01',
      department: 'Tech',
      position: 'Senior'
    });
  }

  _addAnotherEmployee() {
    addEmployee({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '533 234 56 78',
      dateOfBirth: '1992-05-20',
      dateOfEmployment: '2021-06-15',
      department: 'Analytics',
      position: 'Medior'
    });
  }

  _updateFirstEmployee() {
    if (this.employees.length > 0) {
      const firstEmployee = this.employees[0];
      updateEmployee(firstEmployee.id, {
        position: 'Lead Developer'
      });
    }
  }

  _deleteFirstEmployee() {
    if (this.employees.length > 0) {
      const firstEmployee = this.employees[0];
      deleteEmployee(firstEmployee.id);
    }
  }

  render() {
    return html`
      <div style="padding: 20px; font-family: sans-serif;">
        <h1>AŞAMA 2: Store Test</h1>

        <div style="margin-bottom: 20px;">
          <h2>Test Butonları</h2>
          <button @click="${this._addTestEmployee}" style="padding: 10px; margin: 5px;">
            Add John Doe
          </button>
          <button @click="${this._addAnotherEmployee}" style="padding: 10px; margin: 5px;">
            Add Jane Smith
          </button>
          <button @click="${this._updateFirstEmployee}" style="padding: 10px; margin: 5px;">
            Update First Employee
          </button>
          <button @click="${this._deleteFirstEmployee}" style="padding: 10px; margin: 5px;">
            Delete First Employee
          </button>
        </div>

        <div>
          <h2>Employees (${this.employees.length})</h2>
          ${this.employees.length === 0 ? html`
            <p>No employees yet. Click "Add John Doe" to add one!</p>
          ` : html`
            <ul>
              ${this.employees.map(emp => html`
                <li>
                  <strong>${emp.firstName} ${emp.lastName}</strong> -
                  ${emp.position} at ${emp.department}
                  (${emp.email})
                </li>
              `)}
            </ul>
          `}
        </div>
      </div>
    `;
  }
}

customElements.define('app-root', AppRoot);

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  const appRoot = document.createElement('app-root');
  appContainer.appendChild(appRoot);
});
