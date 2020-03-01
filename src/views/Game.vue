<template>
  <div style="height:100%;width:100%;">
    <Countdown v-if="isCountdown" v-on:endCountdown="isCountdown = false"/>
    <GameView v-else />
  </div>
</template>

<script>
import gameStore from '@/stores/gameStore';
import Countdown from '@/components/game/Countdown.vue';
import GameView from '@/components/game/GameView.vue';

export default {
  data() {
    return {
      isCountdown: true,
      store: gameStore.state,
    };
  },
  created() {
    gameStore.createGame(this.$route.query.lvl, this.$route.query.ops);
    this.$parent.isGame = true;
  },
  updated() {

  },
  destroyed() {
    gameStore.clearGame();
    document.body.classList.remove('oneThird', 'twoThirds', 'almost');
    this.$parent.isGame = false;
  },
  components: {
    Countdown,
    GameView,
  },
};
</script>
