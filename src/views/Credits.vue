<template>
  <h2 class="cart-header">Credits</h2>
  <div class="main-view">
    <h3 class="serif-head">Thanks to the following people & resources</h3>

    <h3>Photo Credits</h3>
    <ul>
      <li>
        Homepage Cover Photo | by
        <a
          href="https://unsplash.com/@avirichards"
          target="_blank"
          rel="noopener"
        >
          Avi Richards, Unsplash
        </a>
      </li>
      <li>Python Thumbnail - Corey Schafer, YouTube Channel</li>
      <li>Java, Excel, JavaScript thumbnails - freeCodeCamp YouTube channel</li>
      <li>
        Thumbnail for Adobe Illustrator - Midas Multimedia YouTube channel
      </li>
      <li>Thumbnail for Adobe Premiere - Cinecom.net YouTube channel</li>
      <li>Thumbnail for Economics - CrashCourse YouTube channel</li>
      <li>Thumbnail for Lose BellyFat - MrandMrsMuscle YouTube channel</li>
      <li>Thumbnail for Real Estate - Ryan Serhant YouTube channel</li>
      <li>Thumbnail for Piano course - Rousseau YouTube channel</li>
    </ul>

    <h3>Course Content</h3>
    <p>
      All of the videos in this Demo are from YouTube playlists from following
      channels
    </p>
    <ul>
      <li>Adobe Illustrator Course - Gareth David Studio</li>
      <li>Adobe Premiere Pro CC - chinfat</li>
      <li>Python - Corey Schafer</li>
      <li>JavaScript - Dani Krossing</li>
      <li>Java Course - Caleb Curry</li>
      <li>Crash Course Economics - Jacob Clifford</li>
      <li>Lose Belly Fat in 14 Days - MrandMrsMuscle</li>
      <li>Real Estate Investing - Robert Kiyosaki</li>
      <li>How To Play Piano for Beginners - Bill Hilton</li>
      <li>Master Microsoft Excel - Technology for Teachers and Students</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Credits",
  data() {
    document.title = "Credits | Wedemy";
    return {};
  },
});
</script>

<style scoped>
</style>