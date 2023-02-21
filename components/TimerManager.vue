<template>
  <div
    :class="$style.container"
  >
    <div
      :class="[
        $style.push,
        {[$style.display]: isHidePushWindow}
      ]"
    >
      <div
        v-if="isHidePushWindow"
        :class="$style.window"
      >
        <div
          :class="$style.window_container"
        >
          <div
            :class="$style.window_image"
          >
            <PushTimer />
            <div
              :class="$style.window_image_heading"
            >
              <span>お知らせ</span>
              <span>{{ finishMessage }}</span>
              <span>Pomodoro TImer</span>
            </div>
          </div>
          <div
            :class="$style.window_contents"
          >
            <button
              @click="isHidePushWindow = false"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="$style.mode"
    >
      <button 
        @click="changeMode(modes.pomodoro)"
        :disabled="timerStarting"
        :class="
        [$style.mode_button, $style.mode_button_pomodoro,
          {[$style.current]: activeMode.name === 'pomodoro'},
          {[$style.stop]: timerStarting && activeMode.name !== 'pomodoro'}
        ]"
      >
        Pomodoro
        <span :class="$style.num">{{ modes.pomodoro.finishedCount }}</span>
      </button>
      <button 
        @click="changeMode(modes.rest)"
        :disabled="timerStarting"
        :class="[$style.mode_button, $style.mode_button_rest,
          {[$style.current]: activeMode.name === 'rest'},
          {[$style.stop]: timerStarting && activeMode.name !== 'rest'},
        ]"
      >
        Rest
        <span :class="$style.num">{{ modes.rest.finishedCount }}</span>
      </button>
      <button 
        @click="changeMode(modes.longRest)"
        :disabled="timerStarting"
        :class="[$style.mode_button, $style.mode_button_rest,
        {[$style.current]: activeMode.name === 'longrest'},
        {[$style.stop]: timerStarting && activeMode.name !== 'longrest'},
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
        :key="`${resetCount}-${mode.id}`"
        :mode="mode"
        :isActive="isActiveTimer(mode)"
        :settingTime="mode.defaultTime"
        :adage="randomAdageList()"
        @timerSet="onTimerSet"
        @timerTick="onTimerTick"
        @start="onTimerStart"
        @pause="onTimerPause"
        @finish="onTimerFinish"
        @reset="resetTimer"
      />
    </div>
  </div>
</template>

<script>
import adage from '../module/adage.json'
import PushTimer from '@/assets/images/push_logo.svg'

export default {
  name: 'TimerManager',
  components: {
    PushTimer,
  },
  data() {
    return  {
      modes: {
        pomodoro: { id: 1, name:'pomodoro', nextModeKey: 'rest', defaultTime: 600, finishedCount: 0, finishedMessage: 'ポモドーロが終了しました'},
        rest    : { id: 2, name:'rest', nextModeKey: 'pomodoro', defaultTime: 300, finishedCount: 0, finishedMessage: '休憩が終了しました'},
        longRest: { id: 3, name:'longrest', nextModeKey: 'pomodoro', defaultTime: 1200, finishedCount: 0, finishedMessage: '休憩が終了しました'},
      },
      timerStarting: false,
      activeMode: null,
      resetCount:0,
      isHidePushWindow: false,
      finishMessage: '',
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
    onTimerSet(timeDisplay) {
      document.title = timeDisplay
    },
    onTimerTick(timeDisplay) {
      document.title = timeDisplay
    },
    onTimerStart() {
      this.timerStarting = true;
      console.log('start')
    },
    onTimerPause() {
      this.timerStarting = false;
      console.log('pause')
    },
    onTimerFinish(mode) {
      this.timerStarting = false;
      mode.finishedCount++
      this.finishMessage = `${mode.finishedCount}回目の${mode.finishedMessage}`;
      this.isHidePushWindow = true;
      setTimeout(() => {
        this.isHidePushWindow = false
      }, 3000)
      const nextMode = this.modes[mode.nextModeKey]
      this.activeMode = nextMode
    },
    resetTimer() {
      const result = window.confirm('すべてリセットしますか？(回数カウントも初期化されます)')
      if(result) {
        this.resetCount += 1;
        this.modes.pomodoro.finishedCount = 0
        this.modes.rest.finishedCount = 0
        this.modes.longRest.finishedCount = 0
      }
      return
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
      opacity    : .5;
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

      &.stop {
        opacity: .5;
        cursor: not-allowed;
      }

      &.current {
        opacity       : 1;
        cursor        : pointer;

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

  .push {
    position: absolute;
    width: 100%;
    z-index: 0;

    &.display {
      z-index : v.zIndex('contents');
    }

    .window {
      position: absolute;
      right   : -15%;
      top     : v.clampFunc(-92, -100, -128, 1480);
      border  : solid 1px var(--dull-gray);

      &_container {
        padding         : calc(var(--bv) * 4) calc(var(--bv) * 2);
        display         : flex;
        width           : 420px;
        min-height      : 128px;
        background-color: var(--white);
      }

      &_image {
          display: flex;
          gap: 0 calc(var(--bv) * 2);
          
          svg {
            width  : 80px;
            height : 80px;
          }

          &_heading {

            span {
              display: block;

              &:last-of-type {
                font-size: 12px;
                color: var(--dull-gray);
              }
            }
          }
      }
      &_contents {
        display        : flex;
        align-items    : flex-start;
        justify-content: flex-end;
        flex           : 1 0 auto;

      }
    }
  }
}

</style>
