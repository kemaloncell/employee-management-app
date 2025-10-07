/**
 * ConfirmDialog Component Tests
 *
 * Tests the confirmation dialog component:
 * - Dialog open/close state
 * - Title and message display
 * - Confirm and cancel button actions
 * - Event dispatching
 * - Backdrop click handling
 */

import { html, fixture, expect } from '@open-wc/testing';
import '../src/components/confirm-dialog.js';

describe('ConfirmDialog', () => {
  it('should not render when closed', async () => {
    const el = await fixture(html`
      <confirm-dialog></confirm-dialog>
    `);

    const isVisible = el.hasAttribute('open');
    expect(isVisible).to.be.false;
  });

  it('should render when open', async () => {
    const el = await fixture(html`
      <confirm-dialog open></confirm-dialog>
    `);

    const dialog = el.shadowRoot.querySelector('.overlay');
    expect(dialog).to.exist;
  });

  it('should display title', async () => {
    const el = await fixture(html`
      <confirm-dialog open title="Confirm Action"></confirm-dialog>
    `);

    const title = el.shadowRoot.querySelector('.dialog-title');
    expect(title.textContent).to.equal('Confirm Action');
  });

  it('should display message', async () => {
    const el = await fixture(html`
      <confirm-dialog open message="Are you sure?"></confirm-dialog>
    `);

    const message = el.shadowRoot.querySelector('.dialog-body');
    expect(message.textContent.trim()).to.equal('Are you sure?');
  });

  it('should dispatch confirm event', async () => {
    const el = await fixture(html`
      <confirm-dialog open></confirm-dialog>
    `);

    let confirmed = false;
    el.addEventListener('confirm', () => {
      confirmed = true;
    });

    const confirmBtn = el.shadowRoot.querySelector('.btn-confirm');
    confirmBtn.click();

    expect(confirmed).to.be.true;
  });

  it('should dispatch cancel event', async () => {
    const el = await fixture(html`
      <confirm-dialog open></confirm-dialog>
    `);

    let cancelled = false;
    el.addEventListener('cancel', () => {
      cancelled = true;
    });

    const cancelBtn = el.shadowRoot.querySelector('.btn-cancel');
    cancelBtn.click();

    expect(cancelled).to.be.true;
  });

  it('should cancel on backdrop click', async () => {
    const el = await fixture(html`
      <confirm-dialog open></confirm-dialog>
    `);

    let cancelled = false;
    el.addEventListener('cancel', () => {
      cancelled = true;
    });

    const overlay = el.shadowRoot.querySelector('.overlay');
    overlay.click();

    expect(cancelled).to.be.true;
  });

  it('should not cancel when clicking dialog content', async () => {
    const el = await fixture(html`
      <confirm-dialog open></confirm-dialog>
    `);

    let cancelled = false;
    el.addEventListener('cancel', () => {
      cancelled = true;
    });

    const content = el.shadowRoot.querySelector('.dialog');
    content.click();

    expect(cancelled).to.be.false;
  });
});
