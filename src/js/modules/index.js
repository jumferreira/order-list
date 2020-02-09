export default {
    namespaced: true,

    state: {
        information: {},
        history: {},
        orderDetails: {},
    },

    getters: {
        information: state => state.information,
        history: state => state.history,
        orderDetails: state => state.orderDetails,
    },

    actions: {
        setInformation ({ commit }, information) {
            commit('SET_CUSTOMER_INFORMATION', information);
        },

        setHistory ({ commit }, history) {
            commit('SET_CUSTOMER_HISTORY', history);
        },

        setOrderDetails ({ commit }, orderDetails) {
            commit('SET_ORDER_DETAILS', orderDetails);
        },
    },

    mutations: {
        'SET_CUSTOMER_INFORMATION' (state, information) {
            state.information = information;
        },

        'SET_CUSTOMER_HISTORY' (state, history) {
            state.history = history;
        },

        'SET_ORDER_DETAILS' (state, orderDetails) {
            state.orderDetails = orderDetails;
        },
    },
};
