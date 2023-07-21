import './context-menu.scss';

import { Option, calcInlineReturnObject } from './@types/interface';

import parseSVG from './menu.parse-svg';

import calcInline from './menu.calc-inline';

export default class ContextMenu {

  private static instance: ContextMenu | null = null;

  private targetContainer: HTMLElement;

  private options: Option[];

  private theme: string | object;

  private menu: HTMLDivElement | null;

  private width: number;

  private maxHeight: number;

  constructor(
    targetContainer: HTMLElement,
    options: Option[],
    theme?: string | object,
  ) {
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

  public static init(targetContainer: HTMLElement, options: Option[], theme?: string | object) {
    if (!document.body.contains(targetContainer)) {
      throw new Error('Target container is not in the DOM');
    }
    this.instance = new ContextMenu(targetContainer, options, theme);
    this.instance?.create();
  }

  public static destroy() {
    if (this.instance) {
      this.instance.targetContainer.removeEventListener('contextmenu', this.instance.setContextMenu);
      this.instance = null;
    }
  }

  public static setTheme(theme: string | object) {
    if (this.instance?.theme === theme) return;
    this.instance?.targetContainer.removeEventListener('contextmenu', this.instance!.setContextMenu);
    this.instance = new ContextMenu(this.instance!.targetContainer, this.instance!.options, theme);
    this.instance?.create();
  }

  private static checkPrevious() {
    const checkPrevious = document.querySelector('.context-menu');
    if (checkPrevious) { checkPrevious.remove(); }
  }

  private create() {
    this.targetContainer.addEventListener('contextmenu', this.setContextMenu);
  }

  private setContextMenu(e: MouseEvent) {
    e.preventDefault();
    this.createMenu(e);
  }

  private destroyMenu() {
    const menu = document.querySelector('.context-menu');
    if (menu) { menu.remove(); }
    window.removeEventListener('click', this.handleClickAway);
    window.removeEventListener('keydown', this.handleCloseOnEsc);
  }

  private handleMenuItemClick(option: Option) {
    if (option.action && typeof option.action === 'function') {
      option.action();
    } this.destroyMenu();
  }

  private handleClickAway(e: MouseEvent) {
    const menu = document.querySelector('.context-menu');
    if (menu && e.target instanceof Element) { this.destroyMenu(); }
  }

  private handleCloseOnEsc(e: KeyboardEvent) {
    e.key === 'Escape' && this.destroyMenu();
  }

  private createOptions(optionsWrapper: HTMLElement) {
    for (const option of this.options) {
      const optionDiv = document.createElement('div');
      optionDiv.classList.add('context-menu-option');

      if (Array.isArray(option.label)) {
        const [svg, text]: [string, string] = option.label;
        if (svg.slice(0, 4) === '<svg') {
          const parsedSVG: HTMLElement | null = parseSVG(svg);
          if (parsedSVG) { optionDiv.append(parsedSVG); }
        }
        optionDiv.append(document.createTextNode(text));
      } else {
        optionDiv.textContent = option.label;
      }

      optionDiv.addEventListener('click', this.handleMenuItemClick.bind(this, option));
      optionsWrapper.append(optionDiv);
    }
  }

  private setMenuPosition(ev: MouseEvent) {
    if (this.menu) {
      this.menu.classList.add('context-menu');
      const { height, maxHeight, width, left, top } =
        calcInline(
          [window.innerWidth, window.innerHeight],
          [ev.clientX, ev.clientY],
          [this.width, this.maxHeight],
          this.options.length,
          window.scrollY,
        ) as calcInlineReturnObject;
      this.menu.style.height = `${height}px`;
      this.menu.style.maxHeight = `${maxHeight}px`;
      this.menu.style.width = `${width}px`;
      this.menu.style.left = `${left}px`;
      this.menu.style.top = `${top}px`;
    }
  }

  private setCustomTheme(theme: object, menu: HTMLDivElement) {
    for (const [key, value] of Object.entries(theme)) {
      menu.style.setProperty(`--context-menu-${key}`, value.toString());
    } menu.dataset.menuTheme = 'custom';
  }

  private createMenu(ev: MouseEvent) {
    ContextMenu.checkPrevious();
    const tempMenu = document.createElement('div');
    tempMenu.classList.add('context-menu');
    typeof this.theme === 'object'
      ? this.setCustomTheme(this.theme, tempMenu)
      : tempMenu.dataset.menuTheme = this.theme.toString();

    this.menu = tempMenu.cloneNode(true) as HTMLDivElement;
    this.setMenuPosition(ev);

    const optionsWrapper = document.createElement('div');
    optionsWrapper.classList.add('context-menu-options-wrapper');

    this.createOptions(optionsWrapper);
    this.menu.append(optionsWrapper);
    document.body.append(this.menu);
    setTimeout(() => this.menu && (this.menu.classList.add('cm-tr')), 0);
    window.addEventListener('click', this.handleClickAway);
    window.addEventListener('keydown', this.handleCloseOnEsc);
  }
}
