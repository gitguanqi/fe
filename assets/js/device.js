/*
 * @Author: fegq
 * @Date: 2021-09-23 10:36:04
 * @LastEditors: fegq
 * @LastEditTime: 2021-11-23 15:39:57
 * @Description: This is a file comment!
 * @Version:
 */
function calcRem() {
  let clientWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  if (clientWidth <= 750) {
    document.documentElement.style.fontSize = clientWidth / 23.4375 + "px";
  } else {
    document.documentElement.style.fontSize = 16 + "px";
  }
}

calcRem();

window.addEventListener("resize", calcRem, false);
