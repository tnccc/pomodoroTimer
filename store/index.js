// store/index.js
import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      todos: [
        {task: 'ここにタスクを入れてください',}, 
      ]
    }),
  })
}

export default createStore;