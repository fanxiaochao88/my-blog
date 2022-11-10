<template>
  <div class="home-list-wrap">
    <div class="list-header">
      <div style="cursor: pointer" v-for="(item, index) in labels" :key="item.id" @click="handleMenuClick(index)">
        <span :style="{ color: index == currentIndex ? 'blue' : '' }">{{ item.label }}</span>
        <el-divider v-if="!(index == labels.length - 1)" direction="vertical" />
      </div>
    </div>
    <listItem v-for="item in momentList" :key="item.id" :dataItem="item" @click="gotoDetail(item.id)" />
  </div>
</template>
<script lang="ts" setup>
import listItem from './listItem.vue'
import { onMounted, ref } from 'vue'
import editAPI from '@/api/editAPI'
import momentAPI from '@/api/momentAPI'
import { Message } from '@/utils/message'
import { useRouter } from "vue-router";
// 获取标签数据
const currentIndex = ref(0)
const labels = ref<any[]>([])
const momentList = ref<any[]>([])
onMounted(async () => {
  // 请求标签数据
  const res = await editAPI.getLabels()
  labels.value = res.result
  labels.value?.unshift({
    id: 999,
    label: '全部'
  })
  // 请求列表数据
  const list = await momentAPI.getMomentList()
  Message(list)
  momentList.value = list.result
})
// 标签点击
const handleMenuClick = (index: number) => {
  currentIndex.value = index
}
// 跳转详情
const router = useRouter()
const gotoDetail = (id: any) => {
  window.open('http://localhost:8080/detail/' + id)
  // router.push('/detail/' + id)
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
