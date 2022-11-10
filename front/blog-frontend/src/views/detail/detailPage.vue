<template>
  <div class="detail-page-wrap">
    <el-card shadow="hover" class="menuList-wrap">
      <h3>目录</h3>
      <el-divider />
      <div class="menu-wrap">
        <div class="menu-item" v-for="(item, key) of menuList" :key="key" @click="menuClick(item.point)">
          <a :href="'#' + item.point" :class="item.point == currentMuneID ? `active` : ``" :style="menuStyle(item.type)">
            {{ item.text }}
          </a>
        </div>
      </div>
    </el-card>
    <div class="title">
      <h1>{{ title }}</h1>
    </div>
    <div class="userinfo">
      <el-avatar :size="50" :src="userInfo.avatarUrl" />
      <div class="userInfo-right">
        <div>{{ userInfo.nickname }}</div>
        <div>
          {{ moment(createTime).format('YYYY-MM-DD  HH:mm:ss') }} · 阅读
          {{ viewCount_ }}
        </div>
      </div>
    </div>
    <div class="main-cover">
      <img :src="mainCoverUrl" alt="" />
    </div>
    <Viewer :value="value" :plugins="plugins" />
  </div>
</template>
<script setup lang="ts">
import moment from 'moment'
// 导入核心组件
import { Viewer } from '@bytemd/vue-next'
// 导入中文包
import highlight from '@bytemd/plugin-highlight' // 这个高亮还必须引入  否则  main.ts中highlight.js库不起作用
import zh_Hans from 'bytemd/locales/zh_Hans.json'
import gemoji from '@bytemd/plugin-gemoji'
import gfm from '@bytemd/plugin-gfm'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import { onMounted, ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import momentAPI from '@/api/momentAPI'
const route = useRoute()
const { viewCount, momentId } = route.query
const value = ref('')
const title = ref('')
const createTime = ref('')
const userInfo = ref<any>({})
const viewCount_ = ref(0)
const mainCoverUrl = ref('')
interface Menu {
  type: string
  text: string
  offsetTop: number
  point: string
}
const menuList = ref<any[]>()
let debounced: any
const plugins = [
  gfm(),
  gemoji(),
  highlight(),
  mediumZoom({
    background: 'rgba(255, 255, 255, .7)' // 配置图片点击放大
  })
]
// 获取文章详情
onMounted(async () => {
  const result = await momentAPI.getMomentDetailById({
    viewCount,
    momentId
  })
  value.value = result.result.content
  title.value = result.result.title
  createTime.value = result.result.createAt
  viewCount_.value = result.result.view_count
  userInfo.value = result.result.author
  mainCoverUrl.value = result.result.main_cover_url
  // 获取目录列表
  nextTick(() => {
    getMenuList(['H1', 'H2', 'H3', 'H4'])
  })
  window.addEventListener('scroll', onScroll, true)
  debounced = debounce(needDebounce, 300)
})
// 获取目录列表
const getMenuList = (temp: string[]) => {
  let tempMenu: Menu[] = []
  const rootDom = document.querySelector('.markdown-body')
  rootDom?.childNodes.forEach((item: any, index: any) => {
    if (temp.includes(item.nodeName)) {
      tempMenu.push({
        type: item.nodeName,
        text: item.innerText,
        offsetTop: item.offsetTop,
        point: `target_${index}`
      })
      item.setAttribute('id', `target_${index}`)
    }
  })
  menuList.value = tempMenu
}
// 目录样式
const menuStyle = (type: string) => {
  let style = {}
  if (type === 'H1') style = { 'padding-left': 10 + 'px' }
  if (type === 'H2') style = { 'padding-left': 30 + 'px' }
  if (type === 'H3') style = { 'padding-left': 50 + 'px' }
  if (type === 'H4') style = { 'padding-left': 70 + 'px' }
  return style
}
// 目录点击
const currentMuneID = ref('target_0')
const menuClick = (id: string) => {
  currentMuneID.value = id
}

// 滚动事件回调
const onScroll = (e: Event) => {
  debounced(e)
}
// 需要添加防抖的函数
const needDebounce = (e: Event) => {
  console.log(111)

  const scrollTop = e.target.scrollTop
  const length = menuList.value?.length || 0
  for (let i = 0; i < length - 1; i++) {
    const item = menuList.value ? menuList.value[i] : { offsetTop: 0, point: '' }
    const nextItem = menuList.value ? menuList.value[i + 1] : { offsetTop: 0, point: '' }
    if (scrollTop > item.offsetTop && scrollTop < nextItem.offsetTop) {
      currentMuneID.value = item && item.point
      return
    }
  }
  if (scrollTop < (menuList.value && menuList.value[0].offsetTop)) {
    currentMuneID.value = menuList.value && menuList.value[0].point
    return
  }
  currentMuneID.value = (menuList.value && menuList.value[length - 1].point) as string
}
// 防抖函数
const debounce = (func: any, wait: any) => {
  let timeout: any
  return function debounced(e: any) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(e)
    }, wait)
  }
}
</script>

<style lang="less" scoped>
:deep(.markdown-body) {
  img {
    max-width: 98% !important;
  }
}
.detail-page-wrap {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  .title h1 {
    font-size: 2.3em;
  }
  .userinfo {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .userInfo-right {
      height: 100%;
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      & div:nth-child(2) {
        color: #8a919f;
      }
      & div:nth-child(1) {
        color: #515756;
      }
    }
  }
  .main-cover {
    width: 98%;
    height: 425px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &::-webkit-scrollbar {
    width: 10px; /*滚动条宽度*/
    height: 10px; /*滚动条高度*/
  }
  /*定义滚动条轨道 内阴影+圆角*/
  &::-webkit-scrollbar-track {
    box-shadow: 0px 1px 3px #f3f3f3 inset; /*滚动条的背景区域的内阴影*/
    border-radius: 10px; /*滚动条的背景区域的圆角*/
    background-color: #f3f3f3; /*滚动条的背景颜色*/
  }
  /*定义滑块 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    box-shadow: 0px 1px 3px #ccc inset; /*滚动条的内阴影*/
    border-radius: 10px; /*滚动条的圆角*/
    background-color: #ccc; /*滚动条的背景颜色*/
  }

  .menuList-wrap {
    h3 {
      padding: 0;
      margin: 0;
    }
    padding-top: 0 !important;
    position: fixed;
    width: 300px;
    height: 500px;
    top: 80px;
    right: 230px;

    .menu-wrap {
      height: 390px;
      width: 100%;
      overflow: auto;

      .menu-item {
        margin: 18px 0;
        a {
          text-decoration: none;
          box-sizing: border-box;
          color: #000;
          display: block;
          width: 100%;
          height: 100%;
          border-left: 3px solid transparent;
          &.active {
            color: #1e80ff;
            border-left-color: #1e80ff !important;
          }
        }
      }
    }
  }
}
</style>
