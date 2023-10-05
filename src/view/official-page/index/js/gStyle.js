export const gStyle = (...props) =>
  (...values) => {
    const style = {};
    for (const [index, styleKey] of props.entries()) {
      values[index] && (style[styleKey] = values[index] + "px");
    }
    return style;
  };
export const gSize = gStyle("width", "height");
export const gSizeAndP = gStyle("width", "height", "left", "top");
export const gReactiveImgAnimation = (width, height, left, top, { size, position }={}) => ({
  ...gSizeAndP(width, height, left, top),
  "background-size": size,
  "background-position": position,
});
