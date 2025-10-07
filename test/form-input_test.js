/**
 * FormInput Component Tests
 *
 * Tests the reusable form input component:
 * - Rendering with different props
 * - Input value binding
 * - Error message display
 * - Helper text display
 * - Event dispatching (input-change, input-blur)
 * - Required field indication
 * - Different input types (text, email, tel, date)
 */

import { html, fixture, expect } from '@open-wc/testing';
import '../src/components/form-input.js';

describe('FormInput', () => {
  it('should render with label', async () => {
    const el = await fixture(html`
      <form-input label="Test Label"></form-input>
    `);

    const label = el.shadowRoot.querySelector('.form-label');
    expect(label.textContent.trim()).to.include('Test Label');
  });

  it('should render with value', async () => {
    const el = await fixture(html`
      <form-input value="Test Value"></form-input>
    `);

    const input = el.shadowRoot.querySelector('input');
    expect(input.value).to.equal('Test Value');
  });

  it('should show required indicator', async () => {
    const el = await fixture(html`
      <form-input label="Name" required></form-input>
    `);

    const required = el.shadowRoot.querySelector('.required');
    expect(required).to.exist;
    expect(required.textContent).to.equal('*');
  });

  it('should display error message', async () => {
    const el = await fixture(html`
      <form-input error="This field is required"></form-input>
    `);

    const errorMsg = el.shadowRoot.querySelector('.error-message');
    expect(errorMsg.textContent).to.equal('This field is required');
  });

  it('should display helper text', async () => {
    const el = await fixture(html`
      <form-input helperText="Enter your name"></form-input>
    `);

    const helperText = el.shadowRoot.querySelector('.helper-text');
    expect(helperText).to.exist;
    expect(helperText.textContent).to.equal('Enter your name');
  });

  it('should apply error class when error exists', async () => {
    const el = await fixture(html`
      <form-input error="Error message"></form-input>
    `);

    const input = el.shadowRoot.querySelector('input');
    expect(input.classList.contains('error')).to.be.true;
  });

  it('should support different input types', async () => {
    const el = await fixture(html`
      <form-input type="email"></form-input>
    `);

    const input = el.shadowRoot.querySelector('input');
    expect(input.type).to.equal('email');
  });

  it('should dispatch input-change event', async () => {
    const el = await fixture(html`
      <form-input name="testField"></form-input>
    `);

    let eventDetail;
    el.addEventListener('input-change', (e) => {
      eventDetail = e.detail;
    });

    const input = el.shadowRoot.querySelector('input');
    input.value = 'New Value';
    input.dispatchEvent(new Event('input'));

    expect(eventDetail).to.exist;
    expect(eventDetail.name).to.equal('testField');
    expect(eventDetail.value).to.equal('New Value');
  });

  it('should dispatch input-blur event', async () => {
    const el = await fixture(html`
      <form-input name="testField"></form-input>
    `);

    let eventFired = false;
    el.addEventListener('input-blur', (e) => {
      eventFired = true;
      expect(e.detail.name).to.equal('testField');
    });

    const input = el.shadowRoot.querySelector('input');
    input.dispatchEvent(new Event('blur'));

    expect(eventFired).to.be.true;
  });

  it('should handle placeholder', async () => {
    const el = await fixture(html`
      <form-input placeholder="Enter text"></form-input>
    `);

    const input = el.shadowRoot.querySelector('input');
    expect(input.placeholder).to.equal('Enter text');
  });

  it('should handle maxlength', async () => {
    const el = await fixture(html`
      <form-input maxlength="10"></form-input>
    `);

    const input = el.shadowRoot.querySelector('input');
    expect(input.maxLength).to.equal(10);
  });

  it('should update value property reactively', async () => {
    const el = await fixture(html`
      <form-input value="Initial"></form-input>
    `);

    el.value = 'Updated';
    await el.updateComplete;

    const input = el.shadowRoot.querySelector('input');
    expect(input.value).to.equal('Updated');
  });

  it('should clear error message when error prop is removed', async () => {
    const el = await fixture(html`
      <form-input error="Error"></form-input>
    `);

    el.error = '';
    await el.updateComplete;

    const errorMsg = el.shadowRoot.querySelector('.error-message');
    expect(errorMsg.textContent).to.equal('');
  });
});
