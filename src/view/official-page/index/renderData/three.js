import {
  p as wordsPostionP,
  w as wordsPostionW,
} from "../assets/js/wordspostion";
export function renderWords(isPhone) {
  // 上面的内容太多了单独放了一个文件
  // 关于根据屏幕大小变化 来隐藏词条  有两种方案
  return isPhone ? wordsPostionP : wordsPostionW;
}