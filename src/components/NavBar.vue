<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="boja">
      <a
        style="display: inline-flex"
        class="navbar-brand text-secondary"
        href="/"
      >
        <img src="@/assets/logo_pravi.png" width="50" height="50" alt="" />
      </a>
      <b-navbar-brand>
        <router-link to="/">Sportario</router-link></b-navbar-brand
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
            <b-dropdown-item href="#">Ostalo</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item>
            <router-link to="/vjezba">Događaji</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item>
            <router-link to="/login">Prijava</router-link></b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script></script>

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
