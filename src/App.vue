<template>
  <div id="app">
    <nav>
      <NavBar />
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  background: linear-gradient(
    to bottom,
    #4150a5,
    #4856ab,
    #4e5cb2,
    #5563b8,
    #5b69bf
  );
  background-attachment: fixed; /*edit*/
}
</style>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "app",
  components: {
    NavBar,
  },
};
</script>
