<template>
  <div class="help">
  <transition name="fade" appear>
  <div>
    <p>
      <b>Simple</b>: Use basic problems.
    </p>
    <p>
      <span>6+3</span> <span>9−4</span> <span>5×5</span> <span>30÷6</span>
    </p>
    <p>
      <b>Standard</b>: Use a wider variety of problems.
    </p>
    <p>
      <span>16+17</span> <span>23−8</span> <span>11×12</span> <span>121÷11</span>
    </p>
    <p class="extra-space">
      Level was called Difficulty in older versions of the game.
    </p>
    <p>
    <button class="normal-button button-orange"
      v-on:click="$parent.onLevelExplanation= false;">Go back</button>
    </p>
  </div>
  </transition>
  </div>
</template>

<style lang="scss" scoped>
.help {
  text-align:center;
  width:95%;
}

p span {
  margin: 0 0.5em;
}

.extra-space {
  margin-top: 1.5em;
}

@media (max-height: 520px) {
  p {
    margin:0.75em 0;
  }
}
</style>
