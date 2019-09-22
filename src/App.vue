<template>
  <div id="app" class="bodyBG" v-bind:class="{homeColor:isHome,
   gameColor:isGame,
   oneThird: isOneThird,
   twoThirds: isTwoThirds,
    almost: isAlmost}">
    <router-view/>
  </div>
</template>

<script>
import localStorage from '@/stores/localStorage';
import gameStore from '@/stores/gameStore';

export default {
  data() {
    return {
      store: gameStore.state,
      isHome: false,
      isGame: false,
    };
  },
  created() {
    localStorage.configureSaveData();
  },
  computed: {
    isOneThird() {
      if (this.store.numberOfProblemsSolved >= gameStore.getOneThird()
      && this.store.numberOfProblemsSolved < gameStore.getTwoThirds()) {
        return true;
      }
      return false;
    },
    isTwoThirds() {
      if (this.store.numberOfProblemsSolved >= gameStore.getTwoThirds()
       && this.store.numberOfProblemsSolved < gameStore.getNineTenth()) {
        return true;
      }
      return false;
    },
    isAlmost() {
      if (this.store.numberOfProblemsSolved >= gameStore.getNineTenth()
       && this.store.numberOfProblemsSolved < this.store.numberOfProblems) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
@font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    src: local('Noto Sans'), local('NotoSans'),
         url('assets/noto-sans-v9-latin-regular.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: italic;
    font-weight: 400;
    src: local('Noto Sans Italic'), local('NotoSans-Italic'),
         url('assets/noto-sans-v9-latin-italic.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    src: local('Noto Sans Bold'), local('NotoSans-Bold'),
         url('assets/noto-sans-v9-latin-700.woff2') format('woff2');
  }

html, body, #app {
  margin:0;
  height:100%;
  width:100%;
  font-family:"noto sans", sans-serif;
  -webkit-text-size-adjust:100%;
  color:#000;
}

* {
  touch-action: manipulation;
}

a {
  color:#0c4fa1 !important;
  text-decoration:none !important;
  cursor:pointer;
  transition:color 0.15s;
}

a:hover {
  color:#03a003 !important;
}

/**Button styles */
button {
  border:none;
  text-align:center;
  text-decoration: none;
  display: inline-block;
  cursor:pointer;
  outline:none;
  padding: 0;
  color:#fafafa;
  font-family:"noto sans", sans-serif;
  box-shadow: 0 1.8vmin #999;
  transition: background-color 0.12s, transform 0.12s, box-shadow 0.12s;
}

button::-moz-focus-inner {
  border: 0;
}

button:active {
  box-shadow: 0 0.5vmin #999;
  transform: translateY(1vmin);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.button-magenta {
  background-color: #b23681;
}

.button-magenta:hover {
  background-color:#e86198;
}

.button-orange {
  background-color: #c27120;
}

.button-orange:hover {
  background-color:#dc862f;
}

.button-purple {
  background-color:#726bd3;
}

.button-purple:hover {
  background-color:#837ce7;
}

.button-greenUnselected {
  background-color: #b5c5b4;
}

.button-greenUnselected:hover {
  background-color:#9abb98;
}

.button-greenSelected, .button-greenSelected:hover {
  background-color: #0d9806;
}

.small-circle {
  border-radius:50%;
  width:16vmin;
  height:14.5vmin;
  font-size:11vmin;
  margin:0 0.18em;
  line-height:0;
}

.circle {
  border-radius:50%;
  width:24vmin;
  height:22.5vmin;
  font-size:12vmin;
  line-height:0.65;
  margin:0 0.18em;
  letter-spacing:normal;
}

.normal-button {
  margin-top:0.5em;
  border-radius:3vmin;
  padding:1.5vmin 4vmin;
  font-size:6vmin;
}

@media (min-width: 420px) and (min-height: 420px) {
  button {
    box-shadow: 0 1vmin #999;
  }
  .small-circle {
    border-radius:50%;
    width:9.5vmin;
    height:8.5vmin;
    font-size:6.5vmin;
    letter-spacing:normal;
  }
  .circle {
    border-radius:50%;
    width:13vmin;
    height:12vmin;
    font-size:6vmin;
    line-height:0.65;
  }
  .normal-button {
    border-radius:1.5vmin;
    padding:0.8vmin 3vmin;
    font-size:3.5vmin;
  }
}

/** Transitions */
.fade05-enter-active {
  transition: opacity .5s;
}

.fade07-enter-active {
  transition: opacity .7s;
}

.fade05-enter, .fade05-leave-to, .fade07-enter, .fade07-leave-to {
  opacity: 0;
}

</style>

<style scoped>
.bodyBG {
  position:absolute;
  transition: background-color 0.2s;
}

.homeColor {
  background-color:#d3d3d3;
}

.gameColor {
  background-color:#fafafa;
}

.oneThird {
  background-color:#c9ead0;
}

.twoThirds {
  background-color:#e0e8b6;
}

.almost {
  background-color:#e6c695;
}
</style>
