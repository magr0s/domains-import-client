import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'

import app from './app'
import settings from './settings'
import domains from './domains'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      app,
      settings,
      domains
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,

    mutations: vuexfireMutations
  })

  return Store
}
