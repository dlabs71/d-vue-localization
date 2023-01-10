import {createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex';
import l10nStore, {DL10N_ACTIONS, DL10N_GETTERS, STORE_MODULE_NAME} from '../src/l10n-store-module';

describe("store module tests", () => {
    const state = {};

    const getters = {};

    const mutations = {};

    const actions = {};

    test("save and get", () => {
        const localVue = createLocalVue();
        localVue.use(Vuex);

        const store = new Vuex.Store({
            modules: {
                [STORE_MODULE_NAME]: l10nStore
            },
            state,
            getters,
            mutations,
            actions,
            strict: true
        });
        expect(store.getters[DL10N_GETTERS.get]).toBe(null);

        store.dispatch(DL10N_ACTIONS.set, "en");
        expect(store.getters[DL10N_GETTERS.get]).toBe("en");

        store.dispatch(DL10N_ACTIONS.set, "ru");
        expect(store.getters[DL10N_GETTERS.get]).toBe("ru");
    });
});