import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import 'element-plus/dist/index.css'
import './style/index.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import elementPlus from 'element-plus'
import { router } from './router'
import { createPinia } from 'pinia'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const app = createApp(App)
app.directive('view', {
  mounted(el, binding) {
    const callback = binding.value || {}
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (typeof callback === 'string') {
            el.classList.toggle(callback)
          } else callback()
        }
      })
    })
    observer.observe(el)
  }
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(elementPlus, {
  locale: zhCn
})

app.use(createPinia())
app.mount('#app')
