import { calcInlineInterface, calcInlineReturnObject } from './@types/interface';

const calcInline: calcInlineInterface = (win, click, menu, len, parentTop, scrollH) => {
  len = (len * 40) + 20;
  const [winW, winH] = win;
  const [X, Y] = click;
  const [W, H] = menu;
  let maxH = len < H ? winH - 10 : len;
  maxH = len > H ? H : maxH;
  const [diffL, diffT]: Array<number> = [winW - (X + W), winH - (Y + maxH)];

  return {
    height: len > maxH ? maxH : len,
    maxHeight: maxH,
    width: W,
    left: diffL <= 0 ? winW - W - 40 : X,
    top: (diffT <= 0 ? winH - maxH - 10 : Y) + scrollH,
  } as calcInlineReturnObject;
};

export default calcInline;
