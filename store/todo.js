export const state = () => ({
    todos: [],
    isDoneTodos: []
})

export const mutations = {
    setItem(state, todo) {
        state.todos.push(todo)
    },
    overWrite(state, newTodo) {
        const newTodos = state.todos.map(todo => todo)
        const index = state.todos.findIndex(todo => todo.id === newTodo.id)
        newTodos[index] = newTodo
        state.todos = newTodos
    },
    deleteItem(state, todo) {
        state.todos.splice(todo, 1)
    },
    allDoneDelete(state) {
        state.isDoneTodos = []
    },
    addTodos(state, todo) {
        if (state.todos.find((item) => item.id === todo.id)) return
        state.todos.push(todo)
    },
    removeTodos(state, todo) {
        state.todos = state.todos.filter((item) => item.id !== todo.id)
    },
    addIsDoneTodos(state, todo) {
        if (state.isDoneTodos.find((item) => item.id === todo.id)) return
        state.isDoneTodos.push(todo)
    },
    removeIsDoneTodos(state, todo) {
        state.isDoneTodos = state.isDoneTodos.filter((item) => item.id !== todo.id)
    },
}

export const getters = {
    isNotDoneTodos(state) {
        return state.todos
    },
    isDoneTodos(state) {
        return state.isDoneTodos
    },
    todoList(state) {
        const sortedTodos = state.todos.map(todos => todos).sort((a, b) => a.id < b.id ? -1 : 1);
        const sortedIsDoneTodos = state.isDoneTodos.map(todos => todos).sort((a, b) => a.id < b.id ? -1 : 1);

        return sortedTodos.concat(sortedIsDoneTodos);
    },
    nextId(state) {
        return `id-${state.todos.length + state.isDoneTodos.length + 1}`
    },
}

export const actions = {
    add({ commit, getters }, text) {
        const todo = ({ id: getters.nextId, task: text, done: false })
        commit('setItem', todo)
    },
    overWrite({ commit }, todo) {
        console.log('Store overWrite!!!!!', todo)
        if (todo.done) {
            commit('removeTodos', todo)
            commit('addIsDoneTodos', todo);
        } else {
            commit('removeIsDoneTodos', todo)
            commit('addTodos', todo)
        }
    },
    delete({ commit }, todo) {
        if (!todo.done) {
            commit('removeTodos', todo)
        }
    },
    doneDelete({ commit }) {
        commit('allDoneDelete')
    }
}