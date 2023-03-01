import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

import VCalendar from 'v-calendar'

library.add(faXmark, faCircleCheck)

import '@/assets/styles/all.scss'

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(VCalendar, {})
app.use(router)

app.mount('#app')
