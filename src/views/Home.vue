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
};
</script>
