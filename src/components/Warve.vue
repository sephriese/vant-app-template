<template>
  <div class="report-container">
    <div>
      <svg
        class="editorial"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="50" y="0" fill="rgba(128,215,175,.5)"></use>
          <use xlink:href="#gentle-wave" x="50" y="3" fill="rgba(128,215,175,.5)"></use>
          <use xlink:href="#gentle-wave" x="50" y="6" fill="rgba(128,215,175,.5)"></use>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EquimentReport',
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.parallax > use {
  animation: move-forever 12s linear infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
}
.parallax > use:nth-child(2) {
  animation-delay: -2s;
  animation-duration: 5s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 3s;
}

@keyframes move-forever {
  0% {
    transform: translate(-90px, 0);
  }
  100% {
    transform: translate(85px, 0);
  }
}
</style>
