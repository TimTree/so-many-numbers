<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import localStorage from '@/stores/localStorage';
import gameStore from '@/stores/gameStore';
import themeMixin from '@/stores/themeMixin';

export default {
  mixins: [themeMixin],
  data() {
    return {
      store: gameStore.state,
      isHome: false,
      isGame: false,
      mediaQuery: window.matchMedia('(prefers-color-scheme: dark)'),
    };
  },
  created() {
    localStorage.configureSaveData();
    if (localStorage.saveData.theme === 'dark' || localStorage.saveData.theme === 'light') {
      this.changeTheme(localStorage.saveData.theme);
    } else if (this.mediaQuery.matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      this.$store.commit('changeTheme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      this.$store.commit('changeTheme', 'light');
    }
  },
  mounted() {
    this.mediaQuery.addListener((e) => {
      if (localStorage.saveData.theme === 0) {
        if (e.matches) {
          document.documentElement.setAttribute('data-theme', 'dark');
          this.$store.commit('changeTheme', 'dark');
        } else {
          document.documentElement.setAttribute('data-theme', 'light');
          this.$store.commit('changeTheme', 'light');
        }
      }
    });
  },
};
</script>

<style lang="scss">
@import url("./assets/colors.css");
@font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Noto Sans'), local('NotoSans'),
         url('assets/noto-sans-v9-latin-regular.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: local('Noto Sans Italic'), local('NotoSans-Italic'),
         url('assets/noto-sans-v9-latin-italic.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Noto Sans Bold'), local('NotoSans-Bold'),
         url('assets/noto-sans-v9-latin-700.woff2') format('woff2');
  }

html, body, #app {
  margin: 0;
  height: 100%;
  width: 100%;
  font-family: "noto sans", sans-serif;
  box-sizing: border-box;
  -webkit-text-size-adjust: 100%;
  color: var(--text-color);
  font-size: 5vmin;
}

body {
  transition: background-color 0.2s;
  background-color: var(--primary-bg);
}

* {
  touch-action: manipulation;
}

a {
  color: var(--link-color) !important;
  text-decoration: none !important;
  cursor: pointer;
  transition: color $transition-time;
}

a:hover {
  color:var(--link-hover-color) !important;
}

h2 {
  text-align: left;
  font-size: 5vmin;
  border-bottom: 0.2vmin solid var(--text-color);
  margin: 0 auto 3vh auto;
  padding: 0 0 0 0.6em;
  width: 90%;
}

/**Button styles */
button {
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  outline: none;
  padding: 0;
  color: #fafafa;
  font-family: "noto sans", sans-serif;
  box-shadow: 0 1.8vmin var(--button-shadow);
  transition: background-color $transition-time, transform $transition-time,
   box-shadow $transition-time;
  user-select: none;
}

button::-moz-focus-inner {
  border: 0;
}

button:active {
  box-shadow: 0 0.5vmin var(--button-shadow);
  transform: translateY(1vmin);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.button-magenta {
  background-color: var(--button-magenta);
}

.button-magenta:hover {
  background-color: var(--button-magenta-hover);
}

.button-orange {
  background-color: var(--button-orange);
}

.button-orange:hover {
  background-color: var(--button-orange-hover);
}

.button-purple {
  background-color: var(--button-purple);
}

.button-purple:hover {
  background-color: var(--button-purple-hover);
}

.button-red {
  background-color: var(--button-red);
}

.button-red:hover {
  background-color: var(--button-red-hover);
}

.normal-button {
  margin-top: 0.5em;
  border-radius: 3vmin;
  padding: 1.5vmin 4vmin;
  font-size: 6vmin;
}

.small-button {
  margin-top: 0.5em;
  border-radius: 3vmin;
  padding: 1.5vmin 3vmin;
  font-size: 4vmin;
}

.plus {
  color: var(--plus-color);
}

.minus {
  color: var(--minus-color);
}

.multiply {
  color: var(--multiply-color);
}

.divide {
  color: var(--divide-color);
}

.big-circle-unselected {
  background-color: transparent !important;
}

.big-circle-unselected:hover {
  background-color: var(--div-button-hover-color) !important;
}

.big-circle-unselected span {
  color: var(--unselected-color) !important;
}

.oneThird {
  background-color: var(--one-third-bg) !important;
}

.twoThirds {
  background-color: var(--two-thirds-bg) !important;
}

.almost {
  background-color: var(--almost-bg) !important;
}

@media (min-width: $mobile-boundary) and (min-height: $mobile-boundary) {
  html, body, #app {
    font-size: calc(5vmin * 0.6);
  }

  h2 {
    font-size: calc(5vmin * 0.6);
    border-bottom: 0.12vmin solid var(--text-color);
  }

  button {
    box-shadow: 0 1vmin var(--button-shadow);
  }
  .circle {
    border-radius:50%;
    width:13vmin;
    height:12vmin;
    font-size:6vmin;
    line-height:0.65;
  }
  .normal-button {
    border-radius: 1.5vmin;
    padding: 0.8vmin 3vmin;
    font-size: 3.5vmin;
  }
  .small-button {
    border-radius: 1.5vmin;
    padding: 0.8vmin 2vmin;
    font-size: 2.4vmin;
  }
}

@media (max-width: 479px) and (min-aspect-ratio: 2/3) {
  h2 {
    margin: 0 auto 2.2vh auto;
  }
}

/** Transitions */
.fade-enter-active {
  transition: opacity 0.3s ease-in;
}

.fade-fast-enter-active {
  transition: opacity $transition-time ease-in;
}

.fade-enter, .fade-leave-to, .fade-fast-enter, .fade-fast-leave-to {
  opacity: 0;
}
</style>
