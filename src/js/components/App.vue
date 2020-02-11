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
                            <div
                                v-if="hasActiveOrder"
                                class="header__active-order"
                            >
                                <p>You have an activate order.</p>
                                <button @click="openModal()">Click here for details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="body">
            <div class="container">
                <div class="columns">
                    <div class="column profile_column">
                        <div class="profile">
                            <div class="profile__picture">
                                <img :src="information.picture.medium" :alt="information.firstName">
                            </div>

                            <div class="profile__info">
                                <h2 class="profile__info-salute">
                                    Hello, {{ information.firstName }}
                                </h2>

                                <p class="profile__info-member">
                                    You're a member since: {{ memberSince }}
                                </p>

                                <p class="profile__info-birthday">
                                    <i class="fas fa-birthday-cake"></i>
                                    {{ birthday }}
                                </p>

                                <p class="profile__info-address">
                                    <i class="fas fa-home"></i>
                                    {{ information.address }}
                                </p>

                                <button
                                    class="profile__info-edit"
                                    @click="toggleEditBlock()"
                                >
                                    <i class="fas fa-pencil-alt"></i>
                                    edit profile
                                </button>
                            </div>

                        </div>

                        <div
                            class="profile__edit"
                            :class="{ 'is-active' : showEdit }"
                        >
                            <div class="flex justify-between">
                                <input
                                    class="input input--50 input--grey mr-2"
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    v-model="newData.firstName"
                                >

                                <input
                                    class="input input--50 input--grey"
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    v-model="newData.lastName"
                                >
                            </div>

                            <div class="flex justify-between">
                                <input
                                    class="input input--50 input--grey mr-2"
                                    type="date"
                                    name="birthday"
                                    v-model="newData.birthday"
                                >

                                <select
                                    class="input input--50 input--grey"
                                    v-model="newData.gender"
                                >
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                            </div>

                            <input
                                class="input input--full input--grey"
                                type="email"
                                name="emailAddress"
                                placeholder="E-mail"
                                v-model="newData.emailAddress"
                            >

                            <input
                                class="input input--full input--grey"
                                type="text"
                                name="address"
                                placeholder="Addresss"
                                v-model="newData.address"
                            >

                            <button
                                class="button"
                                @click="toggleEditBlock()"
                            >
                                Cancel
                            </button>

                            <button
                                class="button"
                                @click="updateInformation()"
                            >
                                Update
                            </button>
                        </div>
                    </div>

                    <div class="column history_column">
                        <div class="order-history">
                            <h2 class="order-history__title">Order History</h2>

                            <ul class="order-history__list">
                                <li
                                    v-for="(item, key) in history.last5Orders"
                                    :key="key"
                                    class="order-history__item"
                                    @click=""
                                >
                                    <div class="flex justify-between">
                                        <span
                                            class="order-history__item-restaurant"
                                            v-text="restaurantName(item.restaurantName)"
                                            :title="item.restaurantName"
                                        ></span>
                                        <span
                                            class="order-history__item-time"
                                            v-text="'(' + orderTime(item.orderTime) + ')'"
                                        ></span>
                                    </div>

                                    <p
                                        class="order-history__item-total"
                                        v-text="userCurrency + item.orderTotal"
                                    ></p>

                                    <div class="flex justify-between">
                                        <div>
                                            <span
                                                class="order-history__item-status"
                                                v-text="'Status: '"
                                            ></span>

                                            <span
                                                class="order-history__item-status"
                                                :class="deliveryClass(item.status)"
                                                v-text="item.status"
                                            ></span>
                                        </div>

                                        <button class="order-history__item-details">
                                            <i class="fas fa-plus"></i>
                                            details
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <modal
            name="orderModal"
            :width="365"
            :height="215"
        >
            <div class="modal">
                <div class="modal_header">
                    <h1 class="modal_title" v-text="'Order Detail'"></h1>

                    <button class="modal_close" @click="closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="modal_body">
                    <div class="flex justify-between">
                        <span
                            class="modal_body-restaurant"
                            v-text="restaurantName(activeOrder[0].restaurantName)"
                            :title="activeOrder[0].restaurantName"
                        ></span>
                        <span
                            class="modal_body-time"
                            v-text="'(' + orderDateTime(activeOrder[0].orderTime) + ')'"
                        ></span>
                    </div>

                    <p
                        class="modal_body-total"
                        v-text="userCurrency + activeOrder[0].orderTotal"
                    ></p>

                    <p class="modal_body-address">
                        <i class="fas fa-home"></i>
                        {{ activeOrder[0].deliveryAddress }}
                    </p>

                    <div>
                        <span
                            class="modal_body-status"
                            v-text="'Status: '"
                        ></span>

                        <span
                            class="modal_body-status"
                            :class="deliveryClass(activeOrder[0].status)"
                            v-text="activeOrder[0].status"
                        ></span>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import {
    cloneDeep as _cloneDeep,
    truncate as _truncate,
    filter as _filter,
    some as _some,
} from 'lodash';

export default {
    data: () => ({
        showEdit: false,
        newData: {},
        modalName: null,
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
        },

        hasActiveOrder () {
            return _some(this.history.last5Orders, { 'status': 'In transit'});
        },

        activeOrder () {
            return _filter(this.history.last5Orders, { 'status': 'In transit'});
        },
    },

    methods: {
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

        getAllData () {
            this.getCustomerInformation();
            this.getCustomerHistory();
            this.getCustomerDetail();
        },

        updateInformation () {
            this.$store.dispatch('customer/updateInformation', this.newData);
        },

        orderTime (time) {
            return moment(time).format('DD-MM-YYYY');
        },

        orderDateTime (time) {
            return moment(time).format('DD-MM-YYYY HH:mm');
        },

        restaurantName (name) {
            return _truncate(name, {
                length: 28,
                separator: '...'
            });
        },

        toggleEditBlock () {
            this.setNewData();
            this.showEdit = !this.showEdit;
        },

        setNewData () {
            this.newData = _cloneDeep(this.information);
        },

        deliveryClass (itemStatus) {
            switch (itemStatus) {
                case 'In transit':
                    return 'in-transit';
                case 'Delivered':
                    return 'delivered';
            }
        },

        openModal () {
            this.$modal.show('orderModal');
        },

        closeModal () {
            this.$modal.hide('orderModal');
        },
    },

    mounted () {
        this.getAllData();
    },
};
</script>
