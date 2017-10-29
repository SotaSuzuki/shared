<template>
  <div class="page-login">
    <p>ログインページ</p>
    <form @submit.prevent="handleSubmitLogin">
      <label for="">Email</label><input type="email" v-model="email">
      <label for="">Pass</label><input type="password" v-model="pass">
      <button type="submit">ログイン</button>
    </form>
    <p v-bind:class="['error-text']" v-if="error">ログインに失敗しました</p>
  </div>
</template>

<script>
import auth from '@/utils/auth'

export default {
  name: 'Login',
  data () {
    return {
      email: 'vue@example.com',
      pass: '',
      error: false
    }
  },
  methods: {
    handleSubmitLogin () {
      auth.login(this.email, this.pass, (error, loggedIn) => {
        if (!loggedIn) {
          this.error = true
          console.error('ログインに失敗しました', error)
        } else {
          console.log('ログインに成功しました')
          this.$router.replace(this.$route.query.redirect || '/')
        }
      })
    }
  }
}
</script>

<style scoped>
.error-text {
  color: red;
}
</style>
