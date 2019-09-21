<template>
<div style="text-align:center;">
<transition name="fade" appear>
  <div>
  <h1>Select Difficulty</h1>
  <button class="diff-button" v-on:click="changeDifficulty('simple')"
   ontouchstart>Simple</button>
  <button class="diff-button" v-on:click="changeDifficulty('standard')"
   ontouchstart>Standard</button>
  </div>
</transition>
</div>
</template>

<script>
import localStorage from '@/stores/localStorage';

export default {
  data() {
    return {

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
.fade-enter-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

h1 {
  font-weight:400;
  font-size:7vmin;
  margin:0;
}

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
  transition: background-color 0.12s, transform 0.12s, box-shadow 0.12s;
}

button::-moz-focus-inner {
  border: 0;
}

button:active {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.diff-button {
  box-shadow: 0 1.8vmin #999;
  background-color: #b23681;
  border-radius:4vmin;
  padding:2vmin 7vmin;
  font-size:7.5vmin;
  margin:0.75em 0.18em 0 0.18em;
}

.diff-button:hover {
  background-color:#e86198;
}

.diff-button:active {
  box-shadow: 0 0.5vmin #999;
  transform: translateY(1vmin);
}

@media (min-width: 420px) and (min-height: 420px) {
  h1 {
    font-weight:400;
    font-size:calc(10px + 3.2vmin);
  }
  .diff-button {
    box-shadow: 0 1vmin #999;
    border-radius:2vmin;
    padding:1.2vmin 4.5vmin;
    font-size:5vmin;
  }

}
</style>
