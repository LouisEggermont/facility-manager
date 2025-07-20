import './assets/main.css'

import { createApp, type App as VueApp } from 'vue'
import ui from '@nuxt/ui/vue-plugin'
import App from './App.vue'
import router from './router'
import useFirebase from './composables/useFirebase'

const { restoreUser } = useFirebase()

const app: VueApp = createApp(App)

;(async () => {
  await restoreUser()

  app.use(router)
  app.use(ui)
  app.mount('#app')
})()
