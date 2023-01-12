/**
 * Class that implements localization.
 */
class DL10n {
    /**
     * Association list of languages and messages
     * @type {{}}
     */
    lang2messages = {};

    /**
     * Current active language (key in lang2messages)
     * @type {String}
     */
    lang = null;

    constructor(lang2messages = {}) {
        this.lang2messages = lang2messages;
    }

    /**
     * Create or get instance of the class
     * @returns {DL10n}
     */
    static get instance() {
        if (!this.$instance) {
            this.$instance = new DL10n();
        }
        return this.$instance;
    }

    /**
     * Add a new language and messages for it
     * @param name {String} - name language
     * @param messages {Object} - object of messages
     */
    addLang(name, messages = {}) {
        this.lang2messages[name] = messages;
    }

    /**
     * Method for adding new messages into existing language in storage
     * @param lang {String} - name language
     * @param messages {Object} - object of messages
     */
    addMessagesToLang(lang, messages = {}) {
        this.lang2messages[lang] = Object.assign(messages, this.lang2messages[lang]);
        this.loadLang(this.lang);
    }

    /**
     * Setter for lang2messages parameter
     * @param lang2messages {Object} - association list of languages and messages
     */
    setLang2Messages(lang2messages = {}) {
        this.lang2messages = lang2messages;
    }

    /**
     * Method for loading language
     * @param lang {String} - name language (key in lang2messages)
     */
    loadLang(lang) {
        if (!lang || !Object.keys(this.lang2messages).includes(lang)) {
            return;
        }
        this._defineConstants(lang);
    }

    /**
     * Get messages by language name
     * @param lang {String} - name language (key in lang2messages)
     * @returns {null|*}
     */
    getMessages(lang) {
        if (!lang || !Object.keys(this.lang2messages).includes(lang)) {
            return null;
        }
        return this.lang2messages[lang];
    }

    /**
     * Method for creating new field class with messages for actual language
     * @param lang {String} - name language (key in lang2messages)
     * @private
     */
    _defineConstants(lang) {
        if (lang in this.lang2messages) {
            this.lang = lang;
            const constants = this.lang2messages[lang];
            Object.keys(constants).forEach((item) => {
                this[`$${item}`] = constants[item];
            });
        }
    }
}

export {
    DL10n,
};

export default DL10n.instance;
