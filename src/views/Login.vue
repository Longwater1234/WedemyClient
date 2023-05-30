<!-- LOGIN -->
<!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <div align="center" style="height: 80vh">
    <div class="loginContainer">
      <h3 class="loginHeader">Login to your Wedemy Account</h3>

      <!-- GOOGLE SIGN IN  -->
      <!-- https://developers.google.com/identity/gsi/web/guides/display-button -->
      <div
        id="g_id_onload"
        :data-client_id="GOOGLE_CLIENT_ID"
        data-context="signin"
        data-ux_mode="popup"
        :data-login_uri="SERVER_ROOT + '/oauth2/authorization/google'"
        data-auto_prompt="false"
      ></div>

      <div
        class="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
      <!-- END OF GOOGLE BUTTON -->

      <!-- START LOGIN FORM BELOW -->
      <el-form
        @submit.prevent
        status-icon
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
      >
        <el-form-item style="margin-top: 10px" prop="email">
          <el-input
            native-type="email"
            :prefix-icon="Message"
            placeholder="E-mail"
            maxlength="70"
            v-model.trim="loginForm.email"
            class="field"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            placeholder="Password"
            :prefix-icon="Lock"
            v-model.trim="loginForm.password"
            class="field"
            native-type="password"
            show-password
          ></el-input>
        </el-form-item>

        <!--  CAPTCHA BOX -->
        <!--        <el-form-item>
          <vue-hcaptcha
            ref="mycaptcha"
            :sitekey="HCAPTCHA_KEY"
            @verify="handleVerify"
          ></vue-hcaptcha>
        </el-form-item>-->

        <div style="margin-top: 8px">
          <el-button
            class="btn purple"
            @click="handleLogin('loginForm')"
            style="font-weight: bold"
            native-type="submit"
            :loading="isLoading"
          >
            Log in
          </el-button>
        </div>
      </el-form>
      <!-- END FORM -->

      <div style="margin-top: 13px">
        New user?
        <router-link to="/signup" class="none" :style="{ fontWeight: '800' }">
          Create an Account
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService";
import store from "@/store";
import { ElMessage } from "element-plus";
import isEmail from "validator/lib/isEmail";
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";
import { Lock, Message } from "@element-plus/icons-vue/dist/lib";
import { markRaw } from "@vue/reactivity";

export default {
  name: "Login",
  data() {
    document.title = "Login | Wedemy";
    // validation for email
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("E-mail can't be empty"));
      } else if (!isEmail(this.loginForm.email)) {
        callback(new Error("Email is invalid"));
      } else {
        callback();
      }
    };

    // validation for password
    const checkPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Password can't be empty"));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        email: "",
        password: "",
        responseToken: "",
      },

      // rules for the validation
      rules: {
        email: [{ validator: checkEmail, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
      },

      //other data
      Message: markRaw(Message),
      Lock: markRaw(Lock),
      isLoading: false,
      GOOGLE_CLIENT_ID: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      SERVER_ROOT: process.env.VUE_APP_BACKEND_ROOT_URL,
      //HCAPTCHA_KEY: process.env.VUE_APP_HCAPTCHA_CLIENT_KEY,
    };
  },
  methods: {
    handleLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        this.isLoading = true;
        this.submitToServer(this.loginForm)
          .then(() => this.redirectToHome())
          .catch((error) => this.displayError(error))
          .finally(() => (this.isLoading = false));
      });
    },
    async submitToServer(payload) {
      await AuthService.loginUser({ ...payload });
      await store.getAuthStatusServer();
      await store.getCartCountServer();
    },
    redirectToHome() {
      ElMessage.success("Welcome back!");
      this.$router.replace("/");
    },

    /** onSuccess captcha solve */
    handleVerify(token) {
      this.loginForm.responseToken = token;
    },
    displayError(error) {
      let mama = error.response ? "Wrong credentials!" : error.message;
      console.error("loginError", error);
      ElMessage.error(mama);
      setTimeout(() => {
        this.resetCaptcha();
      }, 200);
    },
    resetCaptcha() {
      this.loginForm.responseToken = "";
      this.$refs.mycaptcha.reset();
    },
  },
  mounted() {
    //attach GoogleAuth script
    const scripta = document.createElement("script");
    scripta.src = `https://accounts.google.com/gsi/client`;
    scripta.id = "google_client";
    document.getElementById("baba")?.appendChild(scripta); // see index.html
  },
  components: {
    VueHcaptcha,
  },
  beforeUnmount() {
    //detach above script
    document.getElementById("google_client")?.remove();
  },
};
</script>

<style>
.loginHeader {
  border-bottom: solid 1px #d1d7dc;
  color: #1c1d1f;
  display: block;
  font-weight: 700;
  padding: 24px 64px 24px 24px;
}

.loginContainer {
  color: #1c1d1f;
  width: 380px;
  text-align: center;
}

@media screen and (max-width: 600px) {
  .loginContainer {
    width: 250px;
  }
}
</style>
