<template>
    <div class="main">
        <div class="header">
            <div class="container">
                <div class="columns header__columns">
                    <div class="column logo_column">
                        <h1 class="header__logo">
                            <a href="https://www.takeaway.com/">
                                <img class="header__image" src="https://www.takeaway.com/assets/images/logo/takeaway.svg" alt="takeaway">
                            </a>
                        </h1>
                    </div>

                    <div class="column header__info">
                        <div class="column active-order_column">
                            <div class="header__active-order">
                                <p>You have an activate order.</p>
                                <a href="">Click here for details</a>
                            </div>
                        </div>

                        <div class="column profile_column">
                            <button class="button button--link header__profile">
                                <i class="far fa-user"></i>
                                Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="body">
            <div class="container">
                <div class="columns">
                    <div class="column column--6">
                        <div class="profile">
                            <h3>Hello, {{ information.firstName }}</h3>
                            <p>You're a member since: {{ memberSince }}</p>
                            <p v-text="birthday"></p>
                            <p v-text="information.address"></p>
                        </div>
                    </div>

                    <div class="column column--6">
                        <div class="order-history">
                            <h3>ORDER HISTORY</h3>

                            <ul class="order-history__list">
                                <li
                                    v-for="(item, key) in history.last5Orders"
                                    :key="key"
                                    class="order-history__item"
                                    @click=""
                                >
                                    <p v-text="item.restaurantName"></p>
                                    <p v-text="orderTime(item.orderTime)"></p>
                                    <p v-text="userCurrency + item.orderTotal"></p>

                                    <p v-text="'Status: ' + item.status"></p>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

export default {
    data: () => ({
    }),

    computed: {
        ...mapGetters('customer', [
            'information',
            'history',
            'orderDetails',
        ]),

        birthday () {
            return moment(this.information.birthday).format('DD.MM.YYYY');
        },

        memberSince () {
            return moment(this.information.registered.date).format('DD.MM.YYYY');
        },

        userCurrency () {
            switch (this.information.currency) {
                case 'euro':
                    return '€ ';
                case 'dolar':
                    return 'US$ ';
                case 'real':
                    return 'R$ ';
            }
        }
    },

    methods: {
        // ...mapActions([
        //     'setCustomerInformation',
        // ]),

        async getCustomerInformation () {
            const { data } = await axios.get('https://api.myjson.com/bins/pdefl');
            this.$store.dispatch('customer/setInformation', data);
        },

        async getCustomerHistory () {
            const { data } = await axios.get('https://api.myjson.com/bins/19f9bd');
            this.$store.dispatch('customer/setHistory', data);
        },

        async getCustomerDetail () {
            const { data } = await axios.get('https://api.myjson.com/bins/o1sp5');
            this.$store.dispatch('customer/setOrderDetails', data);
        },

        orderTime (time) {
            return moment(time).format('DD-MM-YYYY');
        },
    },

    beforeMount () {
        this.getCustomerInformation();
        this.getCustomerHistory();
        this.getCustomerDetail();
    },

    mounted () {
    },
};
</script>
