<template>
  <footer class="m-footer">
    <div class="lefty">
      <el-row class="footer-row">
        <router-link to="/credits"> Credits</router-link>
      </el-row>
      <el-row class="footer-row">
        <router-link to="/about"> About Us</router-link>
      </el-row>
      <el-row class="footer-row">
        <!-- Place this tag where you want the button to render. -->
        <github-button
          href="https://github.com/longwater1234"
          aria-label="Follow @longwater1234 on GitHub"
        >
          Follow @longwater1234
        </github-button>
      </el-row>
      <el-row>
        <!-- Place this tag where you want the button to render. -->
        <github-button
          href="https://github.com/longwater1234/WedemyClient"
          data-icon="octicon-star"
          data-show-count="true"
          aria-label="Star longwater1234/WedemyClient on GitHub"
        >
          Star
        </github-button>
      </el-row>
    </div>
    <div class="righty">
      <el-row>&copy; 2022, Davis T</el-row>
      <el-row>
        <img src="@/assets/final_white.png" alt="logo" id="ft-logo" />
      </el-row>
      <el-row class="credit-cards" title="Supported Payment methods">
        <img height="30" alt="visa" src="https://shoplineimg.com/assets/footer/card_visa.png" />
        <img height="30" alt="mastercard" src="https://shoplineimg.com/assets/footer/card_master.png" />
        <img height="30" alt="paypal" src="https://shoplineimg.com/assets/footer/card_paypal.png" />
        <img height="30" alt="amex" src="https://shoplineimg.com/assets/footer/card_amex.png" />
        <img height="30" alt="jcb" src="https://shoplineimg.com/assets/footer/card_jcb.png" />
      </el-row>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import GithubButton from "vue-github-button";
</script>

<style scoped lang="css">
.m-footer {
  /*width: inherit;*/
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0.25em;
  bottom: 0;
  /*top: 30vh; height: max-content;*/
  color: white;
  margin-bottom: -10px;
  background-color: var(--vt-c-black-soft);
}

.lefty {
  margin-top: 0.5em;
  float: left;
}

.footer-row {
  margin-bottom: 5px;
}

.credit-cards {
  margin-bottom: 0.5em;
}

a {
  color: white !important;
}

a:hover {
  border-bottom: 1px solid white;
  /* padding-bottom: 10px; */
}

.credit-cards img {
  margin-right: 0.5em;
}

.righty {
  margin-top: 0.5em;
  float: right;
}

#ft-logo {
  width: 10em;
  margin-top: 1em;
  height: 100%;
}

@media screen and (max-width: 770px) {
  .credit-cards {
    display: none;
  }
  .m-footer {
    top: 30vh;
  }
}
</style>
