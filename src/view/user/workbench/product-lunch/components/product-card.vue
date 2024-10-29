<template>
  <div class="product-card" @click="() => emits('goToDetail')">
    <div class="image">
      <el-tag class="targeted-promotion" v-if="targetedPromotion" type="warning">定制</el-tag>
      <img :src="imageUrl" />
      <el-tag class="price" type="success">{{ getPrice(price) }}￥</el-tag>
    </div>

    <p class="desc">{{ desc }}</p>
    <div class="small">
      <span v-if="!period?.length">
        <!-- {{ getTime(startTime) + '-' + getTime(endTime) }} -->
          {{ convertToBeijingTime(createTime) }}
      </span>
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
              <li v-for="(i, index) in period" :key="index">
                <span>
                  {{ convertToBeijingTime(i.createTime) }}
                  <!-- {{ getTime(i.activity_start_time) + ' - ' + getTime(i.activity_end_time) }} -->
                </span>
              </li>
            </div>
          </el-card>
        </ul>
      </div>
    </div>
    <div class="small">{{ area }}</div>
    <div class="tags">
      <el-tag class="ml-2" type="warning">{{ getProductStatus(lunchStatus) }}</el-tag>
      <el-popover popper-class="more-popover" placement="top" :width="180" trigger="hover">
        <div class="list-box">
          <div class="item-btn" v-if="lunchStatus != 'HALTED_SALES' && lunchStatus != 'ON_SALE'" @click.stop="() => emits('delProduct')">
            <p>删除</p>
          </div>
          <div class="item-btn" @click.stop="() => emits('changeSchedule')">
            <p>管理排期</p>
          </div>
          <div class="item-btn" @click.stop="() => emits('addInsurance')">
            <p>增加非营探人员投保</p>
          </div>
        </div>
        <template #reference>
          <el-button link @click.stop>...</el-button>
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
  createTime: {
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
  },
  targetedPromotion: {
    default: false
  }
})
const getTime = (t = '2023-02-02T00:00:00Z') => t?.slice(0, 10).replace('-', '/')
const getPrice = (p = 100) => p / 100
const showPeriod = ref(false)
const emits = defineEmits(['goToDetail', 'changeSchedule', 'delProduct', 'addInsurance'])

const convertToBeijingTime = (isoString) => {
  // 解析 ISO 格式的日期时间字符串
  const date = new Date(isoString);

  // 获取 UTC 时间
  const utcHour = date.getUTCHours();

  // 将 UTC 时间转换为北京时间（东八区），需要加上 8 小时
  let beijingHour = utcHour + 8;

  // 调整小时，如果超过 24 小时则减去 24
  if (beijingHour >= 24) {
    beijingHour -= 24;
  }

  // 设置 Date 对象为北京时间
  date.setHours(beijingHour);
  
  // 格式化日期时间为 YYYY-MM-DD HH:mm 格式
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  // 返回格式化后的字符串
  return `${year}-${month}-${day} ${hour}:${minute}`;
}

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

    .targeted-promotion {
      position: absolute;
      top: 0;
      left: 0;
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
  // padding: 0 10px;
  width: 152px !important;
  min-width: 152px !important;
  .list-box {
    >div {
      text-align: center;
      cursor: pointer;
      font-size: 14px;
      margin: 3px 0;
    }
  }
}
</style>
