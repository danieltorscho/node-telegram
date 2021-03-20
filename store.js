const Vuex = require('vuex');

const store = new Vuex.Store({
  strict: true,
  state: {
    message: null,
    question: null,
    fields: []
  },
  mutations: {
    ADD_FIELD (state, payload) {
      for (const [key, value] of Object.entries(payload)) {
        state.fields[key] = value;
      }
    },
    QUESTION (state, payload) {
      state.question = payload;
    },
    MESSAGE (state, payload) {
      state.message = payload;
    }
  },
  actions: {},
  getters: {}
});

module.exports = store;
