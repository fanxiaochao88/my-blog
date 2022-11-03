<template>
  <div class="login-panel-wrap">
    <div class="title">欢迎登录</div>
    <el-tabs v-model="activeName">
        <el-tab-pane label="账号密码" name="password">账号密码</el-tab-pane>
        <el-tab-pane label="手机号码" name="phone">手机号码</el-tab-pane>
        <el-tab-pane label="邮箱" name="email">邮箱</el-tab-pane>
    </el-tabs>
    <el-button type="primary" style="width: 100%">登录</el-button>
    <div class="bottom">
      <div class="bottom-top">
        <div></div>
        <span>更多方式</span>
        <div></div>
      </div>
      <div class="bottom-bottom display-flex">
        <img v-for="(item, index) in icons" :key="index" :src="item" alt="">
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
/**
 * tab标签切换
 */
const activeName = ref('password')
/**
 * 图标
 */
const icons = [
  require('@/assets/img/login.register/QQ.png'),
  require('@/assets/img/login.register/weixin.png'),
  require('@/assets/img/login.register/weibo.png'),
  require('@/assets/img/login.register/zhifubao.png'),
  require('@/assets/img/login.register/githubb.png')
]
</script>
<style lang="less" scoped>
@fontcolor:rgba(0,0,0,1);
.login-panel-wrap {
  :deep(.el-tabs__nav-wrap::after) {
    background-color: transparent !important;
  }
  position: relative;
  width: 100%;
  height: 100%;
  .title {
    font-size: 22px;
    font-weight: 600;
    color: @fontcolor;
    letter-spacing: 2px;
    white-space: pre-wrap;
    margin-bottom: 5px;
  }
  .bottom {
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 92px;
    .bottom-top {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
      div {
        width: 100px;
        height: 1px;
        background-color: rgba(153, 144, 157, .5);
      }
      span {
        margin: 0 25px;
      }
    }

    .bottom-bottom {
      img {
        cursor: pointer;
        width: 20px;
        margin: 0 5px;
      }
    }
  }
}
</style>
