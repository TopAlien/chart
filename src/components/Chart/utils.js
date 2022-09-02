/*
 * @Author       : bo.wang
 * @Date         : 2022-09-02 11:46:00
 * @LastEditors  : bo.wang
 * @LastEditTime : 2022-09-02 11:46:00
 * @Description  : 请填写简介
 */
export function debounce(func, wait, immediate) {

  let timeout;

  return function () {
      let context = this;
      let args = arguments;

      if (timeout) clearTimeout(timeout);
      if (immediate) {
          let callNow = !timeout;
          timeout = setTimeout(function () {
              timeout = null;
          }, wait)
          if (callNow) {
              func.apply(context, args)
          }
      }
      else {
          timeout = setTimeout(function () {
              func.apply(context, args)
          }, wait);
      }
  }
}