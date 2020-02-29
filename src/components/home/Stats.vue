<template>
  <div style="width:95%;">
    <h1>Stats</h1>
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
h1 {
  font-size: 120%;
  margin-top: 0;
}

@media (max-width: 479px) and (min-aspect-ratio: 2/3) {
  p {
    margin: 0.75em 0;
  }
}
</style>
