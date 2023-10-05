import {createStore} from 'vuex'
import layout from './modules/layout';
import menu from './modules/menu';
import common from './modules/common';

import language from "./modules/language"
import loading from "./modules/loading";


export default createStore({
  state:{langIcon: '',langLangauge: '',isActive:false},
  getters:{
    langIcon: (state)=>{ return state.langIcon},
    langLangauge:(state)=>{return state.langLangauge}
  },
  mutations: {
      changeLang (state, payload) {
        localStorage.setItem('currentLanguage', payload.id);
        localStorage.setItem('currentLanguageIcon', payload.icon);
        state.langIcon = payload.icon || 'flag-icon-us'
        state.langLangauge = payload.id || 'EN'
      },
      change(state){
        state.isActive = !state.isActive
      }
    },
    actions: {
      setLang ({ commit }, payload) {
        commit('changeLang', payload);  
        
      }
    },
    modules: {
      alert,
      layout,
      menu,
      language,
      common,
      loading
    }
});

