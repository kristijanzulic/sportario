<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>Podnesi zahtjev</b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Podnesi svoj zahtjev"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <!-- sport -->
        <label>Odaberi sport:</label> <br />
        <select v-model="store.sport1">
          <option v-for="sport in sportovi" :key="sport.sport">
            {{ sport.sport }}
          </option>
        </select>

        <br />

        <label>Odaberi lokaciju:</label> <br />
        <select v-model="store.lokacija1">
          <option v-for="opcina in sortMj" :key="opcina.id">
            {{ opcina.opcina }}
          </option>
        </select>

        <br />

        <label>Odaberi datum:</label> <br />
        <input v-model="store.datum1" type="date" />

        <br />

        <label>Odaberi broj igraća:</label> <br />
        <input v-model="store.igraci1" type="number" />

        <span>Unesi dodatno:</span>
        <p style="white-space: pre-line">{{ message }}</p>
        <textarea
          v-model="store.message"
          placeholder="add multiple lines"
        ></textarea>

        <p>ovo je :{{ imeprezime }}</p>
      </form>
    </b-modal>
  </div>
</template>

<script>
import opcine from "@/assets/popis.json";
import sport from "@/assets/sportovi.json";
import store from "@/store";

export default {
  data() {
    return {
      popis: opcine,
      sportovi: sport,
      store: store,
    };
  },
  methods: {},
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
        this.store.sport1 +
        " " +
        this.store.lokacija1 +
        " " +
        this.store.datum1 +
        " " +
        this.store.igraci1 +
        " " +
        this.store.message
      );
    },
  },
};
</script>
