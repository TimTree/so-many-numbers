<template>
  <div style="width:95%;">
    <transition name="fade-fast" mode="out-in">
    <div v-if="!onWarning" key="nonwarning">
      <h1>Settings</h1>
      <p>
        <button class="small-button button-purple"
          v-on:click="$parent.onSettings = false;
          $parent.onOnboarding = true">View onboarding</button>
      </p>
      <div v-if="isOnline">
        <p>
          <button class="small-button button-purple"
            v-on:click="forceUpdate()">Update now *</button>
        </p>
        <p style="font-size:75%;">
          * Get the latest version of the game before it automatically downloads to your device.
        </p>
      </div>
      <div v-else>
        <p style="font-size:80%;margin:2em 0;">
          "Update now" disabled - you're offline
        </p>
      </div>
      <p>
        <button class="small-button button-red"
          v-on:click="onWarning = true">Delete save data</button>
      </p>
      <br/>
      <p>
        <button class="normal-button button-orange"
        v-on:click="$parent.onSettings = false;">Go back</button>
      </p>
    </div>
    <div style="margin:0 auto;" v-if="onWarning">
      <p>Are you ABSOULTELY sure you want to delete all your save data?</p>
      <p><b>You cannot undo this action.</b> The game will refresh if you select Yes.</p>
      <p style="font-size:200%;word-spacing:0.8em;"><a class="hiddenYes"
      v-bind:class="{visibleYes: yesPrecaution}" v-on:click="wipeData()">Yes</a>
      <span></span> <a v-on:click="onWarning=false;"><b>Cancel</b></a></p>
    </div>
    </transition>
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
  created() {
    if (navigator.onLine) {
      this.isOnline = true;
    } else {
      this.isOnline = false;
    }
  },
  methods: {
    /**
     * Force a game update by unregistering the service worker,
     * purging the cache, and refreshing the game
     */
    forceUpdate() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations()
          .then((registrations) => {
            registrations.forEach((registration) => {
              registration.unregister();
            });
          });
        caches.keys()
          .then((cacheNames) => {
            cacheNames.forEach((cacheName) => {
              caches.delete(cacheName);
            });
          });
      }
      window.location.reload(true);
    },
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

<style lang="scss" scoped>

h1 {
  font-size:120%;
  margin-top: 0;
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

@media (max-width: 479px) and (min-aspect-ratio: 2/3) {
  p {
    margin:0.75em 0;
  }
}
</style>
