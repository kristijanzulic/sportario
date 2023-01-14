<template>
  <div>
    <a v-b-modal.modal-1 @click="showModal">Obrati nam se</a>

    <b-modal
      header-bg-variant="light"
      title="Podnesi svoj zahtjev"
      ref="my-modal"
      hide-footer
    >
      <p class="my-4">Imaš pritužbu ili ideju? Slobodno nam se obrati.</p>

      <form ref="form" @submit.prevent="sendEmail()">
        <!-- ime -->
        <b-form-group label="Ime" label-for="name-input">
          <b-form-input
            type="text"
            v-model="name"
            name="user_name"
            id="name-input"
            required
          ></b-form-input>
        </b-form-group>
        <!-- email -->
        <b-form-group label="Email" label-for="name-input">
          <b-form-input
            type="email"
            id="name-input"
            v-model="email"
            name="user_email"
            required
          ></b-form-input>
        </b-form-group>
        <!-- textarea -->
        <b-form-group label="Unesi poruku">
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
        <b-button
          type="input"
          class="mt-3"
          variant="primary"
          block
          @submit.prevent="postNewImage()"
          >Podnesi</b-button
        >
      </form>
    </b-modal>

    <!-- <b-modal id="modal-1" title="Obrazac" hide-footer>
      
    </b-modal> -->
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
    };
  },
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
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
            this.$vToastify.info(
              "U najbržem roku ćemo ti odgovoriti",
              "Hvala ti"
            );
            this.message = "";
            this.hideModal();
            return this.hideModal();
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
