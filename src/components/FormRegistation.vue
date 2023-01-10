<template>
  <div class="forma">
    <b-form @submit.prevent="onSubmit" class="text-white">
      <!-- email -->
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
        <div v-if="errors && errors.email">
          {{ errors.email }}
        </div>
      </b-form-group>
      <!-- ime -->
      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="ime"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>
      <!-- password -->

      <b-form-group id="input-group-3" label-for="input-3">
        <label for="feedback-user">Lozinka:</label>
        <b-form-input
          v-model="password"
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
          v-model="rpassword"
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
    <!-- forma2 -->

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
      email: "",
      ime: "",
      password: "",
      rpassword: "",
      ime: "",
      store: store,
      errors: null,
    };
  },
  computed: {
    validation() {
      return this.password.length > 5 && this.password.length < 21;
    },
    validationr() {
      return this.password == this.rpassword;
    },
  },
  mounted() {
    this.onSubmit;
  },
  methods: {
    async onSubmit() {
      const errors = {};
      if (!this.email) {
        errors.email = "Email is required";
      } else if (!/^[^@]+@\w+(\.\w+)+\w$/.test(this.email)) {
        errors.email = "Email je nevažeći";
        this.$vToastify.error("Email je nevažeći ", "Greška");
      }

      if (Object.keys(errors).length > 0) {
        this.errors = errors;
        return;
      } else {
        this.errors = null;
      }

      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // ime
          const auth = getAuth();
          updateProfile(auth.currentUser, {
            displayName: this.ime,
          })
            .then(() => {
              this.$vToastify.success(
                "Dobrodošao: " + this.ime,
                "Korisnik je registriran"
              );
            })
            .catch((error) => {
              console.log(error);
            });
          // verifikacija
          sendEmailVerification(auth.currentUser).then(() => {
            this.$vToastify.info(
              "Email za verifikaciju je poslan na : " + this.email
            );
            console.log("poslan je email za verifikaciju");
            // ...
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.$vToastify.error(
            "Korisnik s istom email adresom već postoji",
            "Greška"
          );
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
