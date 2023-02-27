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
<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes
    </div>
  </header>
</template>

<script>
<<<<<<< Updated upstream
export default {
  name: 'GlobalHeader',
  data() {
    return {
    }
  }
=======

export default {
  name: 'GlobalHeader',
>>>>>>> Stashed changes
}
</script>

<style lang="scss" module>
@use "@/assets/scss/value" as v;
@use "@/assets/scss/font" as f;

.header {
<<<<<<< Updated upstream
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
=======
  padding: calc(var(--bv) * 2) v.viewMargin(1400, 24);

  .container {
    position             : relative;
    display              : grid;
    grid-template-columns: 2fr 1fr;
>>>>>>> Stashed changes
  }

<<<<<<< Updated upstream
.list {
  display        : flex;
  justify-content: flex-end;
  align-items    : center;
  gap            : 0 calc(var(--sv)* 2);
}

.item {
  cursor: pointer;
  transition: opacity .2s;
=======
  .logo {

    h1 {
      font-size  : calc(var(--bv) * 2);
      font-family: f.family('english');
      font-weight: bolder;
    }
  }
>>>>>>> Stashed changes

  .list {
    display        : flex;
    justify-content: flex-end;
    align-items    : center;
    gap            : 0 calc(var(--bv)* 2);
  }
<<<<<<< Updated upstream
  
  &_container {
    display: flex;
    gap: 0 calc(var(--sv) / 2);
=======

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
    
>>>>>>> Stashed changes
  }
}


</style>