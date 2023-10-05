<template>
  <!-- 查看退款信息抽屉 -->
  <ElDrawer v-model="show" title="查看退款信息" :with-header="false" :modal="true" size="40%">
    <h4>退款信息<el-divider /></h4>
    <div>
      <img src="../../../../../assets/frogopeneyes.png" />
      <span>订单信息</span>
      <p>姓名：{{}}</p>
      <p>手机号：{{}}</p>
    </div>
    <div>
      <img src="../../../../../assets/frogopeneyes.png" />
      <span>退款原因</span>

      <p>{{}}</p>
    </div>
    <div>
      <img src="../../../../../assets/frogopeneyes.png" />
      <span>退款方案</span>
      <span class="small">*不同意下述内容的，应在3个工作日内联系客服说明理由。</span>

      <p>{{}}</p>
    </div>
    <div>
      <img src="../../../../../assets/frogopeneyes.png" />
      <span>退款进度</span>
      <el-tag type="danger">退款审核中</el-tag>
    </div>
    <div>
      <el-divider />
      <el-button plain>联系客服补充材料</el-button>
      <el-button type="success" @click="show = false">确认退款信息</el-button>
    </div>
  </ElDrawer>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'
import { request } from '../../../../../api'
import { userApi } from '../../../../../api/modules/user/user'
const show = ref(false)
const info = ref({})

defineExpose({
  getInfo: (id = 0) => {
    show.value = true
    // request.post(userApi.getTable, { providerId: props.providerId }).then(resp => {
    //   info.value = (resp as any).details
    // })
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
  .el-tag {
    margin-left: 68px;
  }
}
</style>
