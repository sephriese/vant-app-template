const Layout = () => import('@/components/Layout')

/*
// default
meta: {
  title: '', //
  keepAlive: false,
  tabbar: flase, // bottom navigation of page -- Design do not have bar
  navbar: true // top navigation of page
  permission // must need  if true, api must need token
}

*/
export default [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: { title: '首页', icon: 'wap-home' },
    menu: true,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index'),
        meta: { title: '首页', permission: false }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    meta: { title: '我的', icon: 'manager' },
    menu: true,
    children: [
      {
        path: '/user',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '@/views/User/index'),
        meta: { title: '我的', permission: true, keepAlive: true }
      }
    ]
  }
]
