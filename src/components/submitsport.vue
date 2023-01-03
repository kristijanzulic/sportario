<template>
  <div class="okvir">
    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col cols="4">
          <b-form @submit="onSubmit" @reset="onReset">
            <!-- Sport -->

            <b-form-group id="input" label="" label-for="input-2">
              <b-form-input
                id="input-2"
                type="text"
                v-model="form.sport"
                placeholder="Odaberi sport:"
                required
              ></b-form-input>
            </b-form-group>
            <!-- lokacija -->

            <b-form-select id="input">
              <b-form-select-option
                value="1"
                v-for="opcina in sortMj"
                :key="opcina.id"
                >{{ opcina.opcina }}</b-form-select-option
              >
            </b-form-select>

            <b-form-group id="input" label="" label-for="input-2">
              <b-form-input
                v-model="form.lokacija"
                id="input-2"
                type="text"
                placeholder="Odaberi lokaciju:"
                required
              ></b-form-input>
            </b-form-group>
            <!-- datum -->

            <b-form-group id="input" label="" label-for="input-2">
              <b-form-input
                id="input-2"
                type="date"
                onfocus="(this.type='date')"
                v-model="form.datum"
                placeholder="Odaberi datum:"
                required
              ></b-form-input>
            </b-form-group>
            <!-- Broj igraca -->
            <b-form-group id="input" label="" label-for="input-2">
              <b-form-input
                id="input-2"
                type="text"
                v-model="form.igrac"
                placeholder="Broj igrača:"
                required
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form></b-col
        >
        <b-col>ovo je </b-col>
        <b-col cols="7">
          <div>
            <b-form-textarea
              id="textarea-state"
              v-model="form.text"
              :state="form.text.length >= 10"
              placeholder="Enter at least 10 characters"
              rows="3"
              required
            ></b-form-textarea>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import opcine from "@/assets/popis";

export default {
  data() {
    return {
      popis: opcine,
      form: {
        text: "",
        sport: "",
        lokacija: "",
        datum: "",
        igrac: "",
        datum: "",
      },

      components: {},
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify());
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.sport = "";
      this.lokacija = "";
      this.datum = "";
      this.igrac = "";
      this.datum = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  computed: {
    sortMj() {
      const cats = this.popis.reduce((p, c) => {
        p[c.opcina] = c;
        return p;
      }, {});
      return Object.values(cats).sort((a, b) =>
        a.opcina.localeCompare(b.opcina)
      );
    },
  },
};
</script>

<style scoped>
.okvir {
  margin: 5%;
  border-style: solid;
  border-radius: 20px;
  border-color: black;
  padding: 20px;
  background-color: #a3a3a3;
}
#textarea-state {
  height: 50px;
  width: 20em;
}
#input {
  border: 2px;
  border-style: solid;
  border-color: green;
  width: 50%;
}
#input-2 {
  background-color: #d9d9d9;
  border-style: solid;
  border-radius: 20px;
  border-style: solid;
  color: black;
}
#select {
  background-color: #d9d9d9;
  border-style: solid;
  border-radius: 20px;
  border-style: solid;
  color: black;
  margin-right: 10%;
  border: 2px;
  border-style: solid;
  border-color: green;
  width: 50%;
  height: 40px;
}
</style>
