import {createLocalVue, shallowMount} from "@vue/test-utils";
import l10nMixin from '../src/l10n-mixin.js';
import Vuex from "vuex";
import l10nStore, {DL10N_ACTIONS, DL10N_GETTERS, STORE_MODULE_NAME} from "../src/l10n-store-module";
import {DL10n, DL10nInstance} from "../src";

describe("mixin tests", () => {

    const localVue = createLocalVue();
    localVue.use(Vuex);

    const store = new Vuex.Store({
        modules: {
            [STORE_MODULE_NAME]: l10nStore
        },
        state: {},
        getters: {},
        mutations: {},
        actions: {},
        strict: true
    });

    let lang2messages = {
        "en": {
            NAME1: "name 1",
            NAME2: "name 2"
        },
        "ru": {
            NAME1: "имя 1",
            NAME2: "имя 2"
        }
    };
    DL10nInstance.setLang2Messages(lang2messages);

    const Component = {
        render() {
        }
    };
    const wrapper = shallowMount(Component, {
        mixins: [l10nMixin],
        store: store,
        localVue: localVue
    });

    test("mixin data test", () => {
        expect(wrapper.vm.$dL10n).toBeInstanceOf(DL10n);
    });

    test("mixin computed $currentLang test", () => {
        wrapper.vm.$store.dispatch(DL10N_ACTIONS.set, "ru");
        expect(wrapper.vm.$currentLang).toBe("ru");

        wrapper.vm.$store.dispatch(DL10N_ACTIONS.set, "en");
        expect(wrapper.vm.$currentLang).toBe("en");
    });

    test("mixin method getDL10nNameByCode() test 1", (done) => {
        wrapper.vm.$store.dispatch(DL10N_ACTIONS.set, "en");
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.getDL10nNameByCode("NAME1")).toBe("name 1");
            done();
        });
    });

    test("mixin method getDL10nNameByCode() test 2", (done) => {
        wrapper.vm.$store.dispatch(DL10N_ACTIONS.set, "ru");
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.getDL10nNameByCode("NAME1")).toBe("имя 1");
            done();
        });
    });

    test("mixin method setDL10nLang() test", (done) => {
        wrapper.vm.setDL10nLang("ru_RU");
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.$store.getters[DL10N_GETTERS.get]).toBe("ru_RU");
            done();
        });
    });

    test("mixin method getDL10nLang() test", (done) => {
        wrapper.vm.$store.dispatch(DL10N_ACTIONS.set, "en_US");
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.getDL10nLang()).toBe("en_US");
            done();
        });
    });
});