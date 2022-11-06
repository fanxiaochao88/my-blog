<template>
  <div class="edit-wrap">
    <Editor :value="value" :plugins="plugins" @change="handleChange" mode="auto" />
  </div>
</template>
<script setup lang="ts">
import { Editor, Viewer } from '@bytemd/vue-next'
import { ref } from 'vue'
const value = ref('')
const plugins = []
const handleChange = (v: any) => {
  value.value = v
}
</script>
<style lang="less" scoped>
.edit-wrap {
  width: 100%;
  height: 100%;
  background-color: #bfa;
  /deep/ .bytemd {
    height: calc(100vh - 1px);
  }
}
</style>
