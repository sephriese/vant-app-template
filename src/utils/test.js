export class Modal {
  constructor(options) {
    if (!Modal.instance) {
      Modal.instance = new this.createInstance()
    }
    this.console(options)
    return Modal.instance
  }
  createInstance() {
    return function () {
      console.log('ssss')
      const modal = document.createElement('div')
      modal.innerHTML = '我是一个全局唯一的Modal'
      modal.id = 'modal'
      modal.style.display = 'none'
      document.body.appendChild(modal)
      return modal
    }
  }
  console(val) {
    console.log(val)
  }
}

export function deepCopy(val) {
  if (typeof val !== Object || val !== null) {
    return val
  }
  let obj = {}
  if (val.constructor === Array) {
    obj = []
  }
  for (let i in val) {
    if (Object.prototype.hasOwnProperty.call(val, i)) {
      obj[i] = this.deepClone(val[i])
    }
  }
  return obj
}

function cloneLoop(x) {
  const root = {}

  // 栈
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x
    }
  ]

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop()
    const parent = node.parent
    const key = node.key
    const data = node.data

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent
    if (typeof key !== 'undefined') {
      res = parent[key] = {}
    }

    for (let k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k)) {
        if (typeof data[k] === 'object') {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k]
          })
        } else {
          res[k] = data[k]
        }
      }
    }
  }

  return root
}

// 保持引用关系
function cloneForce(x) {
  // =============
  const uniqueList = [] // 用来去重
  // =============

  let root = {}

  // 循环数组
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x
    }
  ]

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop()
    const parent = node.parent
    const key = node.key
    const data = node.data

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent
    if (typeof key !== 'undefined') {
      res = parent[key] = {}
    }

    // =============
    // 数据已经存在
    let uniqueData = find(uniqueList, data)
    if (uniqueData) {
      parent[key] = uniqueData.target
      break // 中断本次循环
    }

    // 数据不存在
    // 保存源数据，在拷贝数据中对应的引用
    uniqueList.push({
      source: data,
      target: res
    })
    // =============

    for (let k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k)) {
        if (typeof data[k] === 'object') {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k]
          })
        } else {
          res[k] = data[k]
        }
      }
    }
  }

  return root
}

function find(arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].source === item) {
      return arr[i]
    }
  }

  return null
}
