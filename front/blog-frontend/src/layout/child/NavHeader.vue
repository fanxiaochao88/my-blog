<template>
  <div class="NavHeader-wrap">
    <div class="top-content">
      <div class="left-content">
        <img v-if="isLight" src="@/assets/img/pinterest_board_photo.png" alt="" />
        <img v-else src="@/assets/img/logo_transparent.png" alt="" />
        <h3>标题位置</h3>
      </div>
      <div class="middle-content">
        <div class="top-menu-item" :class="{ active: currentIndex == index }" @click="handleClickMenu(index)" v-for="(item, index) in topMenu" :key="item.name">
          {{ item.name }}
        </div>
      </div>
      <div class="right-content">
        <div class="item1" :style="{ width: isFocus ? '416px' : '300px', marginRight: isFocus ? '0' : '10px' }">
          <el-input :class="{ active: isFocus }" @focus="getFocus" @[eventName]="loseFocus" v-model="searchStr" size="large" placeholder="输入文章关键词">
            <template #suffix>
              <el-icon :color="isFocus ? '#409eff' : ''"><Search /></el-icon>
            </template>
          </el-input>
        </div>
        <div class="item2" :style="{ width: isFocus ? '0' : '106px' }">
          <el-button type="primary" plain @click="gotoEdit">
            编辑文章&nbsp;<el-icon><EditPen /></el-icon>
          </el-button>
        </div>
        <div class="item3">
          <el-switch inline-prompt :active-icon="Sunny" :inactive-icon="Moon" v-model="isLight" />
          <el-badge :style="{ opacity: loginStore.token ? 1 : 0 }" :value="100" :max="99">
            <el-icon size="22px"><ChatDotRound /></el-icon>
          </el-badge>
          <div>
            <el-dropdown v-if="loginStore.token">
              <el-avatar :size="35" :src="loginStore.avatarUrl" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-link type="primary" v-else @click="gotoLogin">登录/注册</el-link>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="bottom-content">33</div> -->
  </div>
</template>
<script lang="ts" setup>
import { Search, Sunny, Moon } from '@element-plus/icons-vue'
import { nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/store/login/index'
import { useOtherStore } from '@/store/other/index'
import editAPI from '@/api/editAPI'
/**
 * element-plus暗黑模式切换
 */
import { useChangeTheme } from '../indexHooks'
const { isLight } = useChangeTheme()
/**
 * 顶部菜单栏
 */
const topMenu = [
  {
    name: '首页'
  },
  {
    name: '待定...'
  }
]
const currentIndex = ref(0)
const handleClickMenu = (index: number) => {
  currentIndex.value = index
  if (index == 0) {
    otherStore.changeIsSearch('')
    searchStr.value = ''
    router.push('/')
  }
  if (index == 1) {
    router.push('/todo')
  }
}
/**
 * 输入框逻辑
 */
const eventName = ref('')
const searchStr = ref('')
const isFocus = ref(false)
const getFocus = () => {
  isFocus.value = true
  eventName.value = 'blur'
}
const loseFocus = () => {
  isFocus.value = false
}
const otherStore = useOtherStore()
// 监听回车按钮进行搜素
window.addEventListener('keydown', (e: Event) => {
  if (e.keyCode == 13) {
    gotoSearch()
  }
})
const gotoSearch = () => {
  if (!searchStr.value) return
  otherStore.changeIsSearch(searchStr.value)
  router.push('/index')
}
/**
 * 登录判断
 */
const loginStore = useLoginStore()
const router = useRouter()
const gotoLogin = () => {
  router.replace('/login')
}
/**
 * 退出登录
 */
const loginOut = () => {
  localStorage.clear()
  loginStore.changeAvatarUrl('')
  loginStore.changeToken('')
}
/**
 * 去编辑
 * 在编辑页面需要图片上传, 如果文章暂未创建, 上传的图片没法关联文章
 * 所以, 跳转编辑页面之前, 首先创建文章, 只不过文章内容为空, 返回文章id, 跳转编辑带过去, 1. 配图可以关联  2. 在编辑页面的发布变为修改当前文章
 */
const gotoEdit = async () => {
  if (loginStore.token) {
    // 跳转之前首先发送请求创建文章, 返回文章id, 再进行跳转
    const result = await editAPI.publishMoment({
      title: '',
      content: '',
      labelNames: '',
      labelIds: '',
      description: '',
      mainCoverUrl: ''
    })
    router.push('/edit/' + result.result.insertId)
  } else {
    router.push('/login')
  }
}
</script>
<style lang="less" scoped>
:deep(.el-input__suffix) {
  height: 80%;
  padding-right: 10px;
  background-color: #f2f3f5;
  position: relative;
  left: 10px;
  cursor: pointer;
}
.active {
  color: #1e80ff !important;
}
.NavHeader-wrap {
  width: 100%;
  height: 100%;
  .top-content {
    height: 61px;
    display: flex;
    align-items: center;
    overflow: hidden;
    .left-content {
      flex: 1;
      display: flex;
      align-items: center;
      img {
        height: 61px;
        position: relative;
        top: 10px;
      }
    }
    .middle-content {
      height: 100%;
      display: flex;
      align-items: center;
      width: 700px;

      .top-menu-item {
        &:first-child {
          margin-left: 30px;
        }
        height: 100%;
        border-bottom: 2px solid transparent;
        line-height: 61px;
        margin: 0 10px;
        cursor: pointer;
        font-size: 16px;
        &:hover {
          border-bottom-color: #1e80ff;
        }
      }
    }
    .right-content {
      flex: 4;
      display: flex;
      align-items: center;
      .item1 {
        width: 300px;
        margin-right: 10px;
        transition: all 0.3s;
        :deep(.active .el-input__suffix) {
          background-color: #f2f3f5;
        }
      }
      .item2 {
        width: 106px;
        transition: all 0.3s;
        overflow: hidden;
      }
      .item3 {
        height: 100%;
        display: flex;
        flex: 1;
        justify-content: space-evenly;
        align-items: center;
      }
    }
  }
}
</style>
