<template>
  <button
    @click="onClick"
    :class="$style.btn"
  >
    <span>
      {{ btnText }}
    </span>
  </button>
</template>

<script>
export default {
  name: 'CommonButton',
  data() {
    return {
    }
  },
  props: {
    btnText: {
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

.btn {
  @include m.component_button(6rem, 4rem, 10px, c.$accentColor);
  padding: 2px 0;
}
</style>