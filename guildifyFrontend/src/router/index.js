import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MainView from '../views/MainView.vue'
import CharactersView from '../views/CharactersView.vue'
import CharacterDetail from '../views/CharacterDetail.vue'
import NewCharacterView from '../views/NewCharacterView.vue'
import GuildDetail from '../views/GuildDetail.vue'
import NewGuildView from '../views/NewGuildView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/main',
      name: 'main',
      component: MainView
    },
    {
      path: '/characters',
      name: 'Characters',
      component: CharactersView
    },
    {
      path: '/character/:id',
      name: 'CharacterDetail',
      component: CharacterDetail

    },
    {
      path: '/newcharacter',
      name: 'NewCharacter',
      component: NewCharacterView

    },
    {
      path: '/newguild',
      name: 'NewGuild',
      component: NewGuildView

    },
    {
      path: '/guild/:id',
      name: 'GuildDetail',
      component: GuildDetail

    }
  ]
})

export default router
