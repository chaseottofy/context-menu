import ContextMenu, { MenuOption } from 'tiny-context-menu-js';

const targetContainer = document.querySelector('.target-container') as HTMLElement;

const options: MenuOption[] = [
  { label: 'Item 1', action: () => { console.log('item 1'); } },
  { label: 'Item 2', action: () => { console.log('item 2'); } },
  { label: 'Item 3', action: () => { console.log('item 3'); } },
  { label: 'Item 4', action: () => { console.log('item 4'); } },
  { label: 'Item 5', action: () => { console.log('item 5'); } },
  { label: 'Item 6' },
  {
    label: [
      '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M0 2l4 4 4-4H0z"/></svg>', 'Item 7'],
  },
];

ContextMenu.init(targetContainer, options); // Initialize the menu
