<template>
  <!-- TODO: MODE/status はこっちで管理する -->
  <!-- 各タイマーの状態はmanager管理のイメージです。（どのモードで動いてるとか、動いてる、止まってる等） -->
  <div
    :class="$style.container"
  >
    <div
      :class="$style.mode"
    >
      <button 
        @click="changeMode(modes.pomodoro)"
        :class="[$style.mode_button, $style.mode_button_pomodoro, $style.current]"
      >
        Pomodoro
        <span :class="$style.num">{{ finishedPomodoroCount }}</span>
      </button>
      <button 
        @click="changeMode(modes.rest)"
        :class="[$style.mode_button, $style.mode_button_rest]"
      >
        Rest
        <span :class="$style.num">{{ finishedRestCount }}</span>
      </button>
      <button 
      @click="changeMode(modes.longRest)"
        :class="[$style.mode_button, $style.mode_button_rest]"
      >
        Long Rest
        <span :class="$style.num">{{ finishedLongRestCount }}</span>
      </button>
    </div>
    <div>
      <TimerDisplay 
        v-for="mode in modes" 
        v-show="isActiveTimer(mode)"
        :key="mode.id"
        :mode="mode"
        :adage="randomAdageList"
        @start="onTimerStart"
        @pause="onTimerPause"
        @finish="onTimerFinish"
      />
    </div>
  </div>
</template>

<script>
import adage from '../module/adage.json'

export default {
  name: 'TimerManager',
  data() {
    return  {
      modes: {
        pomodoro: { id: 1, name:'pomodoro'},
        rest    : { id: 2, name:'rest'},
        longRest: { id: 3, name:'longrest'},
      },
      activeMode           : null,
      finishedPomodoroCount: 0,
      finishedRestCount    : 0,
      finishedLongRestCount: 0,
      adage,
    }
  },
  created() {
    this.activeMode = this.modes.pomodoro
  },
  computed: {
    randomAdageList() {
      const random = this.adage[Math.floor(Math.random() * this.adage.length)]
      return random
    },
  },
  methods: {
    isActiveTimer(mode) {
      return this.activeMode.id === mode.id
    },
    changeMode(mode){
      this.activeMode = mode
    },
    onTimerStart() {
      console.log('start')
    },
    onTimerPause() {
      console.log('pause')
    },
    onTimerFinish() {
      console.log('finish')
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
  display        : flex;
  align-items    : center;
  flex-direction : column;

  .mode {
    display        : flex;
    justify-content: center;
    gap            : 0 calc(var(--bv) * 7);

    &_button {
      position   : relative;
      font-size  : calc(var(--bv) * 2);
      font-family: f.family('english');
      background : none;

      &::before {
        content         : "";
        position        : absolute;
        top             : 0;
        left            : -25px;
        width           : calc(100% + 50px);
        height          : 100%;
        background-color: rgba(211, 227, 253, 0.55);
        border-radius: 5px 5px 0 0;
        opacity         : 0;
        transition      : opacity .2s;
        z-index         : -1;
      }

      &:hover {

        &::before {
          opacity: 1;
        }
      }

      &.current {

        &::after {
          content         : "";
          position        : relative;
          right           : 25px;
          margin-top      : 2px;
          display         : block;
          width           : calc(100% + 50px);
          height          : 1px;
          background-color: #64748B;
        }
      }

      span {
        font-weight: bold;
      }

      &_pomodoro {
        color: var(--blue);
      }

      &_rest {
        color: var(--green);
      }
    }
  }

  .timer {
    display: flex;
    justify-content: center;

    &_button {
      @include m.component_button(22.5rem, 60px, 20px, c.$accentColor);
      margin-top : calc(var(--bv) * 4);
      padding    : calc(var(--bv) * 3);
      font-size  : calc(var(--bv) * 2.5);
      font-weight: bold;
      box-shadow : 0 4px 4px 2px rgba($color: #000000, $alpha: .08);
      transition: background-color .3s, border .3s, color .3s;
      
      &:hover {
        color           : var(--blue);
        background-color: var(--white);
        border          : solid 2px var(--blue);
      }
    }

    &.rest {
      @include m.component_button(22.5rem, 60px, 20px, c.$mainGreen);

      &:hover {
        color           : var(--green);
        background-color: var(--white);
        border          : solid 2px var(--green);
      }
    }
  }
}

</style>
