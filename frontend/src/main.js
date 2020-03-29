import Vue from 'vue'
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';
import App from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'vue-material/dist/vue-material.min.css';

import routes from './routes';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueMaterial);

const router = new VueRouter({mode: 'history', routes});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
