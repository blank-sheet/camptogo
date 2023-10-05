<template>
  <!-- 查看报名表抽屉 -->
  <el-drawer v-model="show" title="查看退款信息" :with-header="false" size="40%">
    <h4>这是一个商品名称{{}}<el-divider /></h4>
    <div>
      <img src="../../../../../assets/frogopeneyes.png" />
      <span>基本信息</span>
      <p>昵称：{{ info.enrollName }}</p>
      <p>地区/家乡：{{ info.locationHome }}</p>
      <!-- <p>就读年级：{{}}</p>
      <p>证件资料：{{}}</p> -->
      <p>{{ info.photoPath }}</p>
    </div>
    <div>
      <img src="../../../../../assets/frogopeneyes.png" />
      <span>监护人信息</span>
      <p>姓名：{{ info.guardName }}</p>
      <p>手机号：{{ info.guardPhone }}</p>
      <p>关系：{{ info.guardRelation }}</p>
    </div>
    <!-- <div>
      <img src="../../../../../assets/frogopeneyes.png" />
      <span>紧急联系人</span>
      <p>姓名：{{}}</p>
      <p>手机号：{{}}</p>
      <p>关系：{{}}</p>
    </div> -->
    <div>
      <img src="../../../../../assets/frogopeneyes.png" />
      <span>基本身体情况</span>

      <p>身高：{{ info.height }}</p>
      <p>体重：{{ info.weight }}</p>
      <p>血型：{{ info.bloodType }}</p>
    </div>
    <div>
      <img src="../../../../../assets/frogopeneyes.png" />
      <span>基本健康情况</span>

      <p>过敏反应：{{ info.allergyIf }}</p>
      <p>饮食禁忌：{{ info.dietDetail }}</p>
      <p>食物禁忌详细: {{ info.dietDetail }}</p>
      <p>健康状况：{{ info.healthCondition }}</p>
      <p>
        {{ info.healthDetail }}
      </p>
    </div>
    <div>
      <img src="../../../../../assets/frogopeneyes.png" />
      <span class="titled">更多信息</span>
      <p>特长：{{ info.specialities }}</p>
      <p>爱好：{{ info.hobbies }}</p>
      <p>期望/收获：{{ info.gains }}</p>
      <p>其他：{{ info.other }}</p>
    </div>
    <div>
      <el-divider />
      <el-button plain>审核不通过</el-button>
      <el-button type="success" @click="show = false">审核通过</el-button>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'
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

<style lang="scss" scoped>
div {
  margin-bottom: 20px;
  img {
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }
  span {
    color: #00000073;
    size: 14px;
    font-weight: 400;
    margin-bottom: 24px;
  }
  p {
    color: #333;
    size: 14px;
    font-weight: 400;
    margin-left: 68px;
    padding: 16px 0 16px 0;
  }
}
</style>
