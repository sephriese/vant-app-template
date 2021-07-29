import defaultSettings from '@/settings'
import Cookies from 'js-cookie'

const token = 'token'

export function getToken() {
  return Cookies.get(token)
}

export function setToken(token) {
  return Cookies.set(token, token)
}

export function removeToken() {
  return Cookies.remove(token)
}

const title = defaultSettings.title

export function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

export function isEmpty(text) {
  return text === undefined || text === null || text === ''
}

// localStorage
export function getLStorage(name) {
  return JSON.parse(localStorage.getItem(name))
}

export function setLStorage(name, data) {
  return localStorage.setItem(name, JSON.stringify(data))
}

export function removeLStorage(name) {
  return localStorage.removeItem(name)
}

// sessionStorage
export function getSStorage(name) {
  return JSON.parse(sessionStorage.getItem(name))
}

export function setSStorage(name, data) {
  return sessionStorage.setItem(name, JSON.stringify(data))
}

export function removeSStorage(name) {
  return sessionStorage.removeItem(name)
}

/**
 * @name 想要获取 localStorage 的参数名
 * @callback 若没有，则返回一个promis，在回调里添加到localStorage
 * @params 回调可能用到的参数
 * 主要处理类字典的数据
 * **/

export function handleLStorage(name, callback, params) {
  return new Promise((resolve, reject) => {
    try {
      const data = getLStorage(name)
      if (data === undefined || data === null) {
        callback(params).then(res => {
          setLStorage(name, res.data)
          resolve(res.data)
        })
      } else {
        resolve(data)
      }
    } catch (e) {
      reject(e)
    }
  })
}

// 防抖

export function debounce(fn, wait) {
  let timer
  return function () {
    // let context = this // 注意 this 指向
    let args = arguments

    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

// 节流（时间戳+定时器）
export function throttle(func, delay) {
  let timer = null
  let startTime = Date.now()
  return function () {
    let curTime = Date.now()
    let remaining = delay - (curTime - startTime)
    let context = this
    let args = arguments
    clearTimeout(timer)
    if (remaining <= 0) {
      func.apply(context, args)
      startTime = Date.now()
    } else {
      timer = setTimeout(func, remaining)
    }
  }
}
