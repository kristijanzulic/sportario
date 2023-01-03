<template>
  <div id="app">
    <nav>
      <NavBar />
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss"></style>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "app",
  components: {
    NavBar,
  },
};
</script>
