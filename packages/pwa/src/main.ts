import './assets/main.css'

import { createApp, type App as VueApp, h, provide } from 'vue'
import App from './App.vue'
import ui from '@nuxt/ui/vue-plugin'
import router from './router'
import useFirebase from './composables/useFirebase'

// import { ApolloClients, DefaultApolloClient } from '@vue/apollo-composable'
import { DefaultApolloClient } from '@vue/apollo-composable'
import useGraphql from './composables/useGraphql'

// expose the firebase instance globally to get access to it in the console // __firebase.firebaseUser.value.getIdToken().then(token => console.log('Bearer ' + token))
const firebase = useFirebase()
// Extend the Window interface to include __firebase
declare global {
  interface Window {
    __firebase: ReturnType<typeof useFirebase>
  }
}

window.__firebase = firebase

const { restoreUser } = useFirebase()
const { apolloClient } = useGraphql()

const app: VueApp = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

;(async () => {
  await restoreUser()

  app.use(router)
  app.use(ui)
  app.mount('#app')
})()
