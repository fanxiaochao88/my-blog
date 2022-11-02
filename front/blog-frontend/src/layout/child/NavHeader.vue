<template>
  <div class="NavHeader-wrap">
    <el-button plain>Plain</el-button>
    <el-button type="primary" plain>Primary</el-button>
    <el-button type="success" plain>Success</el-button>
    <el-button type="info" plain>Info</el-button>
    <el-button type="warning" plain>Warning</el-button>
    <el-button type="danger" plain>Danger</el-button>
    <el-switch v-model="isLight" />
  </div>
</template>
<script lang="ts" setup>
/**
 * element-plus暗黑模式切换
 */
import { useChangeTheme } from "../indexHooks";
const { isLight } = useChangeTheme();
</script>
<style lang="less" scoped>
.NavHeader-wrap {
  width: 100%;
  height: 100%;
}
</style>
