import L10nMixin from './l10n-mixin';
import Dl10n from './l10n-service';
import dl10nStoreModule, { STORE_MODULE_NAME } from './l10n-store-module';

export default {
    /**
     * Vue plugin for initialization localization in app (mixin, vuex module and etc.)
     * @param Vue - instance of Vue app
     * @param opt {{lang2messages, store}} - plugin options.
     *                                       lang2messages - association list of languages and messages
     *                                       store - instance of vuex store for register new module
     */
    install(Vue, opt) {
        if (!!opt && !!opt.lang2messages) {
            Dl10n.setLang2Messages(opt.lang2messages);
        }
        if (opt.store) {
            opt.store.registerModule(STORE_MODULE_NAME, dl10nStoreModule);
        }
        Vue.mixin(L10nMixin);
    },
};
