<template>
  <div class="rowVideo">
    <div class="col1">
      <div class="rowbig"></div>
      <div class="rowsmall"></div>
    </div>
    <div class="col2"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LessonViewer",
  data() {
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
.rowVideo {
  display: flex;
  flex-direction: row;
  width: 99vw;
  height: 98vh;
}

.col1 {
  display: flex;
  flex-direction: column;
  width: 70%;
  background-color: grey;
}
.col2 {
  display: flex;
  flex-direction: column;
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
 .rowVideo{
   display: flex;
   flex-direction: column;
 }
}
</style>