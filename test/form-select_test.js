/**
 * FormSelect Component Tests
 *
 * Tests the reusable form select component:
 * - Rendering with options
 * - Value binding
 * - Error message display
 * - Event dispatching (select-change, select-blur)
 * - Required field indication
 * - Placeholder option
 */

import { html, fixture, expect } from '@open-wc/testing';
import '../src/components/form-select.js';

describe('FormSelect', () => {
  const testOptions = [
    { value: 'tech', label: 'Technology' },
    { value: 'analytics', label: 'Analytics' }
  ];

  it('should render with label', async () => {
    const el = await fixture(html`
      <form-select label="Department"></form-select>
    `);

    const label = el.shadowRoot.querySelector('.form-label');
    expect(label.textContent.trim()).to.include('Department');
  });

  it('should render options', async () => {
    const el = await fixture(html`
      <form-select .options="${testOptions}"></form-select>
    `);

    const options = el.shadowRoot.querySelectorAll('option');
    expect(options.length).to.be.at.least(2);
  });

  it('should show required indicator', async () => {
    const el = await fixture(html`
      <form-select label="Department" required></form-select>
    `);

    const required = el.shadowRoot.querySelector('.required');
    expect(required).to.exist;
  });

  it('should display placeholder option', async () => {
    const el = await fixture(html`
      <form-select placeholder="Select department" .options="${testOptions}"></form-select>
    `);

    const firstOption = el.shadowRoot.querySelector('option');
    expect(firstOption.textContent).to.equal('Select department');
    expect(firstOption.value).to.equal('');
  });

  it('should display error message', async () => {
    const el = await fixture(html`
      <form-select error="This field is required"></form-select>
    `);

    const errorMsg = el.shadowRoot.querySelector('.error-message');
    expect(errorMsg.textContent).to.equal('This field is required');
  });

  it('should apply error class when error exists', async () => {
    const el = await fixture(html`
      <form-select error="Error"></form-select>
    `);

    const select = el.shadowRoot.querySelector('select');
    expect(select.classList.contains('error')).to.be.true;
  });

  it('should dispatch select-change event', async () => {
    const el = await fixture(html`
      <form-select name="department" .options="${testOptions}"></form-select>
    `);

    let eventDetail;
    el.addEventListener('select-change', (e) => {
      eventDetail = e.detail;
    });

    const select = el.shadowRoot.querySelector('select');
    select.value = 'tech';
    select.dispatchEvent(new Event('change'));

    expect(eventDetail).to.exist;
    expect(eventDetail.name).to.equal('department');
    expect(eventDetail.value).to.equal('tech');
  });

  it('should dispatch select-blur event', async () => {
    const el = await fixture(html`
      <form-select name="department"></form-select>
    `);

    let eventFired = false;
    el.addEventListener('select-blur', (e) => {
      eventFired = true;
      expect(e.detail.name).to.equal('department');
    });

    const select = el.shadowRoot.querySelector('select');
    select.dispatchEvent(new Event('blur'));

    expect(eventFired).to.be.true;
  });

  it('should set selected option from value prop', async () => {
    const el = await fixture(html`
      <form-select value="tech" .options="${testOptions}"></form-select>
    `);

    const select = el.shadowRoot.querySelector('select');
    expect(select.value).to.equal('tech');
  });

  it('should update value property reactively', async () => {
    const el = await fixture(html`
      <form-select .options="${testOptions}"></form-select>
    `);

    el.value = 'analytics';
    await el.updateComplete;

    const select = el.shadowRoot.querySelector('select');
    expect(select.value).to.equal('analytics');
  });
});
