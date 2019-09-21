/* eslint-disable no-alert */
<template>
  <div class="help">
  <div v-if="!onWarning">
        <div>
                <transition name="fade" appear>
                  <div>
    <h1>Game Goals!</h1>
    <p>Solve <b>30 math problems</b> as fast as you can.</p>
    <p>Choose between <b>simple</b> and <b>standard</b> difficulties.</p>
    <p>Select any <b>set</b> of operators to play with.</p>
    <p>Strive to beat your high scores!</p>
    <p>
    <button class="small-back reset"
      v-on:click="onWarning = true" ontouchstart>Delete save data</button><br><br>
    <button class="small-back"
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
.fade-enter-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.help {
  text-align:center;
  width:95%;
  font-size:calc(10px + 1.4vmin);
}

h1 {
  font-size:130%;
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

.small-back {
  margin-top:0.5em;
  box-shadow: 0 1.8vmin #999;
  background-color: #c27120;
  border-radius:3vmin;
  padding:1.5vmin 4vmin;
  font-size:6vmin;
}

.small-back:hover {
  background-color:#dc862f;
}
.small-back:active {
  box-shadow: 0 0.5vmin #999;
  transform: translateY(1vmin);
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
  .small-back {
    box-shadow: 0 1vmin #999;
    border-radius:1.5vmin;
    padding:0.8vmin 3vmin;
    font-size:3.5vmin;
  }
  .reset {
    font-size:1.8vmin;
  }
}
</style>
