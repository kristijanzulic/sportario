<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <kategorije />
      </b-col>
      <b-col cols="10">
        <div class="okvir">
          <modalForSubmit v-if="store.currentUser" />
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
import store from "@/store";
import karticaVue from "@/components/kartica.vue";
import kategorije from "@/components/kategorije.vue";
import modalForSubmit from "@/components/modalForSubmit.vue";
import {
  getAuth,
  collection,
  db,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "@/firebase";

export default {
  name: "kosarka",
  data() {
    return {
      store: store,
      cards: [],
    };
  },
  components: { karticaVue, kategorije, modalForSubmit },
  mounted() {
    this.dohvatiobjave();
  },
  methods: {
    async dohvatiobjave() {
      const auth = getAuth();
      const user = auth.currentUser;

      const querySnapshot = query(
        collection(db, "Objave"),
        orderBy("objavljeno", "desc"),
        where("sport", "==", "Nogomet"),
        limit(10)
      );

      await getDocs(querySnapshot).then((querySnapshot) => {
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
            ime: data.ime,
          });
        });
      });
    },
  },
};
</script>

<style scoped>
.kartica {
  display: inline-block;
  margin: 10px;
}
</style>
