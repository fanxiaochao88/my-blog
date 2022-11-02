<template>
  <div class="layout-wrap">
    <div class="header-wrap">
      <div class="header">
        <NavHeader></NavHeader>
      </div>
    </div>
    <div class="content-wrap">
      <div class="content">content</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import NavHeader from "./child/NavHeader.vue";
</script>
<style lang="less" scoped>
.layout-wrap {
  width: 100;
  height: 100%;
  .header-wrap {
    height: 91px;
    width: 100%;
    background-color: #fff;
    .header {
      width: 1500px;
      height: 100%;
      margin: 0 auto;
    }
  }
  .content-wrap {
    width: 100%;
    height: calc(100% - 91px);
    .content {
      width: 800px;
      height: 100%;
      margin: 0 auto;
      background-color: #fff;
    }
  }
}
</style>
