# D-vue-localization

[![NPM Version][npm-image]][npm-url]
[![License][license-image]][license-url]

Библиотека для упрощения реализации механизма локализации во Vue.js приложении

# Установка NPM

```sh
npm i @dlabs71/d-vue-localization
```

# Использование

Данная библиотека может быть использована в любом приложении основанном на стеке Vue.js 2 и Vuex 3.

D-vue-localization предоставляет Vue плагин при подключении которого добавляется глобальный mixin и vuex store module.

**`main.js`**

```js
import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import App from '@/App';
import DL10nPlugin from '@dlabs71/d-vue-localization';

const lang2messages = {
    "en": {
        MAIN_FORM: {
            ACCEPT_BTN_LABEL: "Accept",
            CANCEL_BTN_LABEL: "Cancel",
            PLEASE_WAIT: "Please wait ......"
        }
    },
    "ru": {
        MAIN_FORM: {
            ACCEPT_BTN_LABEL: "Принять",
            CANCEL_BTN_LABEL: "Отмена",
            PLEASE_WAIT: "Пожалуйста подождите ......"
        }
    }
};

Vue.use(DL10nPlugin, {
    lang2messages: lang2messages,
    store: store
});

new Vue({
    components: {App},
    router,
    store,
    template: '<App/>'
}).$mount('#app');
```

**`App.vue`**

```vue

<template>
    <div id="d-app" class="app d-app">
        <div v-if="loading" class="prepare-overlay">
            <span>{{ L10N_FORM.PLEASE_WAIT }}</span>
        </div>
        <v-app v-else>
            <v-btn text @click="acceptHandler">
                {{ L10N_FORM.ACCEPT_BTN_LABEL }}
            </v-btn>
            <v-btn text @click="cancelHandler">
                {{ L10N_FORM.CANCEL_BTN_LABEL }}
            </v-btn>
        </v-app>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {}
    },
    methods: {
        acceptHandler() {
        },
        cancelHandler() {
        }
    },
    computed: {
        L10N_FORM() {
            return this.getDL10nNameByCode('MAIN_FORM');
        }
    },
    mounted() {
        if (!this.getDL10nLang()) {
            this.setDL10nLang("ru");
        }
    }
}
</script>
```

# Документация

## Оглавление

* [1. Vue плагин DL10nPlugin](#section1)
* [2. Vue миксин DL10nMixin](#section2)
    * [2.1. Свойства data](#section21)
    * [2.2. Методы](#section22)
    * [2.3. Вычисляемые свойства (computed)](#section23)
    * [2.4. Блок watch](#section24)
    * [2.5. Хук created()](#section25)
* [3. Модуль Vuex DL10nStoreModule](#section3)
* [4. Класс DL10n](#section4)
    * [4.1. Статичный геттер instance](#section41)
    * [4.2. Метод addLang](#section42)
    * [4.3. Метод addMessagesToLang](#section43)
    * [4.4. Метод setLang2Messages](#section44)
    * [4.5. Метод loadLang](#section45)
    * [4.6. Метод getMessages](#section46)

## <h2 id="section1">1. Vue плагин DL10nPlugin</h2>

Vue плагин **DL10nPlugin** предназначен для быстрого подключения библиотеки к Vue.js приложению. После подключения
появляется доступ к методам/computed свойствам/data предоставляемыми vue mixin ([DL10nMixin](#section2)). А также, при
указании экземпляра vuex хранилища, автоматически регистрируется vuex store module ([DL10nStoreModule](section3)).
Параметры плагина описаны в таблице ниже:

| **Параметр**   | **Тип**    | **Обязательность** | **Пример**                                        | **Описание**  |
| :------------- | :----------| :------------------| :------------------------------------------------ | :-------------|
| lang2messages  | Object     | нет                | {"ru": {NAME1: "имя 1"}, "en": {NAME1: "name 1"}} | Объект маппинга кода языка на сообщения |
| store          | Vuex       | нет                |                                                   | Экземпляр vuex  |

Пример использования:

```js
import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import App from '@/App';
import DL10nPlugin from '@dlabs71/d-vue-localization';

const lang2messages = {
    "en": {
        MAIN_FORM: {
            ACCEPT_BTN_LABEL: "Accept",
            CANCEL_BTN_LABEL: "Cancel",
            PLEASE_WAIT: "Please wait ......"
        }
    },
    "ru": {
        MAIN_FORM: {
            ACCEPT_BTN_LABEL: "Принять",
            CANCEL_BTN_LABEL: "Отмена",
            PLEASE_WAIT: "Пожалуйста подождите ......"
        }
    }
};

Vue.use(DL10nPlugin, {
    lang2messages: lang2messages,
    store: store
});
```

## <h2 id="section2">2. Vue миксин DL10nMixin</h2>

Vue миксин **DL10nMixin** регистрируется глобально и содержит вспомогательные методы/свойства для организации механизма
локализации в приложении.

### <h3 id="section21">2.1. Свойства data</h3>

В блоке data миксин добавляет только одно свойство: **$dL10n**. В данном свойстве находиться экземпляр класса **DL10n**.

### <h3 id="section22">2.2. Методы</h3>

Миксин предоставляет ряд методов для реализации локализации в приложении. В таблице ниже описаны эти методы.

| **Метод**          | **Параметры**        | **Описание**                                   |
| :----------------- | :------------------- | :--------------------------------------------- |
| getDL10nLang       |                      | Метод получения текущего кода языка, установленного в сторе |
| setDL10nLang       | lang - код языка     | Метод установки кода языка в стор    |
| getDL10nNameByCode | name - код сообщения | Метод получения локализованного сообщения по его коду |

Пример использования:

```vue

<script>
export default {
    name: 'app',
    data() {
        return {}
    },
    computed: {
        L10N_FORM() {
            return this.getDL10nNameByCode('MAIN_FORM');
        }
    },
    mounted() {
        if (!this.getDL10nLang()) {
            this.setDL10nLang("ru");
        }
    }
}
</script>
```

### <h3 id="section23">2.3. Вычисляемые свойства (computed)</h3>

Миксин предоставляет одно вычисляемое свойство: **$currentLang** - оно имеет значение актуального кода языка,
установленного в сторе.

### <h3 id="section24">2.4. Блок watch</h3>

В блоке watch миксин добавляет слушателя на вычисляемое свойство **$currentLang**. При изменении языка в сторе
происходит автоматическое изменение и перезагрузка атрибутов класса **DL10n** в свойстве **$dL10n** блока **data**.

### <h3 id="section25">2.5. Хук created()</h3>

Миксин также реализует хук жизненного цикла **created()**. В нём реализуется начальная инициализация свойства **$dL10n**
в блоке **data**. А также первоначальная установка языка.

## <h2 id="section3">3. Модуль Vuex DL10nStoreModule</h2>

Библиотека предоставляет готовый модуль Vuex (DL10nStoreModule) для организации хранения кода языка в приложении. Данный
модуль подключается автоматически в плагине при указании параметра store. Также его можно подключить и отдельно.

Пример подключения:

```js
import Vue from 'vue';
import Vuex from 'vuex';
import {DL10nStoreModule, STORE_MODULE_NAME} from '@dlabs71/d-vue-localization';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        [STORE_MODULE_NAME]: DL10nStoreModule
    },
    strict: process.env.NODE_ENV !== 'production'
});
```

## <h2 id="section4">4. Класс DL10n</h2>

Класс **DL10n** предназначен для реализации локализации приложения. Он предоставляет хранилище маппинга кода языка на
сообщения, а также ряд методов для работы и получения сообщения для определённого языка.

Библиотека также предоставляет готовый экземпляр класса **DL10n**.

```js
import {DL10nInstance} from '@dlabs71/d-vue-localization';
```

| **Поле**      | **Тип**    | **Значение по умолчанию**  | **Описание**     |
| :------------ | :----------| :------------------------- | :----------------|
| lang          | String     | null                       | Текущий код языка локализации |
| lang2messages | Object     | {}                         | Хранилище сообщений для каждого из языков |

### <h3 id="section41">4.1. Статичный геттер instance</h3>

Статичный геттер instance предназначен для реализации паттерна Singleton для данного класса.

### <h3 id="section42">4.2. Метод addLang</h3>

Метод **addLang** предназначен для добавления нового кода языка с объектом сообщений для него.

| **Параметр** | **Тип** | **Обязательность** | **Значение по умолчанию** | **Описание**     |
| :------------| :-------| :----------------- | :------------------------ | :----------------|
| name         | String  | да                 |                           | Код языка        |
| messages     | Object  | да                 |                           | Объект с сообщениями для данного языка |

Пример использования:

```js
import {DL10n} from '@dlabs71/d-vue-localization';

let dL10n = new DL10n();

let messagesEn = {
    NAME1: "name 1",
    NAME2: "name 2"
};

dL10n.addLang("en", messagesEn);

let messagesRu = {
    NAME1: "имя 1",
    NAME2: "имя 2"
};

dL10n.addLang("ru", messagesRu);
```

### <h3 id="section43">4.3. Метод addMessagesToLang</h3>

Метод **addMessagesToLang** предназначен для добавления дополнительных сообщений к уже сохранённому языку.

| **Параметр** | **Тип** | **Обязательность** | **Значение по умолчанию** | **Описание**     |
| :------------| :-------| :----------------- | :------------------------ | :----------------|
| lang         | String  | да                 |                           | Код языка        |
| messages     | Object  | да                 |                           | Объект с сообщениями для данного языка |

Пример использования:

```js
import {DL10n} from '@dlabs71/d-vue-localization';

let dL10n = new DL10n({
    "en": {
        NAME1: "name 1",
        NAME2: "name 2"
    },
    "ru": {
        NAME1: "имя 1",
        NAME2: "имя 2"
    }
});

let newMessagesEn = {
    NAME3: "name 3",
    NAME4: "name 4"
};

dL10n.addMessagesToLang("en", messagesEn);
```

### <h3 id="section44">4.4. Метод setLang2Messages</h3>

Метод **setLang2Messages** предназначен для инициализации хранилища маппинга языка на его сообщения.

| **Параметр**   | **Тип** | **Обязательность** | **Значение по умолчанию** | **Описание**     |
| :------------- | :------ | :----------------- | :------------------------ | :----------------|
| lang2messages  | Object  | нет                | {}                        | Объект маппинга языка на его сообщения |

Пример использования:

```js
import {DL10n} from '@dlabs71/d-vue-localization';

let dL10n = new DL10n();

dL10n.setLang2Messages({
    "en": {
        NAME1: "name 1",
        NAME2: "name 2"
    },
    "ru": {
        NAME1: "имя 1",
        NAME2: "имя 2"
    }
});
```

### <h3 id="section45">4.5. Метод loadLang</h3>

Метод **loadLang** предназначен для загрузки определённого языка из хранилища. При этом в классе создаются
дополнительные поля на основе кодов сообщений. Такие поля класса имеют префикс `$`.

| **Параметр**   | **Тип** | **Обязательность** | **Значение по умолчанию** | **Описание**     |
| :------------- | :------ | :----------------- | :------------------------ | :----------------|
| lang           | String  | да                 |                           | Код языка для загрузки из хранилища |

Пример использования:

```js
import {DL10n} from '@dlabs71/d-vue-localization';

let dL10n = new DL10n({
    "en": {
        NAME1: "name 1",
        NAME2: "name 2"
    },
    "ru": {
        NAME1: "имя 1",
        NAME2: "имя 2"
    }
});

dL10n.loadLang("en");

/* В классе появятся следующие поля:
class DL10n {
    lang2messages = {.....};
    lang = "en";
    $NAME1 = "name 1";
    $NAME2 = "name 2";
}
*/

dL10n.loadLang("ru");

/* В классе появятся следующие поля:
class DL10n {
    lang2messages = {.....};
    lang = "ru";
    $NAME1 = "имя 1";
    $NAME2 = "имя 2";
}
*/
```

### <h3 id="section46">4.6. Метод getMessages</h3>

Метод **getMessages** предназначен для получения по коду языка списка всех сообщений, находящихся в хранилище.

| **Параметр**   | **Тип** | **Обязательность** | **Значение по умолчанию** | **Описание**     |
| :------------- | :------ | :----------------- | :------------------------ | :----------------|
| lang           | String  | да                 |                           | Код языка        |

Пример использования:

```js
import {DL10n} from '@dlabs71/d-vue-localization';

let dL10n = new DL10n({
    "en": {
        NAME1: "name 1",
        NAME2: "name 2"
    },
    "ru": {
        NAME1: "имя 1",
        NAME2: "имя 2"
    }
});

let messagesRu = dL10n.loadLang("ru");

/* 
messagesRu = {
    NAME1: "имя 1",
    NAME2: "имя 2"
}
*/
```

[npm-image]: https://img.shields.io/npm/v/@dlabs71/d-vue-localization

[npm-url]: https://www.npmjs.com/package/@dlabs71/d-vue-localization

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg

[license-url]: LICENSE