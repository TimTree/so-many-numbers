<template>
  <div class="help">
  <div v-if="!onWarning">
  <div>
  <transition name="fade" appear>
  <div>
    <h1>Game Goals!</h1>
    <p>Solve <b>30 problems</b> as fast as you can.</p>
    <p>Choose between <b>simple</b> and <b>standard</b> difficulties.</p>
    <p>Select any <b>set</b> of operators to play with.</p>
    <p>Strive to beat your high scores!</p>
    <p>
    <button class="normal-button reset"
      v-on:click="onWarning = true">Delete save data</button><br><br>
    <button class="normal-button button-orange"
      v-on:click="$parent.onHelp= false;">Go back</button>
    </p>
  </div>
  </transition>
  </div>
  </div>
  <div style="width:95%;margin:0 auto;" v-if="onWarning">
    <p>Are you ABSOULTELY sure you want to delete all your save data?</p>
    <p><b>You cannot undo this action.</b> The game will refresh if you select Yes.</p>
    <p style="font-size:200%;word-spacing:0.8em;"><a class="hiddenYes"
     v-bind:class="{visibleYes: yesPrecaution}" v-on:click="wipeData()">Yes</a>
     <span></span> <a v-on:click="onWarning=false;"><b>Cancel</b></a></p>
  </div>
  </div>
</template>

<script>
import localStorage from '@/stores/localStorage';

export default {
  data() {
    return {
      onWarning: false,
      yesPrecaution: false,
    };
  },
  methods: {
    wipeData() {
      if (this.yesPrecaution) {
        localStorage.wipeData();
      }
    },
  },
  watch: {
    onWarning() {
      if (this.onWarning) {
        this.precaution = setTimeout(() => { this.yesPrecaution = true; }, 1500);
      } else {
        clearTimeout(this.precaution);
        this.yesPrecaution = false;
      }
    },
  },
  destroyed() {
    clearTimeout(this.precaution);
  },
};
</script>

<style scoped>
.help {
  text-align:center;
  width:95%;
}

h1 {
  font-size:130%;
}

.reset {
  font-size:3vmin;
  background-color:#cf1a1a;
  padding:1.5vmin 3vmin;
}

.reset:hover {
  background-color:#e23737;
}

.hiddenYes {
  opacity:0;
  transition: opacity 0.5s;
  cursor:default;
}

.visibleYes {
  opacity:1;
  cursor:pointer;
}

@media (min-width: 420px) and (min-height: 420px) {
  .reset {
    font-size:1.8vmin;
    padding:1vmin 2vmin;
  }
}

@media (max-height: 520px) {
  p {
    margin:0.75em 0;
  }
}
</style>
