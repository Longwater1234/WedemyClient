<!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <div align="center" style="height: 80vh">
    <div class="login-container">
      <h3 class="login-header">Login to your Wedemy Account</h3>

      <!-- GOOGLE SIGN IN, SEE DOCS  -->
      <!-- https://developers.google.com/identity/gsi/web/guides/display-button -->
      <!-- <div
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
      ></div> -->
      <!-- END OF GOOGLE BUTTON -->

      <div>
        <el-button class="btn" type="warning" @click="randomAccount"> Use a Test Account</el-button>
      </div>

      <!-- START LOGIN FORM BELOW -->
      <el-form @submit.prevent="handleLogin" status-icon :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item style="margin-top: 10px" prop="email">
          <el-input
            type="email"
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
            show-password
          ></el-input>
        </el-form-item>

        <!--  CAPTCHA BOX -->
        <el-form-item>
          <vue-hcaptcha ref="myCaptcha" :sitekey="HCAPTCHA_KEY" @verify="handleVerify"></vue-hcaptcha>
        </el-form-item>

        <div style="margin-top: 8px">
          <el-button class="btn purple" style="font-weight: bold" native-type="submit" :loading="isLoading">
            Log in
          </el-button>
        </div>
      </el-form>
      <!-- END FORM -->

      <div style="margin-top: 13px">
        New user?
        <router-link to="/signup" class="none" style="font-weight: 800"> Create an Account</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AuthService from "@/service/AuthService";
import { ElMessage } from "element-plus";
import { Lock, Message } from "@element-plus/icons-vue";
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { handleApiError } from "@/util/http_util";
import type { FormInstance, FormRules } from "element-plus";
import { useStudentStore } from "@/stores";
import sampleUserList from "@/sampleusers.json";
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";
import type { LoginRequest, UserDto } from "@/interfaces/custom";
import { useRouter } from "vue-router";

const router = useRouter();
const loginFormRef = ref<FormInstance>();
const store = useStudentStore();
const myCaptcha = ref<VueHcaptcha>();
const responseToken = ref("");

interface SampleUser {
  email: string;
  pass: string;
}

// validation for password
const checkPassword = (rule: any, value: string, callback: (arg?: Error) => void) => {
  if (!value) {
    callback(new Error("Password can't be empty"));
  } else {
    callback();
  }
};

const loginForm = reactive<LoginRequest>({
  email: "",
  password: ""
});

// rules for the validation
const rules = reactive<FormRules>({
  email: [{ required: true, type: "email", trigger: "blur" }],
  password: [{ validator: checkPassword, trigger: "blur" }]
});

const isLoading = ref(false);
const GOOGLE_CLIENT_ID = computed(() => {
  return import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
});

const SERVER_ROOT = computed(() => {
  return import.meta.env.VITE_APP_BACKEND_ROOT_URL;
});

const HCAPTCHA_KEY = computed(() => {
  return import.meta.env.VITE_APP_HCAPTCHA_CLIENT_KEY;
});

/**
 * Validate then submit form to backend
 */
async function handleLogin() {
  const isValid = await loginFormRef.value?.validate();
  if (!isValid) return;
  isLoading.value = true;
  submitToServer(loginForm)
    .then(() => redirectToHome())
    .catch(error => displayError(error))
    .finally(() => (isLoading.value = false));
}

/**
 * Submit form to backend, and if ok, store result to Pinia
 * @param payload login data
 */
async function submitToServer(payload: LoginRequest) {
  const res = await AuthService.loginUser({ ...payload }, responseToken.value);
  const user: UserDto = res.data.userInfo;
  store.$patch({
    id: user.id,
    fullname: user.fullname,
    loggedIn: true
  });
  await store.getLoginStatus();
  await store.getCartCountServer();
}

function redirectToHome() {
  ElMessage.success("Welcome back!");
  router.replace("/");
}

/** onSuccess captcha solve */
function handleVerify(token: string) {
  responseToken.value = token;
}

/**
 * Randomize test account
 */
function randomAccount() {
  const len = sampleUserList.length;
  const randomIndex = Math.floor(Math.random() * len + 1);
  const account: SampleUser = sampleUserList[randomIndex];
  loginForm.email = account.email;
  loginForm.password = account.pass;
}

function displayError(err: any) {
  handleApiError(err);
  setTimeout(() => {
    resetCaptcha();
  }, 200);
}

function resetCaptcha() {
  responseToken.value = "";
  myCaptcha.value?.reset();
}

onMounted(() => {
  document.title = "Login | Wedemy";
  //attach GoogleAuth script
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.id = "google_client";
  document.getElementById("g-login")?.appendChild(script); // see index.html
});

onBeforeUnmount(() => {
  //detach above script
  document.getElementById("google_client")?.remove();
});
</script>

<style lang="scss" scoped>
.login-header {
  border-bottom: solid 1px #d1d7dc;
  color: var(--color-text);
  display: block;
  font-weight: 700;
  padding: 24px 64px 24px 24px;
}

.login-container {
  color: var(--color-text);
  width: 380px;
  text-align: center;
}

@media screen and (max-width: 600px) {
  .login-container {
    width: 250px;
  }
}
</style>
