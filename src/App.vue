<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>
<script>
import defaultSetting from '@/settings'
export default {
  name: 'App',
  computed: {
    transitionName() {
      if (defaultSetting.needPageTrans) {
        return this.$store.state.direction
      }
      return ''
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Noto Sans SC', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
