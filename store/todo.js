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
    doneDelete(state) {
        state.todos = state.todos.filter((todo) => todo.done === false)
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
        return this.todos;
    },
    isDoneTodos(state) {
        return state.isDoneTodos;
    },
    todoList(state) {
        return state.todos.concat(state.isDoneTodos);
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
        console.log('Store overWrite!!!!!', todo);
        if (todo.done) {
            commit('removeTodos', todo)
            commit('addIsDoneTodos', todo);
        } else {
            commit('removeIsDoneTodos', todo)
            commit('addTodos', todo);
        }
        // commit('overWrite', todo)
    },
    doneDelete({ commit }, todo) {
        console.log('todo =>', todo)
        commit('doneDelete', todo)
    }
}