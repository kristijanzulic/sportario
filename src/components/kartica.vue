<template>
  <div class="card" style="width: 18rem">
    <img src="@/assets/tennis.jpg" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="">{{ store.sport }}</h5>
      <p class="card-text">{{ store.message }}</p>
      <h2>{{ store.lokacija }}</h2>
      <p>{{ store.datum }}</p>
      <button type="button" @click="postNewImage">Objavi</button>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { collection, addDoc, db } from "@/firebase";

export default {
  props: ["info"],
  data() {
    return {
      store: store,
    };
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
