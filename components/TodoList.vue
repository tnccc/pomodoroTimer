<template>
  <div
    :class="$style.container"
  >
    <TodoItem 
      v-for="(todo, index) in todos"
      :key="index"
      :todo="todo"
      @overWrite="overWriteTodo"
      @delete="deleteTodo"
      :class="[$style.item, todo.done === true ? $style.done : '']"
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
    overWriteTodo(todo) {
      this.$emit('overWriteTodo', todo)
    },
    deleteTodo(todo) {
      this.$emit('deleteTodo', todo)
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
  display            : grid;
  gap: calc(var(--bv) * 2) 0;
}
</style>