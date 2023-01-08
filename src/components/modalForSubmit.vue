<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>Podnesi zahtjev</b-button>

    <b-modal
      id="modal-prevent-closing"
      ok-only
      ref="modal"
      title="Podnesi svoj zahtjev"
      hide-footer
    >
      <form>
        <!-- sport -->
        <label>Odaberi sport:</label> <br />
        <select v-model="store.sport">
          <option v-for="sport in sportovi" :key="sport.sport">
            {{ sport.sport }}
          </option>
        </select>

        <br />

        <label>Odaberi lokaciju:</label> <br />
        <select v-model="store.lokacija">
          <option v-for="opcina in sortMj" :key="opcina.id">
            {{ opcina.opcina }}
          </option>
        </select>

        <br />

        <label>Odaberi datum:</label> <br />
        <input v-model="store.datum" type="date" />

        <br />

        <label>Odaberi broj igraća:</label> <br />
        <input v-model="store.igraci" type="number" />

        <span>Unesi dodatno:</span>
        <p style="white-space: pre-line">{{ store.message }}</p>
        <textarea
          v-model="store.message"
          placeholder="add multiple lines"
        ></textarea>
      </form>
      <button type="button" @click="postNewImage()">Podnesi</button>
    </b-modal>
  </div>
</template>

<script>
import opcine from "@/assets/popis.json";
import sport from "@/assets/sportovi.json";
import store from "@/store";
import { getDocs, limit, orderBy, collection, addDoc, db } from "@/firebase";

export default {
  data() {
    return {
      popis: opcine,
      sportovi: sport,
      store: store,
    };
  },
  mounted() {},
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
        location.reload();
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
