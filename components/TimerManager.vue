<template>
  <!-- TODO: モードメニューはTimerからこっちに移す -->
  <!-- TODO: Start・STOPのボタンもこっちに移す -->
  <!-- TODO: MODE/status はこっちで管理する -->
  <!-- TODO: 格言のデータ管理もこっち。格言はpropsで渡す -->
  <div
    :class="$style.container"
  >
    <div
      :class="$style.mode"
    >
      <button
        @click="startTimer"
        :class="[$style.mode_button, $style.mode_button_pomodoro, $style.current]"
      >
        Pomodoro
        <span :class="$style.num">{{ pomodoro }}</span>
      </button>
      <button
        :class="[$style.mode_button, $style.mode_button_rest]"
      >
        Rest
        <span :class="$style.num">{{ rest }}</span>
      </button>
      <button
        :class="[$style.mode_button, $style.mode_button_rest]"
      >
        Long Rest
        <span :class="$style.num">{{ rest }}</span>
      </button>
    </div>
    <div>
      <TimerDisplay 
        :adage="randomAdageList"
      />
    </div>
    <div
      :class="$style.timer"
    >
      <div
        v-if="mode === 'stop'"
      >
        <button
          @click="startTimer"
          :class="[$style.timer_button,]"
          type="button"
          >
            <span>START</span>
        </button>
      </div>
      <div
        v-if="mode === 'start'"
      >
        <button
          @click="stopTimer"
          :class="[$style.timer_button,]"
          type="button"
          >
            <span>STOP</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimerManager',
  data() {
    return  {
      intervalId: null,
      timer: 0,
      mode: {
        start: 'start',
        stop : 'stop',
        rest : 'rest',
      },
      pomodoro: 0,
      rest: 0,
      adage: [
        {
          id: 1,
          description: `挫折を経験したことが無い者は、何も新しい事に<br>
          挑戦したことが無いということだ`,
          name: 'アインシュタイン （1879～1955）'
        },
        {
          id: 2,
          description: `目標を達成するには、全力で取り組む以外に方法はない。<br>そこに近道はない`,
          name: 'マイケル・ジョーダン（1963～）'
        },
        {
          id: 3,
          description: `結果が出ないとき、どういう自分でいられるか。<br>決してあきらめない姿勢が何かを生み出すきっかけをつくる`,
          name: 'イチロー（1973～）'
        },
        {
          id: 4,
          description: `もし今日が人生最後の日だとしたら、<br>今やろうとしていることは本当に自分のやりたいことだろうか？`,
          name: 'スティーブ・ジョブズ（1955～2011）'
        },
        {
          id: 5,
          description: `しっかりと準備もしていないのに、<br>目標を語る資格はない。`,
          name: 'イチロー（1973～）'
        },
      ],
    }
  },
  mounted() {
    this.mode = 'stop'
  },
  computed: {
    randomAdageList() {
      const random = this.adage[Math.floor(Math.random() * this.adage.length)]
      return random
    },
    modeStatus() {
      return this.mode
    },
  },
  methods: {
    startTimer() {
      this.intervalId = setInterval(() => {
        this.mode = 'start'
        console.log(this.intervalId, this.mode)
      })
    },
    stopTimer() {
      clearInterval(this.intervalId)
      this.mode = 'stop'
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
