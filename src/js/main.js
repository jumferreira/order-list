// Imports
import Vue from 'vue';
import Vuex from 'vuex';
import _axios from 'axios';
import _lodash from 'lodash';

import VModal from 'vue-js-modal';
import VueI18n from 'vue-i18n';

import customer from './modules/index';
import languages from './languages.json';

window.axios = _axios;
window._ = _lodash;

// components
import App from './components/App.vue';
import LanguageSwitcher from './components/LanguageSwitcher.vue';
import LastOrders from './plugins/LastOrders';

Vue.component('app', App);
Vue.component('language-switcher', LanguageSwitcher);

// Uses
Vue.use(LastOrders);
Vue.use(Vuex);
Vue.use(VModal);
Vue.use(VueI18n);

// Languages
const i18n = new VueI18n({
  locale: 'en',
  messages: languages,
})

// Vuex
const store = new Vuex.Store({
    modules: {
        customer,
    }
});

new Vue({
    el: '#app',
    store,
    i18n,
});
