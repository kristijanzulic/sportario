<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-card no-body>
            <b-tabs pills card vertical nav-wrapper-class="w-25">
              <b-tab title="Objave"
                ><b-card-text>
                  <karticaVue
                    class="kartica"
                    v-for="card in cards"
                    :key="card.id"
                    :info="card"
                  /> </b-card-text
              ></b-tab>

              <b-tab title="Postavke" active>
                <b-card-text
                  ><b-container class="bv-example-row">
                    <b-row>
                      <b-col>
                        <!-- ime i prezime-->
                        <b-form-group
                          label-cols-sm="4"
                          label-cols-lg="3"
                          content-cols-sm
                          content-cols-lg="7"
                          label="Korisničko ime: "
                        >
                          <b-form-input
                            v-model="store.currentUser.displayName"
                          ></b-form-input>
                        </b-form-group>

                        <!-- email -->
                        <b-form-group
                          disabled
                          label-cols-sm="4"
                          label-cols-lg="3"
                          content-cols-sm
                          content-cols-lg="7"
                          label="e-mail: "
                        >
                          <b-form-input
                            id="input-horizontal"
                            type="email"
                            v-model="store.currentUser.email"
                          ></b-form-input>
                        </b-form-group>
                        <!-- phone -->
                      </b-col>
                    </b-row>
                  </b-container></b-card-text
                >
                <button
                  type="button"
                  class="btn btn-success"
                  data-toggle="button"
                  aria-pressed="false"
                  autocomplete="off"
                  @click="urediProfil()"
                >
                  Spremi podatke
                </button>
                <br />
                <button
                  type="button"
                  class="btn btn-warning"
                  data-toggle="button"
                  aria-pressed="false"
                  autocomplete="off"
                  @click="promijenilozinku()"
                >
                  Nova lozinka
                </button>
                <br />
                <button
                  type="button"
                  class="btn btn-danger"
                  data-toggle="button"
                  aria-pressed="false"
                  autocomplete="off"
                  @click="brisanjeracuna()"
                >
                  Deaktiviraj račun
                </button>
              </b-tab>
            </b-tabs>
          </b-card></b-col
        >
        <b-col sm="2">3 of 3</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import store from "@/store";
import karticaVue from "@/components/kartica.vue";
import router from "../router";
import {
  getAuth,
  addDoc,
  collection,
  db,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
  doc,
  updateProfile,
  sendPasswordResetEmail,
  deleteUser,
  signOut,
} from "@/firebase";

export default {
  name: "userSettings",
  data() {
    return {
      store: store,
      cards: [],
    };
  },
  components: { karticaVue },
  mounted() {
    this.dohvatiobjave();
  },
  methods: {
    async urediProfil() {
      const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName: this.store.currentUser.displayName,
      })
        .then(() => {
          console.log("Radim");
          this.$vToastify.success("Postavke ažurirane", "Uspješno");
        })
        .catch((error) => {
          // An error occurred
          // ...
        });
    },

    async dohvatiobjave() {
      const auth = getAuth();
      const user = auth.currentUser;

      const querySnapshot = query(
        collection(db, "Objave"),
        orderBy("objavljeno", "desc"),
        where("email", "==", user.email)
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
    brisanjeracuna() {
      const auth = getAuth();
      const user = auth.currentUser;

      deleteUser(user)
        .then(() => {
          // User deleted.
          this.$vToastify.info("Račun deaktiviran", "Uspješno");
          router.push({ name: "home" });
        })
        .catch((error) => {
          // An error ocurred
          console.log("korisnik nije obrisan");
          this.$vToastify.error("Potrebno je ponovno se prijaviti", "Greška");
          console.log(error);
          const auth = getAuth();
          signOut(auth)
            .then(() => {
              this.$vToastify.info("Račun je odjavljen");

              router.push({ name: "home" });
            })
            .catch((error) => {
              console.log(error);
            });
          // ...
        });
    },
    promijenilozinku() {
      const auth = getAuth();
      const user = auth.currentUser;
      sendPasswordResetEmail(auth, user.email)
        .then(() => {
          // Password reset email sent!
          // ..
          this.$vToastify.info("Poslano na email adresu : " + user.email);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.$vToastify.error(error.message, "Greška");

          console.log("error" + error.message);

          // ..
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
.btn {
  margin-top: 5px;
}
</style>
