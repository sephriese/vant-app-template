<template>
  <div class="home-container"></div>
</template>

<script>
import { Modal, deepCopy } from '@/utils/test'
export default {
  name: 'Home',
  data() {
    return {
      form: {
        name: '1111',
        age: '22',
        job: 'cooker',
        home: {
          father: '22',
          mather: '33',
          grandfa: '44',
          grandma: '55'
        }
      }
    }
  },
  mounted() {
    this.dataInit()
  },
  methods: {
    dataInit() {
      // const aa = new Modal('aa')
      // const bb = new Modal('bb')
      // console.log(aa === bb)

      let aa = deepCopy(this.form)
      let bb = JSON.parse(JSON.stringify(this.form))
      aa.pets = 'dog'
      bb.pets = 'cat'
      console.log(aa, bb, this.form)
    }
  }
}
</script>

<style lang="less" scoped></style>
