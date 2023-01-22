<template>
  <header
    :class="$style.header"
  >
    <div
      :class="$style.container"
    >
      <div
        :class="$style.logo"
      >
        <h1>
          <a href="/">Pomodoro Timer</a>
        </h1>
      </div>
      <div
        :class="$style.list"
      >
        <button
          :class="$style.item"
        >
          <MenuReset />
          <p>リセット</p>
        </button>
        <button
          @click="isDropdownVisible = !isDropdownVisible"
          :class="$style.item"
        >
          <MenuSetting />
          <p>設定</p>
        </button>
      </div>
      <div
        v-show="isDropdownVisible"
        :class="$style.dropdown"
      >
        <div
          :class="$style.dropdown_list"
        >
          <button
            :class="$style.item"
          >
            <MenuTimer />
            <p>タイマーの設定をする</p>
          </button>
          <button
            :class="$style.item"
          >
            <MenuAlarm />
            <p>アラームの設定をする</p>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import MenuSetting from '@/assets/images/setting.svg'
import MenuReset from '@/assets/images/reset.svg'
import MenuTimer from '@/assets/images/timer.svg'
import MenuAlarm from '@/assets/images/alarm.svg'

export default {
  name: 'GlobalHeader',
  components: { 
    MenuReset,
    MenuSetting,
    MenuTimer,
    MenuAlarm,
  },
  data() {
    return {
      isDropdownVisible: false,
    }
  }
}
</script>

<style lang="scss" module>
@use "@/assets/scss/value" as v;
@use "@/assets/scss/font" as f;

.header {
  padding: calc(var(--bv) * 2) v.viewMargin(1400, 24);

  .container {
    position             : relative;
    display              : grid;
    grid-template-columns: 2fr 1fr;
  }

  .logo {

    h1 {
      font-size  : calc(var(--bv) * 2);
      font-family: f.family('english');
      font-weight: bolder;
    }
  }

  .list {
    display        : flex;
    justify-content: flex-end;
    align-items    : center;
    gap            : 0 calc(var(--bv)* 2);
  }

  .item {
    display    : flex;
    align-items: center;
    gap        : 0 calc(var(--bv) / 2);
    transition: opacity .3s;

    svg {
      vertical-align: middle;
    }

    &:hover {
      opacity: .6;
    }
  }

  .dropdown {
    position        : absolute;
    top             : 100%;
    right           : 0;
    padding         : calc(var(--bv) * 2);
    max-width       : 350px;
    width           : 100%;
    background-color: var(--white);
    border-radius   : calc(var(--bv) * 2);
    box-shadow      : rgba(0,0,0,0.2) 0px 12px 28px 0px, rgba(0,0,0,0.1) 0px 2px 4px 0px, hsla(0,0%,100%,0.5) 0px 0px 0px 1px inset;
    z-index         : v.zIndex('contents');
    
    &_list{
      display: grid;
      gap    : var(--bv) 0;
      
      .item {
        padding: 0 calc(var(--bv) * 2);
        gap: 0 calc(var(--bv) * 1.5);

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
    
  }
}


</style>