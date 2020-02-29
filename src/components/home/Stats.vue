<template>
  <div style="width:95%;">
    <h2>Stats</h2>
    <p>
      Coming soon!
    </p>
    <br/>
    <p>
      <button class="normal-button button-orange"
      v-on:click="$parent.onStats = false;">Go back</button>
    </p>
  </div>
</template>

<style lang="scss" scoped>
@media (max-width: 479px) and (min-aspect-ratio: 2/3) {
  p {
    margin: 0.75em 0;
  }
}
</style>
