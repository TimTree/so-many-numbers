/* eslint-disable no-alert */
<template>
  <div class="help">
  <div v-if="!onWarning">
        <div>
                <transition name="fade05" appear>
                  <div>
    <h1>Game Goals!</h1>
    <p>Solve <b>30 math problems</b> as fast as you can.</p>
    <p>Choose between <b>simple</b> and <b>standard</b> difficulties.</p>
    <p>Select any <b>set</b> of operators to play with.</p>
    <p>Strive to beat your high scores!</p>
    <p>
    <button class="normal-button reset"
      v-on:click="onWarning = true" ontouchstart>Delete save data</button><br><br>
    <button class="normal-button button-orange"
      v-on:click="$parent.onHelp= false;" ontouchstart>Go back</button>
    </p></div>
          </transition>
    </div>
  </div>
  <div v-if="onWarning">
    <p>Are you ABSOULTELY sure you want to delete all your save data?</p>
    <p><b>You cannot undo this action.</b> The game will refresh if you select Yes.</p>
    <p style="font-size:200%;"><a v-on:click="wipeData()">Yes</a>
     &nbsp;&nbsp; <a v-on:click="onWarning=false;"><b>Cancel</b></a></p>
  </div>
  </div>
</template>

<script>
import localStorage from '@/stores/localStorage';

export default {
  data() {
    return {
      onWarning: false,
      dont: true,
    };
  },
  methods: {
    wipeData() {
      localStorage.wipeData();
    },
  },
};
</script>

<style scoped>
.help {
  text-align:center;
  width:95%;
  font-size:calc(10px + 1.4vmin);
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

@media (min-width: 420px) and (min-height: 420px) {
  .reset {
    font-size:1.8vmin;
    padding:1vmin 2vmin;
  }
}
</style>
