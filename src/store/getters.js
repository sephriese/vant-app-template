const getters = {
  menuList: state => state.user.menuList,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  channel: state => state.user.channel,
  direction: state => state.user.direction
}
export default getters
