<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <div>
          <b-button v-b-toggle.collapse-3 class="m-1">Kategorije</b-button>
          <b-collapse visible id="collapse-3">
            <b-card>
              <router-link to="/nogomet"> <a>Nogomet</a></router-link>
              <br />
              <router-link to="/kosarka"> <a>Košarka</a></router-link>
              <br />
              <router-link to="/tenis"> <a>Tenis</a></router-link>
              <br />
              <router-link to="/ostalo"> <a>Ostalo</a></router-link>
            </b-card>
          </b-collapse>
        </div>
      </b-col>
      <b-col cols="10">
        <div class="okvir">
          <modalForSubmitVue v-if="store.currentUser" />
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <karticaVue
          class="kartica"
          v-for="card in cards"
          :key="card.id"
          :info="card"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import modalForSubmitVue from "@/components/modalForSubmit.vue";
import opcine from "@/assets/popis.json";
import karticaVue from "@/components/kartica.vue";
import store from "@/store";
import {
  getAuth,
  collection,
  db,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
  doc,
} from "@/firebase";

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
    karticaVue,
    modalForSubmitVue,
  },
  mounted() {
    this.dohvatiobjave();
  },

  methods: {
    async dohvatiobjave() {
      const querySnapshot = query(
        collection(db, "Objave"),
        orderBy("datum", "desc"),
        limit(10)
      );

      onSnapshot(querySnapshot, (querySnapshot) => {
        this.cards = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          this.cards.push({
            id: doc.id,
            sport: data.sport,
            datum: data.datum,
            igraci: data.igraci,
            lokacija: data.lokacija,
            time: data.objavljeno,
            poruka: data.poruka,
            email: data.email,
          });
        });
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
.kartica {
  display: inline-block;
  margin: 10px;
}
</style>
