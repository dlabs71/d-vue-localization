class DL10n {
    lang2messages = {}
    lang = null

    constructor(lang2messages = {}) {
        this.lang2messages = lang2messages;
    }

    static get instance() {
        if (!this.$instance){
            this.$instance = new DL10n();
        }
        return this.$instance;
    }

    addLang(name, messages = {}) {
        this.lang2messages[name] = messages;
    }

    addMessagesToLang(lang, messages = {}) {
        this.lang2messages[lang] = Object.assign(messages, this.lang2messages[lang]);
        this.reloadLang(this.lang);
    }

    setLang(lang2messages = {}) {
        this.lang2messages = lang2messages;
    }

    reloadLang(lang) {
        this.loadLang(lang);
    }

    loadLang(lang) {
        this._defineConstants(lang);
    }

    _defineConstants(lang) {
        if (lang in this.lang2messages) {
            this.lang = lang;
            let constants = this.lang2messages[lang];
            Object.keys(constants).forEach(item => {
                this[`$${item}`] = constants[item];
            });
        }
    }
}

export {
    DL10n
}

export default DL10n.instance