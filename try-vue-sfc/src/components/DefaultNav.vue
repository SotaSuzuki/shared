<template>
  <nav>
    <router-link to="/">TOP</router-link>
    <router-link to="/users">ユーザ一覧</router-link>
    <router-link v-bind:to="{ name: 'User', params: { id: 123 } }">ユーザ詳細</router-link>
    <button data-link-to="/login" @click="handleClickTo" type="button">ログイン</button>
    <button data-link-to="/logout" @click="handleClickTo" type="button">ログアウト</button>
  </nav>
</template>

<script>
export default {
  name: 'DefaultNav',
  methods: {
    handleClickTo (e) {
      const path = e.target.dataset.linkTo
      this.$emit('apply', path)
    }
  }
}
</script>

<style scoped>
a {
  dislay: inline-block;
  margin-left: 10px;
}
a:hover {
  opacity: .7;
}
a:first-child {
  margin-left: 0;
}
</style>
