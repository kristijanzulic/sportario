<template>
  <div class="forma">
    <b-form @submit="onSubmit" v-if="show" class="text-white">
      <!-- email -->
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      <!-- ime -->
      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.ime"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>
      <!-- password -->

      <b-form-group id="input-group-3" label-for="input-3">
        <label for="feedback-user">Lozinka:</label>
        <b-form-input
          v-model="form.password"
          type="password"
          placeholder="Lozinka"
          :state="validation"
          id="feedback-user"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="validation">
          Lozinka mora sadržavati 6-20 znakova.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validation">
          Izgleda dobro.
        </b-form-valid-feedback>
      </b-form-group>

      <b-form-group id="input-group-3" label-for="input-3">
        <label for="feedback-user">Ponovi lozinku:</label>
        <b-form-input
          v-model="form.rpassword"
          type="password"
          placeholder="Lozinka"
          :state="validationr"
          id="feedback-user"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="validationr">
          Lozinka nije ista
        </b-form-invalid-feedback>

        <b-form-valid-feedback :state="validationr">
          Izgleda dobro.
        </b-form-valid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary">Registracija</b-button>
    </b-form>

    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import {
  getAuth,
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "@/firebase";
import store from "@/store";

export default {
  data() {
    return {
      form: {
        email: "",
        ime: "",
        password: "",
        rpassword: "",
        ime: "",
      },
      store: store,
      show: true,
    };
  },
  computed: {
    validation() {
      return this.form.password.length > 5 && this.form.password.length < 21;
    },
    validationr() {
      return this.form.password == this.form.rpassword;
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      // alert(JSON.stringify(this.form));

      createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          alert("Korisnik je registriran");
          // ime
          const auth = getAuth();
          updateProfile(auth.currentUser, {
            displayName: this.form.ime,
          })
            .then(() => {})
            .catch((error) => {
              alert(error);
            });
          // verifikacija
          sendEmailVerification(auth.currentUser).then(() => {
            console.log("poslan je email za verifikaciju");
            // ...
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(error.code + " " + error.message);
          // ..
        });
    },
  },
};
</script>

<style scoped>
.forma {
  border: 1px solid #bcbcbc;
  background: rgba(0, 0, 0, 0.7);
  opacity: 1;
  border-radius: 5%;
  font-family: "Montserrat" sans-serif;
  padding: 5%;
}
</style>
