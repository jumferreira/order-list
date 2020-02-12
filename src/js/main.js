import Vue from 'vue';
import Vuex from 'vuex';
import _axios from 'axios';
import _lodash from 'lodash';

import VueLazyload from 'vue-lazyload';
import VModal from 'vue-js-modal';
import VueI18n from 'vue-i18n';

import customer from './modules/index';

window.axios = _axios;
window._ = _lodash;

// components
import App from './components/App.vue';
import LanguageSwitcher from './components/LanguageSwitcher.vue';

Vue.component('app', App);
Vue.component('language-switcher', LanguageSwitcher);

// Uses
Vue.use(Vuex);
Vue.use(VueLazyload);
Vue.use(VModal);
Vue.use(VueI18n);

const messages = {
    en: {
        header: {
            activateOrder: 'You have an activate order.',
            activateOrderButton: 'Click here for details',
        },
        profile: {
            salute: 'Hello, ',
            memberSince: "You're a member since: ",
            edit: 'edit profile',
        },

        history: {
            title: 'Order History',
            status: 'Status: ',
            details: 'details',
        },

        modal: {
            title: 'Order Detail',
            status: 'Status: ',
            total: 'Total: ',
            delivery: 'Delivery: ',
        },
    },

    ptbr: {
        header: {
            activateOrder: 'Você tem um pedido em aberto',
            activateOrderButton: 'Clique aqui para mais detalhes',
        },
        profile: {
            salute: 'Olá, ',
            memberSince: "Você é um membro desde: ",
            edit: 'editar perfil',
        },

        history: {
            title: 'Histórico de pedidos',
            status: 'Status: ',
            details: 'detalhes',
        },

        modal: {
            title: 'Detalhes do pedido',
            status: 'Status: ',
            total: 'Total: ',
            delivery: 'Entrega: ',
        },
    }
};

const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})

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
