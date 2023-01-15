<template>
  <div
    :class="$style.container"
  >
    <TodoItem 
      v-for="(todo, index) in todos"
      :key="index"
      :todo="todo"
      @deleteButtonClick="deleteTodo"
    />
  </div>
</template>

<script>

export default {
  name: 'TodoList',
  props: {
    todos: {
      required: true,
      type    : Array,
    },
  },
  methods: {
    deleteTodo(todo) {
      this.$emit('deleteTodoStart', todo)
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