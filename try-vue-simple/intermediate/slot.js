Vue.component('task', {
  template: '<li><slot></slot></li>'
})

Vue.component('message', {
  template: `
  <transition name="message" mode="out-in" @before-enter="log">
    <article class="message" v-show="isVisible">
      <div class="message-header">
        {{title}}
        <button @click="isVisible = false">close</button>
      </div>
      <div class="message-body"><slot></slot></div>
    </article>
  </transition>
  `,
  props: ['title'],
  data () {
    return {
      isVisible: true
    }
  },
  methods: {
    log () {
      console.log('hoge')
    }
  }
})

new Vue({
  el: '#root'
})
