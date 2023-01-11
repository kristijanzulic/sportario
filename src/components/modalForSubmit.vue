<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing  class="boja">Podnesi zahtjev</b-button>

    <b-modal
      id="modal-prevent-closing"
      ok-only
      ref="modal"
      title="Podnesi svoj zahtjev"
      hide-footer
      header-bg-variant="light"
    >
    
      <form @submit.prevent="postNewImage()">
        <!-- sport -->
        <label>Odaberi sport:</label> <br />
        <select v-model="store.sport" class="input" required>
          <option v-for="sport in sportovi" :key="sport.sport">
            {{ sport.sport }}
          </option>
        </select>

        <br />

        <label>Odaberi lokaciju:</label> <br />
        <select v-model="store.lokacija" class="input" required>
          <option v-for="opcina in sortMj" :key="opcina.id">
            {{ opcina.opcina }}
          </option>
        </select>

        <br />

        <label>Odaberi datum:</label> <br />
        <input v-model="store.datum"  type="date" max="2023-12-31" class="input" required/>

        <br />

        <label>Odaberi broj igraća:</label> <br />
        <input v-model="store.igraci" type="number" class="input" required />
        <br />
        <span>Unesi dodatno:</span>
        <br />

        <textarea
          v-model="store.message"
          v-on:keyup="countdown"
          placeholder="Max 140 znakova"
          rows="4" cols="25" maxlength="140"
          class="input"
          required
        ></textarea>
        <p class='brojac'>{{remainingCount}}/140</p>
        <div>
          <input type="submit" value="Podnesi"></input >
          
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>

import opcine from "@/assets/popis.json";
import sport from "@/assets/sportovi.json";
import store from "@/store";
import { collection, addDoc, db } from "@/firebase";

export default {
  data() {
    return {
      popis: opcine,
      sportovi: sport,
      store: store,
      maxCount: 140,
      remainingCount: 140,
      hasError: false,
    };
  },
  mounted() {},
  methods: {
    countdown: function() {
      this.remainingCount = this.maxCount - this.store.message.length;
      this.hasError = this.remainingCount < 0;
    },  
    async postNewImage() {
      // let name = "posts/" + store.currentUser + "/" + Date.now() + ".txt";
      try {
        const docRef = await addDoc(collection(db, "Objave"), {
          sport: this.store.sport,
          lokacija: this.store.lokacija,
          datum: this.store.datum,
          igraci: this.store.igraci,
          poruka: this.store.message,
          email: this.store.currentUser.email,
          ime: this.store.currentUser.displayName,
          objavljeno: Date.now(),
        });
        this.$vToastify.success("", "Uspješno");
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
  computed: {
    sortMj() {
      const cats = this.popis.reduce((p, c) => {
        p[c.opcina] = c;
        return p;
      }, {});
      return Object.values(cats).sort((a, b) =>
        a.opcina.localeCompare(b.opcina)
      );
    },
    imeprezime() {
      return (
        this.store.sport +
        " " +
        this.store.lokacija +
        " " +
        this.store.datum +
        " " +
        this.store.igraci +
        " " +
        this.store.message
      );
    },
  },
};
</script>

<style scoped>
.boja{
  color:white;
  background-color: #093657;
  margin-top: 4px ;
  border-color: #093657;
}

</style>