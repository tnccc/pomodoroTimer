<template>
  <div
    :class="$style.container"
  >
    <GlobalHeader />
    <main>
      <div
        :class="$style.contents"
      >
        <div
          :class="$style.contents_grid"
        >
          <PomodoroTimer 
            :class="$style.timer"
          />
          <TodoList 
            :class="$style.todo"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Top-Page',
}
</script>

<style lang="scss" module>
@use "@/assets/scss/value" as v;
@use "@/assets/scss/font" as f;

.container {
  width: 100%;
  --sv : .5rem;
  --black: #202124;
  --light-gray: #E2E8F0;
  --accent-color: #0B57D0;
}

.contents {
  margin-top: v.viewMargin(1400, 64);

  &_grid {
    display: grid;
    grid-template-columns: 70% 30%;
  }
}
</style>