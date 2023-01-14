export const state = () => ({
    todos: []
})

export const mutations = {
    setItem(state, todo) {
        state.todos.push(todo)
    },
    deleteItem(state, todo) {
        state.todos.splice(todo, 1)
    }
}

export const getters = {
    todoList(state) {
        return state.todos
    },
    nextId(state) {
        return `id-${state.todos.length + 1}`
    }
}

export const actions = {
    add({ commit, getters }, text) {
        const todo = ({ id: getters.nextId, task: text })
        commit('setItem', todo)
    },
    delete({ commit }, todo) {
        commit('deleteItem', todo)
    }
}