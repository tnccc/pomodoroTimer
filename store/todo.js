export const state = () => ({
    todos: []
})

export const mutations = {
    setItem(state, todo) {
        state.todos.push(todo)
    },
    overWrite(state, newTodo) {
        const newTodos = state.todos.map(todo => todo);
        const index = state.todos.findIndex(todo => todo.id === newTodo.id)
        newTodos[index] = newTodo
        state.todos = newTodos
            // state.todos.splice(index, 1, newTodo)
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
        const todo = ({ id: getters.nextId, task: text, done: false })
        commit('setItem', todo)
    },
    overWrite({ commit }, todo) {
        console.log('called overwrite', todo);
        commit('overWrite', todo)
    },
    delete({ commit }, todo) {
        commit('deleteItem', todo)
    }
}