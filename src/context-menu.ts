import './context-menu.scss';

interface Option {
  label: string | [string, string];
  action?: () => void;
}

export default class ContextMenu {
  private static instance: ContextMenu | null = null;

  private targetContainer: HTMLElement;

  private options: Option[];

  private theme: string | object;

  private menu: HTMLDivElement | null;

  private width: number;

  private maxHeight: number;

  constructor(targetContainer: HTMLElement, options: Option[], theme?: string | object) {
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
    if (!targetContainer) {
      throw new Error('No target container provided');
    }
    this.instance = new ContextMenu(targetContainer, options, theme);
    this.instance.create();
  }

  public static destroy() {
    if (this.instance) {
      this.instance.targetContainer.removeEventListener('contextmenu', this.instance.setContextMenu);
      this.instance = null;
    }
  }

  private static checkPrevious() {
    // const checkPrevious = document.querySelector(`.${styles['context-menu']}`);
    const checkPrevious = document.querySelector(`.context-menu`);
    if (checkPrevious) {
      checkPrevious.remove();
    }
  }

  private create() {
    this.targetContainer.addEventListener('contextmenu', this.setContextMenu);
    this.validateOptions();
  }

  private setContextMenu(e: MouseEvent) {
    e.preventDefault();
    this.createMenu(e);
    e.stopPropagation();
  }

  private validateOptions() {
    if (!this.options) {
      throw new ReferenceError('No options provided');
    } else if (!Array.isArray(this.options)) {
      throw new TypeError('Options must be an array');
    } else if (this.options.length === 0) {
      throw new RangeError('Options array is empty');
    } else if (this.options.some((option) => !option.label)) {
      throw new ReferenceError('Some options are missing the "label" property');
    }
  }

  private destroyMenu() {
    const menu = document.querySelector('.context-menu');
    if (menu) {
      menu.remove();
    }
    window.removeEventListener('click', this.handleClickAway);
    window.removeEventListener('keydown', this.handleCloseOnEsc);
  }

  private handleMenuItemClick(option: Option) {
    if (option.action && typeof option.action === 'function') {
      option.action();
    }
    this.destroyMenu();
  }

  private handleClickAway(e: MouseEvent) {
    const menu = document.querySelector('.context-menu');
    if (menu && e.target instanceof Element) {
      this.destroyMenu();
    }
  }

  private handleCloseOnEsc(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.destroyMenu();
    }
  }

  private createOptions(optionsWrapper: HTMLElement) {
    for (const option of this.options) {
      const optionDiv = document.createElement('div');
      optionDiv.classList.add('context-menu-option');

      if (Array.isArray(option.label)) {
        const [svg, text] = option.label;
        const svgWrapper = document.createElement('div');
        svgWrapper.classList.add('context-menu-option-icon-wrapper');
        svgWrapper.innerHTML = svg;
        const optionTextWrapper = document.createElement('span');
        optionTextWrapper.classList.add('context-menu-option-text-wrapper');
        optionTextWrapper.textContent = text;
        optionDiv.append(svgWrapper, optionTextWrapper);
      } else {
        optionDiv.textContent = option.label;
      }
      const optionDivClick = this.handleMenuItemClick.bind(this, option);
      optionDiv.addEventListener('click', optionDivClick);
      optionsWrapper.append(optionDiv);
    }
  }

  private setMenuPosition(ev: MouseEvent) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const [W, H] = [this.width, this.maxHeight];

    const height = this.options.length * 40 + 20;
    let maxHeight = windowHeight < H ? windowHeight - 10 : height;
    if (height > H) {
      maxHeight = H;
    }

    if (this.menu) {
      this.menu.classList.add('context-menu');

      const clickX = ev.clientX;
      const clickY = ev.clientY;
      const leftDiff = windowWidth - (clickX + W);
      const topDiff = windowHeight - (clickY + maxHeight);
      const left = leftDiff <= 0 ? windowWidth - W - 40 : clickX;
      const top = topDiff <= 0 ? windowHeight - maxHeight - 20 : clickY;

      this.menu.style.height = `${height > maxHeight ? maxHeight : height}px`;
      this.menu.style.maxHeight = `${maxHeight}px`;
      this.menu.style.width = `${W}px`;
      this.menu.style.left = `${left}px`;
      this.menu.style.top = `${top}px`;
    }
  }

  private createMenu(ev: MouseEvent) {
    ContextMenu.checkPrevious();

    const tempMenu = document.createElement('div');
    tempMenu.classList.add('context-menu');

    if (typeof this.theme === 'object') {
      for (const [key, value] of Object.entries(this.theme)) {
        tempMenu.style.setProperty(`--context-menu-${key}`, value.toString());
      }
      tempMenu.dataset.menuTheme = 'custom';
    } else {
      tempMenu.dataset.menuTheme = this.theme.toString();
    }

    this.menu = tempMenu.cloneNode(true) as HTMLDivElement;
    this.setMenuPosition(ev);

    const optionsWrapper = document.createElement('div');
    optionsWrapper.classList.add('context-menu-options-wrapper');

    this.createOptions(optionsWrapper);
    this.menu.append(optionsWrapper);
    document.body.append(this.menu);
    setTimeout(() => {
      if (this.menu) {
        this.menu.classList.add('cm-tr');
      }
    }, 0);
    window.addEventListener('click', this.handleClickAway);
    window.addEventListener('keydown', this.handleCloseOnEsc);
  }
}