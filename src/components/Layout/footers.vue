<template>
  <van-tabbar fixed v-model="active" inactive-color="#7c7b7b" active-color="#0fcba2">
    <van-tabbar-item v-for="(item, index) in data" :to="item.path" :icon="item.meta.icon" :key="index" :class="{ codes: item.meta.icon === '' }">
      <template #icon="props" v-if="item.meta.icon === ''">
        <span :class="['code iconfont iconqrcode', { active: props.active }]"></span>
      </template>
      {{ item.meta.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  name: 'Footer',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    active: {
      get() {
        const route = this.$route
        const { meta, path } = route
        if (meta.activeIndex) {
          return meta.activeIndex
        }
        let index = null
        this.data.forEach((item, i) => {
          if (item.path === path || item.redirect === path) {
            index = i
          }
        })
        return index
      },
      set(val) {
        return val
      }
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.codes {
  position: relative;
  transform: translateY(-30px);
  z-index: 10;
}
.code {
  .round(@lang:70px; @size: 40px; @color: @title3; @bg: #fff);
  border: 1px solid @title3;
  transition: 0.5s;
  display: block;
  &.active {
    color: #fff;
    background: @green;
    border-color: @green;
  }
}
.van-tabbar-item:nth-of-type(2) {
  background: transparent;
}
.van-tabbar--fixed {
  position: absolute;
}
</style>
