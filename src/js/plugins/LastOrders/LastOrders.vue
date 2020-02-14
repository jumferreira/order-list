<template>
    <div class="order-history">
        <p
            v-if="errorMessageLow"
            class="order-history__error"
            v-text="errorMessageLow"
        ></p>

        <p
            v-if="errorMessageBigger"
            class="order-history__warning"
            v-text="errorMessageBigger"
        ></p>

        <ul v-if="localLastOrders && errorMessageLow === null" class="order-history__list">
            <li
                v-for="(order, key) in localLastOrders"
                :key="key"
                class="order-history__item"
            >
                <div class="flex justify-between">
                    <span
                        class="order-history__item-restaurant"
                        v-text="restaurantName(order.restaurantName)"
                        :title="order.restaurantName"
                    ></span>
                    <span
                        class="order-history__item-time"
                        v-text="'(' + orderTime(order.orderTime) + ')'"
                    ></span>
                </div>

                <p
                    class="order-history__item-total"
                    v-text="userCurrency + order.orderTotal"
                ></p>

                <div v-if="order">
                    <span class="order-history__item-status" v-text="'Status: '"></span>

                    <span
                        class="order-history__item-status"
                        :class="deliveryClass(order.status)"
                        v-text="order.status"
                    ></span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import moment from 'moment';
import {
    cloneDeep as _cloneDeep,
    truncate as _truncate,
    isEmpty as _isEmpty,
} from 'lodash';

export default {
    props: {
        numberOfVisibleOrders: {
            type: Number,
            required: true,
        },

        currency: {
            type: String,
            required: true,
        },

        lastOrders: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        localLastOrders: {},
        errorMessageLow: null,
        errorMessageBigger: null,
    }),

    computed: {
        userCurrency () {
            if (! _isEmpty(this.currency)) {
                switch (this.currency) {
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
    },

    methods: {
        orderTime (time) {
            if (! _isEmpty(time)) {
                return moment(time).format('DD-MM-YYYY');
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

        parseLastOrders () {
            if (this.localLastOrders.length < 2) {
                this.errorMessageLow = 'Number of orders is too low';
            }

            if (this.numberOfVisibleOrders > 5) {
                this.errorMessageBigger = 'Number of visible orders is bigger than the limit';
            }

            if (this.localLastOrders.length > 5) {
                const removeNumber = this.localLastOrders.length - 5;
                const index = (this.localLastOrders.length - 1) - removeNumber;

                this.localLastOrders.splice(index, removeNumber);
            }
        },
    },

    mounted () {
        this.localLastOrders = _cloneDeep(this.lastOrders);
        this.parseLastOrders();
    },
};
</script>

<style lang="scss" scoped>
.order-history {
    &__error {
        text-align: center;
        color: #dd1515;
    }

    &__warning {
        text-align: center;
        color: #b1a33e;
    }

    &__title {
        margin-bottom: 0.75rem;
        color: #0a3847;
    }

    &__list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    &__item {
        padding: 0.5rem;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        width: 100%;
        max-width: 345px;
        color: #666;
        border: 1px solid #f78028;

        &-restaurant {
            font-weight: bold;
            color: #f78028;
        }

        &-time, &-details {
            font-size: 0.875rem;
            color: #666;
        }

        &-total {
            font-weight: bold;
            margin-bottom: 0.75rem;
            color: #0a3847;
        }

        &-status {
            font-weight: bold;
            font-size: 0.875rem;
            color: #666;

            &.delivered {
                color: #0a3847;
            }

            &.in-transit {
                color: #f78028;
            }
        }

        &-details {}
    }
}
</style>
