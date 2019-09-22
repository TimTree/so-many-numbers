<template>
  <div class="help">
  <div>
  <transition name="fade05" appear>
  <div>
    <p>So Many Numbers automatically stores to your device cache for offline use.
      When we update the game, it may take a while for the cache to receive the update.
    </p>
    <p>Select "Force update" to immediately download the latest release.
    <b>You will temporarily lose offline access</b> until the game
     successfully reloads.</p>
    <p>
    <span v-if="isOnline">
    <button class="normal-button forceUpdate"
      v-on:click="forceUpdate()" ontouchstart>Force update</button>
    </span>
    <span v-else>
      <i>Force update disabled - you're offline</i>
    </span>
      <br><br>
    <button class="normal-button button-orange"
      v-on:click="$parent.onUpdatesScreen=false;" ontouchstart>Go back</button>
    </p>
  </div>
  </transition>
  </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isOnline: true,
    };
  },
  created() {
    if (navigator.onLine) {
      this.isOnline = true;
    } else {
      this.isOnline = false;
    }
  },
  methods: {
    /**
     * Force a game update by unregistering the service worker
     * and refreshing the game
     */
    forceUpdate() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations()
          .then((registrations) => {
            registrations.forEach((registration) => {
              registration.unregister();
            });
          });
      }
      window.location.reload(true);
    },
  },
};
</script>

<style scoped>
.help {
  text-align:center;
  width:95%;
  font-size:calc(10px + 1.6vmin);
}

.forceUpdate {
  font-size:3vmin;
  background-color:#726bd3;
  padding:1.5vmin 3vmin;
}

.forceUpdate:hover {
  background-color:#837ce7;
}

@media (min-width: 420px) and (min-height: 420px) {
  .forceUpdate {
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
