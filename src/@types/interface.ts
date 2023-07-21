export interface Option {
  label: string | [string, string];
  action?: () => void;
}

export interface calcInlineReturnObject {
  height: number;
  maxHeight: number;
  width: number;
  left: number;
  top: number;
}

export interface calcInlineInterface {
  (
    win: [number, number],
    click: [number, number],
    menu: [number, number],
    len: number,
    scrollH: number,
  ): calcInlineReturnObject;
}
