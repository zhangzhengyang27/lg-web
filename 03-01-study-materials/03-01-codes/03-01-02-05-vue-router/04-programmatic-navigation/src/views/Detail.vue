<template>
  <div>
    路由参数：{{ id }}

    <button @click="go"> go(-1) </button>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: ['id'],
  methods: {
    go () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>

</style>
