<template>
  <div class="main-game">
    <div class="HUD-wrapper">
      <div class="HUD">
        <div class="gauge">
          <div class="percent-complete">{{Math.round(store.numberOfProblemsSolved
            /store.numberOfProblems*100)}}% complete</div>
          <div class="active-gauge" v-bind:style="{width: (store.numberOfProblemsSolved
            /store.numberOfProblems*100)+'%'}"></div>
        </div>
        <div class="current-game-stats">
          <div class="score-meter">
            {{store.numberOfProblems-store.numberOfProblemsSolved}} left</div>
          <div class="home-area-outside">
            <router-link class="home-area" to="/">
                <img class="home-button" alt="home-button" src="../../assets/home-button.png">
            </router-link>
          </div>
          <div class="timer-area-outside">
            <span class="timer-area" v-bind:class="{gold: isHighScore, silver: isNotHighScore}">
              {{store.currentTime}} s</span>
          </div>
        </div>
      </div>
    </div>
    <div class="problem-area-grid">
      <div class="problem-area">
        <MathProblems v-if="store.numberOfProblems !== store.numberOfProblemsSolved"/>
        <Congrats v-else/>
      </div>
    </div>
    <div class="blank-space"></div>
  </div>
</template>

<script>
import MathProblems from '@/components/game/MathProblems.vue';
import Congrats from '@/components/game/Congrats.vue';
import gameStore from '@/stores/gameStore';

export default {
  data() {
    return {
      store: gameStore.state,
      isHighScore: false,
      isNotHighScore: false,
    };
  },
  components: {
    MathProblems,
    Congrats,
  },
  mounted() {
    gameStore.startTimer();
  },
};
</script>

<style lang="scss" scoped>
.main-game {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr 5%;
}

/* HUD-wrapper is needed to work around a Chrome bug
that happens when resizing the browser window. */
.HUD-wrapper {
  width: 100%;
}

.HUD {
  margin: 0 auto;
  width: 90%;
}

.gauge {
  background-color: var(--gauge-bg);
  margin: 16px 0 15px 0;
  height: 30px;
  border-radius: 10px;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,.2);
  display: flex;
  align-items: center;
}

.active-gauge {
  background-color: var(--active-gauge);
  height: 30px;
  width: 0%;
  border-radius: 10px;
  transition: width 0.18s ease-out;
}

.percent-complete {
  color: #fafafa;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 17px;
}

.current-game-stats {
  width: 92%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 16% 1fr;
}

.score-meter {
  font-size: 8vmin;
  padding-left: 10px;
}

.home-area-outside {
  @extend %flex-center;
}

.home-area {
  cursor: pointer;
  opacity: 0.25;
  display: inline-flex;
  align-items: flex-end;
  transition:opacity 0.12s;
}

.home-area:hover {
  opacity: 1;
}

.home-button {
  height: 6.5vmin;
}

.timer-area-outside {
  text-align: right;
  font-size: 8vmin;
  white-space: nowrap;
}

.timer-area {
  border-radius: 15px;
  transition: background-color 0.5s;
  padding: 0 10px;
}

.problem-area-grid {
  display: flex;
}

.problem-area {
  margin: auto;
  position: relative;
}

.gold {
  background-color: var(--gold);
}

.silver {
  background-color: var(--silver);
}

@media (min-width: $mobile-boundary) and (min-height: $mobile-boundary) {
  .score-meter, .timer-area-outside {
    font-size: 6.15vmin;
  }

  .home-button {
    height: 5vmin;
  }

}

@media (min-width: 1000px) and (min-height: 700px) {
  .gauge {
    margin: 24px 0 15px 0;
    height: 36px;
  }

  .active-gauge {
    height: 36px;
  }

  .percent-complete {
    font-size: 20px;
  }
}

@media (min-width: 1200px) {
  .HUD {
    width: 1080px;
  }
}

@media (min-width: 1000px) and (min-height: 950px) {
  .gauge {
    margin: 40px 0 25px 0;
    height: 50px;
    border-radius: 18px;
  }

  .active-gauge {
    height: 50px;
    border-radius: 18px;
  }

  .percent-complete {
    font-size: 28px;
  }
}

@media (min-width: 1000px) and (min-height: 1220px) {
  .score-meter, .timer-area-outside {
    font-size: 75px;
  }

  .home-button {
    height: 61px;
  }
}
</style>
