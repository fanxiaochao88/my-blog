<template>
  <div class="home-list-wrap">
    <div class="list-header">
      <div style="cursor: pointer" v-for="(item, index) in labels" :key="item.id" @click="handleMenuClick(index)">
        <span :style="{ color: index == currentIndex ? 'blue' : '' }">{{ item.label }}</span>
        <el-divider v-if="!(index == labels.length - 1)" direction="vertical" />
      </div>
    </div>
    <listItem v-for="item in momentList" :key="item.id" :dataItem="item" @click="gotoDetail(item.id, item.view_count)" />
  </div>
</template>
<script lang="ts" setup>
import listItem from './listItem.vue'
import { onMounted, ref, watch } from 'vue'
import editAPI from '@/api/editAPI'
import momentAPI from '@/api/momentAPI'
import { useRouter } from 'vue-router'
import { Message } from '@/utils/message'
import { useOtherStore } from '@/store/other/index'
// 获取标签数据
const currentIndex = ref(0)
const labels = ref<any[]>([])
const momentList = ref<any[]>([])
const otherStore = useOtherStore()
onMounted(async () => {
  // 请求标签数据
  const res = await editAPI.getLabels()
  labels.value = res.result
  labels.value?.unshift({
    id: 999,
    label: '全部'
  })
  // 请求列表数据
  const list = await momentAPI.getMomentList(otherStore.searchStr)
  Message(list)
  otherStore.searchStr && handleKeyword(list.result)
  momentList.value = list.result
  otherStore.searchStr = ''
})
watch(
  () => otherStore.isSearch,
  async () => {
    const list = await momentAPI.getMomentList(otherStore.searchStr)
    Message(list)
    otherStore.searchStr && handleKeyword(list.result)
    momentList.value = list.result
    otherStore.searchStr = ''
  }
)
// 处理关键字
const handleKeyword = (list: any) => {
  let replaceReg = new RegExp(otherStore.searchStr, 'g')
  let replaceContent = '<strong style="color:#f03535">' + otherStore.searchStr + '</strong>'
  list.map((item: any) => {
    if (item.title.includes(otherStore.searchStr)) {
      item.title = item.title.replace(replaceReg, replaceContent)
    }
  })
}
// 标签点击
const handleMenuClick = (index: number) => {
  currentIndex.value = index
}
// 跳转详情
const router = useRouter()
const gotoDetail = (id: any, count: any) => {
  window.open('http://localhost:8002/detail' + '?viewCount=' + count + '&momentId=' + id)
  // router.push('/detail' + '?viewCount=' + count + '&momentId=' + id)
}
</script>
<style lang="less" scoped>
.home-list-wrap {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .list-header {
    width: 100%;
    height: 30px;
    display: flex;
    font-size: 14px;
    color: #71777c;
    border-bottom: 1px solid #eee;
  }
}
</style>
