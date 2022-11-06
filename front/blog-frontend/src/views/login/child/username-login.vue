<template>
  <div class="username-login-wrap">
    <el-form ref="formRef" :model="form" :rules="formRules" status-icon>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="请输入账号" :prefix-icon="User" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password"  placeholder="请输入密码" :prefix-icon="Lock" />
      </el-form-item>
      <el-form-item prop="capText" class="captcha-item">
        <el-input v-model="form.capText" :prefix-icon="Lock"  placeholder="请输入验证码" />
        <div @click="getCaptcha" title="看不清?点击更换" class="captcha" v-html="captchaSVG"></div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, defineExpose } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import loginAPI from '@/api/loginAPI'
import { Message } from '@/utils/message'
import { useLoginStore } from '@/store/login/index'
import { useRouter } from "vue-router";
const form = ref({
  username: '',
  password: '',
  capText: ''
})
const formRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  capText: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}
// 获取验证码图片
const captchaSVG = ref('')
const getCaptcha = () => {
  loginAPI.getCaptcha().then((res) => {
    captchaSVG.value = res
  })
}
onMounted(() => {
  getCaptcha()
})
// 登录函数
const loginStore = useLoginStore()
const router = useRouter()
const login = (callback: any) => {
  loginAPI
    .login({ ...form.value })
    .then((res) => {
      Message(res)
      console.log(res);
      window.localStorage.setItem('token', res.token)
      loginStore.changeToken(res.token)
      window.localStorage.setItem('avatarUrl', res.userInfo.avatar_url)
      loginStore.changeAvatarUrl(res.userInfo.avatar_url)
      router.push('/index')
    })
    .catch((err) => {
      Message(err, 'error')
    })
    .finally(() => {
      callback()
      getCaptcha()
    })
}
defineExpose({
  login
})
</script>
<style lang="less" scoped>
.captcha-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-input {
    width: 50% !important;
  }
  .captcha {
    padding-left: 22px;
    width: 150px;
    height: 50px;
  }
}
</style>
