import { createApp, type App as VueApp } from 'vue'
import router from './router'
import App from './App.vue'

const app: VueApp = createApp(App)

app.use(router)

app.mount('#app')
