<template>
  <div class="page-user-list">
    <p>{{ message }}</p>
    <div>
      <p v-if="loading">ロード中・・</p>
      <p v-bind:style="{ color: 'red' }" v-if="error">エラーが発生しました</p>
      <ul>
        <li v-for="user in users" v-bind:key="user.id">{{ user.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data () {
    return {
      message: 'ユーザ一覧',
      loading: false,
      users () {
        return []
      },
      error: null
    }
  },
  methods: {
    getUsers (callback) {
      setTimeout(() => {
        callback(null, [
          {
            id: 1,
            name: 'Sota Suzuki'
          },
          {
            id: 2,
            name: 'Gero GeroPee'
          }
        ])
      }, 1000)
    },
    fetchData () {
      this.loading = true
      this.getUsers((err, users) => {
        if (err) {
          this.error = err.toString()
        } else {
          this.users = users
        }
        this.loading = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter called')
    next()
  },
  created () {
    this.fetchData()
  }
}
</script>
