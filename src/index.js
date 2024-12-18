import DL10nMixin from './l10n-mixin';
import DL10nInstance, {DL10n} from './l10n-service';
import DL10nPlugin from './l10n-plugin';
import DL10nStoreModule, {DL10N_ACTIONS, DL10N_GETTERS, STORE_MODULE_NAME} from './l10n-store-module';
import {useDL10n} from './l10n-utils';

export {
    DL10nMixin,
    DL10nInstance,
    DL10n,
    DL10nStoreModule,
    STORE_MODULE_NAME,
    DL10N_ACTIONS,
    DL10N_GETTERS,
    useDL10n
};

export default DL10nPlugin;
