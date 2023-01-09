<template>
  <div>
    <h2></h2>
    <userSettings />
    <button type="button" @click="brisanje()">Obrisi me</button>
    <button type="button" @click="promijenilozinku()">Promijeni lozinku</button>
    <form class="delete"></form>
  </div>
</template>
<script>
import userSettings from "@/components/userSettings.vue";
import store from "@/store";
import { getAuth, deleteUser, sendPasswordResetEmail } from "@/firebase";

export default {
  data: {
    data() {
      return {
        store: store,
        lozinka: "",
      };
    },
  },

  components: {
    userSettings,
  },
  mounted() {
    this.azurirajlozinku();
  },
  methods: {
    azurirajlozinku() {
      const auth = getAuth();
      const user = auth.currentUser;
    },

    promijenilozinku() {
      const auth = getAuth();
      const user = auth.currentUser;
      sendPasswordResetEmail(auth, user.email)
        .then(() => {
          // Password reset email sent!
          // ..
          alert("Link za promjenu je poslan na email");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error" + error.message);

          // ..
        });
    },
    brisanje() {
      const auth = getAuth();
      const user = auth.currentUser;

      deleteUser(user)
        .then(() => {
          // User deleted.
          console.log("korisnik je obrisan");
        })
        .catch((error) => {
          // An error ocurred
          console.log("korisnik nije obrisan");
          console.log(error);

          // ...
        });
    },
  },
};
</script>
<style scoped></style>
