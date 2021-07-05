import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import {createI18n} from 'vue-i18n'
import localeZH from 'element-plus/lib/locale/lang/zh-cn'
import localeEN from 'element-plus/lib/locale/lang/en'
import messages from './utils/i18n'
import './assets/css/icon.css'
import 'element-plus/lib/theme-chalk/index.css'

const i18n = createI18n({
    locale: localeZH.name,
    fallbackLocale: localeEN.name,
    messages,
})

const app = createApp(App).use(ElementPlus, {locale: localeZH}).use(i18n).use(store).use(router).mount('#app')
