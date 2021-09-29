<template>
  <div class="main-view login-view wrapper">
    <h2>Login to Continue Learning!</h2>
    <p style="color: red; margin-top: 10px; font-weight: 600">
      {{ loginError }}
    </p>

    <el-form @submit.prevent status-icon :model="loginForm" :rules="rules" ref="loginForm">
      <el-form-item style="margin-top: 8px" prop="email">
        <el-input
          type="email"
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
        <button
          class="btn-accent field login-btn"
          @click="handleLogin('loginForm')"
          style="font-weight: 600"
          type="submit"
          :loading="isLoading"
        >
          Log In
        </button>
      </div>
    </el-form>

    <div style="margin-top: 13px">
      Don't have an account?
      <router-link to="/signup" class="none" :style="{ fontWeight: '800' }"
        >SignUp
      </router-link>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService";
export default {
  inject: ["store", "actions"],
  data() {
    document.title = "Login | Wedemy";

    // validation for email
    const checkEmail = (rule, value, callback) => {
      let reg = /(^[0-9A-Za-z][\w.-]+@[\w]+\.[\w]\S+\w)$/gi;

      if (!value) {
        return callback(new Error("E-mail can't be empty"));
      } else if (!reg.test(this.loginForm.email)) {
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
      loginError: "",
      isLoading: false,
    };
  },

  methods: {
    handleLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLoading = true;
          this.submitToServer(this.loginForm)
            .catch((error) => {
              this.loginError = error.message;
            })
            .finally(() => (this.isLoading = false));
        } else {
          return false;
        }
      });
    },
    submitToServer: async (load) => {
     let res = await AuthService.loginUser(load.email, load.password);
    // res.data.user.fullname   <==== attach this to Store
    },
  },
};
</script>

<style>
</style>
