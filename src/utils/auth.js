import defaultSettings from '@/settings'
// import Cookies from 'js-cookie'

const token = 'token'

export function getToken() {
  return sessionStorage.getItem(token)
}

export function setToken(token) {
  return sessionStorage.setItem(token, token)
}

export function removeToken() {
  return sessionStorage.removeItem(token)
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

// 判断客户端环境

export function getBrowserVersions() {
  let u = window.navigator.userAgent
  return {
    // 移动终端浏览器版本信息
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器 i
    Phone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') == -1, // 是否web应该程序，没有头部与底部
    weChat: u.indexOf('MicroMessenger') > -1,
    localApp: u.indexOf('TravelPlan') > -1 // 本地调用的app
  }
}
