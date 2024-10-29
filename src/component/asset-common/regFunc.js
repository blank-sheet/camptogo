import Code from './components/Code_go.vue'
import Button1 from './components/Button93d500_go.vue'
import Button2 from './components/Buttonrgba24224224277_go.vue'
import { defineCustomElement } from 'vue'
export default function () {
    customElements.define('common-code', defineCustomElement(Code))
    customElements.define('common-button93d500', defineCustomElement(Button1))
    customElements.define('common-button24277', defineCustomElement(Button2))
}