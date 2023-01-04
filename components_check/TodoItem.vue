<template>
  <button
    v-if="type === 'default' || 'task'"
    @click="onClick"
    :class="[$style.item, type === 'task' ? $style.task : '']"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'TodoItem',
  data() {
    return {
    }
  },
  props: {
    type: {
      require: false,
      type   : String,
      default: "",
    },
  },  
  methods: {
    onClick() {
      this.$emit('onClick')
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
  padding      : v.clampFunc(12, 16, 16, 1024);
  width        : 100%;
  display      : flex;
  align-items  : center;
  font-size: v.clampFunc(14, 15, 16, 1024);
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

  &.task {
    pointer-events: none;

    &::before {
      content: none;
    }

    &::after {
      content: none;
    }
  }
}
</style>