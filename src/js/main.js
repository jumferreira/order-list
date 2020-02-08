import Vue from 'vue';
import _axios from 'axios';
import _lodash from 'lodash';
import VueLazyload from 'vue-lazyload';

window.axios = _axios;
window._ = _lodash;

import App from './components/App.vue';

Vue.use(VueLazyload)

Vue.component('app', App);

new Vue({
    el: '#app',
});
