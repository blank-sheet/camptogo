<template>
  <div class="product-card" @click="() => emits('goToDetail')">
    <div class="image">
      <img :src="imageUrl" />
      <el-tag class="price" type="success">{{ getPrice(price) }}￥</el-tag>
    </div>

    <p class="desc">{{ desc }}</p>
    <div class="small">
      <span v-if="!period?.length">{{ getTime(startTime) + '-' + getTime(endTime) }}</span>
      <div v-else style="display: flex; position: relative">
        <span>多团期商品</span>
        <span style="margin-left: auto" @click.stop="showPeriod = !showPeriod">查看团期</span>
      </div>
      <div style="position: relative" v-show="showPeriod">
        <ul style="position: absolute; right: 187px; top: 60px">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>查看团期</span>
                <el-icon @click.stop="showPeriod = !showPeriod" class="close">
                  <CircleCloseFilled />
                </el-icon>
              </div>
            </template>
            <div class="list">
              <li v-for="i in period">
                <span :key="i">{{
    getTime(i.activity_start_time) + ' - ' + getTime(i.activity_end_time)
  }}</span>
              </li>
            </div>
          </el-card>
        </ul>
      </div>
    </div>
    <div class="small">{{ area }}</div>
    <div class="tags">
      <el-tag class="ml-2" type="warning">{{ getProductStatus(lunchStatus) }}</el-tag>
      <el-popover popper-class="more-popover" placement="top-start" :width="60" trigger="hover">
        <div class="list-box">
          <div class="item-btn" @click.stop="() => emits('changeSchedule')">
            <p>管理排期</p>
          </div>
        </div>
        <template #reference>
          <el-button link>...</el-button>
        </template>
      </el-popover>
      <!-- <el-tooltip content="管理排期" placement="top">
        <el-tag class="ml-2" type="success" @click.stop="() => emits('changeSchedule')">...</el-tag>
      </el-tooltip> -->
    </div>
  </div>
</template>

<script setup>
import { getProductStatus } from '../../../../../utils/getProductStatus'
import { ref } from 'vue'
defineProps({
  imageUrl: {
    default:
      'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
  },
  desc: {
    default: '这是一个很长很长很长很长很长很长的商品名称一行最多14个字'
  },
  startTime: {
    default: '2022/3/13-2022/3/30'
  },
  endTime: {
    default: ''
  },
  area: {
    default: '地区'
  },
  status: {
    default: '未上架'
  },
  price: {
    default: 900
  },
  lunchStatus: {
    default: '修改审核中'
  },
  period: {
    default: []
  }
})
const getTime = (t = '2023-02-02T00:00:00Z') => t?.slice(0, 10).replace('-', '/')
const getPrice = (p = 100) => p / 100
const showPeriod = ref(false)
const emits = defineEmits(['goToDetail', 'changeSchedule'])
const changeSchedule = () => {

}
</script>

<style lang="scss">
.box-card {
  position: absolute;
  z-index: 99;
  width: 200px;
  height: 224px;

  .close {
    position: relative;
    margin-left: 90px;
    margin-top: 4px;
  }

  .card-header {
    :nth-child(1) {
      font-family: PingFang SC;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      text-align: left;
      margin: 0;
    }
  }

  .list {
    margin-left: -10px;
    overflow-y: scroll;
    height: 154px;
    margin-top: -15px;
    margin-right: -10px;

    li {
      list-style: none;
      color: #8a8a8a;
      font-family: PingFang SC;
      font-size: 12px;
      font-weight: 400;
      line-height: 31px;
      text-align: center;

      &:hover {
        background-color: #eff9d9;
        color: #93d500;
      }
    }
  }
}

.product-card {
  display: flex;
  flex-direction: column;
  padding: 8px;
  align-items: center;
  min-width: 192px;
  margin: 10px;
  border-radius: 6px;
  box-shadow: -1px -2px 5px 5px rgb(0 0 0 / 4%);

  &:hover {
    cursor: pointer;
  }

  .image {
    width: 170px;
    height: 120px;
    position: relative;
    margin-bottom: 6px;

    img {
      border-radius: 6px;
      width: 100%;
      height: 100%;
    }

    .price {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }

  p {
    width: 170px;
    height: 40px;
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .small {
    font-size: small;
    color: gray;
    width: 170px;
    margin: 6px 0;
  }

  .ml-2 {
    align-self: end;
  }

  .tags {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }  
}

.more-popover {
  padding: 0;
  width: 84px !important;
  min-width: 84px !important;
  .list-box {
    >div {
      text-align: center;
      cursor: pointer;
      font-size: 14px;
    }
  }
}
</style>
