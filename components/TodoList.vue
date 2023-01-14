<template>
  <div
    :class="$style.container"
  >
    <TodoItem 
      @editButton="editButtonClick"
      v-for="(todo, index) in todos"
      :key="index"
      :todo="todo"
    />
  </div>
</template>

<script>

export default {
  name: 'TodoList',
  data() {
    return {
      taskNumber: [],
      isDisabled: true,
    }
  },
  props: {
    todos: {
      required: true,
      type    : Array,
    },
  },
  methods: {
    editButtonClick(index) {
      this.$emit('editButtonClick', index)
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