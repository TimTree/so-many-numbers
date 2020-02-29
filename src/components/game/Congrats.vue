<template>
  <div class="non-math-area">
    <p class="congrats">Congrats!</p>
    <p class="diffIndicator">{{difficulty}}</p>
    <p class="mathOps">{{mathOps}}</p>
    <div class="highScoreCongrats" v-if="$parent.isHighScore">
      <div>New high score:</div>
      <div>{{store.currentTime}} seconds</div>
    </div>
    <div class="results" v-else>
      <div>Your score: {{store.currentTime}} seconds</div>
      <div v-if="playedMoreThanOnce">
          High score: {{highScore.highScore.toFixed(1)}} seconds</div>
      <div v-else>
          First score on this set!</div>
    </div>
    <transition name="fade07" appear>
      <div class="buttons-div">
        <p class="pmargin">
          <button class="button-again button-magenta"
           v-on:click="refresh">Play Again</button>
        </p>
        <p class="pmargin">
          <router-link class="home-area" to="/">
            <button class="button-again button-magenta">Change Set</button>
          </router-link>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import gameStore from '@/stores/gameStore';
import localStorage from '@/stores/localStorage';

export default {
  data() {
    return {
      store: gameStore.state,
    };
  },
  computed: {
    difficulty() {
      return gameStore.state.difficulty;
    },
    difficultyLowerCase() {
      return gameStore.state.difficulty.toLowerCase();
    },
    mathOps() {
      return gameStore.displayOps();
    },
    highScore() {
      return localStorage.saveData.sets[this.mathOps][this.difficultyLowerCase];
    },
    playedMoreThanOnce() {
      if (localStorage.saveData
        .sets[this.mathOps][this.difficultyLowerCase].timesFinished > 1) {
        return true;
      } return false;
    },
  },
  methods: {
    /**
     * Clear the current game, start a new game, and redisplay the countdown
     */
    refresh() {
      gameStore.clearGame();
      gameStore.createGame(this.$route.query.diff, this.$route.query.set);
      this.$parent.$parent.isCountdown = true;
    },
  },
  created() {
    /**
     * When the congrats screen first appears, check if the player has a new
     * high score in the difficulty/set.
     *
     * If it's a new high score, replace the old high score with the new one.
     * If the player never played the difficulty/set before, create save data
     * for the difficulty/set and insert the current score as the high score.
     */
    localStorage.saveData.recents = localStorage.saveData.recents
      .filter((item) => item !== this.mathOps);
    localStorage.saveData.recents.unshift(this.mathOps);
    if (Object.prototype.hasOwnProperty
      .call(localStorage.saveData.sets, this.mathOps)) {
      if (Object.prototype.hasOwnProperty
        .call(localStorage.saveData.sets[this.mathOps], this.difficultyLowerCase)) {
        localStorage.saveData
          .sets[this.mathOps][this.difficultyLowerCase].timesFinished += 1;
        if (Number(gameStore.state.currentTime)
         < localStorage.saveData.sets[this.mathOps][this.difficultyLowerCase]
           .highScore) {
          this.$parent.isHighScore = true;
          localStorage.saveData.sets[this.mathOps][this.difficultyLowerCase]
            .highScore = Number(gameStore.state.currentTime);
        } else {
          this.$parent.isNotHighScore = true;
        }
      } else {
        this.$parent.isNotHighScore = true;
        localStorage.saveData.sets[this.mathOps][this.difficultyLowerCase] = {};
        localStorage.saveData.sets[this.mathOps][this.difficultyLowerCase]
          .highScore = Number(gameStore.state.currentTime);
        localStorage.saveData.sets[this.mathOps][this.difficultyLowerCase]
          .timesFinished = 1;
      }
    } else {
      this.$parent.isNotHighScore = true;
      localStorage.saveData.sets[this.mathOps] = {};
      localStorage.saveData.sets[this.mathOps][this.difficultyLowerCase] = {};
      localStorage.saveData.sets[this.mathOps][this.difficultyLowerCase]
        .highScore = Number(gameStore.state.currentTime);
      localStorage.saveData.sets[this.mathOps][this.difficultyLowerCase]
        .timesFinished = 1;
    }
    localStorage.save();
  },
};
</script>

<style lang="scss" scoped>
.non-math-area {
  display: block;
  text-align: center;
}

.congrats {
  font-size: 11vmin;
  margin-top: 0;
  margin-bottom: 0.1em;
}

.diffIndicator {
  font-family: courier, serif;
  font-size: 5vmin;
  margin-top: 0.5em;
  margin-bottom: 0.1em;
}

.mathOps {
  font-family: courier, serif;
  font-size: 12vmin;
  opacity: 0.6;
  margin: 0 0 0.05em 0;
  letter-spacing: 0.5em;
  margin-right: -0.5em;
}

.results {
  font-size: 6vmin;
  line-height: 1.8;
  margin-bottom: 12px;
}

.highScoreCongrats {
  font-size: 6vmin;
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 12px;
}

.button-again {
  padding: 4.5% 10%;
  font-size: 6.5vmin;
  border-radius: 3vmin;
}

.pmargin {
  margin: calc(3px + 1.8vmin) 0;
}

@media (min-width: $mobile-boundary) and (min-height: $mobile-boundary) {
  .congrats {
    font-size: 8.5vmin;
  }

  .diffIndicator {
    font-size: 3vmin;
  }

  .mathOps {
    font-size: 6.9vmin;
  }

  .results {
    font-size: 4.6vmin;
  }

  .highScoreCongrats {
    font-size: 4.6vmin;
  }

  .button-again {
    font-size: 5vmin;
    border-radius: 2vmin;
  }

  .pmargin {
    margin: 3vmin 0;
  }
}
</style>
