<template>
  <div
    :class="$style.item"
  >
    <textarea
      type="textarea"
      placeholder="簡単な説明を入力しましょう。"
      v-model="text"
    ></textarea>
    <div
      :class="$style.btn_wrap"
    >
      <slot />
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'TodoItemAdd',
  data() {
    return {
      text: '',
    }
  },
  methods: {
    onClick() {
      console.log('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■')
      console.log('before emit', this.text)
      console.log('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■')
      this.$emit('onClick', this.text);
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

.btn {

  &_wrap {
    display: flex;
    gap    : 0 calc(var(--sv) * 3.5);
  }
}
</style>