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
          <vjezbaVue v-if="store.currentUser" />
          <karticaVue v-if="store.sport" />
          <!-- <vjezbaVue /> -->
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <karticaVue v-for="card in cards" :key="card.id" :info="card" />
      </b-col>
      <b-col>2 of 3</b-col>
      <b-col>3 of 3</b-col>
    </b-row>
  </b-container>
</template>

<script>
import submitsportVue from "@/components/submitsport.vue";
import vjezbaVue from "@/components/vjezba.vue";
import opcine from "@/assets/popis.json";
import karticaVue from "@/components/kartica.vue";
import store from "@/store";
import { collection, db, getDocs } from "@/firebase";

export default {
  name: "sport",
  data() {
    return {
      opcine,
      store: store,
      cards: [],
    };
  },
  components: {
    submitsportVue,
    vjezbaVue,
    karticaVue,
  },
  mounted() {
    this.dohvatiobjave();
  },
  methods: {
    async dohvatiobjave() {
      const querySnapshot = await getDocs(collection(db, "Objave"));
      querySnapshot.forEach((doc) => {
        const data = doc.data;
        this.cards.push({
          id: doc.id,
          datum: data.datum,
          igraci: data.igraci,
          lokacija: data.lokacija,
          time: data.objavljeno,
          poruka: data.poruka,
        });

        console.log(`${doc.id} => ${doc.data()}`);
      });
    },
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
