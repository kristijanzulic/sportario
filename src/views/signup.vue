<template>
  <form ref="form" @submit.prevent="sendEmail">
    <label>Name</label>
    <input type="text" v-model="name" name="user_name" />
    <label>Email</label>
    <input type="email" v-model="email" name="user_email" />
    <label>Message</label>
    <textarea name="message"></textarea>
    <input type="submit" v-model="message" value="Send" />
  </form>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  display: block;
  margin: auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 50%;
}

label {
  float: left;
}

input[type="text"],
[type="email"],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}
</style>

<script>
import emailjs from "@emailjs/browser";
import store from "@/store";

export default {
  name: "ContactUs",
  data() {
    return {
      name: store.currentUser.displayName,
      email: store.currentUser.email,
      message: "",
      store: store,
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
