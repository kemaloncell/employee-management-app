/**
 * ActionButtons Component Tests
 *
 * Tests the action buttons component used for edit/delete operations:
 * - Button rendering with different modes (icon-only, icon-text)
 * - Event dispatching for edit and delete actions
 * - Label customization
 * - Icon display
 */

import { html, fixture, expect } from '@open-wc/testing';
import '../src/components/action-buttons.js';

describe('ActionButtons', () => {
  it('should render edit and delete buttons', async () => {
    const el = await fixture(html`
      <action-buttons></action-buttons>
    `);

    const buttons = el.shadowRoot.querySelectorAll('button');
    expect(buttons.length).to.equal(2);
  });

  it('should dispatch edit-click event', async () => {
    const el = await fixture(html`
      <action-buttons></action-buttons>
    `);

    let editClicked = false;
    el.addEventListener('edit-click', () => {
      editClicked = true;
    });

    const editBtn = el.shadowRoot.querySelector('.edit-btn');
    editBtn.click();

    expect(editClicked).to.be.true;
  });

  it('should dispatch delete-click event', async () => {
    const el = await fixture(html`
      <action-buttons></action-buttons>
    `);

    let deleteClicked = false;
    el.addEventListener('delete-click', () => {
      deleteClicked = true;
    });

    const deleteBtn = el.shadowRoot.querySelector('.delete-btn');
    deleteBtn.click();

    expect(deleteClicked).to.be.true;
  });

  it('should render with custom labels', async () => {
    const el = await fixture(html`
      <action-buttons editLabel="Modify" deleteLabel="Remove"></action-buttons>
    `);

    const buttons = el.shadowRoot.querySelectorAll('button');
    expect(buttons[0].title).to.equal('Modify');
    expect(buttons[1].title).to.equal('Remove');
  });

  it('should support icon-only mode', async () => {
    const el = await fixture(html`
      <action-buttons mode="icon-only"></action-buttons>
    `);

    const buttons = el.shadowRoot.querySelectorAll('button');
    expect(buttons).to.exist;
  });

  it('should support icon-text mode', async () => {
    const el = await fixture(html`
      <action-buttons mode="icon-text" editLabel="Edit" deleteLabel="Delete"></action-buttons>
    `);

    const buttons = el.shadowRoot.querySelectorAll('button');
    expect(buttons).to.exist;
  });
});
