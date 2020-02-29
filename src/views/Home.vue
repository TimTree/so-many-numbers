<template>
<div class="home-div">
  <header>
    <img src="@/assets/SoManyNumbersTitleLight.svg" alt="So Many Numbers!"/>
  </header>
  <main>
    <transition name="fade" mode="out-in" appear>
      <LevelExplanation v-if="onLevelExplanation" key="explanation"/>
      <Settings v-else-if="onSettings" key="settings"/>
      <OnBoarding v-else-if="onOnboarding" key="onboarding"/>
      <Stats v-else-if="onStats" key="updater"/>
      <Selection v-else key="selection"/>
    </transition>
  </main>
  <footer class="authors">
    <span>
      Created by <a href="https://github.com/ash-caz" target="_blank" rel="noopener" title="Ashley's GitHub profile">Ashley Caswell</a>
       & <a href="https://github.com/TimTree" target="_blank" rel="noopener" title="Timothy's GitHub profile">Timothy Hsu</a>
    </span>
    <span>
        <a href="https://github.com/TimTree/so-many-numbers"  target="_blank" rel="noopener" title="Source code on GitHub">
          <!-- eslint-disable-next-line max-len -->
          <svg class="github" fill="currentColor" preserveAspectRatio="xMidYMid meet" viewBox="0 0 40 40"><g><path d="m20 0c-11 0-20 9-20 20 0 8.8 5.7 16.3 13.7 19 1 0.2 1.3-0.5 1.3-1 0-0.5 0-2 0-3.7-5.5 1.2-6.7-2.4-6.7-2.4-0.9-2.3-2.2-2.9-2.2-2.9-1.9-1.2 0.1-1.2 0.1-1.2 2 0.1 3.1 2.1 3.1 2.1 1.7 3 4.6 2.1 5.8 1.6 0.2-1.3 0.7-2.2 1.3-2.7-4.5-0.5-9.2-2.2-9.2-9.8 0-2.2 0.8-4 2.1-5.4-0.2-0.5-0.9-2.6 0.2-5.3 0 0 1.7-0.5 5.5 2 1.6-0.4 3.3-0.6 5-0.6 1.7 0 3.4 0.2 5 0.7 3.8-2.6 5.5-2.1 5.5-2.1 1.1 2.8 0.4 4.8 0.2 5.3 1.3 1.4 2.1 3.2 2.1 5.4 0 7.6-4.7 9.3-9.2 9.8 0.7 0.6 1.4 1.9 1.4 3.7 0 2.7 0 4.9 0 5.5 0 0.6 0.3 1.2 1.3 1 8-2.7 13.7-10.2 13.7-19 0-11-9-20-20-20z"></path></g></svg>
          </a>
    </span>
  </footer>
</div>
</template>

<script>
import Settings from '@/components/home/Settings.vue';
import Selection from '@/components/home/Selection.vue';
import OnBoarding from '@/components/home/OnBoarding.vue';
import Stats from '@/components/home/Stats.vue';
import LevelExplanation from '@/components/home/LevelExplanation.vue';
import localStorage from '@/stores/localStorage';

export default {
  data() {
    return {
      onSettings: false,
      onOnboarding: false,
      onStats: false,
      onLevelExplanation: false,
    };
  },
  components: {
    Settings,
    Selection,
    OnBoarding,
    Stats,
    LevelExplanation,
  },
  created() {
    this.$parent.isHome = true;
    if (localStorage.saveData.firstRun === false) {
      this.onOnboarding = true;
    }
  },
  destroyed() {
    this.$parent.isHome = false;
  },
};
</script>

<style lang="scss" scoped>
.home-div {
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr 7%;
}

main {
  @extend %flex-center;
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  text-align: center;
}

header {
  @extend %flex-center;
  background-color: var(--header-color);
  width: 100%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 10px 0;
  height: 18.5vmin;
}

header img {
  height: 18.5vmin;
}

.authors {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-size: calc(55% + 3px);
}

.authors span:first-child {
  margin-right: 1em;
}

.github {
  height: calc(4.4vmin + 3px);
}

@media (min-width: $mobile-boundary) and (min-height: $mobile-boundary) {
  header {
    height: 13.25vmin;
    min-height: 63.6px;
    max-height: 159px;
  }
  header img {
    height: 13.25vmin;
    min-height: 63.6px;
    max-height: 159px;
  }
  .github {
    height: calc(2.4vmin + 3px);
  }
}

@media (min-height: 800px) {
  header {
    padding:20px 0;
  }
}

@media (min-height: 1000px) {
  header {
    padding:30px 0;
  }
}

@media (min-width: 1024px) and (min-height: 1024px) {
  main {
    max-width: 100vmin;
  }
}
</style>
