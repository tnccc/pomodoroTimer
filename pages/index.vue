<template>
  <!--
    <add-todo-form/>
    <todo-list
      :data="data"
    /> 表示するToDoのデータはこのコンポーネントからバインドする
  -->
  <div
    :class="$style.container"
  >
    <GlobalHeader />
    <main>
      <div
        :class="$style.contents"
      >
        <div
          :class="$style.contents_grid"
        >
          <PomodoroTimer 
            :class="$style.timer"
          />
          <div
            :class="$style.todo_wrapper"
          >
            <div
              :class="$style.todo"
            >
              <div
                :class="$style.todo_heading_wrapper"
              >
                <h2
                  :class="$style.todo_heading"
                >
                  Tasks
                <span :class="$style.num">
                  {{ todos.length - 1 }}
                </span>
                </h2>
                <button
                  :class="$style.todo_heading_button"
                >
                  <img src="@/assets/images/task_menu.svg" alt="taskmenu">
                </button>
              </div>
              <div
                :class="$style.todo_content"
              >
                <AddTodo 
                  v-if="displayStatus"
                  @saveButtonClick="addTodo"
                  @cancelButtonClick="cancelButtonClick"
                />
                <TodoList 
                  v-else-if="!displayStatus"
                  @todoItemClick="displayStatus = !displayStatus"
                  :todos="todos"
                  :addTask="addTask"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <SoundPlayer
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

// TODO
// STEP1: add-todo-formからTodoを追加できるようにする(コンポーネントしなくても良い。TodoList.vueの処理を参考に)

// STEP2: TodoList.vueに対してtodosをバインドできるようにする。また、そのバインドしたデータがTodoList.vueで表示できるようにする
//=> TodoList.vueにはpropsの定義がないので追加してください。
// STEP3: TodoList.vueのゴミと思われるコード消す
// STEP4: TodoItem.vueのゴミと思われるコード消す

export default {
  name: 'Top-Page',

  //Todoの処理を記述する
  data() {
    return {
      displayStatus: false,
      addTask      : false,
      text         : '',
    }
  },
  computed: {
    ...mapGetters({
      todos: 'todo/todoList'
    }),
  },
  methods: {
    ...mapActions({
      addTodoItem: 'todo/add',
      deleteItem: 'todo/delete'
    }),
    addTodo(text) {
      this.text = text
      if(!text || text.trim().length === 0) {
        this.displayStatus = false
      } else {
        console.log('=> testClick', text)
        this.addTodoItem(text)
        this.displayStatus = false
        this.addTask = true
      }
      
    },
    cancelButtonClick() {
      this.displayStatus = false
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
  width         : 100%;
  --sv          : .5rem;
  --black       : #202124;
  --light-gray  : #E2E8F0;
  --accent-color: #0B57D0;
}

.contents {
  margin-top: v.viewMargin(1400, 64);

  &_grid {
    display: grid;
    grid-template-columns: 70% 30%;
  }
}

.todo {
  padding    : 0 v.clampFunc(20, 24, 32, 1024);
  display    : grid;
  place-items: start;
  
  &_wrapper {
    min-width  : 300px;
    border-left: solid 2px c.$lightGray;
  }

  &_content {
    margin-top: calc(var(--sv) * 2);
    width     : 100%;
  }

  &_heading {
    font-weight: bolder;

    .num {
      margin-left: var((--sv));
    }

    &_wrapper {
      display              : grid;
      width                : 100%;
      grid-template-columns: 2fr 1fr;
    }

    &_button {
      margin-left: auto;
      width      : 2rem;
    }
  }
}
</style>