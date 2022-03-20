<template>
  <h3 class="cart-header">Your Profile</h3>
  <div class="main-view" style="height: 70vh">
    <!-- START HEADER -->
    <div class="profile-header">
      <el-avatar
        :size="100"
        shape="square"
        :src="attachAvatarLink(store.state.username)"
      />
      <p class="username">{{ store.state.username }}</p>
      <div class="joined">Joined 2021-05-11</div>
    </div>
    <!-- END OF HEADER -->

    <el-space direction="vertical" size="large" />
    <!-- START TABS -->
    <el-tabs v-model="activeTab">
      <!-- EDIT PROFILE -->
      <el-tab-pane label="Profile" name="first"> </el-tab-pane>

      <!-- CHANGE PASSWORD -->
      <el-tab-pane class="second-form" label="Security" name="second">
        <el-form @submit.prevent :model="myForm" ref="myFormRef" :rules="rules">
          <el-form-item prop="currentPass" label="Current Password">
            <el-input
              v-model="myForm.currentPass"
              type="password"
              maxlength="70"
              clearable
            />
          </el-form-item>
          <el-form-item prop="newPass" label="New Password">
            <el-input
              v-model="myForm.newPass"
              type="password"
              maxlength="70"
              clearable
            />
          </el-form-item>
          <el-form-item prop="confirmPass" label="Repeat Password">
            <el-input
              v-model="myForm.confirmPass"
              type="password"
              maxlength="70"
              clearable
            />
          </el-form-item>

          <el-form-item style="margin-top: 8px">
            <el-button
              class="btn purple"
              @click="handleReset('myFormRef')"
              style="font-weight: bold"
              :loading="isLoading"
              :disabled="isSame"
              native-type="submit"
            >
              Update Password
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- END OF TABS -->
  </div>
</template>

<script>
import { reactive } from "vue";
import AuthService from "@/services/AuthService";
import { ElMessage } from "element-plus";

export default {
  name: "Profile",
  inject: ["store"],
  data() {
    document.title = "My Profile | Wedemy";
    const myForm = reactive({
      currentPass: "",
      newPass: "",
      confirmPass: "",
    });

    // validation for password
    const checkPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Password can't be empty"));
      } else if (value.length < 8) {
        return callback(new Error("Minimum length is 8 characters long"));
      } else {
        callback();
      }
    };

    // validation for confirm password
    const checkConfirm = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Re-enter the password"));
      } else if (value !== myForm.newPass) {
        callback(new Error("Passwords don't match!"));
      } else {
        callback();
      }
    };

    const rules = reactive({
      currentPass: [{ validator: checkPassword, trigger: "blur" }],
      newPass: [{ validator: checkPassword, trigger: "blur" }],
      confirmPass: [{ validator: checkConfirm, trigger: "blur" }],
    });

    return {
      activeTab: "first",
      isLoading: false,
      myForm,
      rules,
    };
  },
  methods: {
    attachAvatarLink(username) {
      return `https://avatars.dicebear.com/api/initials/${username}.svg`;
    },
    handleReset(formName) {
      let self = this;
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        self.sumbitRequest(self.myForm);
      });
    },
    sumbitRequest(form) {
      AuthService.changePassword({ ...form })
        .then((res) => ElMessage.success(res.data.message))
        .then(() => window.location.reload())
        .catch((error) => ElMessage.error(error.message));
    },
  },
  computed: {
    isSame() {
      //only allow update if NOT same
      return this.myForm.currentPass === this.myForm.newPass;
    },
  },
};
</script>

<style>
.main-view {
  text-align: center;
  justify-content: center;
}

.cart-header {
  font-family: Georgia, "Times New Roman", Times, serif;
  background-color: black;
  color: white;
  margin-top: 0;
  top: 0;
  padding: 2% 10%;
}

.joined {
  font-size: 12px;
}

.username {
  font-size: 1.5em;
  margin: 0.5em auto;
}

.second-form {
  width: 40% !important;
}

@media screen and (max-width: 770px) {
  .main-view {
    padding: 0 2% 0 2%;
  }
  .cart-header {
    padding: 5% 10%;
    height: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .second-form {
    width: 90% !important;
  }
}
</style>