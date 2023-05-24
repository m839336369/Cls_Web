<template>
  <q-layout class="layout" view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->
    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "AuthenticationLayout",
};
</script>

<style scoped>
.layout {
  background: url("../assets/background.jpg");
}
</style>
