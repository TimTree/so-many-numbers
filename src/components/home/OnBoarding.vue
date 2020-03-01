<template>
  <div style="width:95%;font-size:calc(10px + 2.4vmin);">
    <p style="margin-top:0;">
      <img v-if="this.$store.state.theme === 'light'"
      src="@/assets/SoManyNumbersOnboarding.png" alt="So Many Numbers game screenshot"/>
      <img v-else
      src="@/assets/SoManyNumbersOnboardingDark.png" alt="So Many Numbers game screenshot"/>
    </p>
    <main>
    <strong>So many numbers!</strong> Solve 30 problems as fast as you can.
    </main>
    <button class="normal-button button-orange" style="margin-top:0;"
      v-on:click="onboardProceed();"
      >Get started</button>
  </div>
</template>

<script>
import localStorage from '@/stores/localStorage';

export default {
  methods: {
    onboardProceed() {
      this.$parent.onOnboarding = false;
      localStorage.saveData.firstRun = true;
      localStorage.save();
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  height: 45vmin;
  border-radius: 0.5vmin;
  box-shadow: 0.5vmin 0.5vmin 2vmin var(--onboarding-shadow);
}

main {
  margin: 1em 0;
}

@media (min-width: $mobile-boundary) and (min-height: $mobile-boundary) {
  img {
    height: 40vmin;
    max-height: 618px;
  }
}
</style>
