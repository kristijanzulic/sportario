<template>
  <div class="card" style="width: 18rem">
    <img src="@/assets/tennis.jpg" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="">{{ info.sport }}</h5>
      <p class="card-text">{{ info.poruka }}</p>
      <h2>{{ info.lokacija }}</h2>
      <h2>{{ info.ime }}</h2>
      <p>{{ info.datum }}</p>
      <p>id : {{ info.id }}</p>
      <div class="card-footer text-muted">{{ postedFromNow }}</div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { collection, addDoc, db } from "@/firebase";
import moment from "moment";

export default {
  props: {
    info: Object,
  },

  data() {
    return {
      store: store,
    };
  },
  computed: {
    postedFromNow() {
      return moment(this.info.time).fromNow();
    },
  },
  methods: {
    async postNewImage() {
      // let name = "posts/" + store.currentUser + "/" + Date.now() + ".txt";
      try {
        const docRef = await addDoc(collection(db, "Objave"), {
          sport: this.store.sport,
          lokacija: this.store.lokacija,
          datum: this.store.datum,
          igraci: this.store.igraci,
          poruka: this.store.message,
          email: this.store.currentUser,
          objavljeno: Date.now(),
        });
        console.log("Document written with ID: ", docRef.id);
        this.store.sport = "";
        this.store.lokacija = "";
        this.store.datum = "";
        this.store.igraci = "";
        this.store.message = "";
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  },
};
</script>

<style scoped>
h5 {
  text-align: center;
}
</style>
