/**
 * Waiting for element to be available in the DOM
 * @param selector
 * @param delay
 * @param maxDelay
 * @returns {Promise<unknown>}
 */

export default (selector, delay = 1000, maxDelay = 10000) => {
  return new Promise((resolve, reject) => {
    let timer = null
    const startTime = new Date().getTime()
    timer = setInterval(() => {
      const tmp = document.querySelector(selector)

      if (tmp) {
        clearInterval(timer)
        resolve(tmp)
      } else if (new Date().getTime() - startTime > maxDelay) {
        clearInterval(timer)
        reject(new Error('max delay'))
      }
    }, delay)
  })
}
