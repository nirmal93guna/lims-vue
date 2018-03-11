// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource';
import authentication from './authentication'
import pushmanager from './pushmanager'
import VueMaterialIcon from 'vue-material-icon'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

// import Notifications from 'vue-notification'

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.component(VueMaterialIcon.name, VueMaterialIcon)

var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})
// Vue.use(Notifications)
Vue.use(VueMaterial)


// call adal service to load signin page
authentication.initialize().then(_ => {
/* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: '<App />',
    components: { App }    
  });
});
