<template>
  <div
    :class="$style.wrapper"
  >
<<<<<<< Updated upstream
    
=======
    <div
      :class="$style.wrapper"
    >
      <div
        :class="$style.list"
      >
        <button
          :class="$style.button"
        >
          <bgmMenu />
        </button>
        <button
          :class="$style.button"
        >
          <bgmPlay />
        </button>
        <button
          :class="$style.button"
        >
          <bgmPrev />
        </button>
        <button
          :class="$style.button"
        >
          <bgmNext />
        </button>
        <button
          :class="[$style.button, $style.flex]"
        >
          <bgmVolume />
          <input type="range">
        </button>
      </div>
    </div>
>>>>>>> Stashed changes
  </div>
</template>

<script>
import bgmMenu from '@/assets/images/bgm_menu.svg'
import bgmPlay from '@/assets/images/bgm_play.svg'
import bgmPrev from '@/assets/images/bgm_skip_prev.svg'
import bgmNext from '@/assets/images/bgm_skip_next.svg'
import bgmVolume from '@/assets/images/bgm_volume.svg'

export default {
  name: 'SoundPlayer',
  components: {
    bgmMenu,
    bgmPlay,
    bgmPrev,
    bgmNext,
    bgmVolume,
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" module>
@use "@/assets/scss/value" as v;
@use "@/assets/scss/font" as f;
@use "@/assets/scss/color" as c;
@use "@/assets/scss/mixin" as m;

<<<<<<< Updated upstream
=======
.container {
  width           : 100%;
  background-color: rgba(#F1F5F9, .95);
  box-shadow      : 0 0 6px rgba(0 0 0 / 20%);
}

.wrapper {
  padding    : var(--bv) calc(var(--bv) * 3);
}

.list {
  display    : flex;
  gap        : 0 calc(var(--bv) * 4);
}

.button {

  &.flex {
    display    : flex;
    align-items: center;
    gap        : 0 var(--bv);
  }

  svg {
    width : 1.8rem;
    height: 1.8rem;
    vertical-align: middle;
  }
}
>>>>>>> Stashed changes
</style>