<template>
  <Navbar :categories="categories" v-if="!computedHideNavbar" />
  <router-view />
  <Footer v-if="!computedHideFooter" />
</template>

<script lang="ts" setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

import CourseService from "@/service/CourseService";
import { useStudentStore } from "@/stores";
import { computed, onMounted, ref } from "vue";
import type { CategoryDto } from "@/interfaces/custom";
import { useRoute } from "vue-router";

const store = useStudentStore();
const categories = ref<CategoryDto[]>([]);
const route = useRoute();

function fetchCartCount() {
  store.getCartCountServer().then(() => {});
}

onMounted(() => {
  store.getLoginStatus().then((loggedIn: boolean) => {
    if (loggedIn) fetchCartCount();
  });
  CourseService.getAllCategories().then(res => (categories.value = res.data));
});

const computedHideNavbar = computed(() => route.meta?.hideNavbar ?? false);
const computedHideFooter = computed(() => route.meta?.hideFooter ?? false);
</script>
