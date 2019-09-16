<template>
<div>
  So Many Numbers!<br>
  <router-link :to="{ path: '/game', query: { diff: 'standard', ops: 'asmd' }}">Play</router-link>
</div>
</template>

<script>

export default {
  components: {
  },
  created() {
    this.$parent.isHome = true;
  },
  destroyed() {
    this.$parent.isHome = false;
  },
};
</script>
