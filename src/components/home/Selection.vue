<template>
<div style="width:100%;">
  <h2>Level <span class="header-help" v-on:click="$parent.onLevelExplanation = true;">
    ?</span></h2>
  <p class="level-indicator">
    <span class="level-unselected" v-bind:class="{'level-selected': level === 'simple'}"
    v-on:click="toggleLevel('simple')">Simple</span>
    <span class="level-unselected" v-bind:class="{'level-selected': level === 'standard'}"
    v-on:click="toggleLevel('standard')">Standard</span>
  </p>
  <h2>Operators (Tap to toggle)</h2>
  <div class="operators-container">
    <transition name="fade-fast" mode="out-in">
    <div class="selected-operators" v-if="titleView === 0" key="menu">
      <div class="small-circle-unselected"
      v-bind:class="{'small-circle-selected plus': operators.includes('+')}"
      v-on:click="toggleOperators('+')">+</div>
      <div class="small-circle-unselected"
      v-bind:class="{'small-circle-selected minus': operators.includes('−')}"
      v-on:click="toggleOperators('−')">−</div>
      <div class="small-circle-unselected"
      v-bind:class="{'small-circle-selected multiply': operators.includes('×')}"
      v-on:click="toggleOperators('×')">×</div>
      <div class="small-circle-unselected"
      v-bind:class="{'small-circle-selected divide': operators.includes('÷')}"
      v-on:click="toggleOperators('÷')">÷</div>
    </div>
    <div class="recents-pane" v-if="titleView === 1" key="recents">
      <div class="recents-buttons" v-if="recents[0]">
        <div class="big-circle-selected"
          v-bind:class="{'big-circle-unselected': getOperators('ops') !== recents[0]}"
          v-on:click="operatorOverride(recents[0])"
          v-if="recents[0]">
          <span v-html="displayRecents(0)[0]"></span>
          <span v-if="recents[0].length>2" v-html="displayRecents(0)[1]"></span>
        </div>
        <div class="big-circle-selected"
          v-bind:class="{'big-circle-unselected': getOperators('ops') !== recents[1]}"
          v-on:click="operatorOverride(recents[1])"
          v-if="recents[1]">
          <span v-html="displayRecents(1)[0]"></span>
          <span v-if="recents[1].length>2" v-html="displayRecents(1)[1]"></span>
        </div>
        <div class="big-circle-selected"
          v-bind:class="{'big-circle-unselected': getOperators('ops') !== recents[2]}"
          v-on:click="operatorOverride(recents[2])"
          v-if="recents[2]">
          <span v-html="displayRecents(2)[0]"></span>
          <span v-if="recents[2].length>2" v-html="displayRecents(2)[1]"></span>
        </div>
      </div>
      <div class="no-recents" v-else>
        No recents - you haven't finished a game yet!
      </div>
    </div>
    </transition>
  </div>
  <div class="operators-menu">
    <span><a v-on:click="toggleTitleView()">{{gameViewText}}</a></span>
  </div>
  <div>
  <router-link tag="button" class="start-button button-magenta"
    v-bind:class="{startDisabled: !startEnabled}"
    :disabled="!startEnabled" :to="{ path: '/game',
     query: { lvl: level, ops: getOperators('letters')}}">
      Start
  </router-link>
  </div>

  <div class="auxillary-buttons">
    <a v-on:click="$parent.onHelp = true;" title="Settings">
      <svg preserveAspectRatio="xMidYMid meet" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 31"><defs><clipPath id="clip0"><path d="M12 210 44 210 44 241 12 241Z" fill-rule="evenodd" clip-rule="evenodd"/></clipPath></defs><g clip-path="url(#clip0)" transform="translate(-12 -210)"><path d="M25.4506 219.189C21.9343 220.541 20.1794 224.487 21.5309 228.003 22.8825 231.52 26.8287 233.275 30.3451 231.923 33.8614 230.571 35.6163 226.625 34.2648 223.109 32.9132 219.592 28.967 217.838 25.4506 219.189ZM22.7315 212.115C23.2073 211.932 23.6869 211.776 24.1689 211.648L26.9212 215.036C27.7598 214.91 28.5998 214.934 29.4134 215.102L32.2906 211.91C33.289 212.164 34.2315 212.583 35.0884 213.155L34.6459 217.428C35.3155 217.92 35.8961 218.528 36.3639 219.235L40.7231 219.01C40.9509 219.453 41.1563 219.914 41.3392 220.39 41.522 220.865 41.678 221.345 41.806 221.827L38.418 224.579C38.5444 225.418 38.5202 226.258 38.3523 227.072L41.5435 229.949C41.29 230.947 40.8708 231.89 40.2993 232.747L36.0254 232.304C35.5337 232.974 34.9261 233.554 34.2187 234.022L34.4442 238.381C34.0005 238.609 33.54 238.814 33.0642 238.997 32.5884 239.18 32.1088 239.336 31.6268 239.464L28.8746 236.076C28.0359 236.203 27.1959 236.178 26.3823 236.01L23.505 239.202C22.5067 238.948 21.5642 238.529 20.7073 237.957L21.1498 233.684C20.4802 233.192 19.8997 232.584 19.4318 231.877L15.0726 232.102C14.8448 231.659 14.6394 231.198 14.4565 230.722 14.2736 230.247 14.1177 229.767 13.9897 229.285L17.3778 226.533C17.2513 225.694 17.2755 224.854 17.4434 224.04L14.2522 221.163C14.5057 220.165 14.9249 219.222 15.4964 218.365L19.7703 218.808C20.262 218.138 20.8696 217.558 21.577 217.09L21.3515 212.731C21.7952 212.503 22.2557 212.298 22.7315 212.115Z" stroke="currentColor" stroke-width="1.66667" stroke-miterlimit="8" fill="none" fill-rule="evenodd"/></g></svg>
    </a>
    <a v-on:click="$parent.onUpdatesScreen = true;" title="Stats">
      <svg preserveAspectRatio="xMidYMid meet" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 33 31"><defs><clipPath id="clip1"><path d="M8 175 41 175 41 206 8 206Z" fill-rule="evenodd" clip-rule="evenodd"/></clipPath></defs><g clip-path="url(#clip1)" transform="translate(-8 -175)"><rect x="10" y="183" width="10" height="22" stroke="currentColor" stroke-width="1.66667" stroke-miterlimit="8" fill="none"/><rect x="20" y="176" width="10" height="29" stroke="currentColor" stroke-width="1.66667" stroke-miterlimit="8" fill="none"/><rect x="30" y="190" width="10" height="15" stroke="currentColor" stroke-width="1.66667" stroke-miterlimit="8" fill="none"/></g></svg>
    </a>
  </div>
</div>
</template>

<script>
import localStorage from '@/stores/localStorage';

export default {
  data() {
    return {
      operators: [],
      level: '',
      titleView: 0,
      startEnabled: false,
      recents: localStorage.saveData.recents,
    };
  },
  created() {
    this.titleView = localStorage.saveData.titleView;
    this.operators = localStorage.saveData.savedSet;
    this.level = localStorage.saveData.difficulty;
  },
  computed: {
    gameViewText() {
      return this.titleView === 0 ? 'Recents' : 'Menu';
    },
  },
  watch: {
    operators(value) {
      localStorage.saveData.savedSet = value;
      this.startEnabled = !((value.length < 1));
      localStorage.save();
    },
    level(value) {
      localStorage.saveData.difficulty = value;
      localStorage.save();
    },
    titleView(value) {
      localStorage.saveData.titleView = value;
      localStorage.save();
    },
  },
  methods: {
    /**
     * Output the currently selected operators in a string format.
     * This is needed because operators are saved as strings instead of arrays
     * in localStorage, and the URL parameter for the operators has to be a string.
     * @param {string} format - ops to get exact operators, letters to get operators
     * in letter format. We need letter format for the URL parameter because the URL
     * doesn't like the actual plus sign as a parameter.
     * @returns {string} - The operators in string format
     */
    getOperators(format) {
      let computedOperators = '';
      if (this.operators.includes('+')) {
        computedOperators += format === 'letters' ? 'a' : '+';
      } if (this.operators.includes('−')) {
        computedOperators += format === 'letters' ? 's' : '−';
      } if (this.operators.includes('×')) {
        computedOperators += format === 'letters' ? 'm' : '×';
      } if (this.operators.includes('÷')) {
        computedOperators += format === 'letters' ? 'd' : '÷';
      }
      return computedOperators;
    },

    /**
     * Toggle an operator from the selected operators list
     * @param {string} operator - The operator to toggle
     */
    toggleOperators(operator) {
      if (this.operators.includes(operator)) {
        this.operators = this.operators.filter((item) => item !== operator);
      } else {
        this.operators.push(operator);
      }
    },

    /**
     * Specifically set the selected operators (typically from Recents)
     * @param {string} operators - The specific operators, all in one string
     */
    operatorOverride(ops) {
      const newOps = [];
      for (let i = 0; i < ops.length; i += 1) {
        newOps.push(ops.charAt(i));
      }
      this.operators = newOps;
    },

    /**
     * Toggle the game level
     * @param {string} level - The name of the level
     */
    toggleLevel(level) {
      this.level = level;
    },

    /**
     * Toggle the title view (menu or recents)
     * titleView = 0 is menu, titleView = 1 is recents
     */
    toggleTitleView() {
      this.titleView = (this.titleView === 0) ? 1 : 0;
    },

    /**
     * Display the recently used operators in a format that looks good in the big circle button.
     * @param {int} num - The array index of the operators in localStorage's recents array
     * @returns {array} - The formatted operators. More than three operators are split into two
     * parts so we can add an HTML line break between them
     */
    displayRecents(num) {
      const opsToWorkWith = this.recents[num];
      let opsArray;
      const opsArray2 = [];
      for (let i = 0; i < opsToWorkWith.length; i += 1) {
        if (opsToWorkWith.charAt(i) === '+') {
          opsArray2.push(`<span class="plus">${opsToWorkWith.charAt(i)}</span>`);
        } else if (opsToWorkWith.charAt(i) === '−') {
          opsArray2.push(`<span class='minus'>${opsToWorkWith.charAt(i)}</span>`);
        } else if (opsToWorkWith.charAt(i) === '×') {
          opsArray2.push(`<span class='multiply'>${opsToWorkWith.charAt(i)}</span>`);
        } else if (opsToWorkWith.charAt(i) === '÷') {
          opsArray2.push(`<span class='divide'>${opsToWorkWith.charAt(i)}</span>`);
        }
      }
      if (opsArray2.length <= 2) {
        opsArray = [opsArray2[0] + (opsArray2[1] ? opsArray2[1] : ''), ''];
      } else if (opsArray2.length >= 3) {
        opsArray = [opsArray2[0] + opsArray2[1], opsArray2[2] + (opsArray2[3] ? opsArray2[3] : '')];
      }
      return opsArray;
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  text-align: left;
  font-size: 5vmin;
  border-bottom: 0.2vmin solid var(--text-color);
  margin: 0 auto 3vh auto;
  padding: 0 0 0 0.6em;
  width: 90%;
}

.header-help {
  @extend %flex-center;
  display: inline-flex;
  margin-left: 0.3em;
  border-radius: 50%;
  background: #e0e0e0;
  width: 5.65vmin;
  font-size: 80%;
  cursor: pointer;
}

.level-indicator {
  margin: 0 0 4vh 0;
}

.level-indicator span {
  margin: 0 0.5em;
  padding: 0.1em 0.6em;
  border-radius: 0.5em;
  cursor: pointer;
  transition: background-color $transition-time;
}

.level-unselected:hover {
  background-color: #f0f0f0;
}

.level-selected {
  background-color: #e0e0e0;
}

.level-selected:hover {
  background-color: #d0d0d0;
}

.operators-container {
  @extend %flex-center;
  margin: 0 0 3vh 0;
  height: 18.5vmin;
}

.selected-operators {
  font-size: 13vmin;
  line-height: 1.2;
  font-weight: 700;
  color: rgba(0,0,0,0.15);
}

.small-circle-unselected {
  margin: 0 0.15em;
  background-color: none;
  border-radius: 50%;
  width: 1.19em;
  cursor: pointer;
  user-select: none;
}

.small-circle-unselected:hover {
  background-color: #f0f0f0;
}

.small-circle-selected {
  background-color: #e0e0e0;
}

.small-circle-selected:hover {
  background-color: #d0d0d0;
}

.recents-pane {
  @extend %flex-center;
}

.recents-buttons, .no-recents {
  display: flex;
}

.no-recents {
  margin: 0.6em 1em;
}

.big-circle-selected {
  border-radius: 50%;
  font-size: 190%;
  line-height: 0.65;
  width: 18.5vmin;
  height: 18.5vmin;
  @extend %flex-center;
  font-weight: 700;
  margin: 0 0.25em;
  cursor: pointer;
  background-color: #e0e0e0;
}

.big-circle-selected:hover {
  background-color: #d0d0d0;
}

.operators-menu, .selected-operators {
  display: flex;
  align-items: center;
  justify-content: center;
}

.operators-menu span {
  margin: 0 1em;
}

.start-button {
  margin-top: 4vh;
  border-radius: 4vmin;
  padding: 2vmin 7vmin;
  font-size: 10vmin;
}

.startDisabled {
  cursor: not-allowed;
  background-color: #d8c3d0;
  box-shadow: 0px 0px !important;
  transition: none;
}

.startDisabled:hover {
  background-color: #d8c3d0;
}

.startDisabled:active {
  background-color: #d8c3d0;
  transform: none;
}

.auxillary-buttons {
  margin-top: 7vh;
}

.auxillary-buttons a {
  margin: 0 0.75em;
}

.auxillary-buttons svg {
  height: calc(9px + 4vmin);
}

@media (min-width: $mobile-boundary) and (min-height: $mobile-boundary) {
  h2 {
    font-size: calc(5vmin * 0.6);
    border-bottom: 0.12vmin solid var(--text-color);
  }

  .header-help {
    width: 3.24vmin;
  }

  .operators-container {
    height: 11vmin;
  }

  .selected-operators {
    font-size: calc(13vmin * 0.6);
  }

  .start-button {
    border-radius: 2vmin;
    padding: 1.2vmin 4.5vmin;
    font-size: 6vmin;
  }

  .big-circle-selected {
    width: 11vmin;
    height: 11vmin;
  }
}

@media (max-width: 479px) and (min-aspect-ratio: 2/3) {
  h2 {
    margin: 0 auto 2.5vh auto;
  }
  .level-indicator {
    margin: 0 0 3vh 0;
  }
  .operators-container {
    margin: 0 0 2.5vh 0;
  }
  .start-button {
    margin-top: 0.55em;
    padding-top: 1.3vmin;
    padding-bottom: 1.3vmin;
  }
  .auxillary-buttons {
    margin-top: 5vh;
  }
}
</style>
