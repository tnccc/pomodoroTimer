<template>
  <!-- TODO: MODE/status はこっちで管理する -->
  <!-- 各タイマーの状態はmanager管理のイメージです。（どのモードで動いてるとか、動いてる、止まってる等） -->
  <!-- TODO: タイマー作動時、他のモードに移行を禁止 -->
  <!-- TODO: タブに残り時間を表示させたい -->
  <!-- TODO: プログレスバーの追加 -->
  <div
    :class="$style.container"
  >
    <div
      :class="$style.mode"
    >
      <button 
        @click="changeMode(modes.pomodoro)"
        :class="
        [$style.mode_button, $style.mode_button_pomodoro,
          {[$style.current]: activeMode.name === 'pomodoro'}
        ]"
      >
        Pomodoro
        <span :class="$style.num">{{ modes.pomodoro.finishedCount }}</span>
      </button>
      <button 
        @click="changeMode(modes.rest)"
        :class="[$style.mode_button, $style.mode_button_rest,
          {[$style.current]: activeMode.name === 'rest'}
        ]"
      >
        Rest
        <span :class="$style.num">{{ modes.rest.finishedCount }}</span>
      </button>
      <button 
      @click="changeMode(modes.longRest)"
        :class="[$style.mode_button, $style.mode_button_rest,
        {[$style.current]: activeMode.name === 'longrest'}
      ]"
      >
        Long Rest
        <span :class="$style.num">{{ modes.longRest.finishedCount }}</span>
      </button>
    </div>
    <div>
      <TimerDisplay 
        v-for="mode in modes" 
        v-show="isActiveTimer(mode)"
        :key="mode.id"
        :mode="mode"
        :adage="randomAdageList()"
        @start="onTimerStart"
        @pause="onTimerPause"
        @finish="onTimerFinish"
      />
    </div>
    <div>currentMode: {{ activeMode.name }}</div>
  </div>
</template>

<script>
import adage from '../module/adage.json'

export default {
  name: 'TimerManager',
  data() {
    return  {
      modes: {
        pomodoro: { id: 1, name:'pomodoro', nextModeKey: 'rest', finishedCount: 0},
        rest    : { id: 2, name:'rest', nextModeKey: 'pomodoro', finishedCount: 0},
        longRest: { id: 3, name:'longrest', nextModeKey: null, finishedCount: 0},
      },
      activeMode: null,
      adage,
    }
  },
  created() {
    this.activeMode = this.modes.pomodoro
  },
  methods: {
    randomAdageList() {
      const random = this.adage[Math.floor(Math.random() * this.adage.length)]
      return random
    },
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
    onTimerFinish(mode) {
      console.log('finish')
      mode.finishedCount++
      const nextMode = this.modes[mode.nextModeKey]
      this.activeMode = nextMode
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
