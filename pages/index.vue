<template>
  <div
    :class="$style.container"
    @click="hideDropdown"
  >
    <GlobalHeader />
    <div
      :class="$style.contents"
    >
      <div
        :class="$style.contents_grid"
      >
        <TimerManager
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
                {{ todos.filter(todo => !todo.done).length }}
              </span>
              </h2>
              <button
                :class="$style.todo_heading_button"
              >
                <TaskDots 
                  @click.stop="isDropdownVisible = !isDropdownVisible"
                  :class="$style.dots"
                />
              </button>
              <div
                v-show="isDropdownVisible"
                :class="$style.todo_dropdown"
              >
                <button
                  @click="isHideCompletedTasks = !isHideCompletedTasks"
                  :class="$style.todo_dropdown_item"
                >
                  <TaskHide />
                  <span v-show="!isHideCompletedTasks">完了したタスクを非表示にする</span>
                  <span v-show="isHideCompletedTasks">完了したタスクを表示する</span>
                </button>
                <button
                  @click="doneDeleteTodo"
                  :class="$style.todo_dropdown_item"
                >
                  <TaskDelete />
                  <span>完了したタスクを削除する</span>
                </button>
              </div>
            </div>
            <div
              :class="$style.todo_content"
            >
              <div
                :class="$style.todo_list_container"
              >
                <TodoList 
                  @overWriteTodo="overWriteTodo"
                  @deleteTodo="deleteTodo"
                  :todos="displayTodos"
                />
              </div>
              <div>
                <AddTodo 
                  v-if="todoAddMode" 
                  @saveButtonClick="addTodo"
                  @cancelButtonClick="cancelButtonClick"
                  :class="$style.todo_add"
                />
                <button
                  v-if="!todoAddMode"
                  @click="startAddMode"
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
    <!-- SoundPlayer 未定 -->
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
@use "@/assets/scss/color" as c;
@use "@/assets/scss/mixin" as m;

.container {
  width         : 100%;
  --bv          : .5rem;
  --white       : #fff;
  --black       : #202124;
  --blue        : #0B57D0;
  --gray        : #5F6368;
  --light-gray  : #E2E8F0;
  --dull-gray   : #CBD5E1;
  --green       : #059669;
  --border-width: 0;
}

.contents {
  margin-top       : v.viewMargin(1400, 40);
  scroll-snap-align: start;

  &_grid {
    display: flex;
    height : 100vh;
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
      position             : relative;
      display              : grid;
      width                : 100%;
      grid-template-columns: 2fr 1fr;
    }

    &_button {
      margin-left     : auto;
      width           : 2rem;
      height          : 2rem;
      border-radius   : 50%;
      background-color: var(--dull-gray);
      transition      : background-color .3s;

      .dots {
        width     : 14px;
        height    : 14px;
        
        circle {
          transition: fill .3s;
        }
      }

      &:hover {
        background-color: rgba(#0B57D0, .55);

        .dots {

          circle {
            fill: var(--white);
          }
        }
      }
    }
  }

  &_dropdown {
    position        : absolute;
    top             : 100%;
    right           : 0;
    padding         : var(--bv) calc(var(--bv) * 2);
    max-width       : 254px;
    width           : 100%;
    background-color: var(--white);
    border-radius   : calc(var(--bv) * 2);
    box-shadow      : rgba(0,0,0,0.2) 0px 12px 28px 0px, rgba(0,0,0,0.1) 0px 2px 4px 0px, hsla(0,0%,100%,0.5) 0px 0px 0px 1px inset;
    z-index         : v.zIndex('contents');

    &.show {

      &::before {
        content : "";
        position: absolute;
        top     : 0;
        left    : 0;
        width   : 100vw;
        height  : 100vh;
        z-index : v.zIndex('overlay');
      }
    }

    &_item {
      padding    : var(--bv);
      display    : flex;
      align-items: center;
      font-size  : v.clampFunc(13.5, 14, 15, 1480);
      gap        : 0 var(--bv);
      transition : opacity .3s;

      &:hover {
        opacity: .6;
      }

      svg {
        width : 20px;
        height: 20px;
      }
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
  z-index : v.zIndex('nav');
}
</style>