import './context-menu.css';
// Interface for each menu option
export interface MenuOption {
  label: string | [string, string];
  action?: () => void;
}
// Interface for the theme object
interface Theme {
  [key: string]: string | number;
}
// Type for the styles object returned by calcInline function
type MenuStyles = {
  height: number;
  maxHeight: number;
  width: number;
  left: number;
  top: number;
};
// parseSVG function
const parseSVG = (svg: string): Element | null => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, 'image/svg+xml');
  if (doc.documentElement.nodeName !== 'svg') return null;
  return doc.documentElement as Element;
};
// calcInline function
const calcInline = (
  win: Window,
  click: { clientX: number; clientY: number; },
  menu: [number, number],
  len: number
): MenuStyles => {
  const { innerWidth: winW, innerHeight: winH, scrollY } = win;
  const { clientX: X, clientY: Y } = click;
  const [W, H] = menu;
  const width = W;
  const maxHeight = len < H ? winH - 10 : len > H ? H : len;
  const height = len > maxHeight ? maxHeight : len;
  const left = winW - (X + W) <= 0 ? winW - W - 40 : X;
  const top = Y + height > winH ? Y + scrollY - (Y + height - winH) : Y + scrollY;
  return { height, maxHeight, width, left, top };
};
// objectEntries function
const objectEntries = <T extends object>(obj: T): [keyof T, T[keyof T]][] => {
  const ownProps = Object.keys(obj) as (keyof T)[];
  let i = ownProps.length;
  const resArray: [keyof T, T[keyof T]][] = new Array(i); // preallocate the Array
  while (i--) {
    resArray[i] = [ownProps[i], obj[ownProps[i]]];
  } return resArray;
};
export default class ContextMenu {
  private static instance: ContextMenu | null = null;
  private targetContainer: Element;
  private options: MenuOption[];
  private theme: Theme | string;
  private menu: HTMLDivElement | null;
  private width: number;
  private maxHeight: number;
  constructor(targetContainer: Element, options: MenuOption[], theme?: Theme | string) {
    this.targetContainer = targetContainer;
    this.options = options;
    this.theme = theme || 'dark';
    this.menu = null;
    this.width = 260;
    this.maxHeight = 300;
    this.handleClickAway = this.handleClickAway.bind(this);
    this.handleCloseOnEsc = this.handleCloseOnEsc.bind(this);
    this.destroyMenu = this.destroyMenu.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.setContextMenu = this.setContextMenu.bind(this);
  }
  public static init(targetContainer: Element, options: MenuOption[], theme?: Theme | string): void {
    if (!document.body.contains(targetContainer)) throw new Error('Target container is not in the DOM');
    if (this.instance?.targetContainer === targetContainer) return;
    this.instance = new ContextMenu(targetContainer, options, theme);
    this.instance?.activate();
  }
  public static destroy(): void {
    if (this.instance) {
      this.instance.targetContainer.removeEventListener('contextmenu', this.instance.setContextMenu as EventListenerOrEventListenerObject);
      this.instance = null;
    }
  }
  public static setTheme(theme: Theme | string): void {
    const instance = this.instance;
    if (instance) {
      if (instance.theme && instance.theme === theme) return;
      instance.theme = theme;
      if (instance.menu) { instance.destroyMenu(); }
      return;
    }
    throw new Error('Context menu is not initialized.');
  }
  private activate(): void {
    this.targetContainer.addEventListener('contextmenu', this.setContextMenu as EventListenerOrEventListenerObject);
  }
  private setContextMenu(e: MouseEvent) {
    e.preventDefault();
    const checkPrevious: Element | null = document.querySelector('.context-menu');
    checkPrevious ? this.setMenuPosition(e) : this.createMenu(e);
  }
  private destroyMenu(): void {
    this.menu?.remove();
    window.removeEventListener('click', this.handleClickAway);
    window.removeEventListener('keydown', this.handleCloseOnEsc);
  }
  private handleMenuItemClick(option: MenuOption): void {
    if (option.action && typeof option.action === 'function') {
      option.action();
    } this.destroyMenu();
  }
  private handleClickAway(ev: MouseEvent): void {
    this.menu && ev.target instanceof Element && this.destroyMenu();
  }
  private handleCloseOnEsc(ev: KeyboardEvent): void {
    ev.key === 'Escape' && this.destroyMenu();
  }
  private createOptions(): HTMLDivElement {
    const optionsWrapper = document.createElement('div');
    optionsWrapper.classList.add('context-menu-options-wrapper');
    for (const option of this.options) {
      const optionDiv = document.createElement('div');
      optionDiv.classList.add('context-menu-option');
      if (Array.isArray(option.label)) {
        const [svg, text] = option.label;
        if (svg.slice(0, 4) === '<svg') {
          const parsedSVG = parseSVG(svg);
          parsedSVG && optionDiv.append(parsedSVG);
        } optionDiv.append(document.createTextNode(text));
      } else {
        optionDiv.textContent = option.label;
      }
      optionDiv.addEventListener('click', this.handleMenuItemClick.bind(this, option));
      optionsWrapper.append(optionDiv);
    }
    return optionsWrapper;
  }
  private setMenuPosition(ev: MouseEvent): void {
    const styles = calcInline(window, ev, [this.width, this.maxHeight], this.options.length * 40 + 20);
    for (const [key, value] of objectEntries(styles)) this.menu!.style[key] = `${value}px`;
  }

  private setCustomTheme(): void {
    if (typeof this.theme === 'object') {
      for (const [key, value] of objectEntries(this.theme as Theme)) {
        this.menu!.style.setProperty(`--context-menu-${String(key).toLowerCase()}`, String(value));
      }
    } this.menu!.dataset.menuTheme = 'custom';
  }
  private createMenu(ev: MouseEvent): void {
    this.menu = document.createElement('div');
    this.menu.classList.add('context-menu');
    typeof this.theme === 'object' ? this.setCustomTheme() : (this.menu.dataset.menuTheme = this.theme.toString());
    this.setMenuPosition(ev);
    this.menu.append(this.createOptions());
    document.body.append(this.menu);
    setTimeout(() => this.menu && this.menu.classList.add('cm-tr'), 0);
    window.addEventListener('click', this.handleClickAway);
    window.addEventListener('keydown', this.handleCloseOnEsc);
  }
}
