<template>
  <div class="non-math-area">
    <p class="congrats">Congrats!</p>
    <p class="diffIndicator">{{difficulty}}</p>
    <p class="mathOps">{{mathOps}}</p>
    <div class="results">
      <div>Your score: {{store.currentTime}} seconds</div>
      <div>High score: {{highScore.highScore}} seconds</div>
    </div>
    <transition name="fade" appear>
      <div class="buttons-div">
        <p class="pmargin">
          <button class="button-again" v-on:click="refresh">Play Again</button>
        </p>
        <p class="pmargin">
          <router-link class="home-area" to="/">
            <button class="button-again">Main Menu</button>
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
      return localStorage.saveData.ops[this.mathOps][this.difficultyLowerCase];
    },
  },
  methods: {
    refresh() {
      gameStore.clearGame();
      gameStore.createGame(this.$route.query.diff, this.$route.query.ops);
      this.$parent.$parent.isCountdown = true;
    },
  },
  created() {
    localStorage.saveData.recents = localStorage.saveData.recents
      .filter(item => item !== this.mathOps);
    localStorage.saveData.recents.unshift(this.mathOps);
    if (Object.prototype.hasOwnProperty
      .call(localStorage.saveData.ops, this.mathOps)) {
      if (Object.prototype.hasOwnProperty
        .call(localStorage.saveData.ops[this.mathOps], this.difficultyLowerCase)) {
        localStorage.saveData
          .ops[this.mathOps][this.difficultyLowerCase].timesFinished += 1;
        if (Number(gameStore.state.currentTime)
         < localStorage.saveData.ops[this.mathOps][this.difficultyLowerCase]
           .highScore) {
          this.$parent.isHighScore = true;
          localStorage.saveData.ops[this.mathOps][this.difficultyLowerCase]
            .highScore = Number(gameStore.state.currentTime);
        } else {
          this.$parent.isNotHighScore = true;
        }
      } else {
        this.$parent.isHighScore = true;
        localStorage.saveData.ops[this.mathOps][this.difficultyLowerCase] = {};
        localStorage.saveData.ops[this.mathOps][this.difficultyLowerCase]
          .highScore = Number(gameStore.state.currentTime);
        localStorage.saveData.ops[this.mathOps][this.difficultyLowerCase]
          .timesFinished = 1;
      }
    } else {
      this.$parent.isHighScore = true;
      localStorage.saveData.ops[this.mathOps] = {};
      localStorage.saveData.ops[this.mathOps][this.difficultyLowerCase] = {};
      localStorage.saveData.ops[this.mathOps][this.difficultyLowerCase]
        .highScore = Number(gameStore.state.currentTime);
      localStorage.saveData.ops[this.mathOps][this.difficultyLowerCase]
        .timesFinished = 1;
    }
    localStorage.save();
  },
};
</script>

<style scoped>
.non-math-area {
  display:block;
  text-align:center;
}

.congrats {
  font-size:11vmin;
  margin-top:0;
  margin-bottom:0.1em;
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

.results {
  font-size:6vmin;
  line-height:1.8;
  margin-bottom:12px;
}

.button-again {
    border: none;
    padding: 4.5% 8%;
    font-size: 6.5vmin;
    text-align: center;
    cursor: pointer;
    outline: none;
    color: #fff;
    background-color: #b23681;
    border: none;
    border-radius:3vmin;
    box-shadow: 0 1.5vmin #999;
    transition:background-color 0.15s, transform 0.15s, box-shadow 0.15s;;
    font-family:'noto sans',sans-serif;
}

.button-again:hover {
  background-color:#e86198;
}

.button-again:active {
  box-shadow: 0 0.5vmin #999;
  transform: translateY(1vmin);
}

.fade-enter-active {
  transition: opacity .7s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.pmargin {
  margin:calc(3px + 1.8vmin);
}

@media (min-width: 420px) and (min-height: 420px) {
  .congrats {
    font-size:8.5vmin;
  }

  .diffIndicator {
    font-size:3vmin;
  }

  .mathOps {
    font-size:6.9vmin;
  }

  .results {
    font-size:4.6vmin;
  }

  .button-again {
    font-size:5vmin;
    border-radius:2vmin;
    box-shadow: 0 1vmin #999;
  }

  .pmargin {
    margin:3vmin;
  }
}
</style>
