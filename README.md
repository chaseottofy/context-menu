## tiny-context-menu-js

* Gzips 2KB
* Zero dependencies
* Light/Dark themes + easy customization
* Type support
* Edge detection, Dynamic Positioning
* Accounts for any page scroll
* Memory and Event Clean-up

### Installation

```bash
npm i tiny-context-menu-js
```

### Vanilla js
```javascript
import ContextMenu from "tiny-context-menu-js";
const targetContainer = document.querySelector('.target-container')
const options = [
  { label: 'Item 1', action: () => { console.log('item 1'); } },
  { label: 'Item 2', action: () => { console.log('item 2'); } },
]

ContextMenu(targetContainer, options, 'light').init(); // initialize instance
ContextMenu().destroy();                               // remove instance
```

### TypeScript
```javascript
import ContextMenu, { MenuOption } from "tiny-context-menu-js";
const targetContainer = document.querySelector('.target-container') as HTMLElement;
const options: MenuOption[] = [
  { label: 'Item 1', action: () => { console.log('item 1'); } },
  { label: 'Item 2', action: () => { console.log('item 2'); } },
]

ContextMenu(targetContainer, options).init(); // initialize instance (forego theme param for default 'dark')
ContextMenu().destroy();                      // remove instance
```

### Options examples

```javascript

// Use svgs within labels:
// Must wrap label value in Array. 
// Svg must be defined in first index of Array --> [svg, 'title']
const svg = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="14px" width="14px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>';

const items = [
  {
    label: [svg, "Item Title"],
  }
]
```

### Theme examples
```javascript
// Two pre-loaded themes (dark/light)
const theme = 'dark'
const theme2 = 'light'

// Custom Theming - KEYS ARE CASE SENSITIVE
const theme3 = { 
  background: 'red',
  backgroundhover: 'rgba(0, 255, 0, 0.8)',
  text: '#eee',
  texthover: '#FFFFFF',
  scrollthumb: 'hsla(0, 0%, 20%, 0.8 )',
}
```

### Altering CSS

**CSS comes preloaded**
- If you want to edit the CSS directly, do so in 
`"../node_modules/tiny-context-menu-js/dist/context-menu.css"`

### License

This project is licensed under the [MIT License](https://github.com/chaseottofy/tiny-context-menu-js/blob/main/LICENSE)
