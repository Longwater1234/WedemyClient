<template>
  <div class="main-view login-view wrapper">
    <h2>Login to Continue Learning!</h2>

    <el-form
      @submit.prevent
      status-icon
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
    >
      <el-form-item style="margin-top: 8px" prop="email">
        <el-input
          native-type="email"
          autofocus="true"
          placeholder="E-mail"
          v-model.trim="loginForm.email"
          class="field"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          placeholder="Password"
          v-model.trim="loginForm.password"
          class="field"
          show-password
        ></el-input>
      </el-form-item>

      <div style="margin-top: 8px">
        <el-button
          class="btn-accent field login-btn"
          @click="handleLogin('loginForm')"
          style="font-weight: 600"
          native-type="submit"
          type="success"
          :loading="isLoading"
        >
          Log In
        </el-button>
      </div>
    </el-form>
    <div style="margin-top: 13px">
      Don't have an account?
      <router-link to="/signup" class="none" :style="{ fontWeight: '800' }">
        SignUp
      </router-link>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService";
import store from "@/store";
import { ElMessage } from "element-plus";
import isEmail from "validator/lib/isEmail";

export default {
  inject: ["store"],
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
      },

      // rules for the validation
      rules: {
        email: [{ validator: checkEmail, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
      },

      //other
      isLoading: false,
    };
  },
  methods: {
    handleLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLoading = true;
          this.submitToServer(this.loginForm)
            .then(() => this.redirectToHome())
            .catch((error) => this.displayError(error))
            .finally(() => (this.isLoading = false));
        } else {
          return false;
        }
      });
    },
    submitToServer: async (load) => {
      await AuthService.loginUser(load.email, load.password);
      await store.getAuthStatusServer();
    },
    redirectToHome() {
      ElMessage.success("Welcome back!");
      this.$router.push("/");
    },
    displayError(error) {
      let mama = error.response ? "Wrong credentials" : error.message;
      ElMessage.error(mama);
    },
  },
};
</script>

<style>
</style>
