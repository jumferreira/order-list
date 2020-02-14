import Vue from 'vue';
import _lodash from 'lodash';
import LastOrders from './LastOrders.vue';

window._ = _lodash;

const optionsDefaults = {
    data: {
        numberOfVisibleOrders: {},
        currency: {},
        lastOrders: {},
    }
}

export default {
    install(vue, opts) {
        const options = { ...optionsDefaults, ...opts }

        vue.data = {
            currency: options.data.currency,
            lastOrders: options.data.lastOrders,
            numberOfVisibleOrders: options.data.numberOfVisibleOrders,
        };

        vue.use(LastOrders);
        vue.component('last-orders', LastOrders);
    }
}
