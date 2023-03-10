import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 引入vuex 状态库
import store from "./store";
Vue.prototype.$store = store;

import tabBar from "./components/tab-bar.vue"
Vue.component("tab-bar", tabBar)

import uniIcons from "./components/uni-icons/uni-icons.vue"
Vue.component("uni-icons", uniIcons)

import util from "./common/util.js"
Vue.prototype.$Copyright = util.Interface.copyright;

/*全局方法或变量*/
Vue.prototype.now = Date.now || function() {
	return new Date().getTime();
};
/*全局组件引用*/
import swiper from "./components/swiper-block.vue"
Vue.component("swiper-block", swiper)

Vue.prototype.websiteUrl = 'https://emba.meetji.com';
Vue.prototype.sourceUrl = 'https://api.meetji.com';

Vue.prototype.$imgUrl = '/static/pages/';
Vue.prototype.$domain = 'http://emba.meetji.com';

Vue.prototype.$lgChane = true; //中英文切换

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
