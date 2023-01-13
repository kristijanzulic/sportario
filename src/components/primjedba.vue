<template>
  <div>
    <a v-b-modal.modal-1>Obrati nam se</a>

    <b-modal id="modal-1" title="Obrazac" hide-footer>
      <p class="my-4">Imaš pritužbu ili ideju? Slobodno nam se obrati.</p>

      <form ref="form" @submit.prevent="sendEmail()">
        <!-- ime -->
        <b-form-group
          label="Ime"
          label-for="name-input"
          
        >
          <b-form-input
            type="text" 
            v-model="name" 
            name="user_name"
            id="name-input"
            required
          ></b-form-input>
        </b-form-group>
        <!-- email -->
        <b-form-group
          label="Email"
          label-for="name-input"
          
        >
          <b-form-input
            type="email"
            id="name-input"
            v-model="email"
            name="user_email"
            required
          ></b-form-input>
        </b-form-group>
        <!-- textarea -->
        <b-form-group
          label="Unesi poruku"
          
        >
          <b-form-textarea
            id="textarea"
            v-model="message"
            placeholder=""
            rows="3"
            max-rows="6"
            name="message"
            required
          ></b-form-textarea>
        </b-form-group>
        <input type="submit" value="Pošalji"></input >
      </form>
    </b-modal>
  </div>
  
</template>

<script>
import emailjs from "@emailjs/browser";
import store from "@/store";

export default {
  data() {
    return {
      store: store,
      name: store.currentUser.displayName,
      email: store.currentUser.email,
      message: "",
      message: "",
    };
  },
  methods: {
    sendEmail() {
      emailjs
        .sendForm(
          "service_td3oaad",
          "template_lb2gx7w",
          this.$refs.form,
          "AFqC38RaUdVo7OwKq"
        )
        .then(
          (result) => {
            console.log("SUCCESS!", result.text);
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    },
  },
};
</script>

<style scoped>
a {
  color: white;
}
</style>
