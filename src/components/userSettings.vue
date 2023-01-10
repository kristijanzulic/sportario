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
                          label="Ime i prezime: "
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
                <button type="button" @click="urediProfil()">
                  Spremi podatke
                </button></b-tab
              >
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
        })
        .catch((error) => {
          // An error occurred
          // ...
        });
    },

    async spremiOsobnePodatke() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        const docRef = await addDoc(collection(db, "Osobni podaci"), {
          ime: this.store.prezime,
          prezime: this.store.prezime,
          email: user.email,
          brojmobitela: this.store.broj,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async dohvatiobjave() {
      const auth = getAuth();
      const user = auth.currentUser;

      const querySnapshot = query(
        collection(db, "Objave"),
        orderBy("objavljeno", "desc"),
        where("email", "==", user.email),
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
        console.log(user.phoneNumber);
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
