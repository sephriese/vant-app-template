<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'Navbar',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    [NavBar.name]: NavBar
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped></style>
