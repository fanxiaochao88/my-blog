<template>
  <div v-loading="loading" class="edit-wrap">
    <div class="header-wrap">
      <div>
        <el-input v-model="title" placeholder="请输入文章标题..."></el-input>
      </div>
      <div>
        <el-button size="large" type="primary" plain @click="gotoIndex">主页</el-button>
        <el-popover placement="bottom" title="发布文章" :width="600" :visible="publishDialogVisible">
          <template #reference>
            <el-button size="large" type="primary" @click="gotoPublish">发布</el-button>
          </template>
          <el-divider />
          <el-form :model="extraForm" label-width="80px">
            <el-form-item label="选择标签: ">
              <div>
                <el-check-tag style="margin: 0 5px" v-for="(item, index) in labels" @change="(check: boolean)=>changeCheck(index, check)" :checked="item.checked" :key="item.id">{{
                  item.label
                }}</el-check-tag>
              </div>
            </el-form-item>
            <el-form-item label="编辑摘要: ">
              <el-input show-word-limit maxlength="100" v-model="extraForm.description" :rows="5" type="textarea" placeholder="请输入摘要信息" />
            </el-form-item>
            <el-form-item label="文章封面">
              <el-upload
                class="avatar-uploader"
                :action="'http://49.233.62.36:8001/upload/mainCover/' + momentId"
                :headers="{ Authorization: token }"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                name="mainCover"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <div v-else class="avatar-uploader-icon">
                  <el-icon><Plus /></el-icon>
                  <span style="font-size: 16px">上传封面</span>
                </div>
              </el-upload>
            </el-form-item>
          </el-form>
          <el-button type="info" @click="publishDialogVisible = false" plain>取消</el-button>
          <el-button type="primary" @click="confirmPublish" plain>确认并发布</el-button>
        </el-popover>
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
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const value = ref('')
const title = ref('')
const loading = ref(false)
const plugins = [gfm(), gemoji(), highlight(), mediumZoom()]
const handleChange = (v: any) => {
  value.value = v
}
const token = ref('')
// 获取标签数据
const labels = ref<any[]>([])
onMounted(async () => {
  const res = await editAPI.getLabels()
  labels.value = res.result
  labels.value.forEach((item) => {
    item.checked = false
  })

  token.value = 'Bearer ' + window.localStorage.getItem('token')
})
// 跳转主页
const router = useRouter()
const route = useRoute()
const { momentId } = route.params // momentId  非常重要!!!
const gotoIndex = () => {
  router.push('/index')
}
// 跳转发布
const publishDialogVisible = ref(false)
const gotoPublish = () => {
  // 这里要弹框, 填写详细的信息
  // 包括 分类 摘要描述信息 封面配图
  publishDialogVisible.value = true
}
const extraForm = ref<{
  labelNames: string[]
  labelIds: string[]
  description: string
  mainCoverUrl: string
}>({
  labelNames: [],
  labelIds: [],
  description: '',
  mainCoverUrl: ''
})
// 标签选择
const changeCheck = (index: any, check: boolean) => {
  labels.value[index].checked = check
}
// 封面上传
const imageUrl = ref('')
const handleAvatarSuccess = (res: any) => {
  imageUrl.value = res.mainCoverUrl
  extraForm.value.mainCoverUrl = res.mainCoverUrl
}
// 确认发布
const confirmPublish = () => {
  publishDialogVisible.value = false
  loading.value = true
  labels.value.forEach((item) => {
    if (item.checked) {
      extraForm.value.labelIds.push(item.id)
      extraForm.value.labelNames.push(item.label)
    }
  })
  extraForm.value.labelIds = extraForm.value.labelIds.join(',') as any
  extraForm.value.labelNames = extraForm.value.labelNames.join(',') as any
  editAPI
    .updateMomentById(momentId, {
      title: title.value,
      content: value.value,
      ...extraForm.value
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
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed #999;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 8%;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 130px;
  height: 73px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
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
