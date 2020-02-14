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
                                <p>{{ $t("header.activateOrder") }}</p>
                                <button @click="openModal()">{{ $t("header.activateOrderButton") }}</button>
                            </div>

                            <language-switcher></language-switcher>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="body">
            <div class="container">

                <div class="loader" :class="{ 'is-active': isLoading }"></div>

                <div v-if="! isLoading" class="columns">
                    <div class="column profile_column">
                        <div class="profile">
                            <div class="profile__picture">
                                <img
                                    v-if="information"
                                    :src="information.picture.medium"
                                    :alt="information.firstName"
                                >
                            </div>

                            <div class="profile__info">
                                <h2 v-if="information" class="profile__info-salute">
                                    {{ $t("profile.salute") }}{{ information.firstName }}
                                </h2>

                                <p class="profile__info-member">
                                    {{ $t("profile.memberSince") }}{{ memberSince }}
                                </p>

                                <p class="profile__info-birthday">
                                    <i class="fas fa-birthday-cake"></i>
                                    {{ birthday }}
                                </p>

                                <p v-if="information" class="profile__info-address">
                                    <i class="fas fa-home"></i>
                                    {{ information.address }}
                                </p>

                                <button
                                    class="profile__info-edit"
                                    @click="toggleEditBlock()"
                                >
                                    <i class="fas fa-pencil-alt"></i>
                                    {{ $t("profile.edit") }}
                                </button>
                            </div>

                        </div>

                        <div
                            class="profile__edit"
                            :class="{ 'is-active' : showEdit }"
                        >
                            <div class="flex justify-between">
                                <input
                                    v-if="newData"
                                    class="input input--50 input--grey mr-2"
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    v-model="newData.firstName"
                                >

                                <input
                                    v-if="newData"
                                    class="input input--50 input--grey"
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    v-model="newData.lastName"
                                >
                            </div>

                            <div class="flex justify-between">
                                <input
                                    v-if="newData"
                                    class="input input--50 input--grey mr-2"
                                    type="date"
                                    name="birthday"
                                    v-model="newData.birthday"
                                >

                                <select
                                    v-if="newData"
                                    class="input input--50 input--grey"
                                    v-model="newData.gender"
                                >
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                            </div>

                            <input
                                v-if="newData"
                                class="input input--full input--grey"
                                type="email"
                                name="emailAddress"
                                placeholder="E-mail"
                                v-model="newData.emailAddress"
                            >

                            <input
                                v-if="newData"
                                class="input input--full input--grey"
                                type="text"
                                name="address"
                                placeholder="Addresss"
                                v-model="newData.address"
                            >

                            <div class="flex justify-end">
                                <button
                                    class="button button--cancel"
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
                    </div>

                    <div class="column history_column">
                        <h2 class="order-history__title">{{ $t("history.title") }}</h2>

                        <last-orders
                            :numberOfVisibleOrders="5"
                            :currency="information.currency"
                            :lastOrders="history.last5Orders"
                        ></last-orders>
                    </div>
                </div>
            </div>
        </div>

        <modal
            name="orderModal"
            :width="365"
            :height="360"
        >
            <div class="modal">
                <div class="modal_header">
                    <h1 class="modal_title">{{ $t("modal.title") }}</h1>

                    <button class="modal_close" @click="closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="modal_body">
                    <div class="flex justify-between">
                        <span
                            v-if="orderDetails"
                            class="modal_body-restaurant"
                            v-text="restaurantName(orderDetails.restaurantName)"
                            :title="orderDetails.restaurantName"
                        ></span>
                        <span
                            v-if="orderDetails"
                            class="modal_body-time"
                            v-text="'(' + orderDateTime(orderDetails.orderTime) + ')'"
                        ></span>
                    </div>


                    <template v-if="orderDetails">
                        <template v-for="(product, index) in orderDetails.products">
                            <p
                                v-if="product"
                                class="modal_body-product"
                                :key="index"
                            >
                                <i class="fas fa-utensils"></i>
                                {{ product.productName + ' (' + userCurrency + ' ' + product.pricePerUnitWithTax + ')' }}
                            </p>
                        </template>
                    </template>

                    <p v-if="orderDetails" class="modal_body-delivery">
                        {{ $t("modal.delivery") + ' (' + userCurrency + ' ' + orderDetails.deliveryCosts + ')' }}
                    </p>

                    <hr>

                    <div v-if="orderDetails">
                        <span>{{ $t("modal.total") }}</span>
                        <span
                            class="modal_body-total"
                            v-text="userCurrency + orderDetails.orderTotal"
                        ></span>
                    </div>

                    <p v-if="orderDetails" class="modal_body-address">
                        <i class="fas fa-home"></i>
                        {{ orderDetails.deliveryAddress }}
                    </p>

                    <div v-if="orderDetails" class="modal_body-status">
                        <span>
                            {{ $t("modal.status") }}
                        </span>

                        <span
                            class="modal_body-status"
                            :class="deliveryClass(orderDetails.status)"
                            v-text="orderDetails.status.currentStatus"
                        ></span>
                    </div>

                    <template v-if="orderDetails">
                        <template v-for="(history, index) in orderDetails.status.history">
                            <p
                                v-if="history"
                                class="modal_body-history"
                                :key="'history-' + index"
                            >
                                {{ history.status + ' (' + orderDateTime(history.statusStart) + ')' }}
                            </p>
                        </template>
                    </template>
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
    isEmpty as _isEmpty,
    filter as _filter,
    some as _some,
} from 'lodash';

export default {
    name: 'App',

    data: () => ({
        showEdit: false,
        isLoading: true,
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
            if (! _isEmpty(this.information)) {
                return moment(this.information.birthday).format('DD.MM.YYYY');
            }
        },

        memberSince () {
            if (! _isEmpty(this.information)) {
                return moment(this.information.registered.date).format('DD.MM.YYYY');
            }
        },

        userCurrency () {
            if (! _isEmpty(this.information)) {
                switch (this.information.currency) {
                    case 'euro':
                        return '€ ';
                    case 'dolar':
                        return 'US$ ';
                    case 'real':
                        return 'R$ ';
                    default:
                        return '';
                }
            }
        },

        hasActiveOrder () {
            if (! _isEmpty(this.history)) {
                return _some(this.history.last5Orders, {'status': 'In transit'});
            }
        },

        activeOrder () {
            if (! _isEmpty(this.history)) {
                return _filter(this.history.last5Orders, {'status': 'In transit'});
            }
        },
    },

    methods: {
        async getCustomerInformation () {
            if (_isEmpty(this.information)) {
                try {
                    const { data } = await axios.get('https://api.myjson.com/bins/pdefl');

                    this.$store.dispatch('customer/setInformation', data);
                } catch (error) {
                    console.error(error);
                }
            }
        },

        async getCustomerHistory () {
            if (_isEmpty(this.history)) {
                try {
                    const { data } = await axios.get('https://api.myjson.com/bins/19f9bd');

                    this.$store.dispatch('customer/setHistory', data);
                } catch (error) {
                    console.error(error);
                }
            }
        },

        async getCustomerDetail () {
            if (_isEmpty(this.orderDetails)) {
                try {
                    const { data } = await axios.get('https://api.myjson.com/bins/o1sp5');

                    this.$store.dispatch('customer/setOrderDetails', data);
                } catch (error) {
                    console.error(error);
                }
            }
        },

        getAllData () {
            this.getCustomerInformation();
            this.getCustomerHistory();
            this.getCustomerDetail();

            this.isLoading = false;
        },

        updateInformation () {
            this.$store.dispatch('customer/updateInformation', this.newData);
            this.showEdit = false;
        },

        orderTime (time) {
            if (! _isEmpty(time)) {
                return moment(time).format('DD-MM-YYYY');
            }
        },

        orderDateTime (time) {
            if (! _isEmpty(time)) {
                return moment(time).format('DD-MM-YYYY HH:mm');
            }
        },

        restaurantName (name) {
            if (! _isEmpty(name)) {
                return _truncate(name, {
                    length: 28,
                    separator: '...'
                });
            }
        },

        toggleEditBlock () {
            this.setNewData();
            this.showEdit = !this.showEdit;
        },

        setNewData () {
            this.newData = _cloneDeep(this.information);
        },

        deliveryClass (itemStatus) {
            if (! _isEmpty(itemStatus)) {
                switch (itemStatus) {
                    case 'In transit':
                        return 'in-transit';
                    case 'Delivered':
                        return 'delivered';
                }
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
