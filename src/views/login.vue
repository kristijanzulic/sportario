<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-4 sve">
          <div class="forma">
            <form>
              <img class="pic" src="@/assets/logo_pravi.png" alt="" />
              <div class="form-group">
                <input
                  type="email"
                  v-model="email"
                  class="form-control bojainput"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                />
                <div v-if="errors && errors.email">
                  {{ errors.email }}
                </div>
              </div>
              <div class="form-group">
                <input
                  type="password"
                  v-model="password"
                  class="form-control bojainput"
                  id="password"
                  placeholder="Lozinka"
                />
              </div>

              <button type="button" @click="login()" class="tipka btn">
                Prijava
              </button>
              <p class="zab2">
                <router-link class="zab" to="/">Nemaš račun?</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>

    <img src="@/assets/backround.jpg" alt="" class="bg-img" />
  </div>
</template>

<script>
import { getAuth, auth, signInWithEmailAndPassword } from "@/firebase";
import store from "@/store";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      errors: null,
      store: store,
    };
  },
  methods: {
    async login() {
      if (this.password.length < 6 && this.email == "") {
        this.$vToastify.error(
          "Lozinka treba sadržavati najmanje 6 znamenki. Vaša lozinka sadržava " +
            this.password.length
        );
      }

      const errors = {};
      if (!this.email) {
        errors.email = "Email is required";
      } else if (!/^[^@]+@\w+(\.\w+)+\w$/.test(this.email)) {
        errors.email = "Invalid email";
      }

      if (Object.keys(errors).length > 0) {
        this.errors = errors;
        return;
      } else {
        this.errors = null;
      }

      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          console.log("Korisnik je prijavljen");
          this.$vToastify.success("Korisnik je prijavljen", "Uspješno");
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.$vToastify.error(error.code, "Greška");
        });
    },
  },
};
</script>

<style scoped>
.bg-img {
  top: 0;
  left: 0;
  width: 1920px;
  position: fixed;
  z-index: -1;
  filter: brightness(70%);
}
.sve {
  width: 50%;
  border: 3px;
  padding: 10px;
  margin-left: 35%;
  margin-top: 15%;
}
.forma {
  border-style: solid;
  border-color: #adadad;
  display: block;
  border-radius: 20px;
  background-color: #000000;
  padding: 20px;
  width: 50%;
  height: auto;
}

.bojabox {
  color: #adadad;
}
.bojainput {
  background: #000000;
  color: white;
  border-style: solid;
  border-color: #adadad;
}
.tipka {
  border-radius: 50px;
  margin: auto;
  width: 100%;
  font-size: 18px;
  background-color: #adadad;
}
.tipka:hover {
  color: black;
  background-color: white;
}
.space {
  margin-top: 20%;
}
.pic {
  width: 60px;
  height: 60px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}
.zab {
  color: gray;
  margin-left: 50%;

  border: 1px;
  border-color: yellow;
}
.zab2 {
  margin-top: 10%;
}
.zab:hover {
  background-color: #000000;
  color: white;
}

a {
  text-decoration: none;
  color: white;
}
@media only screen and (max-width: 600px) {
  .forma {
    border-style: solid;
    border-color: #adadad;
    display: block;
    width: 20em;
    margin-right: 10em;
    border-radius: 20px;
    background-color: #000000;
    padding: 20px;
  }
  .sve {
    margin-left: 3.5em;
    width: 50%;
    border: 3px;
    padding: 10px;
  }
}
</style>
