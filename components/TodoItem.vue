<template>
  <div
    :class="$style.container"
  >
    <div
      :class="$style.item"
    >
      <button
        @click="doneToggle"
        :class="[{ done: isDone }, $style.item_circle ]"
      />
      <textarea
        v-model="todoMessage"
        @keydown="editEnd"
        :disabled="!editAble"
        :class="$style.item_text"
      >
      </textarea>
      <div
        :class="$style.item_btn_area"
      >
        <button
          v-if="!editMode"
          :class="$style.item_btn"
          @click="editStart"
        >
          <TaskEdit />
        </button>
        <button
          v-if="editMode"
          @click="overWrite"
          :class="$style.item_btn"
        >
          <TaskSave />
        </button>
        <button
          @click="deleteButtonClick"
          :class="$style.item_btn"
        >
          <TaskDelete />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TaskEdit from '@/assets/images/task_edit.svg'
import TaskSave from '@/assets/images/task_save.svg'
import TaskDelete from '@/assets/images/task_delete.svg'

export default {
  name: 'TodoItem',
  components: {
    TaskEdit,
    TaskSave,
    TaskDelete,
  },
  data() {
    return {
      todoMessage          : '',
      editAble             : false,
      editMode             : false,
    }
  },
  created() {
    this.todoMessage = this.todo.task;
  },
  props: {
    todo: {
      required: true,
      type    : Object,
    },
  },
  computed: {
    isDone() {
      return this.todo.done
    },
  },
  methods: {
    editStart() {
      this.editAble = true
      this.editMode = true
    },
    editEnd(e) {
      if(e.keyCode === 13) {
        this.editAble = false
        this.editMode = false
        this.overWrite();
        return
      }
    },
    overWrite() {
      // TODO:ここは佐藤と一緒にやりましょう(Editの保存は少し複雑なので)
      const newTodo = {
        ...this.todo,
        task: this.todoMessage,
      }
      this.$emit('overWrite', newTodo);
    },
    deleteButtonClick() {
      this.$emit('delete', this.todo)
    },
    doneToggle() {
      // console.log('called doneToggle!!!!!!!!')
      const newTodo = {
        ...this.todo,
        done: !this.todo.done,
      }
      console.log('called doneToggle!!!!!!!!', newTodo)
      this.$emit('overWrite', newTodo);
    },
  },
}
</script>

<style lang="scss" module>
@use "@/assets/scss/value" as v;
@use "@/assets/scss/font" as f;
@use "@/assets/scss/color" as c;
@use "@/assets/scss/mixin" as m;

.item {
  position        : relative;
  padding         : v.clampFunc(12, 16, 16, 1024);
  width           : 100%;
  display         : flex;
  font-size       : v.clampFunc(14, 15, 16, 1024);
  color           : c.$gray;
  gap             : 0 var(--bv);
  border          : dashed 2px var(--dull-gray);
  border-radius   : 12px;
  background-color: var(--white);

  &:hover {

    .item_btn_area {
      visibility: visible;
    }
  }

  &_circle {
    position     : relative;
    margin-top   : 5px;
    flex         : 0 0 auto;
    width        : 1.25rem;
    height       : 1.25rem;
    border       : solid 1px var(--dull-gray);
    border-radius: 50%;

    &:hover {

      &:before {
        content      : "";
        position     : absolute;
        top          : 5px;
        left         : 4px;
        width        : 10px;
        height       : 5px;
        border-left  : 2px solid var(--gray);
        border-bottom: 2px solid var(--gray);
        transform    : rotate(-45deg);
      }
    }
  }

  &_text {
    display   : flex;
    flex-wrap : wrap;
    word-break: break-all;
    resize    : none;
  }

  &_btn {
    width           : 2.25rem;
    height          : 2.25rem;
    border-radius   : 50%;
    background-color: rgba(#D3E3FD, .5);

    img {
      margin : 0 auto;
      display: block;
      width  : 1rem;
      height : 1rem;
    }
    
    &_area {
      position        : absolute;
      top             : 5px;
      right           : 0;
      padding         : var(--bv);
      display         : flex;
      gap             : 0 var(--bv);
      background-color: var(--white);
      border-radius   : 10px;
      visibility      : hidden;
    }
  }
}


</style>