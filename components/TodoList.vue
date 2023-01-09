<template>
  <div
    :class="$style.container"
  >
    <div></div>
    <TodoItem 
      @onClick="todoItemClick"
      v-for="(item, index) in todos"
      :key="item.index"
    >
      {{ item.task }}
    </TodoItem>
    <!-- sample -->
    <!-- <div class="sample">
      <textarea
        type="textarea"
        placeholder="簡単な説明を入力しましょう。"
        v-model="sampleText"
      ></textarea>
      <button @click="addTodoSample">sampleAdd</button>
    </div> -->
  </div>
</template>

<script>

export default {
  name: 'TodoList',
  data() {
    return {
    }
  },
  props: {
    todos: {
      required: true,
      type    : Array,
    },
    addTask: {
      required: false,
      type    : Boolean,
      default : false,
    },
  },
  methods: {
    todoItemClick() {
      console.log('TodoItem => TodoList')
      this.$emit('todoItemClick')
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
  display   : grid;
  width     : 100%;
  gap       : calc(var(--sv) * 2) 0;
}
</style>