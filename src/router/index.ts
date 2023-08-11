import * as VueRouter from 'vue-router'

import Main from '../components/main.vue'
import Game from '../components/game.vue'
import UserConfig from '../components/userConfig.vue'
import Ranking from '../components/ranking.vue'

const routes = [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/userConfig',
      name: 'userConfig',
      component: UserConfig
    },
    {
      path: '/game/:userName',
      name: 'game',
      component: Game,
      props: true
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking
    }
]

const vueRouter = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})
export default vueRouter
