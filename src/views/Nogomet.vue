<template>
  <div>
    <modalForSubmitVue />
    <karticaVue
      class="kartica"
      v-for="card in cards"
      :key="card.id"
      :info="card"
    />
  </div>
</template>

<script>
import store from "@/store";
import karticaVue from "@/components/kartica.vue";
import modalForSubmitVue from "@/components/modalForSubmit.vue";
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
  name: "nogomet",
  data() {
    return {
      store: store,
      cards: [],
    };
  },
  components: { karticaVue, modalForSubmitVue },
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
          });
        });
      });
    },
  },
};
</script>

<style scoped></style>
