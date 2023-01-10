import DL10n from "./l10n-service";
import {DL10N_GETTERS} from "./l10n-store-module";

export default {
    data() {
        return {
            $dL10n: DL10n
        }
    },
    methods: {
        getDL10nByName(name) {
            if (this.$langL10n) {
                return this.$dL10n[name];
            }
            return {};
        }
    },
    computed: {
        $langL10n() {
            if (!this.$store) {
                return null;
            }
            return this.$store.getters[DL10N_GETTERS.get];
        }
    },
    watch: {
        $langL10n(val) {
            if (!!val) {
                this.$dL10n.reloadLang(val);
            }
        }
    },
    created() {
        if (this.$dL10n.lang !== this.$langL10n) {
            this.$dL10n.reloadLang(this.$langL10n);
        }
    }

}