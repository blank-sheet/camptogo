<template>
  <!-- 查看报名表抽屉 -->
  <el-drawer v-model="show" title="查看退款信息" :with-header="false" size="40%">
    <h4>这是一个商品名称<div>{{}}</div><el-divider /></h4>
    <div>
      <div class="title">
        <img src="../../../../../assets/frogopeneyes.png" />
        <span>基本信息</span>
      </div>
      <p class="item"><span>姓名：</span>
      <div>{{info.enrollName }}</div>
      </p>
      <p class="item"><span>性别：</span>
      <div>{{ info.locationHome }}</div>
      </p>
      <p class="item"><span>国家：</span>
      <div>{{ info.locationHome }}</div>
      </p>
      <p class="item"><span>家乡/地区：</span>
      <div>{{ info.locationHome }}</div>
      </p>
      <p class="item"><span>出生年月日：</span>
      <div>{{ info.locationHome }}</div>
      </p>
      <p class="item"><span>证件照：</span>
      <div><img src="../../../../../assets/0.png" alt=""></div>
      </p>
      <p class="item"><span>电话号码：</span>
      <div>{{ info.locationHome }}</div>
      </p>
    </div>
    <div>
      <div class="title">
        <img src="../../../../../assets/frogopeneyes.png" />
        <span>紧急联系人</span>
      </div>
      <p class="item"><span>紧急联系人姓名：</span>
      <div>{{ info.guardName }}</div>
      </p>
      <p class="item"><span>紧急联系人电话号码：</span>
      <div>{{ info.guardPhone }}</div>
      </p>
      <p class="item"><span>与紧急联系人的关系：</span>
      <div>{{ info.guardRelation }}</div>
      </p>
    </div>
    <div>
      <div class="title">
        <img src="../../../../../assets/frogopeneyes.png" />
        <span>基本身体情况</span>
      </div>
      <p class="item"><span>身高/cm：</span>
      <div>{{ info.height }}</div>
      </p>
      <p class="item"><span>体重/kg：</span>
      <div>{{ info.weight }}</div>
      </p>
      <p class="item"><span>鞋码/EUR：</span>
      <div>{{ info.bloodType }}</div>
      </p>
      <p class="item"><span>血型：</span>
      <div>{{ info.bloodType }}</div>
      </p>
    </div>
    <div>
      <div class="title">
        <img src="../../../../../assets/frogopeneyes.png" />
        <span>基本健康情况</span>
      </div>
      <p class="item"><span>过敏反应：</span>
      <div>{{ info.height }}</div>
      </p>
      <p class="item"><span>请列出过敏源：</span>
      <div>{{ info.weight }}</div>
      </p>
      <p class="item"><span>饮食需求：</span>
      <div>{{ info.bloodType }}</div>
      </p>
      <p class="item"><span>请列出饮食需求：</span>
      <div>{{ info.bloodType }}</div>
      </p>
      <p class="item"><span>健康状况：</span>
      <div>{{ info.bloodType }}</div>
      </p>
      <p class="item"><span>请填写健康状况说明：</span>
      <div>{{ info.bloodType }}</div>
      </p>
      <p class="item"><span>是否需要特殊照顾：</span>
      <div>{{ info.bloodType }}</div>
      </p>
      <p class="item"><span>请填写需要特殊照顾的原因：</span>
      <div>{{ info.bloodType }}</div>
      </p>
    </div>
    <div>
      <div class="title">
        <img src="../../../../../assets/frogopeneyes.png" />
        <span class="titled">自定义信息</span>
      </div>
      <p class="item"><span>特长：</span>
      <div>{{ info.specialities }}</div>
      </p>
      <p class="item"><span>爱好：</span>
      <div>{{ info.hobbies }}</div>
      </p>
      <p class="item"><span>期望/收获：</span>
      <div>{{ info.gains }}</div>
      </p>
      <p class="item"><span>其他：</span>
      <div>{{ info.other }}</div>
      </p>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { request } from '../../../../../api'
import { userApi } from '../../../../../api/modules/user/user'
const show = ref(false)
const info = ref({
  id: 453,
  orderId: -1,
  // 姓名
  enrollName: '',
  locationHome: '',
  dateBirth: '',
  guardName: '',
  guardPhone: '',
  photoPath: '',
  guardRelation: '',
  height: 0,
  weight: 0,
  shoeSize: 34,
  bloodType: 'TYPE_A',
  allergyIf: true,
  dietRestrictionIf: true,
  dietDetail: '',
  healthCondition: '',
  healthDetail: '',
  temperament: ['', ''],
  specialities: '',
  hobbies: '',
  gains: '',
  other: ''
})

defineExpose({
  getInfo: (id = 0) => {
    show.value = true
    request.post(userApi.getTable, { orderId: id }).then(resp => {
      info.value = (resp as any).details
    })
  }
})
</script>

<style lang="scss" scoped>.title {
  display: flex;
  margin: 20px 0;

  img {
    height: 20px;
    width: 20px;
    margin-right: 10px;

  }

  span {
    color: #00000073;
    height: 20px;
    line-height: 20px;
    size: 14px;
    font-weight: 400;
  }
}

.item {
  color: rgba(38, 38, 38, 1);
  font-weight: 400;
  margin-left: 30px;
  padding: 10px 0;
  display: flex;
  width: 90%;

  span {
    width: 20%;
    word-wrap: break-word;
    color: rgba(0, 0, 0, 0.65);
  }

  div {
    width: 80%;
    white-space: pre-wrap;
    word-break: break-all;
    img{
      width: 60%;
      height: 20vh;
      border-radius: 10px;
    }
  }

}</style>
