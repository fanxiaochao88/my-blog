<template>
  <div class="list-item-wrap">
    <div class="item-header">
      <span class="nickname">{{ props.dataItem?.author.nickname }}</span>
      <el-divider direction="vertical" />
      <span>{{ moment(props.dataItem?.createAt).format('YYYY-MM-DD') }}</span>
      <el-divider direction="vertical" />
      <span>{{ props.dataItem?.label_names.replace(/,/g, ' · ') }}</span>
    </div>
    <div class="item-content">
      <div class="content-left">
        <div class="title">
          {{ props.dataItem?.title }}
        </div>
        <div class="description">
          {{ props.dataItem?.description }}
        </div>
      </div>
      <div class="content-right">
        <img :src="props.dataItem?.main_cover_url" alt="">
      </div>
    </div>
    <div class="item-bottom">
      <div>
        <el-icon><View /></el-icon><span>{{ 100 }}</span>
      </div>
      <div class="dianzan">
        <img src="@/assets/img/dianzan.png" alt=""><span>{{ 100 }}</span>
      </div>
      <div>
        <el-icon><ChatRound /></el-icon><span>{{ 100 }}</span>
      </div>
    </div>
    <el-divider />
  </div>
</template>
<script lang="ts" setup>
import moment from 'moment'
import { defineProps } from 'vue'
const props = defineProps({
  dataItem: Object
})
</script>
<style lang="less" scoped>
:deep(.el-divider--horizontal) {
  margin: 10px 0 !important;
}
.list-item-wrap {
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  height: 141px;
  padding-right: 20px;
  padding-top: 10px;
  .item-header {
    font-size: 14px;
    margin-bottom: 15px;
    .nickname {
      color: #4e5969;
    }

    span {
      color: #86909c;
    }
  }
  .item-content {
    display: flex;
    .content-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      .title {
        font-size: 16px;
        font-weight: bold;
        color: #1d2129;
        margin-bottom: 15px;
      }
      .description {
        font-size: 13px;
        color: #86909c;
        margin-bottom: 15px;
      }
    }
    .content-right {
      width: 120px;
      height: 80px;
      margin-left: 24px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .item-bottom {
    display: flex;
    div {
      .el-icon {
        color: #86909c
      }
      display: flex;
      align-items: center;
      margin-right: 15px;
      span {
        font-size: 12px;
        color: #86909c;
      }
      &:not(:nth-child(1)):hover {
        span {
          color: #409EFF;
        }
      }
    }
    
    .dianzan {
      img {
        width: 14px;
        position: relative;
        top: -1px;
      }
    }
  }
}
</style>
