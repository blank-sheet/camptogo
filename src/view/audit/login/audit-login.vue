<template>
  <div class="audit-login">
    <div>
      <h1>Camptogo-审核端</h1>
      <CampLogin login-to="/audit/basicInfo" />
    </div>
  </div>
</template>

<script setup>
import CampLogin from '../../../component/camp-login.vue'
</script>

<style lang="scss" scoped>
.audit-login {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
