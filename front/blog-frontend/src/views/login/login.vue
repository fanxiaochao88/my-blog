<template>
  <div class="login-wrap">
    <vue-particles color="#ffffff" shapeType="star"></vue-particles>
    <div class="logo-content display-flex">
      <img src="@/assets/img/logo_transparent.png" alt="">
      <h2 class="title">测试标题</h2>
    </div>
    <div class="login-panel">
      <div class="switch" @click="changeLoginType">
        <img v-if="loginType" src="@/assets/img/login.register/web.png" alt="">
        <img v-else src="@/assets/img/login.register/erwei.png" alt="">
      </div>
      <loginPanel/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import loginPanel from './child/login-panel.vue'
import { ref } from "vue";
/**
 * 登录方式
 */
const loginType = ref(true)
const changeLoginType = () => {
  loginType.value = !loginType.value
}
 </script>
<style lang="less" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  background: url('@/assets/img/login.register/loginBG.jpg') 100% 100%;
  position: relative;
  .logo-content {
    height: 163px;
    position: fixed;
    top: 20px;
    left: 30px;
    img {
      height: 100%;
      opacity: .5;
      animation: img-frame 5s infinite linear;
      transform-origin: center;
    }
    .title {
      color: #F3F3F3;
      position: relative;
      top: -28px;
    }
  }
  .login-panel {
    width: 444px;
    height: 550px;
    border-radius: 15px;
    background-color: rgba(243, 243, 243, .6);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(2px);
    overflow: hidden;
    padding: 50px 50px 0 50px;

    .switch {
      width: 141px;
      height: 141px;
      background-color: rgba(75,57,82, .5);
      position: absolute;
      right: -70.5px;
      top: -70.5px;
      z-index: 999;
      transform-origin: center;
      transform: rotate(45deg);
      cursor: pointer;
      img {
        width: 38px;
        height: 38px;
        position: absolute;
        bottom: 3px;
        left: 50%;
        transform-origin: center;
        transform: translateX(-50%) rotate(-45deg);
      }
    }
  }
  @keyframes img-frame {
    0% {
      transform: rotate(0);
    }
    100%{
      transform: rotate(360deg);
    }
  }
}
</style>