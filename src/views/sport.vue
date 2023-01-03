<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <div>
          <b-button v-b-toggle.collapse-3 class="m-1">Kategorije</b-button>
          <b-collapse visible id="collapse-3">
            <b-card>
              <a href="">Nogomet</a> <br />
              <a href="">Košarka</a> <br />
              <a href="">Tenis</a> <br />
              <a href="">Biciklizam</a><br />
              <a href="">Rukomet</a><br />
              <a href="">Golf</a><br />
            </b-card>
          </b-collapse>
        </div>
      </b-col>
      <b-col cols="10">
        <div class="okvir">
          <!-- <submitsportVue /> -->
          <vjezbaVue />
          <!-- <vjezbaVue /> -->
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>1 of 3</b-col>
      <b-col>2 of 3</b-col>
      <b-col>3 of 3</b-col>
    </b-row>
  </b-container>
</template>

<script>
import submitsportVue from "@/components/submitsport.vue";
import vjezbaVue from "@/components/vjezba.vue";
import opcine from "@/assets/popis.json";

export default {
  name: "sport",
  data() {
    return {
      opcine,
    };
  },
  components: {
    submitsportVue,
    vjezbaVue,
  },
};
</script>

<style scooped>
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

a {
  text-decoration: none;
  color: inherit;
}
a:hover {
  color: black;
}
</style>
