<template>
  <div id="app" class="bodyBG" v-bind:class="{homeColor:(this.$route.path === '/'),
   gameColor:(this.$route.path === '/game'),
   oneThird: isOneThird,
   twoThirds: isTwoThirds,
    almost: isAlmost}">
    <router-view/>
  </div>
</template>

<script>
import localStorage from '@/stores/localStorage';
import gameStore from '@/stores/gameStore';

export default {
  data() {
    return {
      store: gameStore.state,
    };
  },
  created() {
    localStorage.configureSaveData();
  },
  computed: {
    isOneThird() {
      if (this.store.numberOfProblemsSolved >= gameStore.getOneThird()
      && this.store.numberOfProblemsSolved < gameStore.getTwoThirds()) {
        return true;
      }
      return false;
    },
    isTwoThirds() {
      if (this.store.numberOfProblemsSolved >= gameStore.getTwoThirds()
       && this.store.numberOfProblemsSolved < gameStore.getNineTenth()) {
        return true;
      }
      return false;
    },
    isAlmost() {
      if (this.store.numberOfProblemsSolved >= gameStore.getNineTenth()
       && this.store.numberOfProblemsSolved < this.store.numberOfProblems) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700&display=swap');

html, body, #app {
  margin:0;
  height:100%;
  width:100%;
  font-family:"noto sans", sans-serif;
  -webkit-text-size-adjust:100%;
}

.bodyBG {
  position:absolute;
  transition: background-color 0.2s;
}

.homeColor {
  background-color:#d3d3d3;
}

.gameColor {
  background-color:#fafafa;
}

.oneThird {
  background-color:#c9ead0;
}

.twoThirds {
  background-color:#e0e8b6;
}

.almost {
  background-color:#e6c695;
}

* {
  touch-action: manipulation;
}
</style>
