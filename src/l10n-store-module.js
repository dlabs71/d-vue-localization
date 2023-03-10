import Vue from 'vue';

const state = {
    lang: null,
};

const getters = {
    getLang: (st) => st.lang,
};

const mutations = {
    SET_LANG(st, val) {
        Vue.set(st, 'lang', val);
    },
};

const actions = {
    setLang({ commit }, val) {
        commit('SET_LANG', val);
    },
};

export const STORE_MODULE_NAME = 'dl10nStore';

export const DL10N_ACTIONS = {
    set: `${STORE_MODULE_NAME}/setLang`,
};
export const DL10N_GETTERS = {
    get: `${STORE_MODULE_NAME}/getLang`,
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
