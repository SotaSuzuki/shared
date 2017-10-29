import Vue from 'vue'
import Router from 'vue-router'

import Top from '@/pages/Top'
import UserList from '@/pages/UserList'
import User from '@/pages/User'
import Login from '@/pages/Login'
import Logout from '@/pages/Logout'

import UserProfile from '@/components/UserProfile'
import UserPosts from '@/components/UserPosts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Top',
      component: Top
    },
    {
      path: '/users',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User,
      children: [
        {
          path: 'profile',
          component: UserProfile
        },
        {
          path: 'posts',
          component: UserPosts
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }
  ]
})
