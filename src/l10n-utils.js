import {getCurrentInstance} from "vue";

export function useDL10n() {
    const vueInstance = getCurrentInstance().ctx;

    function getDL10nNameByCode(name) {
        return vueInstance.getDL10nNameByCode(name);
    }

    function setDL10nLang(lang) {
        vueInstance.setDL10nLang(lang);
    }

    function getDL10nLang() {
        return vueInstance.getDL10nLang(lang);
    }

    return {
        getDL10nNameByCode,
        setDL10nLang,
        getDL10nLang
    }
}

