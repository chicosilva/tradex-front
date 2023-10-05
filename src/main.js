import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import "@/assets/scss/app.scss";
import VueFeather from "vue-feather";
import store from "./store";
import Breadcrumbs from "./components/bread_crumbs";

import "bootstrap";
import settingPage from "./components/settingPage.vue";
import "bootstrap/dist/js/bootstrap.bundle";
import Toaster from "@meforma/vue-toaster";
import Vue3Tour from "vue3-tour";
import "vue3-tour/dist/vue3-tour.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import bcard from "./components/b-card.vue";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { VueMasonryPlugin } from "vue-masonry";
import VueNumber from "vue-number-animation";
import SimpleTypeahead from "vue3-simple-typeahead";
import "vue3-simple-typeahead/dist/vue3-simple-typeahead.css";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { createI18n } from "vue-i18n";
import English from "./locales/en.json";

import Português from "./locales/pt.json";
import { defaultLocale, localeOptions } from "./constants/config";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createPinia } from 'pinia'
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labsComponents from 'vuetify/labs/components'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Maska from 'maska'



const vuetify = createVuetify({
  components: {
    ...components,
    ...labsComponents,
  },
  directives
})


const locale =
  localStorage.getItem("currentLanguage") &&
  localeOptions.filter((x) => x.id === localStorage.getItem("currentLanguage"))
    .length > 0
    ? localStorage.getItem("currentLanguage")
    : defaultLocale;
const i18n = createI18n({
  locale: locale,
  messages: {
    English: English,
    Português: Português
  },
});
//const pinia = createPinia();

import loading from "./store/modules/loading";

import Vuex from "vuex";

export default new Vuex.Store({
  modules: {
    loading,
  },
});

const app = createApp(App)
  .use(Vuex)
  .use(Maska)
  .use(vuetify)
  .use(Toast, {position: 'top-right' })
  .use(i18n)
  .use(SimpleTypeahead)
  .use(VueMasonryPlugin)
  .use(VueNumber)
  .use(store)
  .use(VueSweetalert2)
  .use(Vue3Toasity)
  .use(Vue3Tour)
  .use(Toaster)
  .use(router)
  .component("VueDatePicker", VueDatePicker)
  .component("settingPage", settingPage)
  .component("b-card", bcard)
  .component("multiselect", Multiselect)
  .component(VueFeather.name, VueFeather)
  .component("Breadcrumbs", Breadcrumbs);

var Sugar = require('sugar/string');
app.config.globalProperties.$filters = {
    truncate(value) {
      if(value == null){
        return "";
      }
      return Sugar.String.truncate(value, 15);
    }
}
app.mount("#app");