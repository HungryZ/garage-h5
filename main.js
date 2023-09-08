// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.$req = req

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
import req from "@/common/request.js"
export function createApp() {
	const app = createSSRApp(App)
	app.config.globalProperties.$req = req
	return {
		app
	}
}
// #endif