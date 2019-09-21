<template>
<div style="text-align:center;">
<transition name="fade05" appear>
<div>
  <p class="difficulty-indicator">
    <b>{{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}}</b> Difficulty
     <a v-on:click="$parent.onSelectDifficulty = true;">(Change)</a>
  </p>
  <h1>Select Set</h1>

  <div class="set-pane" v-show="!onRecents">
    <div class="set-buttons">
      <button class="small-circle button-greenUnselected"
       v-bind:class="{'button-greenSelected': isPlus}"
       v-on:click="addPlus()" ontouchstart>+</button>
      <button class="small-circle button-greenUnselected"
       v-bind:class="{'button-greenSelected': isMinus}"
       v-on:click="addMinus()" ontouchstart>−</button>
      <button class="small-circle button-greenUnselected"
       v-bind:class="{'button-greenSelected': isMultiply}"
       v-on:click="addMultiply()" ontouchstart>×</button>
      <button class="small-circle button-greenUnselected"
       v-bind:class="{'button-greenSelected': isDivide}"
       v-on:click="addDivide()" ontouchstart>÷</button>
    </div>
    <div ontouchstart>
      <router-link tag="button" class="start-button button-magenta"
       v-bind:class="{startDisabled: !startEnabled}"
       :disabled="!startEnabled" :to="{ path: '/game', query: { diff: difficulty, set: getSet }}">
          Start
      </router-link>
    </div>
  </div>

  <button class="set-switcher" ontouchstart
   v-on:click="toggleRecents()">{{setSwitcherText}}</button>

  <div class="recents-pane" v-show="onRecents">
    <div class="recents-buttons" v-if="recentSets[0]">
      <div style="display:flex;" ontouchstart>
      <router-link v-if="recentSets[0]" tag="button" class="circle button-magenta"
       :to="{ path: '/game', query: { diff: difficulty, set: recentSetsToChars(0) }}">
       {{displayRecentSets(0)[0]}}<br v-if="recentSets[0].length>2" />
       <span v-if="recentSets[0].length>2">{{displayRecentSets(0)[1]}}</span>
      </router-link>
        <router-link v-if="recentSets[1]" tag="button" class="circle button-magenta"
       :to="{ path: '/game', query: { diff: difficulty, set: recentSetsToChars(1) }}">
       {{displayRecentSets(1)[0]}}<br v-if="recentSets[1].length>2" />
       <span v-if="recentSets[1].length>2">{{displayRecentSets(1)[1]}}</span>
      </router-link>
      <router-link v-if="recentSets[2]" tag="button" class="circle button-magenta"
       :to="{ path: '/game', query: { diff: difficulty, set: recentSetsToChars(2)}}">
        {{displayRecentSets(2)[0]}}<br v-if="recentSets[2].length>2" />
       <span v-if="recentSets[2].length>2">{{displayRecentSets(2)[1]}}</span>
      </router-link>
      </div>
    </div>
    <div class="no-recents" v-else>
      You haven't finished any sets yet!
    </div>
  </div>

  <div class="auxillary-buttons">
    <a v-on:click="$parent.onHelp = true;">Help</a>
  </div>
</div>
</transition>
</div>
</template>

<script>
import localStorage from '@/stores/localStorage';

export default {
  data() {
    return {
      isPlus: false,
      isMinus: false,
      isMultiply: false,
      isDivide: false,
      startEnabled: false,
      onRecents: false,
      recentSets: localStorage.saveData.recents,
    };
  },
  created() {
    if (localStorage.saveData.titleView === 0) {
      this.onRecents = false;
    } else {
      this.onRecents = true;
    }
    if (localStorage.saveData.savedSet.includes('+')) {
      this.isPlus = true;
    }
    if (localStorage.saveData.savedSet.includes('−')) {
      this.isMinus = true;
    }
    if (localStorage.saveData.savedSet.includes('×')) {
      this.isMultiply = true;
    }
    if (localStorage.saveData.savedSet.includes('÷')) {
      this.isDivide = true;
    }
    this.updateButtonStatus();
  },
  computed: {
    getSet() {
      let computedSet = '';
      if (this.isPlus) {
        computedSet += 'a';
      } if (this.isMinus) {
        computedSet += 's';
      } if (this.isMultiply) {
        computedSet += 'm';
      } if (this.isDivide) {
        computedSet += 'd';
      }
      return computedSet;
    },
    setSwitcherText() {
      if (!this.onRecents) {
        return 'Recents\xa0\xa0▾';
      }
      return 'Menu\xa0\xa0▴';
    },
    difficulty() {
      if (localStorage.saveData.difficulty) {
        return localStorage.saveData.difficulty;
      }
      return 'standard';
    },
  },
  methods: {
    /**
     * The following four functions toggle their respective operators.
     *
     * I probably could condense these functions into one if I had more
     * time to figure it out.
     */
    addPlus() {
      if (this.isPlus) {
        this.isPlus = false;
        localStorage.saveData.savedSet = localStorage.saveData.savedSet
          .filter(item => item !== '+');
      } else {
        this.isPlus = true;
        localStorage.saveData.savedSet.push('+');
      }
      this.updateButtonStatus();
      localStorage.save();
    },
    addMinus() {
      if (this.isMinus) {
        this.isMinus = false;
        localStorage.saveData.savedSet = localStorage.saveData.savedSet
          .filter(item => item !== '−');
      } else {
        this.isMinus = true;
        localStorage.saveData.savedSet.push('−');
      }
      this.updateButtonStatus();
      localStorage.save();
    },
    addMultiply() {
      if (this.isMultiply) {
        this.isMultiply = false;
        localStorage.saveData.savedSet = localStorage.saveData.savedSet
          .filter(item => item !== '×');
      } else {
        this.isMultiply = true;
        localStorage.saveData.savedSet.push('×');
      }
      this.updateButtonStatus();
      localStorage.save();
    },
    addDivide() {
      if (this.isDivide) {
        this.isDivide = false;
        localStorage.saveData.savedSet = localStorage.saveData.savedSet
          .filter(item => item !== '÷');
      } else {
        this.isDivide = true;
        localStorage.saveData.savedSet.push('÷');
      }
      this.updateButtonStatus();
      localStorage.save();
    },

    /**
     * Check if there are selected operators for the set.
     * If there are, make the start button appear bold.
     * If not, subdue the start button.
     */
    updateButtonStatus() {
      if (!this.isPlus && !this.isMinus && !this.isMultiply && !this.isDivide) {
        this.startEnabled = false;
      } else {
        this.startEnabled = true;
      }
    },

    /**
     * Toggle the title view (menu or recents)
     * Also save the current view state to localStorage
     */
    toggleRecents() {
      if (!this.onRecents) {
        this.onRecents = true;
        localStorage.saveData.titleView = 1;
        localStorage.save();
      } else {
        this.onRecents = false;
        localStorage.saveData.titleView = 0;
        localStorage.save();
      }
    },

    /**
     * Display the recent set in a format that looks good in the big circle button.
     * @param {int} num - The array index of the set in localStorage's recents array
     * @returns {string} - The formatted set. Sets with more than three operators are
     * split into two parts so we can add an HTML line break between them
     */
    displayRecentSets(num) {
      const opsToWorkWith = this.recentSets[num];
      let opsArray;
      if (opsToWorkWith.length < 3) {
        opsArray = [opsToWorkWith, ''];
      } else if (opsToWorkWith.length === 3) {
        opsArray = [opsToWorkWith.substring(0, 2), opsToWorkWith.substring(2)];
      } else {
        opsArray = [opsToWorkWith.substring(0, 2), opsToWorkWith.substring(2, 4)];
      }
      return opsArray;
    },

    /**
     * The query string for sets are expressed in letters instead of the actual operators.
     * Since localStorage holds the actual operators, we need to convert them to letter
     * format so the Recents buttons can properly process the sets.
     * @param {int} num - The array index of the set in localStorage's recents array
     * @returns {string} - The set expressed in letters
     */
    recentSetsToChars(num) {
      const opsToWorkWith = this.recentSets[num];
      let charOutput = '';
      const dict = {
        '+': 'a',
        '−': 's',
        '×': 'm',
        '÷': 'd',
      };
      for (let i = 0; i < opsToWorkWith.length; i += 1) {
        charOutput += dict[opsToWorkWith[i]];
      }
      return charOutput;
    },
  },
};
</script>

<style scoped>
.difficulty-indicator {
  margin-top:0;
  font-size:5vmin;
}

h1 {
  font-weight:400;
  font-size:7vmin;
  margin:0;
}

.set-buttons {
  margin-top:1.2em;
  display:block;
}

.recents-buttons, .no-recents {
  margin-top:7vmin;
  margin-bottom:1vmin;
  display:flex;
}

.no-recents {
  font-size:calc(10px + 2.2vmin);
}

.start-button {
  margin-top:0.75em;
  border-radius:4vmin;
  padding:2vmin 7vmin;
  font-size:10vmin;
}

.startDisabled {
  cursor: not-allowed;
  background-color:#d8c3d0;
  box-shadow: 0px 0px !important;
  transition:none;
}

.startDisabled:hover {
  background-color:#d8c3d0;
}

.startDisabled:active {
  background-color:#d8c3d0;
  transform:none;
}

.set-switcher {
  background-color: #c2a230;
  border-radius:8vmin;
  padding:0.4vmin 6vmin;
  font-size:5vmin;
  margin-top:1.2em;
}

.set-switcher:hover {
  background-color:#b39529;
}

.auxillary-buttons {
  margin-top:7vh;
  font-size:calc(10px + 2.2vmin);
}

.recents-pane {
  display:flex;
  align-items:center;
  justify-content:center;
}

@media (min-width: 420px) and (min-height: 420px) {
  .difficulty-indicator {
    margin-top:0;
    font-size:3vmin;
  }
  h1 {
    font-weight:400;
    font-size:calc(10px + 3.2vmin);
  }
  .start-button {
    border-radius:2vmin;
    padding:1.2vmin 4.5vmin;
    font-size:6vmin;
  }
  .set-switcher {
    border-radius:8vmin;
    padding:0.4vmin 4vmin;
    font-size:calc(5px + 2.6vmin);
  }
}

@media (max-height: 520px) {
  .set-buttons {
    margin-top:0.75em;
  }
  .start-button {
    margin-top:0.75em;
    padding-top:1.2vmin;
    padding-bottom:1.2vmin;
  }
  .set-switcher {
    margin-top:1em;
  }
  .auxillary-buttons {
    margin-top:4vh;
  }
}

@media (min-height: 800px) {
  .difficulty-indicator {
    margin-bottom:1.8em;
  }
  .auxillary-buttons {
    margin-top:7vh;
  }
}
</style>
