<template>
  <div>
    <a v-b-modal.modal-1>Obrati nam se</a>

    <b-modal id="modal-1" title="BootstrapVue" hide-footer>
      <p class="my-4">Hello from modal!</p>

      <form ref="form" @submit.prevent="sendEmail()">
        <!-- ime -->
        <b-form-group
          label="Ime"
          label-for="name-input"
          
        >
          <b-form-input
            id="name-input"
            v-model="name"
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
            required
          ></b-form-textarea>
        </b-form-group>
        <input type="submit" value="Pošalji"></input >
      </form>
    </b-modal>
  </div>
  <!-- <form ref="form" @submit.prevent="sendEmail">
    <label>Name</label>
    <input type="text" v-model="name" name="name" placeholder="Your Name" />
    <label>Email</label>
    <input type="email" v-model="email" name="email" placeholder="Your Email" />
    <label>Message</label>
    <textarea
      name="message"
      v-model="message"
      cols="30"
      rows="5"
      placeholder="Message"
    >
    </textarea>
    <input type="submit" value="Send" />
  </form> -->
</template>

<script>
import emailjs from "@emailjs/browser";
import store from "@/store";

export default {
  data() {
    return {
      store: store,
      name: "",
      email: "",
      message: "",
    };
  },
  methods: {
    sendEmail(e) {
      try {
        emailjs.sendForm(
          "service_0irjkff",
          "template_lb2gx7w",
          e.target,
          "AFqC38RaUdVo7OwKq",
          {
            name: this.name,
            email: this.email,
            message: this.message,
          }
        );
      } catch (error) {
        console.log({ error });
      }
      // Reset form field
      this.name = "";
      this.email = "";
      this.message = "";
    },
  },
};
</script>

<style scoped>
a {
  color: white;
}
</style>
