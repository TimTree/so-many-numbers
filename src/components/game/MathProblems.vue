<template>
  <div class="math-problems">
    <transition name="encourage">
    <div class="encouragement" v-if="showEncouragement">
      <span class="encouragement-words">{{store.numberOfProblems-store.numberOfProblemsSolved}}
      left{{ !onFinalFew ? ` - ${this.timestamp} s` : ``}}</span>
    </div>
    </transition>
    <div class="set1">
      <div class="expression1">{{store.expressions[store.numberOfProblemsSolved-2]}} </div>
      <div class="solution1">{{store.solutions[store.numberOfProblemsSolved-2]}}</div>
    </div>
    <div class="set2">
      <div class="expression2">{{store.expressions[store.numberOfProblemsSolved-1]}} </div>
      <div class="solution2">{{store.solutions[store.numberOfProblemsSolved-1]}}</div>
    </div>
    <div class="set3" v-bind:class="{pulsed: isCorrect}">
      <div class="expression3">{{store.expressions[store.numberOfProblemsSolved]}} </div>
      <div>
        <input v-bind:class="{green: isCorrect, red: isWrong}" v-model="answer" ref="focusHere"
         class="math-box" autocomplete="off"
         maxlength="3" type="tel" novalidate>
      </div>
    </div>
    <div class="set4">
      <div class="expression4">{{store.expressions[store.numberOfProblemsSolved+1]}}</div>
      <div class="solution4"></div>
    </div>
    <div class="set5">
      <div class="expression5">{{store.expressions[store.numberOfProblemsSolved+2]}}</div>
      <div class="solution5"></div>
    </div>
  </div>
</template>

<script>
import gameStore from '@/stores/gameStore';

export default {
  data() {
    return {
      store: gameStore.state,
      answer: '',
      isCorrect: false,
      isWrong: false,
      showEncouragement: false,
      onFinalFew: false,
      timestamp: '',
    };
  },
  watch: {
    /**
     * When the player enters text to the input box, check if the box contains
     * the current solution.
     *
     * If the box contains the solution, increment the number of problems solved
     * and run a pulse animation.
     * Then, display the encouragement marker depending on what number problem
     * the player is on.
     * If the box does not contain the solution, start a hidden timer. After
     * a certain amount of time, highlight the input box red to inform the player
     * it's the wrong solution.
     */
    answer() {
      this.isWrong = false;
      clearTimeout(this.wrongTimeout);
      if (Number(this.answer) === this.store.solutions[this.store.numberOfProblemsSolved]
      && this.answer.length > 0) {
        this.store.numberOfProblemsSolved += 1;
        this.answer = '';
        this.isCorrect = true;
        this.correctTimeout = setTimeout(() => { this.isCorrect = false; }, 100);
        if (this.store.numberOfProblemsSolved === gameStore.getOneThird()) {
          document.body.classList.add('oneThird');
          this.timestamp = this.store.currentTime;
          this.showEncouragement = true;
          this.fadeTimeout1 = setTimeout(() => { this.showEncouragement = false; }, 800);
        } else if (this.store.numberOfProblemsSolved === gameStore.getTwoThirds()) {
          document.body.classList.add('twoThirds');
          this.timestamp = this.store.currentTime;
          this.showEncouragement = true;
          this.fadeTimeout2 = setTimeout(() => { this.showEncouragement = false; }, 800);
        } else if (this.store.numberOfProblemsSolved === gameStore.getNineTenth()) {
          document.body.classList.add('almost');
          this.onFinalFew = true;
          this.showEncouragement = true;
        }
      } else if (this.answer.length > 0) {
        this.wrongTimeout = setTimeout(() => { this.isWrong = true; }, 1200);
      }
    },
  },
  mounted() {
    this.$refs.focusHere.focus();
  },
  beforeDestroy() {
    gameStore.stopTimer();
    document.body.classList.remove('oneThird', 'twoThirds', 'almost');
  },
  destroyed() {
    clearTimeout(this.correctTimeout);
    clearTimeout(this.fadeTimeout1);
    clearTimeout(this.fadeTimeout2);
    clearTimeout(this.wrongTimeout);
  },
};
</script>

<style lang="scss" scoped>
.math-problems {
  text-align: center;
  font-size: 13vmin;
}

.set1, .set5 {
  transform: scale(0.65);
  opacity: 0.13;
}

.set2, .set4 {
  transform: scale(0.9);
  opacity: 0.26;
}

.set3 {
  transform: scale(1);
  transition: transform 0.1s;
}

.set1, .set2, .set3, .set4, .set5 {
  padding-bottom: 0.08em;
}

.set1 *, .set2 *, .set3 *, .set4 *, .set5 * {
  display: inline-block;
}

.math-box {
  text-align: center;
  width: 2em;
  margin: 0;
  padding: 1px;
  background-color: var(--math-box-bg);
  color: var(--text-color);
  border: 1px solid var(--math-box-border);
  font-size: inherit;
  font-family: inherit;
  transition: background-color 0.15s;
}

.math-box:focus {
  outline: none;
  border-color: var(--math-box-focus-border);
  box-shadow: 0 0 6px var(--math-box-focus-border-shadow);
}

.green:focus {
  outline: none;
  border-color: var(--math-box-focus-green-border);
  box-shadow: 0 0 9px var(--math-box-focus-green-border-shadow);
}

.red {
  background-color: var(--math-box-wrong);
}

.pulsed {
  transform: scale(1.05);
}

.encouragement {
  text-align: center;
  font-size: 8vmin;
  position: absolute;
  left: 50%;
  top: 23%;
  transform: translateX(-50%);
  z-index: 2;
  color: var(--text-color);
  transition: opacity 0.75s;
  width: 90vw;
}

.encouragement-words {
  background-color: var(--encouragement-bg);
  border-radius: 12px;
  padding: 4px 15px;
}

.encourage-leave-active {
  transition:opacity .75s;
}

.encourage-leave-to {
  opacity: 0;
}

.expression1, .expression2, .expression3 {
  white-space: pre;
}

@media (min-width: $mobile-boundary) and (min-height: $mobile-boundary) {
  .math-problems {
    font-size: 10vmin;
  }

  .encouragement {
    font-size: 6.15vmin;
  }
}

@media (min-width: 1000px) and (min-height: 950px) {
  .encouragement-words {
    border-radius: 20px;
  }
}
</style>
