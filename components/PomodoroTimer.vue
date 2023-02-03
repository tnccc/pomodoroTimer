<template>
  <div
    :class="$style.container"
  >
    <div
      :class="$style.button_container"
    >
      <button
        @click="countCheck"
        :class="[$style.button, $style.button_pomodoro, $style.current]"
      >
        Pomodoro
        <span :class="$style.num">{{ pomodoro }}</span>
      </button>
      <button
        :class="[$style.button, $style.button_rest]"
      >
        Rest
        <span :class="$style.num">{{ rest }}</span>
      </button>
    </div>
    <div
      :class="$style.timer"
    >
      <div
        :class="$style.timer_container"
      >
      <div><span @click="adjustmentTime(600)">▲</span><span @click="adjustmentTime(60)">▲</span></div>
        <div
          :class="$style.timer_count"
        >
          <div :class="[$style.timer_count_num, status === 4 || status === 5 && mode === 'rest' ? $style.rest : '']">
            <span
              :class="$style.timer_min"
            >
              {{ displayMin }}
            </span>
            <span
              :class="$style.timer_sec"
            >
              {{ displaySec }}
            </span>
          </div>
          <div :class="$style.timer_description">
            <div
            v-for="item in items"
            :key="item.id"
            >
            <p
            v-html="item.description"
            :class="$style.timer_quote"
            ></p>
            <p
            :class="$style.timer_name"
            >
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
    <div><span @click="adjustmentTime(-600)">▼</span><span @click="adjustmentTime(-60)">▼</span></div>
      </div>
      <div
        :class="$style.timer_start"
      >
        <button
          @click="countCheck"
          type="button"
          :class="[$style.timer_start_button, status === 4 || status === 5 && mode === 'rest' ? $style.rest : '']"
        >
          <span
            v-if="mode === 'work' || status === 5 && mode === 'rest'"
          >
            STOP
          </span>
          <span
            v-else-if="mode === 'rest'"
          >
            REST
          </span>
          <span
            v-else
          >
            START
          </span>
        </button>
      </div>
      <div>
        <!-- <input type="range" id="volume" name="volume"
        min="1" max="100" v-model="time"/> -->
        <!-- <input 
          @change="changeSettingTime"
          type="range" 
          id="volume" 
          name="volume"
          min="1" 
          max="100" 
        /> -->
        <!-- <label for="volume">{{ time/60 }}min</label> -->
        <div
          :class="$style.setting"
        >
          <div
            :class="$style.setting_timer"
          >
            <div
              :class="$style.setting_box"
            >
              <div
                :class="$style.setting_timer_heading"
              >
                休憩時間（分:秒）
              </div>
              <div
                :class="$style.setting_timer_item"
              >
                <input 
                  v-model="rest"
                  type="text"
                  name="text"
                >
                <button
                  :class="$style.setting_timer_button"
                >
                  <MenuTimer />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuTimer from '@/assets/images/timer.svg'

export default {
  name: 'PomodoroTimer',
  components: {
    MenuTimer,
  },
  data() {
    return { 
      mode: {
        default: 'default',
        work:  'work',
        stop: 'stop',
        rest: 'rest',
      },
      status: 0,
      reset: 0,
      time: 300, //後にカスタムできる仕様に変更したい
      pomodoro: 0,
      rest: 0,
      longrest: 0,
      intervalID: null,
      min: '00',
      sec: '00',
      items: [
        {
          id: 1,
          description: `挫折を経験したことが無い者は、何も新しい事に<br>
          挑戦したことが無いということだ`,
          name: 'アインシュタイン （1879～1955）'
        },
        // {
        //   id: 2,
        //   description: `とにかく、考えてみることである。工夫してみることである。<br>そして、やってみることである。失敗すればやり直せばいい`,
        //   name: '松下幸之助（1894～1989）'
        // },
      ],
    }
  },
  mounted() {
    console.log(this.mode)
  },
  computed: {
    displayMin() {
      if (this.intervalID) {
        return this.min.padStart(2, '0')
      } else {
        return Math.floor(this.time / 60).toString().padStart(2, '0')
      }
    },
    displaySec() {
      if (this.intervalID) {
        return this.sec.padStart(2, '0')
      } else {
        return (this.time % 60).toString().padStart(2, '0')
      }
    },
  },
  methods: {
    adjustmentTime(time) {
      if (this.time + time < 0 | this.time + time > 5999) {
        return;
      }
      this.time += time
    },
    countCheck() {
      if(this.status === 0) {
        this.status = 1

        if(this.status === 1) {
          this.mode = 'work'
          this.status = 2
          console.log(this.mode)
          this.countStart()
        } 
      } else if (this.status === 2 && this.mode === 'work') {
        this.mode = 'stop'
        this.status = 0
        this.countStop()
      } else if (this.status === 0 && this.mode === 'stop') {
        this.mode = 'work'
        this.status = 1
      } else if (this.status === 4) {
        this.mode = 'rest'
        this.status = 5
        console.log(this.mode)
        console.log(this.status)
        this.countStart()
      }  else if(this.status === 5 && this.mode === 'rest') {
        this.status = 4
        this.countStop()
      }
    },
    countSegmentation(num, length) {
      return ('00' + num).slice(-length)
    },
    count() {
      if(this.time === 0 && this.mode === 'work') {
        this.min = 0;
        this.sec = 0;
        this.status = 4
        this.mode = 'rest' 
        this.time = 10
        this.pomodoro++
        this.countStop()
      } else if(this.time === 0 && this.status === 5 && this.mode === 'rest') {
        this.min = 0;
        this.sec = 0;
        this.status = 0
        this.mode = 'default' 
        this.time = 10
        this.rest++
        this.countStop()
      }
      else {
        this.time -= 1;
        this.min = this.countSegmentation(Math.floor(this.time / 60), 2)
        this.sec = this.countSegmentation(this.time % 60, 2)
      }
    },
    countStart() { //statusがtrueの時に処理が実行される、また1秒ごとに関数が実行される
      this.min = this.countSegmentation(Math.floor(this.time / 60), 2)
      this.sec = this.countSegmentation(this.time % 60, 2)
      this.intervalID = setInterval(() => {
        this.count()
      }, 1000);
    },
    // TODO?ここの引数にNEXT処理（statusに応じた）を関数で渡しては？
    countStop() { //statusが2の時に実行される、また1秒ごとに実行していた処理を止める
      clearInterval(this.intervalID); 
      this.min = this.countSegmentation(Math.floor(this.time / 60), 2)
      this.sec = this.countSegmentation(this.time % 60, 2)
      console.log(this.mode)
      console.log(this.status)
    },
    changeSettingTime(e) {
      console.log(e.target.value)
      this.time = 60 * e.target.value;
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

  .button {
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

    &_container {
      display        : flex;
      justify-content: center;
      gap            : 0 calc(var(--bv) * 7);
    }

    .num {
      font-weight: bolder;
    }

    &_pomodoro {
      color: c.$accentColor;
    }

    &_rest {
      color: c.$mainGreen;
    }
  }

  .timer {
    margin-top: calc(var(--bv) * 4.5);
    height    : 100vh;
    
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

    &_start {
      display: flex;
      justify-content: center;

      button {
        @include m.component_button(22.5rem, 60px, 20px, c.$accentColor);
        margin-top : calc(var(--bv) * 4);
        padding    : calc(var(--bv) * 3);
        font-size  : calc(var(--bv) * 2.5);
        font-weight: bold;
        box-shadow : 0 4px 4px 2px rgba($color: #000000, $alpha: .08);

        &.rest {
        @include m.component_button(22.5rem, 60px, 20px, c.$mainGreen);
      }
      }
    }

    &_count {
      font-size      : calc(var(--bv) * 13 - 4px);
      font-weight    : bolder;
      color          : c.$blue;

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

      p {
        font-size  : calc(var(--bv) * 2);
        font-weight: normal;
        line-height: 1.65;
        color      : c.$black;
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