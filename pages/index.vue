<template>
  <div
    :class="$style.container"
    @click="hideDropdown"
  >
    <GlobalHeader />
    <main>
      <div
        :class="$style.contents"
      >
        <TimerManager
          :class="$style.timer"
        />
        <div
          :class="$style.contents_grid"
        >
          <PomodoroTimer 
            :class="$style.timer"
          />
          <TodoList 
            :class="$style.todo"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import TaskDots from '@/assets/images/task_dots.svg'
import TaskDelete from '@/assets/images/task_delete.svg'
import TaskHide from '@/assets/images/task_hide.svg'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Top-Page',
  components: {
    TaskDots,
    TaskHide,
    TaskDelete,
  },
  data() {
    return {
      todoAddMode         : false,
      isDropdownVisible   : false,
      isHideCompletedTasks: false,
      isHidePushWindow    : false,
      text                : '',
    }
  },
  updated() {
    setTimeout(() => {
      this.isHidePushWindow = false
    }, 2500)
  },
  computed: {
    ...mapGetters({
      todos: 'todo/todoList'
    }),
    displayTodos() {
      if (this.isHideCompletedTasks) {
        return this.todos.filter((todo) => !todo.done)
      }
      return this.todos
    },
  },
  methods: {
    ...mapActions({
      addTodoItem: 'todo/add',
      deleteItem: 'todo/delete',
      doneDelete: 'todo/doneDelete',
      overWrite: 'todo/overWrite',
    }),
    addTodo(text) {
      this.text = text
      if(!text || text.trim().length === 0) {
        this.todoAddMode = false
      } else {
        console.log('=> testClick', text)
        this.addTodoItem(text)
        this.todoAddMode = false
      }
    },
    overWriteTodo(todo) {
      console.log('=> overWriteTodo', todo)
      this.overWrite(todo)
    },
    deleteTodo(todo) {
      const result = window.confirm('タスクを削除しますか？')
      result ? this.deleteItem(todo) : ''
    },
    doneDeleteTodo() {
      const result = window.confirm('完了したタスクを削除しますか？')
      if(result) {
        this.doneDelete()
        this.isDropdownVisible = false
      } 
      this.isDropdownVisible = false
    },
    cancelButtonClick() {
      this.todoAddMode = false
    },
    startAddMode() {
      this.todoAddMode = true
    },
    hideDropdown() {
      this.isDropdownVisible = false;
    },
  },
}
</script>

<style lang="scss" module>
@use "@/assets/scss/value" as v;
@use "@/assets/scss/font" as f;

.container {
  width: 100%;
  --sv : .5rem;
  --black: #202124;
  --light-gray: #E2E8F0;
  --accent-color: #0B57D0;
}

.contents {
  margin-top: v.viewMargin(1400, 64);

  &_grid {
    display: grid;
    grid-template-columns: 70% 30%;
  }
}
</style>