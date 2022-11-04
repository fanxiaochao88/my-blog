<template>
  <div class="login-panel-wrap">
    <div ref="demo"></div>
    <div class="title">欢迎登录</div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="账号密码" name="password">账号密码</el-tab-pane>
      <el-tab-pane label="手机号码" name="phone">手机号码</el-tab-pane>
      <el-tab-pane label="邮箱" name="email">邮箱</el-tab-pane>
    </el-tabs>
    <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
    <div class="middle">
      <el-checkbox><span style="color: #000">记住登录</span></el-checkbox>
      <span class="forget-password">忘记密码</span>
    </div>
    <div class="bottom">
      <div class="bottom-top">
        <div></div>
        <span>更多方式</span>
        <div></div>
      </div>
      <div class="bottom-bottom display-flex">
        <img v-for="(item, index) in icons" :key="index" :src="item" alt="" />
      </div>
      <div class="register"><span>暂无账号?&nbsp;&nbsp;</span><span>立即注册</span></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
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
/**
 * 滑块验证
 */
const demo = ref<HTMLDivElement>()
let huakuai = ''
onMounted(() => {
  // eslint-disable-next-line no-undef
  huakuai = _dx.Captcha(demo.value, {
      // appId, 在控制台应用管理或应用配置模块获取
      appId: "8dfde1620cf161ed232f2d2bf22dd1a8",
      apiServer: 'dxvip.dingxiang-inc.com',
      style: 'popup',
      // apiServer域名地址在控制台页面->无感验证->应用管页面左上角获取，必须填写完整包括https://。
      success: (token: any) => {
        // 获取验证码token，用于后端校验，注意获取token若是sl开头的字符串，则是前端网络不通生成的降级token,请检查前端网络及apiServer地址。
        console.log(token);
      }
    });
})
/**
 * 登录
 */
 const login = () => {
  // eslint-disable-next-line no-undef
  huakuai.show()
 }
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
  .middle {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .forget-password {
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #409eff;
        text-decoration: underline;
      }
    }
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
        background-color: rgba(153, 144, 157, 0.5);
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

    .register {
      font-size: 14px;
      padding-top: 15px;
      text-align: center;
      & span:nth-child(2) {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
}
</style>
