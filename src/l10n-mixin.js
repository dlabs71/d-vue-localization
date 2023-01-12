import DL10nInstance from './l10n-service';
import { DL10N_ACTIONS, DL10N_GETTERS } from './l10n-store-module';

export default {
    data() {
        return {
            /**
             * Class of localization
             */
            $dL10n: DL10nInstance,
        };
    },
    methods: {
        /**
         * Method for getting message for current language
         * @param name {String} - code of message
         * @returns {{}|*}
         */
        getDL10nNameByCode(name) {
            if (this.$currentLang) {
                return this.$dL10n[`$${name}`];
            }
            return {};
        },

        /**
         * Setter language code to storage
         * @param lang {String} - language code
         */
        setDL10nLang(lang) {
            this.$store.dispatch(DL10N_ACTIONS.set, lang);
        },

        /**
         * Getter language code from storage
         * @returns {String} - language code
         */
        getDL10nLang() {
            return this.$store.getters[DL10N_GETTERS.get];
        },
    },
    computed: {
        /**
         * Current language in vuex storage
         */
        $currentLang() {
            if (!this.$store) {
                return null;
            }
            return this.$store.getters[DL10N_GETTERS.get];
        },
    },
    watch: {
        /**
         * Watcher for reloading messages when changed language
         */
        $currentLang(val) {
            if (val) {
                this.$dL10n.loadLang(val);
            }
        },
    },
    created() {
        if (!this.$dL10n) {
            this.$dL10n = DL10nInstance;
        }
        if (this.$dL10n.lang !== this.$currentLang) {
            this.$dL10n.loadLang(this.$currentLang);
        }
    },

};
