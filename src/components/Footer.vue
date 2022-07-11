<template>
  <footer class="footer">
    <div class="lefty">
      <el-row class="footer-row">
        <router-link to="/credits"> Credits </router-link>
      </el-row>
      <el-row class="footer-row">About Us</el-row>
      <el-row class="footer-row">
        <a
          class="github-button"
          href="https://github.com/longwater1234"
          aria-label="Follow @longwater1234 on GitHub"
          >Follow @longwater1234
        </a>
      </el-row>
    </div>
    <div class="righty">
      <el-row>&copy; 2022, Wedemy</el-row>
      <el-row>
        <img src="@/assets/final_white.png" alt="logo" id="ft-logo" />
      </el-row>
      <el-row class="credit-cards" title="Supported Payment methods">
        <img height="30" src="https://shoplineimg.com/assets/footer/card_visa.png"/>
        <img height="30" src="https://shoplineimg.com/assets/footer/card_master.png"/>
        <img height="30" src="https://shoplineimg.com/assets/footer/card_paypal.png"/>
        <img height="30" src="https://shoplineimg.com/assets/footer/card_amex.png"/>
        <img height="30" src="https://shoplineimg.com/assets/footer/card_jcb.png"/>
      </el-row>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
  data() {
    return {};
  },
});
</script>

<style scoped>
.footer {
  width: inherit;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  bottom: 0;
  padding: 0.25em;
  height: max-content;
  color: white;
  background-color: var(--dark);
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
}
</style>