/**
 * AppPagination Component Tests
 *
 * Tests the pagination component:
 * - Page number rendering
 * - Navigation buttons (prev/next)
 * - Current page highlighting
 * - Page change event dispatching
 * - Disabled state for edge cases
 */

import { html, fixture, expect } from '@open-wc/testing';
import '../src/components/app-pagination.js';

describe('AppPagination', () => {
  it('should render pagination controls', async () => {
    const el = await fixture(html`
      <app-pagination currentPage="1" totalPages="5"></app-pagination>
    `);

    const pagination = el.shadowRoot.querySelector('.pagination');
    expect(pagination).to.exist;
  });

  it('should highlight current page', async () => {
    const el = await fixture(html`
      <app-pagination currentPage="2" totalPages="5"></app-pagination>
    `);

    const activeBtn = el.shadowRoot.querySelector('.page-btn.active');
    expect(activeBtn).to.exist;
    expect(activeBtn.textContent.trim()).to.equal('2');
  });

  it('should dispatch page-change event on page click', async () => {
    const el = await fixture(html`
      <app-pagination currentPage="1" totalPages="5"></app-pagination>
    `);

    let newPage;
    el.addEventListener('page-change', (e) => {
      newPage = e.detail.page;
    });

    const pageBtns = el.shadowRoot.querySelectorAll('.page-btn:not([disabled])');
    const page2Btn = Array.from(pageBtns).find(btn => btn.textContent.trim() === '2');
    page2Btn?.click();

    expect(newPage).to.equal(2);
  });

  it('should dispatch page-change on next button', async () => {
    const el = await fixture(html`
      <app-pagination currentPage="2" totalPages="5"></app-pagination>
    `);

    let newPage;
    el.addEventListener('page-change', (e) => {
      newPage = e.detail.page;
    });

    const buttons = el.shadowRoot.querySelectorAll('.page-btn');
    const nextBtn = buttons[buttons.length - 1];
    nextBtn.click();

    expect(newPage).to.equal(3);
  });

  it('should dispatch page-change on prev button', async () => {
    const el = await fixture(html`
      <app-pagination currentPage="3" totalPages="5"></app-pagination>
    `);

    let newPage;
    el.addEventListener('page-change', (e) => {
      newPage = e.detail.page;
    });

    const buttons = el.shadowRoot.querySelectorAll('.page-btn');
    const prevBtn = buttons[0];
    prevBtn.click();

    expect(newPage).to.equal(2);
  });

  it('should disable prev button on first page', async () => {
    const el = await fixture(html`
      <app-pagination currentPage="1" totalPages="5"></app-pagination>
    `);

    const buttons = el.shadowRoot.querySelectorAll('.page-btn');
    const prevBtn = buttons[0];
    expect(prevBtn.disabled).to.be.true;
  });

  it('should disable next button on last page', async () => {
    const el = await fixture(html`
      <app-pagination currentPage="5" totalPages="5"></app-pagination>
    `);

    const buttons = el.shadowRoot.querySelectorAll('.page-btn');
    const nextBtn = buttons[buttons.length - 1];
    expect(nextBtn.disabled).to.be.true;
  });

  it('should render correct number of page buttons', async () => {
    const el = await fixture(html`
      <app-pagination currentPage="1" totalPages="3"></app-pagination>
    `);

    const allButtons = el.shadowRoot.querySelectorAll('.page-btn');
    expect(allButtons.length).to.equal(5);
  });
});
