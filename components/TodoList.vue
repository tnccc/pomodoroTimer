<template>
  <div
    :class="$style.container"
  >
    <TodoItem 
<<<<<<< HEAD
      v-for="(todo, index) in todos"
      :key="index"
      :todo="todo"
      @deleteButtonClick="deleteTodo"
=======
      @editButton="editButtonClick"
      v-for="(todo, index) in todos"
      :key="index"
      :todo="todo"
>>>>>>> develop
    />
  </div>
</template>

<script>

export default {
  name: 'TodoList',
<<<<<<< HEAD
=======
  data() {
    return {
      taskNumber: [],
      isDisabled: true,
    }
  },
>>>>>>> develop
  props: {
    todos: {
      required: true,
      type    : Array,
    },
  },
  methods: {
<<<<<<< HEAD
    deleteTodo(todo) {
      this.$emit('deleteTodoStart', todo)
=======
    editButtonClick(index) {
      this.$emit('editButtonClick', index)
>>>>>>> develop
    },
  },
}
</script>

<style lang="scss" module>
@use "@/assets/scss/value" as v;
@use "@/assets/scss/font" as f;
@use "@/assets/scss/color" as c;
@use "@/assets/scss/mixin" as m;

.container {
  display: grid;
  gap: calc(var(--bv) * 2) 0;
}
</style>