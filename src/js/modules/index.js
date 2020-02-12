export default {
    namespaced: true,

    state: {
        information: JSON.parse(window.localStorage.getItem('customerInformation')),
        history: JSON.parse(window.localStorage.getItem('customerHistory')),
        orderDetails: JSON.parse(window.localStorage.getItem('customerDetail')),
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

        updateInformation ({ commit }, information) {
            commit('UPDATE_CUSTOMER_INFORMATION', information);
        },
    },

    mutations: {
        'SET_CUSTOMER_INFORMATION' (state, information) {
            state.information = information;
            window.localStorage.setItem('customerInformation', JSON.stringify(information));
        },

        'SET_CUSTOMER_HISTORY' (state, history) {
            state.history = history;
            window.localStorage.setItem('customerHistory', JSON.stringify(history));
        },

        'SET_ORDER_DETAILS' (state, orderDetails) {
            state.orderDetails = orderDetails;
            window.localStorage.setItem('customerDetail', JSON.stringify(orderDetails));
        },

        'UPDATE_CUSTOMER_INFORMATION' (state, information) {
            state.information = information;
            window.localStorage.setItem('customerInformation', JSON.stringify(information));
        },
    },
};
