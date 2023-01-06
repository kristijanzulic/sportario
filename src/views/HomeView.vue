<template>
  <div
    class="bg-image"
    style="
      background-image: url('https://wallpaperaccess.com/full/1767837.jpg');
      height: 100vh;
    "
  >
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <div class="coldva">
            <h4>A LIFETIME EXPERIENCE</h4>
            <h1>
              SPORT EVENTS <br />
              to remember
            </h1>
            <h2>Play Anywhere Anytime</h2>
            <b-button class="tipka" pill variant="primary">
              <router-link to="/sport">Pretraži</router-link>
            </b-button>
          </div>
        </b-col>
        <b-col> </b-col>
        <b-col class="coltri">
          <FormRegistation />
        </b-col>
      </b-row>
    </b-container>
    <!-- <img src="@/assets/backround.jpg" alt="" class="bg-img" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import FormRegistation from "@/components/FormRegistation.vue";
import store from "@/store";

import NavBar from "@/components/NavBar.vue";

export default {
  name: "HomeView",
  data() {
    return {
      store: store,
    };
  },
  components: {
    NavBar,
    FormRegistation,
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
a:hover {
  color: white;
}
.tipka {
  font-size: 1.5em;
}
.coltri {
  padding-top: 3em;
}
.coldva {
  text-align: center;
  padding-top: 3em;
}
h4 {
  color: #29a48b;
  font-size: 20px;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  margin-top: 90px;
}
h2 {
  color: #29a48b;
  font-size: 20px;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  padding-bottom: 20px;
}
h1 {
  color: white;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  padding: 20px 0px 20px 0px;
}
</style>
