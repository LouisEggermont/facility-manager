import './assets/main.css'

import { createApp, type App as VueApp, h, provide } from 'vue'
import App from './App.vue'
import ui from '@nuxt/ui/vue-plugin'
import router from './router'
import useFirebase from './composables/useFirebase'

// import { ApolloClients, DefaultApolloClient } from '@vue/apollo-composable'
import { DefaultApolloClient } from '@vue/apollo-composable'
import useGraphql from './composables/useGraphql'
import { createI18n } from 'vue-i18n'
import useCustomUser from './composables/useCustomUser'
import vRole from './directives/v-role'

// expose the firebase instance globally to get access to it in the console // __firebase.firebaseUser.value.getIdToken().then(token => console.log('Bearer ' + token))
const firebase = useFirebase()
// Extend the Window interface to include __firebase
declare global {
  interface Window {
    __firebase: ReturnType<typeof useFirebase>
  }
}

window.__firebase = firebase

const { restoreUser, firebaseUser } = useFirebase()
const { restoreCustomUser } = useCustomUser()
const { apolloClient } = useGraphql()

const i18n = createI18n({
  // legacy: false allows using the Composition API style
  legacy: false,
  locale: 'en', // default language
  fallbackLocale: 'en', // fallback if the key isn't available in the selected language
  // messages: {
  //   en: {
  //     hello: 'hello world',
  //     close: 'close',
  //     logout: 'logout',
  //     myaccount: 'my account',
  //   },
  //   nl: {
  //     hello: 'hallo wereld',
  //     close: 'afsluiten',
  //     logout: 'uitloggen',
  //   },
  // },
})

const app: VueApp = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

;(async () => {
  await restoreUser()
  if (firebaseUser.value) await restoreCustomUser()
  app.use(i18n)
  app.use(router)
  app.use(ui)

  // Register custom directives
  app.directive('role', vRole)
  // Wait until router is ready before mounting
  await router.isReady()

  app.mount('#app')
})()
