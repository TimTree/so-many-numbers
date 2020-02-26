<template>
  <div class="onboarding">
  <transition name="fade05" appear>
  <div>
    <p style="margin-top:0;">
      <img src='@/assets/SoManyNumbersOnboarding.png' alt='So Many Numbers game screenshot' />
    </p>
    <main>
    <strong>Objective:</strong> Solve 30 math problems as fast as you can!
    </main>
    <button class="normal-button button-orange" style="margin-top:0;"
      v-on:click="onboardProceed();"
      >Get started</button>
  </div>
  </transition>
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

<style scoped>
.onboarding {
  text-align:center;
  width:95%;
  font-size:calc(10px + 2.4vmin);
}

img {
  height:45vmin;
  border-radius:0.5vmin;
  box-shadow:2px 2px 7px rgba(0,0,0,0.3);
}

main {
  margin:1em 0;
}

@media (min-width: 420px) and (min-height: 420px) {
  img {
    height:40vmin;
    max-height:618px;
  }
}
</style>
