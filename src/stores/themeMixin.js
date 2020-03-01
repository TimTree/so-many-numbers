import localStorage from '@/stores/localStorage';

export default {
  methods: {
    changeTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      this.$store.commit('changeTheme', theme);
      localStorage.saveData.theme = theme;
      localStorage.save();
    },
  },
};
