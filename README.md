## tiny-context-menu-js

* Tiny 2 KB build
* Zero dependencies
* Two themes & easy theme customization
* Close on click away
* Edge detection
* Type safe
* Memory and Event Clean-up

### Installation

```bash
npm i tiny-context-menu-js
```

### General Setup

```javascript
import ContextMenu from "tiny-context-menu-js";

/* ContextMenu.init() && ContextMenu.destroy() */
ContextMenu(target, items, theme).init();
ContextMenu().destroy(); // remove instance
```

### Schema

* **ContextMenu(target, ..., ...)**
  * HTMLElement: document.querySelector('.element');

---

* **ContextMenu(..., items, ...)**
  * Array[ Object, ... ]
  * label is necessary - action is not.
  * Must provide icons in Array with title included.
    * Icons must be inline-svg
  
```javascript
  [ { label: 'title', action: () ... },
    { label: ['inlineSvg', 'title'], action: () ... }, ]
```

---

* **ContextMenu(..., ..., theme)**
  * Optional: will default to dark
  * String: "light" || "dark"
  * Object: { text:#000, texthover:#000, background:#000, backgroundhover:#000 }

---

### Example

```javascript
const target = document.querySelector('.target');
const exampleCallback = () => { console.log("Example callback");}
const items = [
  {
    label: "Item 1",
    action: () => { console.log("Item 1"); }
  },
  {
    label: "Item 2",
    action: exampleCallback,
  },
  {
    label: "Item 2",
    // leave blank for no action
  },
]

ContextMenu(target, items, "light").init();
ContextMenu.destroy();
ContextMenu(target, items,
{ 
  text: "#000", 
  texthover: "#fff",
  background: "#fff", 
  backgroundhover: "#000",
}).init();
```

### Use inline SVG for icons

```javascript
const svg = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="14px" width="14px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>';
[{
  label: [svg, "Item Title"],
  action: // ...
}]
```

### License

This project is licensed under the [MIT License](https://github.com/chaseottofy/context-menu/blob/main/LICENSE)
