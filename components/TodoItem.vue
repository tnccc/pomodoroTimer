<template>
  <div
    :class="$style.container"
  >
    <div
      :class="$style.item"
    >
      <button
        :class="$style.item_circle"
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
          <img src="@/assets/images/task_edit.svg" alt="taskedit">
        </button>
        <button
          v-if="editMode"
          @click=""
          :class="$style.item_btn"
        >
          <img src="@/assets/images/task_save.svg" alt="taskSave">
        </button>
        <button
          @click="deleteButtonClick"
          :class="$style.item_btn"
        >
          <img src="@/assets/images/task_delete.svg" alt="taskdelete">
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TodoItem',
  data() {
    return {
<<<<<<< HEAD
      todoMessage          : '',
      editAble             : false,
      editMode             : false,
=======
      todoMessage: '',
      editAble: false,
      editMode: false,
>>>>>>> develop
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
  methods: {
    editStart() {
      this.editAble = true
      this.editMode = true
    },
    editEnd(e) {
      //TodoItem内でエンター押下時(IME確定時)にdisabledの処理を変更
      if(e.keyCode === 13) {
        this.editAble = false
        this.editMode = false
        return
      }
    },
    save() {
      // TODO:ここは佐藤と一緒にやりましょう(Editの保存は少し複雑なので)
    },
    deleteButtonClick() {
      // TODO:emitの引数にはthis.todoを突っ込みましょう
      this.$emit('deleteButtonClick', this.todo)
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