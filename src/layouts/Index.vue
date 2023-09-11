<template>
<div>
  <sidebar></sidebar>
  <div class="relative md:ml-64 bg-blueGray-100 h-screen">
    <admin-navbar></admin-navbar>
    <header-stats></header-stats>
    <div class="px-4 md:px-10 mx-auto w-full -m-24">
      <router-view />
    </div>
  </div>
</div>
</template>

<script>
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import HeaderStats from "@/components/Headers/HeaderStats.vue";
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";

export default {
  name: "Index",
  components: {HeaderStats, Sidebar, AdminNavbar}
}
</script>

<style scoped>

</style>
