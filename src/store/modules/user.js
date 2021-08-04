import { getToken, setToken, getLStorage, getSStorage, setSStorage, removeToken, setLStorage, removeLStorage, getBrowserVersions } from '@/utils/auth'
import users from '@/apis/user'

const user = {
  namespaced: true,
  state: {
    menuList: getSStorage('router'),
    token: getToken(),
    userInfo: getLStorage('userInfo'),
    channel: getSStorage('channel'),
    direction: getSStorage('direction')
  },

  mutations: {
    SET_USERINFO(state, data) {
      state.userInfo = data
      setLStorage('userInfo', data)
    },
    CLEAR_USERINFO(state) {
      state.userInfo = ''
      removeLStorage('userInfo')
    },
    SET_TOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    SET_MENU_LIST(state, menuList) {
      state.menuList = menuList
      setLStorage('router', menuList)
    },
    SET_CHANNEL(state, channel) {
      state.channel = channel
      setSStorage('channel', channel)
    },
    // 更新页面切换方向
    UPDATEDIRECTION(state, direction) {
      state.direction = direction
      setSStorage('direction', direction)
    }
  },

  actions: {
    // 登录
    Login({ commit, dispatch }, userInfo) {
      return new Promise((resolve, reject) => {
        try {
          users.login(userInfo).then(res => {
            dispatch('setChannel').then(() => {
              commit('SET_TOKEN', res)
              resolve()
            })
          })
        } catch (err) {
          reject(err)
        }
      })
    },
    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        users.getUserInfo().then(
          res => {
            if (Object.keys(res).length > 0) {
              commit('SET_USERINFO', res)
              resolve()
            } else {
              reject('Error: 获取 userinfo 信息失败')
            }
          },
          err => {
            reject(err)
          }
        )
      })
    },
    // 登出
    Loginout({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          commit('CLEAR_USERINFO')
          commit('SET_TOKEN', '')
          commit('SET_CHANNEL', '')
          removeToken()
          resolve()
        } catch (err) {
          reject(err)
        }
      })
    },
    setChannel({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          const channel = getBrowserVersions()
          commit('SET_CHANNEL', channel)
          resolve()
        } catch (err) {
          reject(err)
        }
      })
    },
    // 更新页面的动态方向
    updateDirection({ commit }, direction) {
      return new Promise((resolve, reject) => {
        try {
          commit('UPDATEDIRECTION', direction)
          resolve()
        } catch (err) {
          reject(err)
        }
      })
    }
  }
}

export default user
