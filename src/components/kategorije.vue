<template>
  <div>
    <div>
      <b-button v-b-toggle.collapse-3 class="m-1 kategorije"
        >Kategorije</b-button
      >
      <b-collapse visible id="collapse-3">
        <b-card class="kategorije">
          <router-link to="/Sport"> <a>Sve</a></router-link>
          <br />
          <router-link to="/nogomet"> <a>Nogomet</a></router-link>
          <br />
          <router-link to="/kosarka"> <a>Košarka</a></router-link>
          <br />
          <router-link to="/tenis"> <a>Tenis</a></router-link>
          <br />
          <router-link to="/ostalo"> <a>Ostalo</a></router-link>
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>
<style scoped>
a {
  text-decoration: none;
  color: whitesmoke;
}
a:hover {
  text-decoration: underline;
}
.kategorije {
  background-color: gray;
  color: black;
}
</style>
