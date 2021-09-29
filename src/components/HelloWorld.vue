<template>
  <div class="hello">
    <h1 class="test">{{ msg }}</h1>
    <h1 class="test1">This is the second color</h1>
    <p>
      For35 a guide and recipes on how to configure / customize this project,<br />
      check out the
    </p>
  </div>
</template>

<script lang="ts">
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test {
  /* color: #85ce31; */
  color: #6fb650;
}
.test1 {
  /* color: #89af98; */
  color: #77aea6;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
