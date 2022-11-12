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
          <el-dropdown trigger="click">
            <el-button type="primary" plain>
              编辑文章&nbsp;<el-icon><EditPen /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="Edit" @click="gotoEdit">原创文章</el-dropdown-item>
                <el-dropdown-item icon="Link" @click="gotoLink" divided>接入网文</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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
    <el-dialog v-model="linkPublishVisibl" width="30%">
      <template #header>
        <div style="position: relative; top: 3px">接入网文</div>
      </template>
      <el-form :model="linkForm" label-width="80px">
        <el-form-item label="标题:">
          <el-input v-model="linkForm.title" />
        </el-form-item>
        <el-form-item label="选择标签: ">
          <div>
            <el-check-tag style="margin: 0 5px" v-for="(item, index) in labels" @change="(check: boolean)=>changeCheck(index, check)" :checked="item.checked" :key="item.id">{{
              item.label
            }}</el-check-tag>
          </div>
        </el-form-item>
        <el-form-item label="编辑摘要: ">
          <el-input show-word-limit maxlength="100" v-model="linkForm.description" :rows="5" type="textarea" placeholder="请输入摘要信息" />
        </el-form-item>
        <el-form-item label="所属平台:">
          <el-select v-model="linkForm.belongPlatform" placeholder="请选择文章平台">
            <el-option v-for="item in platMenu" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="链接地址:">
          <el-input placeholder="请填入网文链接地址" v-model="linkForm.link" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="linkPublishVisibl = false">取消</el-button>
          <el-button type="primary" @click="gotoLinkPublish"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { Search, Sunny, Moon } from '@element-plus/icons-vue'
import { nextTick, ref, watch } from 'vue'
import { platMenu } from '@/common/platForm'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/store/login/index'
import { useOtherStore } from '@/store/other/index'
import editAPI from '@/api/editAPI'
import { Message } from '@/utils/message'
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

/**
 * 实现接入网文
 */
const linkPublishVisibl = ref(false)
const linkForm = ref<{
  labelNames: string[]
  labelIds: string[]
  description: string
  belongPlatform: string
  link: string
  title: string
}>({
  title: '',
  belongPlatform: '',
  description: '',
  link: '',
  labelNames: [],
  labelIds: []
})
// 获取标签数据
const labels = ref<any[]>([])
// 填写信息
const gotoLink = async () => {
  if (!loginStore.token) {
    return router.push('/login')
  }
  linkPublishVisibl.value = true
  const res = await editAPI.getLabels()
  labels.value = res.result
  labels.value.forEach((item) => {
    item.checked = false
  })
  labels.value[0].checked = true
}
const changeCheck = (index: any, check: boolean) => {
  labels.value[index].checked = check
}
// 确认发布网文
const gotoLinkPublish = async () => {
  labels.value.forEach((item) => {
    if (item.checked) {
      linkForm.value.labelIds.push(item.id)
      linkForm.value.labelNames.push(item.label)
    }
  })
  linkForm.value.labelIds = linkForm.value.labelIds.join(',') as any
  linkForm.value.labelNames = linkForm.value.labelNames.join(',') as any
  // 开始实现网文发布的后端功能
  const res = await editAPI.publishLinkMoment(linkForm.value)
  Message(res)
  linkPublishVisibl.value = false
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
