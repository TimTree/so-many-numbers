<template>
  <div style="height:100%;">
    <transition name="fade07" appear>
      <div class="countdown">
        <p class="soManyTitle">So Many Numbers!</p>
        <p class="diffIndicator">{{difficulty}}</p>
        <p class="mathOps">{{mathOps}}</p>
        <p class="countdownNumber">{{countdownNumber}}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import gameStore from '@/stores/gameStore';

export default {
  data() {
    return {
      countdownNumber: 3,
      difficulty: gameStore.state.difficulty,
    };
  },
  created() {
    this.countdown2 = setTimeout(() => { this.countdownNumber -= 1; }, 1000);
    this.countdown1 = setTimeout(() => { this.countdownNumber -= 1; }, 2000);
    this.countdown0 = setTimeout(() => { this.$emit('endCountdown'); }, 3000);
  },
  destroyed() {
    clearTimeout(this.countdown2);
    clearTimeout(this.countdown1);
    clearTimeout(this.countdown0);
  },
  computed: {
    mathOps() {
      return gameStore.displayOps();
    },
  },
};
</script>

<style scoped>
.countdown {
    height:85%;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
}

.soManyTitle {
  font-family:courier, serif;
  font-size:7vmin;
  opacity:0.6;
  margin:0 0 0.3em 0;
}

.diffIndicator {
  font-family:courier, serif;
  font-size:5vmin;
  margin-top:0.5em;
  margin-bottom:0.1em;
}

.mathOps {
  font-family:courier,serif;
  font-size:12vmin;
  opacity:0.6;
  margin:0 0 0.05em 0;
  letter-spacing:0.5em;
  margin-right:-0.5em;
}

.countdownNumber {
  font-size:16vmin;
  margin:0 0 0 0;
}

@media (min-width: 420px) and (min-height: 420px) {
  .soManyTitle {
    font-size:5.4vmin;
  }

  .diffIndicator {
    font-size:3vmin;
  }

  .mathOps {
    font-size:6.9vmin;
  }

  .countdownNumber {
    font-size:10.8vmin;
  }
}
</style>
