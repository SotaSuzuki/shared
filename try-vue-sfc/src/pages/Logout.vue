<template></template>

<script>
import auth from '@/utils/auth'

export default {
  name: 'Logout',
  beforeRouteEnter (to, from, next) {
    auth.logout()
    console.log('ログアウトしました')
    next('/')
  }
}
</script>
