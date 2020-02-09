import Vue from 'vue';
import Vuex from 'vuex';
import _axios from 'axios';
import _lodash from 'lodash';
import VueLazyload from 'vue-lazyload';
import customer from './modules/index';

window.axios = _axios;
window._ = _lodash;

// components
import App from './components/App.vue';

Vue.component('app', App);

// Uses
Vue.use(Vuex);
Vue.use(VueLazyload)

const store = new Vuex.Store({
    modules: {
        customer,
    }
});

new Vue({
    el: '#app',
    store,
});
