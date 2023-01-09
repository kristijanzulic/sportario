<template>
  <div class="card" style="width: 18rem">
    <img
      src="@/assets/nogomet.png"
      v-if="info.sport == 'Nogomet'"
      class="card-img-top"
      alt="Card image cap"
    />
    <img
      src="@/assets/basketball.png"
      v-if="info.sport == 'Košarka'"
      class="card-img-top"
      alt="..."
    />
    <img
      src="@/assets/tennis.jpg"
      v-if="info.sport == 'Tenis'"
      class="card-img-top"
      alt="..."
    />

    <img
      src="@/assets/backround.jpg"
      v-if="info.sport == 'Ostalo'"
      class="card-img-top"
      alt="..."
    />
    <div class="card-body">
      <h5 class="">{{ info.sport }}</h5>
      <p class="card-text">{{ info.poruka }}</p>
      <h2>{{ info.lokacija }}</h2>
      <h2>{{ info.ime }}</h2>
      <p>{{ info.datum }}</p>
      <button
        v-if="info.email == this.store.currentUser.email"
        @click="brisanjeobjave()"
      >
        Obrisi
      </button>
      <div class="card-footer text-muted">{{ postedFromNow }}</div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { getAuth, collection, addDoc, db, deleteDoc, doc } from "@/firebase";
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
  mounted() {
    const auth = getAuth();
    const user = auth.currentUser;
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
    async brisanjeobjave() {
      await deleteDoc(doc(db, "Objave", this.info.id));
      console.log("RADIM");
    },
  },
};
</script>

<style scoped>
h5 {
  text-align: center;
}
.card-img-top {
  width: 100%;
  height: 15vw;
  object-fit: cover;
}
</style>
