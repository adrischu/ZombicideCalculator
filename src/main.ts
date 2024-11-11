import './assets/main.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
})

const app = createApp(App)
app.use(vuetify)
app.use(createPinia()).mount('#app')
