<template>
  <!-- 添加数据展示栏，添加已删除 -->
  <div class="overview" v-loading="isLoading">
    <div class="title">商品发布</div>
    <!-- data-show组件 -->
    <CampDataShow :datas="datas" />
    <div class="tool-bar">
      <el-tabs v-model="activeTab" @tab-change="tabChange">
        <el-tab-pane class="text" label="全部商品" name=""></el-tab-pane>
        <el-tab-pane label="草稿" name="DRAFT"></el-tab-pane>
        <el-tab-pane label="审核中" name="CREATED_WAIT_REVIEW/CREATED_REVIEWED/UNDERWRITING_REVIEWED"></el-tab-pane>
        <el-tab-pane label="待上架" name="ONLINE_WAIT_REVIEW"></el-tab-pane>
        <el-tab-pane label="已上架" name="ONLINE/WAIT_SALE/ON_SALE/HALTED_SALES/ONGOING/CANCELLED/COMPLETE"></el-tab-pane>
      </el-tabs>
      <div class="search-bar " style="display: flex; margin-top: 10px">
        <el-input style="width: 320px" v-model="keyword" placeholder="请输入关键词" class="input-with-select">
          <!-- <template #prepend>
            <el-select v-model="selectTag" style="width: 115px" clearable :multiple="false">
              <el-option label="商品状态" value="status" />
              <el-option label="商品ID" value="id" />
            </el-select>
          </template> -->
          <template #append>
            <el-button :icon="Search" @click="handleSearch" />
          </template>
        </el-input>
        <div class="buttons" style="margin-left: 40px">
          <el-button @click="keyword = ''">重置</el-button>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button type="primary" @click="() => goPublishProduct()">发布商品</el-button>
          <span class="desc" style="color: gray; font-size: small; margin-left: 20px">*已上架商品请前往商品管理模块进行操作</span>
        </div>
      </div>
    </div>
    <div class="cards" v-if="producets.length">
      <product-card v-for="p in producets" :key="p.productId" :desc="p.fullName" :price="p.priceSelling"
        :start-time="p?.saleStartTime" :end-time="p?.saleEndTime" :area="p.activityLocation?.startLocationDetailed"
        :lunch-status="p.productStatus" :image-url="p.horizontalShowsResourceList?.[0]?.url || 'xxx'" @go-to-detail="() => gotoDetail(p)"
        @change-schedule="() => changeSchedule(p)" :period="p?.group_period || []" :status="p.productStatus">
      </product-card>
    </div>
    <p v-else class=" text-center">暂无数据</p>
    <CampPagination :total="totalPage" @change-page="handleCurrentChange" />
  </div>
</template>

<script setup>
import ProductCard from "./components/product-card.vue";
import { Search } from "@element-plus/icons-vue";
import { ref, onMounted, watch, computed } from "vue";
import { userApi } from "../../../../api/modules/user/user";
import { request } from "../../../../api";
import { useStore } from "../../../../store";
import { useRouter } from "vue-router";
import { showStatusStr } from "../../../../utils/getStatus";
import CampDataShow from "../../../../component/camp-data-show.vue";
import CampPagination from '../../../../component/camp-pagination.vue'
const router = useRouter();
const activeTab = ref("");
const keyword = ref("");
const selectTag = ref("");
const selectStatus = ref(null);
const store = useStore();
let producets = ref([]);
const isLoading = ref(false)
const totalProducts = ref([]);
const totalPage = ref(10);
const DRAFT = ref(0)
const ONLINE = ref(0)
const WAIT_ONLINE = ref(0)
const WAIT_REVIEW = ref(0)
const datas = computed(() => {
  return [
    {
      label: "全部商品",
      value: totalPage,
    },
    {
      label: "草稿",
      value: DRAFT,
    },
    {
      label: "待上架",
      value: WAIT_ONLINE,
    },
    {
      label: "待审核",
      value: WAIT_REVIEW,
    },
    {
      label: "已上架",
      value: ONLINE,
    },
  ];
});
const handleSearch = () => {
  handleCurrentChange(1);
};

const goPublishProduct = () => {
  router.push("/user/workbench/product/new");
};
const gotoDetail = (p = 0) => {
  router.push("/user/workbench/product/" + p.productId);
};
const changeSchedule = (p = 0) => {
  router.push("/user/workbench/schedule/" + p.productId);
}
const tabChange = (name) => {
  let activeTabList = name == "" ? null : name.split("/")
  selectStatus.value = activeTabList
  handleCurrentChange(1);
}
// 分页查询
const handleCurrentChange = (next = 1, pageSize = 10) => {
  isLoading.value = true
  request
    .post(userApi.getProductList, {
      providerId: store.providerId,
      multigroupProductTypes: ['MULTIGROUP_PARENT','NOT_MULTIGROUP'],
      statuses: selectStatus.value,
      currentPage: next,
      pageSize: pageSize,
      keyword: keyword.value
    })
    .then((res) => {
      producets.value = res.details?.list;
      totalProducts.value = res.details?.list;
      totalPage.value = res.details.total;
    }).finally(() => {
      isLoading.value = false
    })
}
// 获取商品计数
const getCountNum = () => {
  request
    .post(userApi.getCount, {
      providerId: store.providerId
    })
    .then(res => {
      DRAFT.value = res.details.DRAFT
      ONLINE.value = res.details.ONLINE
      WAIT_ONLINE.value = res.details.WAIT_ONLINE
      WAIT_REVIEW.value = res.details.WAIT_REVIEW
    })
}
onMounted(() => {
  getCountNum()
  handleCurrentChange()
});
</script>

<style lang="scss" scoped>
.overview {
  height: 100%;
  width: 99%;

  .tool-bar {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    margin-left: 24px;
  }

  >header {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    background-color: white;
    margin-bottom: 30px;
  }

  .cards {
    background-color: white;
    padding: 15px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-left: 24px;
  }
}

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
</style>
