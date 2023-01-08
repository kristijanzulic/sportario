<template>
  <div>
    <h2></h2>
    <userSettings />
    <button type="button" @click="brisanje()">Obrisi me</button>
    <button type="button" @click="promijenilozinku()">Promijeni lozinku</button>
    <form class="delete">
      <label for="id">document id: </label>
      <input type="text" name="id" required />
      <button @click="brisanjeobjave()">Delete a book</button>
    </form>
  </div>
</template>
<script>
import userSettings from "@/components/userSettings.vue";
import store from "@/store";
import {
  getAuth,
  deleteUser,
  sendPasswordResetEmail,
  doc,
  deleteDoc,
  collection,
  db,
} from "@/firebase";

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
    this.dohvatiobjave();
  },
  methods: {
    azurirajlozinku() {
      const auth = getAuth();
      const user = auth.currentUser;
      console.log(user.email);
      console.log(user.emailVerified);
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
    brisanjeobjave() {
      const deleteBookForm = document.querySelector(".delete");
      deleteBookForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const docRef = doc(db, "Objave", deleteBookForm.id.value);

        deleteDoc(docRef).then(() => {
          console.log("Obrisano je");
          deleteBookForm.reset();
          location.reload();
        });
      });
    },
  },
};
</script>
<style scoped></style>
