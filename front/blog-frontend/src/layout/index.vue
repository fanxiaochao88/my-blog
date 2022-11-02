<template>
  <div class="layout-wrap">
    <div class="header-wrap">
      <div class="header">
        <NavHeader></NavHeader>
      </div>
    </div>
    <div class="content-wrap">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import NavHeader from './child/NavHeader.vue'
</script>
<style lang="less" scoped>
.layout-wrap {
  width: 100%;
  height: 100%;
  .header-wrap {
    height: 106px;
    width: 100%;
    background-color: #F3F3F3;
    .header {
      width: 78.12%;
      height: 100%;
      margin: 0 auto;
    }
  }
  .content-wrap {
    width: 100%;
    height: calc(100% - 106px);
    .content {
      width: 800px;
      height: 100%;
      margin: 0 auto;
      background-color: #F3F3F3;
    }
  }
}
</style>
