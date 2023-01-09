export const state = () => ({
  todos: [
    {
      task: 'タスクを入力してください',
    }
  ]
})

export const mutations = {
  setItem(state, text) {
    // console.log('mutations/text', text)
    state.todos.push({task:text})
  },
  deleteItem(state, key) {
    state.todos.splice(key, 1)
  }
}

export const getters = {
  todoList(state) {
    return state.todos
  },
}

export const actions = {
  add({commit}, text) {
    // console.log('acitons/add', text)
    commit('setItem', text)
  },
  delete({commit}, key) {
    // console.log('actions/delete', key)
    commit('deleteItem', key)
  }
}