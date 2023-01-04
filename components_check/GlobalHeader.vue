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
      <ul
        :class="$style.list"
      >
        <li
          :class="$style.item"
        >
          <div
            :class="$style.item_container"
          >
            <img :class="$style.icon" src="@/assets/images/reset.svg" alt="">
            <p>リセット</p>
          </div>
        </li>
        <li
          :class="$style.item"
        >
          <div
            :class="$style.item_container"
          >
            <img :class="$style.icon" src="@/assets/images/setting.svg" alt="">
            <p>設定</p>
          </div>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: 'GlobalHeader',
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" module>
@use "@/assets/scss/value" as v;
@use "@/assets/scss/font" as f;

.header {
  padding: calc(var(--sv) * 2) v.viewMargin(1400, 24);
}

.container {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.logo {

  h1 {
    font-size  : calc(var(--sv) * 2);
    font-family: f.family('english');
    font-weight: bolder;
  }
}

.list {
  display        : flex;
  justify-content: flex-end;
  align-items    : center;
  gap            : 0 calc(var(--sv)* 2);
}

.item {
  cursor: pointer;
  transition: opacity .2s;

  &:hover {
    opacity: .5;
  }
  
  &_container {
    display: flex;
    gap: 0 calc(var(--sv) / 2);
  }
}
</style>