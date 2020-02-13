import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import VModal from 'vue-js-modal';
import axios from 'axios';

import App from'./../../components/App.vue';
import LanguageSwitcher from './../../components/LanguageSwitcher.vue';

import customer from './../../modules/index';
import languages from './../../languages.json';

window.axios = axios;

const localVue = createLocalVue();
localVue.use(axios);
localVue.use(Vuex);
localVue.use(VueI18n);
localVue.use(VModal);
localVue.component('language-switcher', LanguageSwitcher);

jest.mock('axios')

describe('Apps', () => {
    let actions
    let store
    let i18n

    beforeEach(() => {
        i18n = new VueI18n({
            locale: 'en',
            languages,
        })

        actions = {
            moduleActionClick: jest.fn()
        }

        store = new Vuex.Store({
            modules: {
                customer,
            }
        })
    })

    test('has a multilanguage plugin', () => {
        expect(typeof localVue.prototype.$t).toBe('function')
    })

    test('are a Vue instance', () => {
        const wrapperApp = mount(App, { store, localVue, i18n })
        const wrapperLanguage = mount(LanguageSwitcher, { store, localVue, i18n })

        expect(wrapperApp.isVueInstance()).toBeTruthy()
        expect(wrapperLanguage.isVueInstance()).toBeTruthy()
    })
})
