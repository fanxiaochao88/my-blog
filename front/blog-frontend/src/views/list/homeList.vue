<template>
  <div class="home-list-wrap">
    <div class="list-header">
      <div style="cursor: pointer" v-for="(item, index) in labels" :key="item.id" @click="handleMenuClick(index)">
        <span :style="{ color: index == currentIndex ? '#409eff' : '' }">{{ item.label }}</span>
        <el-divider v-if="!(index == labels.length - 1)" direction="vertical" />
      </div>
    </div>
    <!-- 厾徛文竾 -->
    <div v-show="currentIndex == 0">
      <listItem v-for="item in momentList" :key="item.id" :dataItem="item" @click="gotoDetail(item.id, item.view_count)" />
    </div>
    <!-- 羑文 -->
    <div v-show="currentIndex == 1">
      <div class="link-content">
        <el-card shadow="always" class="link-item" v-for="item in linkMomentList" :key="item.id">
          <div class="title" v-html="item.title"></div>
          <div class="belong">
            <span style="margin-right: 10px">收录于:{{ moment(item.createAt).format('YYYY-MM-DD HH:mm') }}</span>
            <img :src="logos[item.belong_platform]" alt="" srcset="" />
            <span>{{ item.label_names.replace(/,/g, ' · ') }}</span>
          </div>
          <div class="description">
            {{ item.description }}
          </div>
          <div>
            <el-button @click="gotoLinkMoment(item.link)" style="margin 0 auto; width: 70%;" type="primary" plain>跳转原文</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { logos } from '@/assets/svg/index'
import moment from 'moment'
import listItem from './listItem.vue'
import { onMounted, ref, watch } from 'vue'
import editAPI from '@/api/editAPI'
import momentAPI from '@/api/momentAPI'
import { useRouter } from 'vue-router'
import { Message } from '@/utils/message'
import { useOtherStore } from '@/store/other/index'
// 获徖澇签数据
const currentIndex = ref(0)
const labels = ref<any[]>([])
const momentList = ref<any[]>([])
const linkMomentList = ref<any[]>([])
const otherStore = useOtherStore()
onMounted(async () => {
  // 辷求澇签数据
  const res = await editAPI.getLabels()
  labels.value = res.result
  labels.value?.unshift({
    id: 999,
    label: '全部'
  })
  // 辷求得衾数据
  const list = await momentAPI.getMomentList(otherStore.searchStr)
  Message(list)
  otherStore.searchStr && handleKeyword(list.result)
  momentList.value = list.result
  otherStore.searchStr = ''
})
// 获徖羑文数据
const getLinkMomentList = async (keyword: string) => {
  const res = await momentAPI.getLinkMomentList(keyword)
  Message(res)
  linkMomentList.value = res.result
  otherStore.searchStr && handleKeyword(res.result)
  otherStore.searchStr = ''
}
watch(
  () => otherStore.isSearch,
  async () => {
    if (currentIndex.value == 0) {
      const list = await momentAPI.getMomentList(otherStore.searchStr)
      Message(list)
      otherStore.searchStr && handleKeyword(list.result)
      momentList.value = list.result
      otherStore.searchStr = ''
    } else if (currentIndex.value == 1) {
      getLinkMomentList(otherStore.searchStr)
    }
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
// 澇签点击
const handleMenuClick = (index: number) => {
  currentIndex.value = index
  if (index == 1) {
    getLinkMomentList(otherStore.searchStr)
  }
}
// 跳辬辦情
const router = useRouter()
const gotoDetail = (id: any, count: any) => {
  window.open('http://localhost:8080/detail' + '?viewCount=' + count + '&momentId=' + id)
  // router.push('/detail' + '?viewCount=' + count + '&momentId=' + id)
}
// 跳辬羑文
const gotoLinkMoment = (link: string) => {
  window.open(link)
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
  .link-content {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    .link-item {
      width: 47%;
      // height: 200px;
      margin: 0 10px 15px 12px;

      .title {
        font-weight: 600;
        color: #1d2129;
      }

      .belong {
        font-size: 12px;
        color: #86909c;
        height: 40px;
        line-height: 40px;
        img {
          vertical-align: middle;
          height: 20px;
          position: relative;
          top: -1px;
          margin-right: 10px;
        }
        overflow: hidden;
        /*文澬侍侾换行*/
        white-space: nowrap;
        /*従文澬澢凾包含元羾时ﾌ以羁略德衾社超凾羄文澬*/
        text-overflow: ellipsis;
      }
      .description {
        font-size: 13px;
        color: #4d535c;
        height: 49px;
      }
    }
  }
}
</style>
