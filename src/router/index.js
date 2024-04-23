import {createRouter, createWebHashHistory } from 'vue-router'
import LayoutPage from "@/views/Layout/LayoutPage.vue";
import NProgress from 'nprogress'
import HomeComponent from "@/views/Layout/component/HomeComponent.vue";
import LoginPage from "@/views/Login/LoginPage.vue";
import MeetingPage from "@/views/Layout/component/MeetingPage.vue";
import MeetList from "@/views/Layout/component/MeetList.vue";
import MeetHistory from "@/views/Layout/component/MeetHistory.vue";
import MeetingRoom from "@/views/Layout/component/MeetingRoom.vue";
import UserCenter from "@/views/Layout/component/UserCenter.vue";
import UserManage from "@/views/Layout/component/UserManage.vue";
import BookManage from "@/views/Layout/component/BookManage.vue";
import StatisticPage from "@/views/Layout/component/StatisticPage.vue";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: LayoutPage,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeComponent
        },
        {
          path: '/meeting',
          name: 'meeting',
          component: MeetingPage,
          children: [
            {
              path: '',
              name: 'meet-list',
              component: MeetList
            },
            {
              path: '/history',
              name: 'history',
              component: MeetHistory
            },
            {
              path: '/user',
              name: 'user',
              component: UserCenter
            },
            {
              path: '/userMan',
              name: 'userMan',
              component: UserManage
            },
            {
              path: '/room',
              name: 'name',
              component: MeetingRoom
            },
            {
              path: '/book',
              name: 'book',
              component: BookManage
            },
            {
              path: '/statistic',
              name: 'statistic',
              component: StatisticPage
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ]
})
router.beforeEach(async () => {
  NProgress.start();
})
router.afterEach(async () => {
  NProgress.done();
})
export default router
