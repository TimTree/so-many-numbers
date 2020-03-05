<template>
  <div style="width:95%;">
    <h2>What's new in So Many Numbers</h2>
    <ul>
      <li v-if="priorVersion < 2">
        <strong>Update notifier</strong> - We'll let you know when an update's ready.</li>
    </ul>
    <p>
    <button class="normal-button button-orange"
      v-on:click="$parent.onWhatsNew = false;">Got it!</button>
    </p>
  </div>
</template>

<script>
import localStorage from '@/stores/localStorage';

export default {
  data() {
    return {
      priorVersion: localStorage.saveData.version,
    };
  },
  mounted() {
    localStorage.saveData.version = 2;
    localStorage.save();
  },
};
</script>

<style lang="scss" scoped>
p span {
  margin: 0 0.5em;
}

.extra-space {
  margin-top: 1.5em;
}

ul {
  text-align: left;
  margin: 0 5%;
}

li {
  margin-bottom: 2vh;
}

@media (max-width: 479px) and (min-aspect-ratio: 2/3) {
  p {
    margin: 0.75em 0;
  }
}
</style>
