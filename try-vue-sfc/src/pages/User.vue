<template>
  <div class="page-user">
    <p>{{ message }}</p>
    <nav>
      <ul>
        <li><router-link v-bind:to="`/user/${$route.params.id}/profile`">プロフィール</router-link></li>
        <li><router-link v-bind:to="`/user/${$route.params.id}/posts`">投稿一覧</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import auth from '@/utils/auth'

export default {
  name: 'User',
  data () {
    return {
      message: 'ユーザ詳細'
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }
}
</script>
