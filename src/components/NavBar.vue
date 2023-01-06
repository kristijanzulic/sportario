<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="boja">
      <a style="display: inline-flex" class="navbar-brand text-secondary">
        <img src="@/assets/logo_pravi.png" width="50" height="50" alt="" />
      </a>
      <b-navbar-brand>
        <router-link to="">Sportario</router-link></b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav left>
        <b-navbar-nav>
          <b-nav-item-dropdown left>
            <!-- Using 'button-content' slot -->
            <template #button-content> Sport </template>
            <b-dropdown-item href="#">Nogomet</b-dropdown-item>
            <b-dropdown-item href="#">Košarka</b-dropdown-item>
            <b-dropdown-item href="#">Tennis</b-dropdown-item>
            <b-dropdown-item href="#">Biciklizam</b-dropdown-item>
            <b-dropdown-item href="#">Rukomet</b-dropdown-item>
            <b-dropdown-item href="#">Golf</b-dropdown-item>
            <b-dropdown-item href="/sport">Ostalo</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item>
            <router-link to="/vjezba">Događaji</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="store.currentUser">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="logout"
              >Sign Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item>
            <router-link to="/login" v-if="!store.currentUser"
              >Prijava</router-link
            ></b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "@/firebase";
import router from "../router";
import store from "@/store";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.currentUser = user.email;
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
    console.log("odjavljen");

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
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("odjavio si se");
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
