import L10nMixin from './l10n-mixin';
import Dl10n from './l10n-service';
import dl10nStoreModule, {STORE_MODULE_NAME} from "./l10n-store-module";

export default {
    install(Vue, opt) {
        if (!!opt && !!opt.local) {
            Dl10n.setLang(opt.local);
        }
        if (!!opt.store) {
            opt.store.registerModule(STORE_MODULE_NAME, dl10nStoreModule);
        }
        Vue.mixin(L10nMixin);
    }
}
