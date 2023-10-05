<template>
  <div class="commodity">
    <el-breadcrumb :separator-icon="ArrowRight"><el-breadcrumb-item :to="{ path: '' }">
        <div class="title">商品管理</div>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- Camp data-show组件 -->
    <CampDataShow :datas="datas" />

    <div class="tool-bar">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="全部商品" name="first"></el-tab-pane>
        <el-tab-pane label="在售中" name="second"></el-tab-pane>
        <el-tab-pane label="履约中" name="third"></el-tab-pane>
        <el-tab-pane label="已完成" name="fourth"></el-tab-pane>
        <el-tab-pane label="已取消" name="fifth"></el-tab-pane>
      </el-tabs>
      <div class="search-bar">
        <el-input style="width: 400px" v-model="searchWord" placeholder="请输入" class="input-with-select">
          <template #prepend>
            <el-select v-model="selectTag" placeholder="Select" style="width: 115px">
              <el-option label="商品状态" value="1" />
              <el-option label="商品ID" value="2" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
        <div class="buttons">
          <div><el-button>重置</el-button></div>
          <div><el-button type="primary">查询</el-button></div>
          <section><el-button type="primary">批量更新优惠方案</el-button></section>
          <section>
            <el-button type="primary">{{ action
            }}<el-select v-model="action">
                <el-option v-for="item in actionOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </el-button>
          </section>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 98%">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="index" fixed="left" label="序号" width="auto" />
      <el-table-column prop="info" label="商品信息" width="170">
        <template #default="scope">
          <img src="" style="float: left" />
          <div style="float: right">
            <div>商品ID号: {{}}</div>
            <div>商品名称：{{}}</div>
            <div>活动开始时间：{{}}</div>
            <div>活动结束时间：{{}}</div>
            <div>成团状态： {{}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="商品状态" width="100" :filters="[
        { text: 'Home', value: 'Home' },
        { text: 'Office', value: 'Office' },
      ]" filter-placement="bottom-end">
        <template #default="scope">
          <el-tag :type="scope.row.tag === 'Home' ? 'success' : 'success'" disable-transitions>商品状态</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="index" width="120">
        <template #header>
          <div class="s-thead">
            <div style="text-align: center">库存数量</div>
            <div class="desc">（已售/库存）</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="index" label="待审核订单" width="120" />
      <el-table-column prop="index" label="累计收款" width="90" />
      <el-table-column prop="index" width="120">
        <template #header>
          <span>累计退款</span>
          <el-tooltip class="box-item" effect="dark" content="即累计已经确认需退款的<br>额度,包括实际已退款到<br>账额度和在途退款额度。" placement="top"
            raw-content>
            <el-icon>
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="index" width="120">
        <template #header>
          <span>待付款项</span>
          <el-tooltip class="box-item" effect="dark" content="指当服务商通过营探平台<br>购买保险时，营探平台为<br>服务商先行代付给保险公<br>司的款项。"
            placement="top" raw-content>
            <el-icon>
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="index" label="用户评价信息" width="120" />

      <el-table-column prop="index" width="140">
        <template #header>
          <div class="s-thead">
            <div style="text-align: center">待处理纠纷</div>
            <div class="desc">（已处理/未处理）</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="index" label="开售/停售时间" width="120" />
      <el-table-column label="操作" fixed="right" width="200">
        <template #default>
          <div class="controllers">
            <el-popover placement="top-start" title="修改商品" :width="200" trigger="hover" content="可进行商品价格、商品库存、优惠方案修改。">
              <template #reference>
                <el-button link type="primary" size="small" @click="showEditDialog">修改商品</el-button>
              </template>
            </el-popover>

            <el-button link type="primary" size="small" @click="openOperationDialog('立即停售')">立即停售</el-button>
            <el-button link type="primary" size="small" @click="copyCommodity">复制商品</el-button>
            <el-button link type="primary" size="small" @click="openOperationDialog('取消活动')">取消活动</el-button>
            <el-button link type="primary" size="small">活动改期</el-button>
            <el-button link type="primary" size="small"> 下 架 </el-button>
            <el-button link type="primary" size="small" @click="openOperationDialog('立即成团')">立即成团</el-button>
            <el-button link type="primary" size="small" style="width: auto">下载报名表信息</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <EditProductDialog ref="editProductDialogRef" />
    <ComfirmDialog ref="confirmDialogRef" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import ComfirmDialog from "./components/ComfirmDialog.vue";
import { ArrowRight } from "@element-plus/icons-vue";
import CampDataShow from "../../../../component/camp-data-show.vue";
import EditProductDialog from "./components/EditProductDialog.vue";
const action = ref("立即开售");
const searchWord = ref("");
const selectTag = ref("");
const editProductDialogRef = ref(null);
const confirmDialogRef = ref(null);
const activeTab = ref("first");
const showEditDialog = () => {
  editProductDialogRef.value.showDialog();
};
const openOperationDialog = (type = "") => {
  confirmDialogRef.value.showConfirmDialog(type);
};
const tableData = ref([
  {
    // 序号
    index: 0,
    // 商品信息
    info: {},
    status: "在售中",
  },
]);
const copyCommodity = () => {
  ElMessageBox.confirm(
    "复制商品的操作，将便于您创建新商品。生成的新商品页面与当前商品页面完全一致，您应当对全部商品信息做出仔细核查,请勿重复提交同一商品信息",
    "确认要复制商品吗",
    {
      cancelButtonText: "取消",
      confirmButtonText: "确定",
      type: "warning",
    }
  ).then(() => { });
};
onMounted(() => {

})
</script>
<script>
const datas = [
  {
    label: "全部商品",
    value: 57,
  },
  {
    label: "草稿",
    value: 20,
  },
  {
    label: "待上架",
    value: 2,
  },
  {
    label: "待审核",
    value: 20,
  },
  {
    label: "已删除",
    value: 2,
  },
];

const actionOptions = ["立即成团", "申请结算", "商品下架", "立即开售", "立即停售"];
</script>

<style lang="scss" scoped>
.el-popper__arrow {
  display: none;
}

.s-thead {
  font-size: smaller;

  .desc {
    color: #727272;
    position: relative;
    left: 0.7em;
  }
}

.el-table__header {
  height: 50px;
}

div.commodity {
  .el-table {
    --el-table-header-bg-color: #f5f5f5;
    margin-left: 24px;

    .cell {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  thead {
    color: #000000;
  }

  .el-tabs__nav-wrap::after {
    height: 0px;
  }

  .buttons {
    display: flex;
    margin: 10px;

    div {
      margin: 0 10px 0 10px;
    }

    section {
      position: relative;

      // left: 18em;
      .el-button {
        margin: 0 10px 0 10px;
      }

      .el-select {
        width: 0;
        border: none;

        ::v-deep .el-input__wrapper {
          height: 32px;
          padding: 0px 10px 0 10px;
          margin-left: 0px;
          border-radius: 0 4px 4px 0;
          box-shadow: 0 0 0 0 black;
          background-color: #93d900;

          input {
            display: none;
          }

          .el-input__suffix {
            .el-input__suffix-inner {
              display: flex;
              justify-content: center;
              align-content: center;

              i {
                margin: 0;
                color: #ffffff;
              }
            }
          }
        }
      }
    }
  }

  .search-bar {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  .tool-bar {
    margin-left: 24px;
    padding: 20px;
    background-color: #ffffff;
  }

  .controllers {
    display: flex;
    width: auto;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    .el-button {
      margin: 5px 0 5px 0;
      min-width: 45%;
      font-size: small;
      border: none;
      justify-content: flex-start;
      color: #93d900;
      background: none;
    }
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
  color: #000000;
}

.desc {
  color: rgba(0, 0, 0, 0.45061);
  font-size: smaller;
  padding-left: 10px;
}
</style>
