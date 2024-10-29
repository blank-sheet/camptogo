<template>
  <div class="insurance-manage" v-loading="isLoading">
    <div class="title">保险管理</div>
    <el-table :data="productList" class="insurance-table">
      <el-table-column prop="fullName" label="标题" :width="240" />
      <el-table-column prop="multigroupProductType" label="团期">
        <template #default="scope">
          {{ scope.row.multigroupProductType == 'NOT_MULTIGROUP' ? '单团期' : '多团期' }}
        </template>
      </el-table-column>
      <el-table-column prop="productStatus" label="状态">
        <template #default="scope">
          <span>{{ getProductStatus(scope.row.productStatus) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="营探报名人数" />
      <el-table-column prop="createTime" label="非营探报名人数" />
      <el-table-column prop="createTime" label="未支付人数" />
      <el-table-column prop="createTime" label="开售日期" />
      <el-table-column prop="source" label="操作">
        <template #default="scope">
          <el-button type="primary" link @click="viewPersonnel(scope.row.productId)">查看保险人员</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" v-model:page="pageNum" :update:page="(val) => pageNum = val" 
      v-model:limit="pageSize" :update:limit="(val) => pageSize = val" @pagination="handleCurrentChange"></pagination>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { userApi } from "../../../../api/modules/user/user";
import { request } from "../../../../api";
import { useStore } from "../../../../store";
import { useRouter } from "vue-router";
import { getProductStatus } from '../../../../utils/getProductStatus'
const store = useStore();
const router = useRouter();

const productList = ref([])
const total = ref(0)
const pageSize = ref(10)
const pageNum = ref(1)
const keyword = ref(null)
const selectStatus = ref(null)
const isLoading = ref(false)

// 分页查询
const handleCurrentChange = () => {
  isLoading.value = true
  request
    .post(userApi.getProductList, {
      providerId: store.providerId,
      multigroupProductTypes: ['MULTIGROUP_PARENT','NOT_MULTIGROUP'],
      statuses: selectStatus.value,
      currentPage: pageNum.value,
      pageSize: pageSize.value,
      keyword: keyword.value
    })
    .then((res) => {
      console.log(res);
      productList.value = res.details?.list;
      total.value = res.details.total;
    }).finally(() => {
      isLoading.value = false
    })
}

const viewPersonnel = (e) => {
  console.log(e);
  router.push("/user/workbench/insurance-users");
}

onMounted(() => {
  handleCurrentChange()
});

</script>
<style lang="scss" scoped>
.insurance-manage {
  .title {
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    margin-top: 24px;
    margin-bottom: 16px;
    margin-left: 24px;
  }
  .insurance-table {
    margin: 0 20px;
    width: calc(100% - 40px);
  }
}
</style>