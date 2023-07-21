import { calcInlineInterface, CalcInlineReturnObject } from './@types/interface';

const calcInline: calcInlineInterface = (win, click, menu, len, scrollH) => {
  len = (len * 40) + 20;
  const [winW, winH] = win;
  const [X, Y] = click;
  const [W, H] = menu;
  let maxH: number = len < H ? winH - 10 : len;
  maxH = len > H ? H : maxH;
  let [diffL, diffT]: Array<number> = [winW - (X + W), Y];
  diffL = diffL <= 0 ? winW - W - 40 : X;

  diffT += scrollH;

  let tempH: number = H > maxH ? maxH : H;
  if (Y + tempH > winH) {
    const off = Y + tempH - winH;
    diffT -= off;
  }
  return {
    height: len > maxH ? maxH : len,
    maxHeight: maxH,
    width: W,
    left: diffL,
    top: diffT,
  } as CalcInlineReturnObject;
};

export default calcInline;