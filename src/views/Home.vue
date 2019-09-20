<template>
<div class="home-div">
  <div class="logo">
    <img src="@/assets/SoManyNumbersTitleLight.svg" alt="So Many Numbers!"/>
  </div>
  <div style="display:flex;align-items:center;justify-content:center;overflow:auto;">
    <router-link :to="{ path: '/game', query: { diff: 'standard', set: 'asmd' }}">Play</router-link>
  </div>
  <div class="authors">
    <div>
      By Ashley Caswell and Timothy Hsu //
       <a href="https://github.com/TimTree/so-many-numbers" target="_blank" rel="noopener">GitHub Repo</a>
    </div>
  </div>
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

<style scoped>
.home-div {
  height:100%;
  overflow:hidden;
  display:grid;
  grid-template-columns:100%;
  grid-template-rows: auto 1fr 7%;
}

.logo {
  background-color:#cfe0f1;
  background-image: linear-gradient(to bottom right, #71c1f7, #b0dff3, #71c1f7);
  width:100%;
  box-shadow: 0px 2px 7px rgb(0,0,0,0.3);
  padding:10px 0;
  display:flex;
  align-items:center;
  justify-content:center;
  height:19.875vmin;
}

.logo img {
  height:19.875vmin;
}

.authors {
  display:flex;
  align-items:flex-start;
  justify-content:center;
  font-size:calc(9px + 0.5vw);
}

a {
  color:#0e5ab9 !important;
  text-decoration:none !important;
  cursor:pointer;
  transition:color 0.15s;
}

a:hover {
  color:#03a003 !important;
}

@media (min-width: 420px) and (min-height: 420px) {
  .logo {
    height:13.25vmin;
    min-height:63.6px;
    max-height:159px;
  }
  .logo img {
    height:13.25vmin;
    min-height:63.6px;
    max-height:159px;
  }
}

@media (min-height: 800px) {
  .logo {
    box-shadow: 0px 3px 7px rgb(0,0,0,0.3);
    padding:20px 0;
  }
}

@media (min-height: 1000px) {
  .logo {
    padding:30px 0;
  }
}
</style>
