console.log('ran')
console.log('ran')


/**
 * 
The following imports are for demo purposes

For your own implementation, do as follows:
import ContextMenu from "tiny-context-menu-js"

If you wish to edit css directly, import the css file:
import "tiny-context-menu-js/dist/context-menu.css"

If you wish to use the Options interface, import it from the @types folder:
import { Option } from "tiny-context-menu-js/dist/@types/interface"
*/

// import ContextMenu from '../src/context-menu';
// import { Option } from '../src/@types/interface';
import ContextMenu, {MenuOption} from '../dist/context-menu';

// const targetContainer = document.querySelector('.target-container') as HTMLElement;
// const destroyButton = document.querySelector('.destroy-menu') as HTMLElement;
// const options: MenuOption[] = [
//   { label: 'Item 1', action: () => { console.log('item 1'); } },
//   { label: 'Item 2', action: () => { console.log('item 2'); } },
//   { label: 'Item 3', action: () => { console.log('item 3'); } },
//   { label: 'Item 4', action: () => { console.log('item 4'); } },
//   { label: 'Item 5', action: () => { console.log('item 5'); } },
//   {
//     // action is optional
//     // if not provided, the menu will still close when label is clicked
//     label: 'Item 6',
//   },
//   {
//     // SVGS MUST BE INLINED and defined in the first index of the array
//     // They are parsed with DOMParser() https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
//     label: [
//       '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M0 2l4 4 4-4H0z"/></svg>', 'Item 7'],
//   },
//   {
//     label: [
//       '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M0 2l4 4 4-4H0z"/></svg>',
//       '', // empty string if you want to hide the text
//     ],
//   },
//   {
//     // this is technically the wrong schema
//     // Array is only supposed to be utilized for ['svg', 'text']
//     // It should resolve itself either way, the first index will be ignored
//     label: ['Item 8', 'Item 8'], action: () => { console.log('item 8'); },
//   },
// ];

// ContextMenu.init(targetContainer, options); // Initialize the menu
// ContextMenu.destroy(); // Destroy the menu
// // Reinitialize the menu with a custom theme
// // KEYS ARE CASE SENSITIVE!
// // Values can be any valid css color value
// ContextMenu.init(targetContainer, options, {
//   background: 'red',
//   backgroundhover: 'rgba(0, 255, 0, 0.8)',
//   text: '#eee',
//   texthover: '#FFFFFF',
//   scrollthumb: 'hsla(0, 0%, 20%, 0.8 )',
// });

// // Set Custom theme to default dark then immediately set it to light
// // ContextMenu.setTheme('dark');
// // ContextMenu.setTheme('light');

// // destroy the menu with destroy button
// destroyButton.addEventListener('click', () => {
//   ContextMenu.destroy();
// }, { once: true });
// // { once: true } is optional, Once the menu is destroyed, calling .destroy() again won't do anything
