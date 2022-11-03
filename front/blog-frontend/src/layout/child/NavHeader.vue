<template>
  <div class="NavHeader-wrap">
    <div class="top-content">
      <div class="left-content">
        <img v-if="isLight" src="@/assets/img/pinterest_board_photo.png" alt="" />
        <img v-else src="@/assets/img/logo_transparent.png" alt="">
        <h3>标题位置</h3>
      </div>
      <div class="middle-content">
        <div class="top-menu-item" :class="{active: currentIndex == index}" @click="handleClickMenu(index)" v-for="(item, index) in topMenu" :key="item.name">
          {{ item.name }}
        </div>
      </div>
      <div class="right-content">
        <div class="item1" :style="{ width: isFocus ? '416px' : '300px', marginRight: isFocus ? '0' : '10px' }">
          <el-input @focus="getFocus" @blur="loseFocus" size="large" placeholder="输入文章关键词" :suffix-icon="Search" />
        </div>
        <div class="item2" :style="{ width: isFocus ? '0' : '106px' }">
          <el-button type="primary" plain>
            编辑文章&nbsp;<el-icon><EditPen /></el-icon>
          </el-button>
        </div>
        <div class="item3">
          <el-switch inline-prompt :active-icon="Sunny" :inactive-icon="Moon" v-model="isLight" />
          <el-badge :style="{ opacity: loginStore.token ? 1 : 0 }" :value="100" :max="99">
            <el-icon size="22px"><ChatDotRound /></el-icon>
          </el-badge>
          <div>
            <el-avatar v-if="loginStore.token" :size="35" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            <el-link type="primary" v-else @click="gotoLogin">登录/注册</el-link>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-content">33</div>
  </div>
</template>
<script lang="ts" setup>
import { Search, Sunny, Moon } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/store/login/index'
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
}
/**
 * 输入框逻辑
 */
const isFocus = ref(false)
const getFocus = () => {
  isFocus.value = true
}
const loseFocus = () => {
  isFocus.value = false
}
/**
 * 登录判断
 */
const loginStore = useLoginStore()
const router = useRouter()
const gotoLogin = () => {
  router.replace('/login')
}
</script>
<style lang="less" scoped>
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
