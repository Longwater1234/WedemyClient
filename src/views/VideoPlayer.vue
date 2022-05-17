<template>
  <div class="mycontainer">
    <div class="col1">
      <div class="rowbig">bb</div>
      <div class="rowsmall">cc</div>
    </div>
    <div class="col2">dd</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LessonViewer",
  data() {
    document.title = "Lecture | Wedemy"
    return {
      key: "value",
    };
  },
  methods: {
    haha() {},
  },
  mounted() {},
});
</script>

<style scoped>
.mycontainer {
  display: flex;
  flex-direction: row;
  width: 99vw;
  height: 98vh;
}

.col1 {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 70%;
  background-color: grey;
}
.col2 {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 30%;
  background-color: green;
}
.rowbig {
  display: flex;
  flex-direction: row;
  height: 70%;
  background-color: blue;
}
.rowsmall {
  display: flex;
  flex-direction: row;
  height: 30%;
  background-color: yellow;
}

@media screen and (max-width: 770px) {
  .mycontainer {
    display: flex;
    flex-direction: column;
  }
  .col1,
  .col2 {
    width: 100%;
  }
}
</style>