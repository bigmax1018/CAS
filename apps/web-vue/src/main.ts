import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/styles/main.css'
import './assets/styles/variables.css'
import './styles.scss' // Added from root version

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app') // Or '#root' (choose one consistently)