<template>
  <el-row type="flex" justify="space-between" class="footer">
    <div style="padding-top: 5px">
      <router-link to="/">
        <img src="@/images/android-chrome-512x512.png" class="icon" alt="Home"/>
      </router-link>
    </div>

    <div> &copy; 2021 Wedemy, Inc.</div>
  </el-row>
</template>


<script>
export default {
  name: "Footer",
};
</script>


<style>

.footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 10vh;
  padding: 2% 10% 3% 10%;
  border-top: 1px solid rgb(170, 164, 164);
  background-color: #c0c3be;
}
</style>