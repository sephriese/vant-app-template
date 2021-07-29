<template>
  <div class="app-container">
    <div class="nav" v-if="hasNavbar">
      <navbar :title="$route.meta.title" safe-area-inset-top />
    </div>
    <keep-alive v-if="keepAlive">
      <router-view :class="bodyClass"></router-view>
    </keep-alive>
    <router-view v-else :class="bodyClass"></router-view>
    <div class="footer" v-if="hasTabbar">
      <footers :data="tabbars" />
    </div>
  </div>
</template>
<script>
import footers from './footers'
import navbar from './navbar'
import { getSStorage } from '@/utils/auth'
export default {
  name: 'Layout',
  components: {
    footers,
    navbar
  },
  computed: {
    hasNavbar() {
      return this.$route.meta.navbar !== undefined ? this.$route.meta.navbar : true
    },
    hasTabbar() {
      return this.$route.meta.tabbar !== undefined ? this.$route.meta.tabbar : false
    },
    keepAlive() {
      return this.$route.meta.keepAlive !== undefined ? this.$route.meta.keepAlive : false
    },
    tabbars() {
      return getSStorage('router').filter(item => item.menu)
    },
    bodyClass() {
      let className = ''
      if (!this.hasTabbar && !this.hasNavbar) {
        className = 'app-box-full'
      }
      if (!this.hasTabbar && this.hasNavbar) {
        className = 'app-box-full app-box-nav'
      }
      if (this.hasTabbar && !this.hasNavbar) {
        className = 'app-box-full app-box-tab'
      }
      if (this.hasTabbar && this.hasNavbar) {
        className = 'app-box-full app-box'
      }
      return className
    }
  }
}
</script>

<style lang="less" scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  position: relative;
  .app-box-full {
    background: @app-bg;
    height: 100vh;
    &.app-box-nav {
      height: calc(100vh - 88px);
    }
    &.app-box-tab {
      height: calc(100vh - 100px);
    }
    &.app-box {
      height: calc(100vh - 188px);
    }
  }
  .footer {
    height: 100px;
    background-color: #fff;
  }
}
</style>
