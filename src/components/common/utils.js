/**
 * 把防抖函数封装起来
 * @param func
 * @param delay
 * @returns {Function}
 */
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      //执行
      func.apply(this, args)
    }, delay)

  }
}
