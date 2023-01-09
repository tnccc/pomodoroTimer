<template>
  <div
    :class="$style.container"
  >
    <div
      :class="$style.wrapper"
    >
      <ul
        :class="$style.list"
      >
        <button
          v-for="item in items"
          :class="$style.button"
          :key="item.id"
        >
          <img :src="require(`@/assets/images/${item.images}.svg`)" alt="">
        </button>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SoundPlayer',
  data() {
    return {
      items: [
        {
          id: '1',
          images: 'bgm_menu',
          alt: 'menuButton',
        },
        {
          id: '2',
          images: 'bgm_play',
          alt: 'playButton',
        },
        {
          id: '3',
          images: 'bgm_skip_prev',
          alt: 'prevButton',
        },
        {
          id: '4',
          images: 'bgm_skip_next',
          alt: 'nextButton',
        },
      ],
    }
  }
}
</script>

<style lang="scss" module>
@use "@/assets/scss/value" as v;
@use "@/assets/scss/font" as f;
@use "@/assets/scss/color" as c;
@use "@/assets/scss/mixin" as m;

.container {
  position: fixed;
  bottom  : 0;
  width   : 100%;
  background-color: rgba(#F1F5F9, .8);
}

.wrapper {
  display: grid;
}
</style>