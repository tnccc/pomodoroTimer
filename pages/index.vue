<template>
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
                  {{ todos.length  }}
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
                <div
                  :class="$style.todo_list_container"
                >
                  <TodoList 
                    @deleteTodoStart="deleteTodoStart"
                    :todos="todos"
                  />
                </div>
                <div>
                  <AddTodo 
                    v-if="todoAddMode" 
                    @saveButtonClick="addTodo"
                    @cancelButtonClick="cancelButtonClick"
                    :class="$style.todo_add"
                  />
                  <!-- タスク一覧下部に固定配置 -->
                  <button
                    v-if="!todoAddMode" @click="startAddMode"
                    :class="$style.todo_input"
                  > 
                    タスクを入力をしてください。
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <SoundPlayer
      :class="$style.sound"
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'Top-Page',
  data() {
    return {
      todoAddMode: false,
      text       : '',
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
        this.todoAddMode = false
      } else {
        console.log('=> testClick', text)
        this.addTodoItem(text)
        this.todoAddMode = false
      }
    },
    deleteTodoStart(todo) {
      this.deleteItem(todo)
    },
    cancelButtonClick() {
      this.todoAddMode = false
    },
    startAddMode() {
      this.todoAddMode = true
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
  width           : 100%;
  --bv            : .5rem;
  --white         : #fff;
  --black         : #202124;
  --gray          : #5F6368;
  --light-gray    : #E2E8F0;
  --dull-gray     : #CBD5E1;
  --accent-color  : #0B57D0;
}

.contents {
  margin-top       : v.viewMargin(1400, 40);
  scroll-snap-align: start;

  &_grid {
    display: flex;
  }
}

.timer {
  flex  : 1 0 auto;
  height: calc(100vh - 45px);
}

.todo {
  padding       : 0 v.clampFunc(20, 24, 32, 1024);
  display       : flex;
  flex-direction: column;
  
  &_wrapper {
    flex       : 0 0 30%;
    border-left: solid 2px var(--light-gray);
  }

  &_content {
    position  : relative;
    margin-top: calc(var(--bv) * 2);
    width     : 100%;
  }

  &_heading {
    font-weight: bolder;

    .num {
      margin-left: var((--bv));
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

  &_input {
    margin-top   : calc(var(--bv) * 2);
    padding      : v.clampFunc(12, 16, 16, 1024);
    width        : 100%;
    display      : flex;
    align-items  : center;
    font-size    : v.clampFunc(14, 15, 16, 1024);
    color        : c.$gray;
    gap          : 0 var(--bv);
    border       : dashed 2px var(--dull-gray);
    border-radius: 12px;
    box-shadow   : inset 0 0 14px 3px rgba(0 0 0 / .1);

    &::before {
      content         : "";
      display         : block;
      width           : 13px;
      height          : 2px;
      background-color: var(--gray);
    }

    &::after {
      content   : "";
      position  : absolute;
      display   : block;
      width     : 13px;
      height    : 2px;
      background: var(--gray);
      transform : rotate(90deg);
    }
  }

  &_add {
    margin-top   : calc(var(--bv) * 2);
  }
}

.sound {
  position: fixed;
  bottom  : 0;
  width   : 100%;
}
</style>