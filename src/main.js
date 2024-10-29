import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import 'element-plus/dist/index.css'
import './style/index.scss'
import "./style/mobile3.less";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import elementPlus from 'element-plus'
import { router } from './router'
import { createPinia } from 'pinia'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import "./assets/icon/iconfont.css"
import Code from './component/asset-common/components/Code_go.vue';
import Button1 from './component/asset-common/components/Button93d500_go.vue';
import Button2 from './component/asset-common/components/Buttonrgba24224224277_go.vue';
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
app.component('common-code', Code);
app.component('common-button93d500', Button1);
app.component('common-button24277', Button2);
app.use(router)
app.use(elementPlus, {
  locale: zhCn
})

app.use(createPinia())
app.mount('#app')
