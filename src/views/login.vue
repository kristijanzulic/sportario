<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4">
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
              <div class="form-group form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label bojabox" for="exampleCheck1"
                  >Zapamti me</label
                >
              </div>
              <button type="button" @click="login" class="tipka btn">
                Prijava
              </button>
              <p class="zab">Zaboravio si lozinku?</p>
            </form>
          </div>
        </div>
        <div class="col-4"></div>
      </div>
    </div>

    <img src="@/assets/backround.jpg" alt="" class="bg-img" />
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>

<style scooped>
.bg-img {
  top: 0;
  left: 0;
  width: 1920px;
  position: fixed;
  z-index: -1;
  filter: brightness(70%);
}
.forma {
  border-style: solid;
  border-color: #adadad;
  width: 350px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50%;
  border-radius: 20px;
  background-color: #000000;
  padding: 20px;
}
.bojabox {
  color: #adadad;
}
.bojainput {
  background: #000000;
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
  color: #adadad;
  margin-left: 50%;
  margin-top: 50px;
}
</style>
