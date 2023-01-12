import {DL10n} from "../src/l10n-service.js";

describe("service tests", () => {

    test("DL10n: setLang2Messages()", () => {
        let dL10n = new DL10n();
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

        dL10n.setLang2Messages(lang2messages);
        expect(dL10n.lang2messages).toEqual(lang2messages);
    });

    test("DL10n: addLang()", () => {
        let dL10n = new DL10n();
        let messages = {
            NAME1: "name 1",
            NAME2: "name 2"
        };

        expect(dL10n.lang2messages).toEqual({});
        dL10n.addLang("en", messages);
        expect(dL10n.lang2messages['en']).toEqual(messages);
    });

    test("DL10n: addMessagesToLang()", () => {
        let dL10n = new DL10n();
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

        dL10n.setLang2Messages(lang2messages);
        let enMessages = {
            NAME3: "name 3",
            NAME4: "name 4"
        };
        dL10n.addMessagesToLang("en", enMessages);
        expect(dL10n.lang2messages["en"]['NAME4']).toBe("name 4");
    });

    test("DL10n: loadLang()", () => {
        let dL10n = new DL10n();
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
        dL10n.setLang2Messages(lang2messages);
        dL10n.loadLang("ru");
        expect(dL10n.$NAME1).toBe("имя 1");
        expect(dL10n.$NAME2).toBe("имя 2");
    });

    test("DL10n: getMessages()", () => {
        let dL10n = new DL10n();
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
        dL10n.setLang2Messages(lang2messages);
        expect(dL10n.getMessages("ru")).toEqual({
            NAME1: "имя 1",
            NAME2: "имя 2"
        });
    });
});