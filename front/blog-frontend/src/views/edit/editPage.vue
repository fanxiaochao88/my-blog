<template>
  <div v-loading="loading" class="edit-wrap">
    <div class="header-wrap">
      <div>
        <el-input v-model="title" placeholder="请输入文章标题..."></el-input>
      </div>
      <div>
        <el-button size="large" type="primary" plain @click="gotoIndex">主页</el-button>
        <el-button size="large" type="primary" @click="gotoPublish">发布</el-button>
      </div>
    </div>
    <Editor :uploadImages="uploadImage" :value="value" :locale="zh_Hans" :plugins="plugins" @change="handleChange" mode="auto" />
  </div>
</template>
<script setup lang="ts">
import editAPI from '@/api/editAPI'
import { Message } from '@/utils/message'
// 导入核心组件
import { Editor, Viewer } from '@bytemd/vue-next'
// 导入中文包
import zh_Hans from 'bytemd/locales/zh_Hans.json'
import highlight from '@bytemd/plugin-highlight' // 这个高亮还必须引入  否则  main.ts中highlight.js库不起作用
// import highlightssr from '@bytemd/plugin-highlight-ssr'
import gemoji from '@bytemd/plugin-gemoji'
import gfm from '@bytemd/plugin-gfm'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const value = ref('')
const title = ref('')
const loading = ref(false)
const plugins = [gfm(), gemoji(), highlight(),mediumZoom()]
const handleChange = (v: any) => {
  value.value = v
}
// 跳转主页
const router = useRouter()
const route = useRoute()
const { momentId } = route.params // momentId  非常重要!!!
const gotoIndex = () => {
  router.push('/index')
}
// 跳转发布
const gotoPublish = () => {
  loading.value = true
  editAPI
    .updateMomentById(momentId, {
      title: title.value,
      content: value.value
    })
    .then((res) => {
      Message(res)
      loading.value = false
      // router.push('/detail/' + 5)
    })
    .catch((err) => {
      Message(err, 'error')
      loading.value = false
    })
}
// 图片上传
const uploadImage = async (files: any) => {
  const res = await editAPI.uploadImage(momentId, files[0])
  return [
    {
      title: files.map((i: any) => i.name),
      url: res.url
    }
  ]
}
</script>
<style lang="less" scoped>
.edit-wrap {
  width: 100%;
  height: 100%;
  background-color: #fff;
  /deep/ .bytemd {
    height: calc(100vh - 79px);
  }
  .header-wrap {
    height: 79px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    :deep(.el-input) {
      .el-input__wrapper {
        box-shadow: none;
        height: 70% !important;
        font-size: 26px;
      }
    }
  }
}
</style>
