<template>
<div class="home-div">
  <header>
    <img src="@/assets/SoManyNumbersTitleLight.svg" alt="So Many Numbers!"/>
  </header>
  <main>
    <SelectDifficulty v-if="onSelectDifficulty"/>
    <HelpScreen v-else-if="onHelp"/>
    <OnBoarding v-else-if="onOnboarding" />
    <UpdatesScreen v-else-if="onUpdatesScreen" />
    <SelectSet v-else />
  </main>
  <footer class="authors">
    <div>
      By <a href="https://github.com/ash-caz" target="_blank" rel="noopener">Ashley Caswell</a>
       and <a href="https://github.com/TimTree" target="_blank" rel="noopener">Timothy Hsu</a> //
       <a href="https://github.com/TimTree/so-many-numbers" target="_blank" rel="noopener">GitHub Repo</a>
    </div>
  </footer>
</div>
</template>

<script>
import SelectDifficulty from '@/components/SelectDifficulty.vue';
import HelpScreen from '@/components/HelpScreen.vue';
import SelectSet from '@/components/SelectSet.vue';
import OnBoarding from '@/components/OnBoarding.vue';
import UpdatesScreen from '@/components/UpdatesScreen.vue';
import localStorage from '@/stores/localStorage';

export default {
  data() {
    return {
      onSelectDifficulty: false,
      onHelp: false,
      onOnboarding: false,
      onUpdatesScreen: false,
    };
  },
  components: {
    SelectDifficulty,
    HelpScreen,
    SelectSet,
    OnBoarding,
    UpdatesScreen,
  },
  created() {
    this.$parent.isHome = true;
    if (localStorage.saveData.difficulty === '') {
      this.onOnboarding = true;
    }
  },
  destroyed() {
    this.$parent.isHome = false;
  },
};
</script>

<style scoped>
.home-div {
  height:100%;
  display:grid;
  grid-template-columns:100%;
  grid-template-rows: auto 1fr 7%;
}

main {
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  margin:0 auto;
  width:98%;
  max-width:1200px;
}

header {
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

header img {
  height:19.875vmin;
}

.authors {
  display:flex;
  align-items:flex-start;
  justify-content:center;
  font-size:calc(9px + 0.9vw);
}

@media (min-width: 420px) and (min-height: 420px) {
  header {
    height:13.25vmin;
    min-height:63.6px;
    max-height:159px;
  }
  header img {
    height:13.25vmin;
    min-height:63.6px;
    max-height:159px;
  }
  .authors {
    font-size:calc(9px + 0.5vw);
  }
}

@media (min-height: 800px) {
  header {
    box-shadow: 0px 3px 7px rgb(0,0,0,0.3);
    padding:20px 0;
  }
}

@media (min-height: 1000px) {
  header {
    padding:30px 0;
  }
}
</style>
