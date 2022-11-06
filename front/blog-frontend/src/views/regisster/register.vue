<template>
  <div class="register-wrap">
    <div v-if="!showResult" class="register-panel">
      <el-steps :active="stepActive" finish-status="success">
        <el-step title="基础信息" />
        <el-step title="校验信息" />
        <el-step title="补充信息" />
      </el-steps>
      <el-carousel height="353.33px" arrow="never" :initial-index="stepActive - 1" :autoplay="false" indicator-position="none" :loop="false" ref="carRef">
        <el-carousel-item>
          <div class="step-1">
            <el-form label-width="79px" :model="stepOneForm" :rules="stepOneFormRules" ref="stepOneFormRef" label-position="left">
              <el-form-item label="账号" prop="username">
                <el-input size="large" placeholder="请输入6-15位账号" v-model="stepOneForm.username" @blur="usernameBlur" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input size="large" type="password" placeholder="请输入6-15位密码" v-model="stepOneForm.password" />
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input size="large" type="password" placeholder="请再次输入密码" v-model="stepOneForm.confirmPassword" />
              </el-form-item>
            </el-form>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="step-2">
            <el-form label-width="79px" :model="stepTwoForm" :rules="stepTwoFormRules" ref="stepTwoFormRef" label-position="left">
              <el-form-item label="邮箱" prop="email">
                <el-input size="large" v-model="stepTwoForm.email" placeholder="请输入合法邮箱" />
              </el-form-item>
              <el-form-item prop="emailCode">
                <el-input size="large" v-model="stepTwoForm.emailCode">
                  <template #append>
                    <el-button :disabled="emailDisabled" plain @click="getEmailCode">{{ emailMessage }}</el-button>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="phoneNumber">
                <el-input size="large" v-model="stepTwoForm.phoneNumber" />
              </el-form-item>
              <el-form-item prop="phoneNumberCode">
                <el-input size="large" v-model="stepTwoForm.phoneNumberCode">
                  <template #append>
                    <el-button :disabled="phoneDisabled" @click="getPhoneCode" plain>{{ phoneMessage }}</el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="step-3">
            <el-form label-width="86px" :model="stepThreeForm" label-position="left">
              <el-row :gutter="10">
                <el-col :span="13">
                  <el-form-item label="昵称">
                    <el-input v-model="stepThreeForm.nickname" placeholder="请输入用户昵称" />
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="性别">
                    <el-radio-group v-model="stepThreeForm.sex">
                      <el-radio label="男">男</el-radio>
                      <el-radio label="女">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="公司或组织">
                <el-input v-model="stepThreeForm.company" placeholder="请输入公司或组织名称" />
              </el-form-item>
              <el-form-item label="所在地区">
                <el-cascader placeholder="请选择地区" v-model="stepThreeForm.baseAddress" :options="addressOptions" :props="addressProps" />
              </el-form-item>
              <el-form-item label="博客地址">
                <el-input v-model="stepThreeForm.bolgAddress" placeholder="请输入个人博客地址" />
              </el-form-item>
              <el-form-item label="github">
                <el-input v-model="stepThreeForm.githubAddress" placeholder="请输入个人git仓库地址" />
              </el-form-item>
              <el-form-item label="用户头像">
                <el-upload class="avatar-uploader" action="http://localhost:8001/upload/avatar" :show-file-list="false" :on-success="handleAvatarSuccess" name="avatar">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </el-carousel-item>
      </el-carousel>

      <div class="btn-content display-flex">
        <el-button :disabled="stepActive == 1" class="btn-item" type="primary" @click="preStep">上一步</el-button>
        <el-button class="btn-item" type="primary" @click="nextStepp">{{ stepActive == 3 ? '注 册' : '下一步' }}</el-button>
      </div>
    </div>
    <div v-else class="result-panel">
      <el-result icon="success">
        <template #title>
          <h2>注册成功</h2>
        </template>
        <template #sub-title>
          <span>{{ resultSecond }}</span>
          <span>秒后跳转登录页,</span>
          <span style="font-size: 14px; color: #409eff; cursor: pointer;">去登录</span>
        </template>
      </el-result>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { FormInstance } from 'element-plus/es/components/form'
import { ref } from 'vue'
import { citys } from '@/common/citys'
import { ElCarousel } from 'element-plus'
import { Message } from '@/utils/message'
import { useRouter } from 'vue-router'

const router = useRouter()

import registerAPI from '@/api/registerAPI'
/**
 * 步骤条逻辑
 */
const stepActive = ref(1)
const carRef = ref<InstanceType<typeof ElCarousel>>()
const preStep = () => {
  stepActive.value > 1 && stepActive.value--
  carRef.value?.setActiveItem(stepActive.value - 1)
}
const nextStepp = () => {
  if (stepActive.value == 3) {
    // 去注册
    registerAPI
      .register({
        ...stepOneForm.value,
        ...stepTwoForm.value,
        ...stepThreeForm.value,
        baseAddress: stepThreeForm.value.baseAddress.join(',')
      })
      .then((res: any) => {
        Message(res)
        showResult.value = true
        const timer = setInterval(() => {
          resultSecond.value--
          if (resultSecond.value <= 0) {
            router.replace('/login')
            clearInterval(timer)
          }
        }, 1000)
      })
      .catch((err: any) => {
        Message(err, 'error')
      })
    return
  }
  if (stepActive.value == 1) {
    stepOneFormRef.value?.validate((valid) => {
      if (valid) {
        stepActive.value = 2
        carRef.value?.setActiveItem(stepActive.value - 1)
      } else {
        return false
      }
    })
  }
  if (stepActive.value == 2) {
    stepTwoFormRef.value?.validate((valid) => {
      if (valid) {
        stepActive.value = 3
        carRef.value?.setActiveItem(stepActive.value - 1)
      } else {
        return false
      }
    })
  }
}
/**
 * 步骤条一表单逻辑
 */
const stepOneForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})
const stepOneFormRef = ref<FormInstance>()
// 校验密码
const checkPassword = (rule: any, value: any, callback: any) => {
  if (stepOneForm.value.password != stepOneForm.value.confirmPassword) {
    callback(new Error('两次输入得密码不正确'))
  } else {
    callback()
  }
}
// 校验用户名
const verifyUsername = (rule: any, value: any, callback: any) => {
  if (usernameTemp && usernameTemp == stepOneForm.value.username) {
    return callback(new Error('用户名已存在'))
  } else {
    return callback()
  }
}
// 校验用户名是否重复
let usernameTemp = ''
const usernameBlur = async () => {
  if (stepOneForm.value.username?.length < 6) {
    return
  }
  const res = await registerAPI.verifyUsername({ username: stepOneForm.value.username })
  usernameTemp = res.result.username
  if (usernameTemp) {
    // 校验信息显示
    stepOneFormRef.value?.validateField('username')
  }
}
const stepOneFormRules = {
  username: [
    { required: true, message: '请填写账号', trigger: 'blur' },
    { min: 6, max: 15, message: '账号长度6~15位', trigger: 'blur' },
    { validator: verifyUsername, trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请填写密码', trigger: 'blur' },
    { min: 6, max: 15, message: '账号长度6~15位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: checkPassword, trigger: 'blur' }
  ]
}

/**
 * 步骤条二逻辑
 */
const stepTwoForm = ref({
  email: '',
  emailCode: '',
  phoneNumber: '',
  phoneNumberCode: ''
})
const stepTwoFormRef = ref<FormInstance>()
const checkEmail = (rule: any, value: any, callback: any) => {
  // eslint-disable-next-line no-useless-escape
  const reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  if (!reg.test(value)) {
    return callback(new Error('请输入正确格式的邮箱'))
  }
  return callback()
}
const checkPhoneNumber = (rule: any, value: any, callback: any) => {
  const reg = /^((\+|00)86)?1[3-9]\d{9}$/
  if (!reg.test(value)) {
    return callback(new Error('请输入正确格式的手机号'))
  }
  return callback()
}
const isHasCheck = (rule: any, value: any, callback: any) => {
  if (emailTemp && emailTemp == stepTwoForm.value.email) {
    return callback(new Error('邮箱已注册'))
  }
  return callback()
}
const isHasPhoneNumber = (rule: any, value: any, callback: any) => {
  if (phoneNumberTemp && phoneNumberTemp == stepTwoForm.value.phoneNumber) {
    return callback(new Error('手机号已注册'))
  }
  return callback()
}
const stepTwoFormRules = {
  email: [
    { required: true, message: '请填写邮箱', trigger: 'blur' },
    { validator: checkEmail, trigger: 'blur' },
    { validator: isHasCheck, trigger: 'blur' }
  ],
  emailCode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
  phoneNumber: [
    { required: true, message: '请填写手机号', trigger: 'blur' },
    { validator: checkPhoneNumber, trigger: 'blur' },
    { validator: isHasPhoneNumber, trigger: 'blur' }
  ],
  phoneNumberCode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
}

// 获取邮箱验证码
const emailMessage = ref('获取邮箱验证码')
let timer1 = 0
let time = 10
let emailTemp = ''
const emailDisabled = ref(false)
const getEmailCode = () => {
  stepTwoFormRef.value?.validateField('email', (valid) => {
    if (valid) {
      registerAPI.getEmailCode({ email: stepTwoForm.value.email }).then((res) => {
        // 判断是否存在, 再进行下一步操作
        if (!res.result.email) {
          Message(res)
          emailDisabled.value = true
          timer1 = setInterval(() => {
            emailMessage.value = `${time}秒后重新获取`
            time--
            if (time <= 0) {
              emailDisabled.value = false
              emailMessage.value = '再次获取验证码'
              time = 10
              clearInterval(timer1)
            }
          }, 1000)
        } else {
          emailTemp = res.result.email
          stepTwoFormRef.value?.validateField('email')
        }
      })
    }
  })
}
// 获取手机验证码
const phoneMessage = ref('获取手机验证码')
let timer2 = 0
let time2 = 10
let phoneNumberTemp = ''
const phoneDisabled = ref(false)
const getPhoneCode = () => {
  stepTwoFormRef.value?.validateField('phoneNumber', (valid) => {
    if (valid) {
      registerAPI.getPhoneCode({ phoneNumber: stepTwoForm.value.phoneNumber }).then((res) => {
        Message(res)
        if (!res.result.phone_number) {
          phoneDisabled.value = true
          timer2 = setInterval(() => {
            phoneMessage.value = `${time2}秒后重新获取`
            time2--
            if (time2 <= 0) {
              phoneDisabled.value = false
              phoneMessage.value = '再次获取验证码'
              time2 = 10
              clearInterval(timer2)
            }
          }, 1000)
        } else {
          phoneNumberTemp = res.result.phone_number
          stepTwoFormRef.value?.validateField('phoneNumber')
        }
      })
    }
  })
}

/**
 * 步骤条三逻辑
 */
const stepThreeForm = ref({
  nickname: '',
  sex: '男',
  company: '',
  baseAddress: [],
  bolgAddress: '',
  githubAddress: '',
  avatarCode: '' //头像url
})
const addressOptions = citys
const addressProps = {
  expandTrigger: 'hover'
}
const imageUrl = ref('')
const handleAvatarSuccess = (res: any) => {
  imageUrl.value = res.file
  stepThreeForm.value.avatarCode = res.file
}

/**
 * 注册成功逻辑
 */
const resultSecond = ref(5)
const showResult = ref(false)
</script>
<style lang="less" scoped>
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #999;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}

/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

/deep/ .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  text-align: center;
}
:deep(.el-input-group__append) {
  box-shadow: none;
}
:deep(.el-input-group__append, .el-input-group__prepend) {
  background-color: transparent;
}
:deep(.el-input-group__append:hover, .el-input-group__prepend:hover) {
  cursor: pointer;
}
.register-wrap {
  color: #000;
  width: 100%;
  height: 100%;
  background-color: #eee;
  position: relative;
  .result-panel {
    width: 900px;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
  }
  .register-panel {
    width: 900px;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    .el-steps {
      margin-bottom: 30px;
    }
    .step-1,
    .step-2,
    .step-3 {
      width: 50%;
      margin: 0 auto;
      position: relative;
      left: -10px;
      height: 353.22px;
    }
    .btn-content {
      padding-top: 20px;
      position: relative;
      left: 3px;
      .btn-item {
        width: 203px;
        height: 40px;
        margin-right: 30px;
      }
    }
  }
}
</style>
