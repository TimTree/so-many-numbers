<template>
  <div style="height:100%;">
    <transition name="fade" appear>
      <div class="countdown">
        <p class="soManyTitle">So Many Numbers!</p>
        <p class="lvlIndicator">{{level}}</p>
        <p class="mathOps" v-html="mathOps"></p>
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
      level: gameStore.state.level,
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

<style lang="scss" scoped>
.countdown {
  @extend %flex-center;
  height: 85%;
}

.soManyTitle {
  font-size: 6.8vmin;
  margin: 0 0 0.3em 0;
}

.lvlIndicator {
  font-size: 5vmin;
  margin-top: 0.5em;
  margin-bottom: 0.1em;
}

.mathOps {
  font-size: 12vmin;
  margin: 0 0 0.05em 0;
  letter-spacing: 0.5em;
  margin-right: -0.5em;
  font-weight: 700;
  line-height: 1.1;
}

.countdownNumber {
  font-size: 16vmin;
  margin: 0 0 0 0;
}

@media (min-width: $mobile-boundary) and (min-height: $mobile-boundary) {
  .soManyTitle {
    font-size: 3.8vmin;
  }

  .lvlIndicator {
    font-size: 3vmin;
  }

  .mathOps {
    font-size: 6.9vmin;
  }

  .countdownNumber {
    font-size: 10.8vmin;
  }
}
</style>
