import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { getSStorage, setSStorage, removeSStorage } from '@/utils/auth'

Vue.use(Router)

let routes = [
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
    meta: { title: '404', permission: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login'),
    meta: { title: '登录', permission: false }
  }
]

const routerContext = require.context('./', true, /\.js$/)
routerContext.keys().forEach(route => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routerContext(route)
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routes = routes.concat(routerModule.default || routerModule)
})

routes = routes.concat({
  path: '*',
  redirect: '/404',
  meta: { title: '404', permission: false }
})

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes
  })

const myRouter = createRouter()
// 初始化重新定义页面的打开顺序
removeSStorage('pathIndex')
setSStorage('router', routes)
let historyCount = getSStorage('count') * 1 || 0
const path = [
  {
    path: '/home',
    index: 0
  }
]
setSStorage('pathIndex', path)

myRouter.beforeEach((to, from, next) => {
  // 处理channel 理论上每次路由都需要去判断一下channel，保证channel的正确性
  if (store.getters.channel === null) {
    store.dispatch('user/setChannel')
  }

  // 处理页面切换方式
  if (to.params.direction) {
    store.dispatch('updateDirection', to.params.direction)
  } else {
    const pathIndex = getSStorage('pathIndex')
    const toPath = pathIndex.filter(item => item.path === to.path)
    const fromPath = pathIndex.filter(item => item.path === from.path)
    const toIndex = toPath.length > 0 ? toPath[0].index : 0
    const fromIndex = fromPath.length > 0 ? fromPath[0].index : 0
    // 判断并记录跳转页面是否访问过，以此判断跳转过渡方式
    if (toIndex > 0) {
      if (!fromIndex || Number(toIndex) > Number(fromIndex) || (toIndex === 0 && fromIndex === 0)) {
        store.dispatch('updateDirection', 'forward')
      } else {
        store.dispatch('updateDirection', 'back')
      }
    } else {
      ++historyCount
      setSStorage('count', historyCount)
      if (to.path !== '/home') {
        let arr = pathIndex.concat({
          path: to.path,
          index: historyCount
        })
        setSStorage('pathIndex', arr)
      }
      store.dispatch('updateDirection', 'forward')
    }
  }
  next()
})

// 解决路由单页多次加载的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default myRouter
