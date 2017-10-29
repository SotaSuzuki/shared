export default {
  login (email, pass, callback) {
    setTimeout(() => {
      if (email === 'vue@example.com' && pass === 'vue') {
        localStorage.token = Math.random().toString(36).substring(7)
        if (callback) {
          callback(null, true)
        }
      } else {
        if (callback) {
          callback(null, false)
        }
      }
    }, 0)
  },

  logout () {
    delete localStorage.token
  },

  loggedIn () {
    return !!localStorage.token
  }
}
