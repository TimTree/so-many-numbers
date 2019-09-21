<template>
<div style="text-align:center;width:100%;">
  <div v-if="!mobileHelp">
    <transition name="fade05" appear>
      <div>
        <h1>Select Difficulty</h1>
          <button class="diff-button button-magenta" v-on:click="changeDifficulty('simple')"
            v-on:mouseover="hoverSimple = true" v-on:mouseleave="hoverSimple = false"
            ontouchstart>Simple</button>
          <button class="diff-button button-magenta" v-on:click="changeDifficulty('standard')"
            v-on:mouseover="hoverStandard = true" v-on:mouseleave="hoverStandard = false"
            ontouchstart>Standard</button>
           <div class="diff-description" v-bind:class="{visible: hoverSimple || hoverStandard}">
            <span v-if="hoverSimple">Play with a basic set of problems.</span>
            <span v-if="hoverStandard">Play with a wider variety of problems.</span>
            <span v-else>&nbsp;</span>
            <p class='diff-examples'>
              <span v-if="hoverSimple">
                6+3 &nbsp; 5×4 &nbsp; 7+7 &nbsp; 6×2
              </span>
              <span v-if="hoverStandard">
                6+3 &nbsp; 5×4 &nbsp; 16+17 &nbsp; 11×12
              </span>
              <span v-else>&nbsp;</span>
            </p>
          </div>
          <div class="diff-qmark">
            <button class="small-circle button-purple"
              v-on:click="mobileHelp = true;" ontouchstart>?
            </button>
          </div>
          <p class='note' v-if="firstRun">You can always change the difficulty later.</p>
        </div>
      </transition>
    </div>
  <transition name="fade05" appear>
    <div class="help-popup" v-if="mobileHelp">
    <p>
      <b>Simple</b>: Play with a basic set of problems.
    </p>
    <p>
      6+3 &nbsp; 5×4 &nbsp; 7+7 &nbsp; 6×2
    </p>
    <p>
      <b>Standard</b>: Play with a wider variety of problems.
    </p>
    <p>
      6+3 &nbsp; 5×4 &nbsp; 16+17 &nbsp; 11×12
    </p>
    <p>
    <button class="normal-button button-orange"
      v-on:click="mobileHelp = false;" ontouchstart>Go back</button>
    </p>
    </div>
  </transition>
</div>
</template>

<script>
import localStorage from '@/stores/localStorage';

export default {
  data() {
    return {
      hoverSimple: false,
      hoverStandard: false,
      mobileHelp: false,
    };
  },
  computed: {
    firstRun() {
      if (localStorage.saveData.difficulty === '') {
        return true;
      }
      return false;
    },
  },
  methods: {
    changeDifficulty(diff) {
      localStorage.saveData.difficulty = diff;
      this.$parent.onSelectDifficulty = false;
      localStorage.save();
    },
  },
};

</script>

<style scoped>
h1 {
  font-weight:400;
  font-size:7vmin;
  margin:0;
}

.diff-button {
  border-radius:4vmin;
  padding:2vmin 7vmin;
  font-size:7.5vmin;
  margin:0.75em 0.18em 0 0.18em;
}

.diff-description {
  margin:7vmin 0;
  font-size:calc(10px + 2.2vmin);
  opacity:0;
  transition:opacity 0.12s;
  display:none;
}

.diff-examples {
  font-size:calc(12px + 4vmin);
  letter-spacing:0.1em;
}

.diff-qmark {
  margin:7vmin;
  font-size:calc(12px + 8vmin);
}
.visible {
  opacity:1;
}

.note {
  font-size:calc(8px + 1.5vmin);
}

.help-popup {
  font-size:6vmin;
  width:90%;
  margin:0 auto;
}

@media (min-width: 420px) and (min-height: 420px) {
  h1 {
    font-weight:400;
    font-size:calc(10px + 3.2vmin);
  }
  .diff-button {
    border-radius:2vmin;
    padding:1.2vmin 4.5vmin;
    font-size:5vmin;
  }
  .diff-description {
    display:block;
  }
  .diff-qmark {
    display:none;
  }

}
</style>
