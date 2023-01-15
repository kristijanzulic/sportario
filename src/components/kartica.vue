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
      <h2 class="">{{ info.sport }}</h2>
      <h5>{{ info.lokacija }}</h5>
      <p class="card-text info">Poruka: {{ info.poruka }}</p>
      <p>Potreban broj ljudi: {{ info.igraci }}</p>
      <p>{{ datum }}</p>

      <b-row>
        <b-col class="text-left"
          ><b-button
            variant="primary"
            v-if="info.email != this.store.currentUser.email"
          >
            <a class="mailtoui" v-bind:href="'mailto:' + info.email"
              >Javi mi se</a
            >
          </b-button></b-col
        >
        <b-col class="text-right">
          <button
            type="button"
            class="btn btn-danger"
            data-toggle="button"
            aria-pressed="false"
            autocomplete="off"
            v-if="info.email == this.store.currentUser.email"
            @click="brisanjeobjave()"
          >
            Obriši
          </button></b-col
        >
      </b-row>

      <!-- mail -->

      <!--  -->
      <div class="card-footer text-muted">
        {{ postedFromNow }} <br />
        Korisnik: {{ info.ime }}
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { getAuth, collection, addDoc, db, deleteDoc, doc } from "@/firebase";
import moment from "moment";
const MailtoUI = require("../../node_modules/mailtoui/dist/mailtoui-min");

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
    datum() {
      moment.locale("hr");
      return moment(this.info.datum).format("MMM Do YY");
    },
  },
  mounted() {
    const auth = getAuth();
    const user = auth.currentUser;
    MailtoUI.run({
      title: "Odaberi kako želiš poslati email",
      buttonIcon1:
        "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg",
    }); // <--- Run MailtoUI manually
  },
  methods: {
    async brisanjeobjave() {
      await deleteDoc(doc(db, "Objave", this.info.id));
      this.$vToastify.success("Objava obrisana", "Uspješno");
    },
  },
};
</script>

<style scoped>
h5 {
  text-align: center;
}
h2 {
  text-align: center;
}
p.info {
  text-align: center;
}
.card-img-top {
  width: 100%;
  height: 15vw;
  object-fit: cover;
}
a {
  text-decoration: none;
  color: white;
}
</style>
