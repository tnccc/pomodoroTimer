<template>
  <div
    :class="$style.wrapper"
  >
    <div
      :class="$style.container"
    >
      <div
        :class="$style.heading_container"
      >
        <h2
          :class="$style.heading"
        >
          Tasks
          <!-- タスクを追加するとタスク数が分かるようにしたい -->
          <span :class="$style.num">{{ itemLength }}</span>
        </h2>
        <button
          :class="$style.heading_button"
        >
          <img src="@/assets/images/task_menu.svg" alt="taskmenu">
        </button>
      </div>
      <div
        :class="$style.todo"
      >
        <div
          :class="$style.todo_list"
        >
          <TodoItem
            v-if="addTaskDisplay"
            :type="'task'"
            v-model="todoItem"
          >
            <span
              @click="deleteTodo"
              :class="$style.todo_task"
            />
          </TodoItem>
          <TodoItem
            v-if="taskDisplay"
            :type="'default'"
            @onClick="taskDisplay = !taskDisplay"
            v-for="(item, key) in todos"
            :key="key"
            :class="$style.todo_item"
          >
            {{ item.task }}
          </TodoItem>
          <TodoItemAdd
            v-else
          >
            <CommonButton
              @onClick="addTodo"
              :btnText="'Save'"
            >
            </CommonButton>
            <CommonButton
              @onClick="taskDisplay = !taskDisplay"
              :btnText="'Cancel'"
            >
            </CommonButton>
          </TodoItemAdd>
          
        </div>
      </div>
    </div>
    <!-- sample -->
    <div class="sample">
        <textarea
          type="textarea"
          placeholder="簡単な説明を入力しましょう。"
          v-model="sampleText"
        ></textarea>
        <button @click="addTodoSample">sampleAdd</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'TodoList',
  data() {
    return {
      sampleText: '',
      todoItem: "",
      itemLength: 0,
      taskDisplay: true,
      addTaskDisplay: false,
    }
  },
  computed: {
    ...mapGetters({
      todos: 'todo/todoList'
    })
  },
  methods: {
    ...mapActions({
      addTodoItem: 'todo/add',
      deleteItem: 'todo/delete'
    }),
    addTodo(text) {
      console.log('before call action=>',text);
      // this.addTodoItem(this.todoItem)
      this.addTodoItem(text)
      this.todoItem = ""
      this.taskDisplay = true
      this.addTaskDisplay = true
    },
    addTodoSample() {
      this.addTodoItem(this.sampleText)
      this.sampleText = ""
    },
    deleteTodo(key) {
      console.log('fire')
      this.deleteItem(key)
    },
  },
}
</script>

<style lang="scss" module>
@use "@/assets/scss/value" as v;
@use "@/assets/scss/font" as f;
@use "@/assets/scss/color" as c;
@use "@/assets/scss/mixin" as m;

.wrapper {
  min-width: 300px;
  border-left: solid 2px c.$lightGray;
}

.container {
  padding: 0 v.clampFunc(20, 24, 32, 1024);
}

.heading {
  font-weight: bolder;

  &_container {
    display              : grid;
    grid-template-columns: 2fr 1fr;
  }

  &_button {
    margin-left: auto;
    width      : 2rem;
  }
}

.todo {
    &_list {
      margin-top : calc(var(--sv) * 2.5);
      display    : grid;
      place-items: start;
      gap        : calc(var(--sv) * 3) 0;
    }

    &_task {
      position        : relative;
      width           : calc(var(--sv) * 2.5);
      height          : calc(var(--sv) * 2.5);
      border          : solid 1px c.$gray;
      border-radius   : 50%;
      background-color: transparent;
      pointer-events  : auto;
      
      &:hover {

        &:before {
          content      : "";
          position     : absolute;
          top          : 4px;
          left         : 3px;
          width        : 12px;
          height       : 7px;
          border-left  : 3px solid c.$mainGreen;
          border-bottom: 3px solid c.$mainGreen;
          transform    : rotate(-45deg);
        }
      }
    }
}
</style>