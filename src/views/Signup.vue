<!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <div align="center" style="height: 80vh">
    <div class="loginContainer">
      <h3 class="loginHeader">Sign Up and Start Learning!</h3>

      <!-- GOOGLE SIGN UP  -->
      <!-- https://developers.google.com/identity/gsi/web/guides/display-button -->
      <div
        id="g_id_onload"
        :data-client_id="GOOGLE_CLIENT_ID"
        data-context="signup"
        data-ux_mode="popup"
        :data-login_uri="SERVER_ROOT + '/oauth2/authorization/google'"
        data-auto_prompt="false"
      ></div>

      <div
        class="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signup_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
      <!-- END OF GOOGLE BUTTON -->

      <!-- START SIGNUP FORM -->
      <el-form
        @submit.prevent
        status-icon
        :model="signupForm"
        :rules="rules"
        ref="signupForm"
      >
        <el-form-item style="margin-top: 10px" prop="fullname" required>
          <el-input
            placeholder="Name"
            v-model="signupForm.fullname"
            :prefix-icon="User"
            maxlength="70"
            class="field"
            clearable
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="email" required>
          <el-input
            placeholder="E-mail"
            v-model.trim="signupForm.email"
            maxlength="70"
            :prefix-icon="Message"
            class="field"
            type="email"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" required>
          <el-input
            type="password"
            placeholder="Password"
            v-model.trim="signupForm.password"
            :prefix-icon="Lock"
            maxlength="80"
            class="field"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item prop="confirmPass" required>
          <el-input
            placeholder="Re-Enter Password"
            v-model.trim="signupForm.confirmPass"
            :prefix-icon="Lock"
            maxlength="80"
            class="field"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item style="margin-top: 8px">
          <el-button
            class="btn purple"
            @click="handleSignup('signupForm')"
            style="font-weight: bold"
            :loading="isLoading"
            native-type="submit"
          >
            Sign Up
          </el-button>
        </el-form-item>
      </el-form>

      <div style="margin-top: 13px">
        Already have an account?
        <router-link to="/login" :style="{ fontWeight: '800' }">
          LogIn
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService";
import { ElMessage } from "element-plus";
import isEmail from "validator/lib/isEmail";
import { Lock, User, Message } from "@element-plus/icons-vue/dist/lib";
import { markRaw } from "@vue/reactivity";

export default {
  name: "SignUp",
  data() {
    document.title = "SignUp | Wedemy";

    /* validation for fullname */
    const checkName = (rule, value, callback) => {
      let reg = /[^ 0-9a-z_\.\-']/gi;
      if (!value) {
        return callback(new Error("Name can't be empty"));
      }
      setTimeout(() => {
        if (value.length < 2) {
          callback(new Error("Name is too short"));
        } else if (reg.test(this.signupForm.fullname)) {
          callback(new Error("Name contains illegal characters"));
        } else {
          callback();
        }
      }, 100);
    };

    // validation for email
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("E-mail can't be empty"));
      } else if (!isEmail(this.signupForm.email)) {
        callback(new Error("Email is invalid"));
      } else {
        callback();
      }
    };

    // validation for password
    const checkPassword = (rule, value, callback) => {
      let passwordReg = /^(?=.*[0-9])(?=.*[a-zA-Z]).*([a-zA-Z0-9]+?)?$/gi;
      if (!value) {
        callback(new Error("Password can't be empty"));
      } else if (value.length < 8) {
        return callback(new Error("Minimum length is 8 characters"));
      } else if (!passwordReg.test(value)) {
        callback(new Error("Required at least 1 digit and 1 letter"));
      } else {
        callback();
      }
    };

    // validation for confirm password
    const checkRepeatPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Re-enter the password"));
      } else if (value !== this.signupForm.password) {
        callback(new Error("Passwords don't match!"));
      } else {
        callback();
      }
    };

    return {
      signupForm: {
        fullname: "",
        email: "",
        password: "",
        confirmPass: ""
      },

      // rules for the validation
      rules: {
        fullname: [{ validator: checkName, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
        confirmPass: [{ validator: checkRepeatPass, trigger: "blur" }],
      },

      //other
      User: markRaw(User),
      Lock: markRaw(Lock),
      Message: markRaw(Message),
      isLoading: false,
      GOOGLE_CLIENT_ID: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      SERVER_ROOT: process.env.VUE_APP_BACKEND_ROOT_URL,
    };
  },
  methods: {
    handleSignup(formName) {
      const self = this;
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        this.isLoading = true;
        this.submitToServer(this.signupForm)
          .then(() => this.redirectToLogin())
          .catch((error) => self.handleError(error))
          .finally(() => (this.isLoading = false));
      });
    },
    submitToServer: async (payload) => {
      await AuthService.registerUser({ ...payload });
    },
    redirectToLogin() {
      ElMessage.success("Welcome to Wedemy. Please Login");
      setTimeout(() => {
        window.location.replace("/login");
      }, 500);
    },
    handleError(err) {
      let mama = err.response ? err.response.data.message : err.message;
      ElMessage.error(mama);
    },
  },
  mounted() {
    //attach GoogleAuth script
    const scripta = document.createElement("script");
    scripta.src = `https://accounts.google.com/gsi/client`;
    scripta.id = "google_client";
    document.getElementById("baba")?.appendChild(scripta); //see public/index.html
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
