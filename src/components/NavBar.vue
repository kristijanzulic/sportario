<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="boja">
      <a style="display: inline-flex" class="navbar-brand text-secondary">
        <img src="@/assets/logo_pravi.png" width="50" height="50" alt="" />
      </a>
      <b-navbar-brand>
        <router-link to="/">Sportario</router-link></b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav left>
        <b-navbar-nav v-if="store.currentUser">
          <b-nav-item>
            <router-link to="/sport">Sport</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="store.currentUser">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ store.currentUser.displayName }}</em>
            </template>
            <b-dropdown-item>
              <router-link to="/profile">Profil</router-link></b-dropdown-item
            >
            <b-dropdown-item><primjedba /></b-dropdown-item>
            <b-dropdown-item @click.prevent="logout">Odjavi se</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item>
            <router-link to="/login" v-if="!store.currentUser"
              >Prijava</router-link
            >
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "@/firebase";
import router from "../router";
import store from "@/store";
import primjedba from "./primjedba.vue";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.currentUser = user;
    console.log(store.currentUser);
    const currentRoute = router.currentRoute;
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    if (!currentRoute.meta.needsUser) {
      router.push({ name: "sport" });
    }
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
    store.currentUser = null;

    // if (currentRoute.meta.needsUser) {
    //   router.push({ name: "login" });
    // }
  }
});

export default {
  name: "navbar",
  data() {
    return {
      store: store,
    };
  },
  components: { primjedba },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$vToastify.info("Korisnik odjavljen");
          router.push({ name: "login" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.boja {
  background-color: #252525;
  width: 100%;
  position: relative;
  z-index: 1;
}
a {
  text-decoration: none;
  color: inherit;
}
a:hover {
  color: rgba(255, 255, 255, 0.75);
}
</style>
