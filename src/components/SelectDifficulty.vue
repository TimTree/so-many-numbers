<template>
<div style="text-align:center;width:100%;">
  <div v-if="!mobileHelp">
    <transition name="fade05" appear>
      <div>
        <h1>Select Difficulty</h1>
          <button class="diff-button button-magenta" v-on:click="changeDifficulty('simple')"
            v-on:mouseover="hoverSimple = true" v-on:mouseleave="hoverSimple = false"
           >Simple</button>
          <button class="diff-button button-magenta" v-on:click="changeDifficulty('standard')"
            v-on:mouseover="hoverStandard = true" v-on:mouseleave="hoverStandard = false"
           >Standard</button>
           <div class="diff-description" v-bind:class="{visible: hoverSimple || hoverStandard}">
            <span v-if="hoverSimple">Play with a basic set of problems.</span>
            <span v-if="hoverStandard">Play with a wider variety of problems.</span>
            <span style="display:inline-block;" v-else></span>
            <p class='diff-examples extra-space'>
              <span v-if="hoverSimple">
                <span>6+3 5×4 7+7 6×2</span>
              </span>
              <span v-if="hoverStandard">
                <span>6+3 5×4 16+17 11×12</span>
              </span>
              <span style="display:inline-block;" v-else></span>
            </p>
          </div>
          <div class="diff-qmark">
            <button class="small-circle button-purple"
              v-on:click="mobileHelp = true;">?
            </button>
          </div>
        </div>
      </transition>
    </div>
    <div class="help-popup" v-if="mobileHelp">
    <transition name="fade05" appear>
    <div>
    <p>
      <b>Simple</b>: Play with a basic set of problems.
    </p>
    <p class="extra-space">
      6+3 5×4 7+7 6×2
    </p>
    <p>
      <b>Standard</b>: Play with a wider variety of problems.
    </p>
    <p class="extra-space">
      6+3 5×4 16+17 11×12
    </p>
    <p>
    <button class="normal-button button-orange"
      v-on:click="mobileHelp = false;">Go back</button>
    </p>
    </div>
    </transition>
    </div>
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

.extra-space {
  word-spacing:0.52em;
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
