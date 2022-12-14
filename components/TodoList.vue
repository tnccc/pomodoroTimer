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
          <span :class="$style.num">{{ task }}</span>
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
          <button
            v-if="!taskDisplay"
            @click="taskDisplay = !taskDisplay"
            v-for="(item, index) in todos"
            key="index"
            :class="$style.todo_item"
          >
              {{ item.task }}
          </button>
          <div
            v-else
            :class="$style.todo_item_add"
          >
            <textarea 
              type="textarea"
              placeholder="簡単な説明を入力しましょう。"
            >
            </textarea>
            <input
              type="input"
              v-model="task"
            >
            <div
              :class="$style.todo_item_btn_area"
            >
              <button
                :class="[$style.todo_item_btn ,$style.todo_item_save]"
              >
                <span
                  @click="taskInsert"
                >
                  Save
                </span>
              </button>
              <button
                @click="taskDisplay = !taskDisplay"
                :class="[$style.todo_item_btn ,$style.todo_item_cancel]"
              >
                <span>Cansel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'TodoList',
  data() {
    return {
      task: "",
      taskDisplay: false,
    }
  },
  computed: {
    ...mapState(['todos'])
  },
  methods: {
    taskInsert() {

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
  padding: 0 calc(var(--sv) * 4);
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

    &_item {
      padding      : calc(var(--sv) * 2);
      width        : 100%;
      display      : flex;
      align-items  : center;
      color        : c.$gray;
      gap          : 0 var(--sv);
      border       : dashed 2px #CBD5E1;
      border-radius: 12px;
      box-shadow: 0 0 10px 3px rgba(0,0,0, .1);

      &::before {
        content         : "";
        display         : block;
        width           : 13px;
        height          : 2px;
        background-color: c.$gray;
      }

      &::after {
        content   : "";
        position  : absolute;
        display   : block;
        width     : 13px;
        height    : 2px;
        background: c.$gray;
        transform : rotate(90deg);
      }

      &_add {
        padding: calc(var(--sv) * 2);
        width        : 100%;
        border       : solid 2px #CBD5E1;
        border-radius: 12px;
        box-shadow: 0 0 10px 3px rgba(0,0,0, .1);

        textarea {
          width : 100%;
          resize: none;
          
          &::placeholder {
            color: rgba(95, 99, 104, .5);
          }
        }
      }

      &_btn {
        @include m.component_button(6rem, 4rem, 10px, c.$accentColor);
        padding: 2px 0;

        &_area {
          display        : flex;
          gap            : 0 calc(var(--sv) * 3.5);
        }
      }
    }
}



</style>