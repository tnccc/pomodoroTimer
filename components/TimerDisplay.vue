<template>
  <div
    :class="$style.container"
  >
    <div
      :class="$style.timer"
    > 
      <div
        :class="$style.timer_container"
      >
        <div
          :class="$style.timer_count"
        >
          <div
            :class="$style.timer_count_adjust"
          >
            <div
              :class="$style.timer_count_adjust_box"
            >
              <span @click="adjustmentTimerSetting(600)">▲</span>
              <span @click="adjustmentTimerSetting(60)">▲</span>
            </div>
            <div
              :class="$style.timer_count_adjust_box"
            >
              <span @click="adjustmentTimerSetting(-600)">▼</span>
              <span @click="adjustmentTimerSetting(-60)">▼</span>
            </div>
          </div>
          <div :class="$style.timer_count_num">
            <span>{{ timerDisplay }}</span>
          </div>
          <div :class="$style.timer_description">
            <div
            >
              <p
                v-html="adage.description"
                :class="$style.timer_quote"
              >
              </p>
              <p
                :class="$style.timer_name"
              >
                {{ adage.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button 
        v-if="!isTimerRunning" @click="startTimer">start</button>
      <button v-if="isTimerRunning" @click="pauseTimer">pause</button>
    </div>
  </div>
</template>

<script>
import MenuTimer from '@/assets/images/timer.svg'

export default {
  name: 'TimerDisplay',
  components: {
    MenuTimer,
  },
  data() {
    return { 
      elapsedSeconds: 0,
      timerSettingSecondsMin: 0,
      timerSettingSecondsMax: 5999,
      timerSettingSeconds: 3,
      intervalId: null,
    }
  },
  props: {
    adage: {
      required: true,
      type: Object,
    },
    mode: {
      required: true,
      type: Object,
    },
  },
  computed: {
    isTimerRunning() {
      return this.intervalId !== null;
    },
    timeLeft() {
      return this.timerSettingSeconds - this.elapsedSeconds;
    },
    timerDisplay() {
      const min = Math.floor(this.timeLeft / 60).toString().padStart(2, 0)
      const sec = (this.timeLeft % 60).toString().padStart(2, '0')
      return `${min}:${sec}`;
    },
  },
  methods: {
    adjustmentTimerSetting(time) {
      if (this.timerSettingSeconds + time < this.timerSettingSecondsMin | this.timerSettingSeconds + time > this.timerSettingSecondsMax) {
        return;
      }
      this.timerSettingSeconds += time
    },
    startTimer() {
      this.$emit('start', this.mode);
      this.intervalId = setInterval(() => {
        this.elapsedSeconds += 1
        if (this.timeLeft === 0) {
          clearInterval(this.intervalId)
          this.$emit('finish', this.mode);
        }
      }, 1000);
    },
    pauseTimer() {
      clearInterval(this.intervalId)
      this.intervalId = null;
      console.log(this.intervalId)
      this.$emit('pause', this.mode);
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

  .timer {
    margin-top: calc(var(--bv) * 4.5);
    
    &_container {
      position        : relative;
      margin          : 0 auto;
      padding-top     : calc(var(--bv) * 7.5);
      display         : flex;
      justify-content : center;
      width           : 26.5rem;
      height          : 26.5rem;
      border-radius   : 50%;
      font-family     : f.family('english');
      background-color: rgba($color: #D3E3FD, $alpha: 0.25);

      &::before {
        content      : "";
        position     : absolute;
        left         : 0;
        top          : 0;
        width        : 100%;
        height       : 100%;
        border       : solid 8px c.$lightGray;
        border-radius: 50%;
        z-index      : -1;
      }

      &::after {
        content: "";
        stroke-dashoffset: 1px;
        
      }
    }

    &_count {
      font-size      : calc(var(--bv) * 13 - 4px);
      font-weight    : bolder;
      color          : c.$blue;

      &_adjust {
        position       : relative;
        margin-top     : -2rem;
        display        : flex;
        font-size      : calc(var(--bv) * 2);
        justify-content: center;
        align-items    : center;
        z-index        : v.zIndex('nav');
      }

      &_num {
        display        : flex;
        max-height     : 136px;
        align-items    : center;
        justify-content: center;

        &.rest{
          color:  c.$mainGreen; 
        }
      }
    }

    &_min {
      display: flex;
      
      &::after {
        content : ":";
        position: relative;
        bottom  : var(--bv);
        display : block;
      }
    }

    &_description {
      text-align: center;

      > div {
        margin        : 0 auto;
        display       : flex;
        flex-direction: column;
        max-width     : 320px;
      }

      p {
        font-size  : calc(var(--bv) * 2);
        font-weight: normal;
        line-height: 1.65;
        color      : c.$black;

        &:first-of-type {
          min-height : 80px;
          flex: 1 0 auto;
        }
      }

      .timer_quote {
        margin-top: var(--bv);
      }

      .timer_name {
        margin-top: calc(var(--bv) * 3);
      }
    }
  }

  .setting {
    margin-top: calc(var(--bv) * 6);

    &_timer {
      display        : flex;
      justify-content: center;
      gap: 0 calc(var(--bv) * 2);

      &_item {
        margin-top   : var(--bv);
        padding      : 4px calc(var(--bv) * 1.5);
        display      : flex;
        align-items  : center;
        border-bottom: solid 1px #64748B;
        transition   : border .3s;

        &:hover {
          border-bottom: solid 1px var(--blue);
        }

        input {
          width: 150px;
        }
      }

      &_button {
        position: relative;

        &::before {
          content         : "";
          position        : absolute;
          top             : 50%;
          left            : 50%;
          transform       : translate(-50%, -50%);
          padding         : calc(var(--bv) * 2.5);
          border-radius   : 50%;
          background-color: rgba(0, 0, 0, 0.08);
          visibility      : hidden;
          opacity         : 0;
          transition      : opacity .3s;
        }

        &:hover {

          &::before {
            opacity: 1;
            visibility: visible;
          }
        }

        svg {
          display: block;
          width  : 16px;
          height : 16px;
          cursor : pointer;
        }
      }
    }
  }
}
</style>