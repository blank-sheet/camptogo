<template>
  <campBody>
    <template #main>
      <el-card class="box">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="all">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" width="auto">
                <template #default="scope">
                  <div>
                    <el-icon style="color: green"><SuccessFilled /></el-icon>
                    <h4>{{ scope.row.title }}</h4>
                    <span>{{ scope.row.date }}</span>
                  </div>
                  <div>
                    {{ scope.row.content }}
                    <span
                      ><el-button text type="primary" @click="showAll(scope.row.content)"
                        >查看全部<el-icon><DArrowRight /></el-icon></el-button
                    ></span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="已读" name="read">//已读信息list </el-tab-pane>
          <el-tab-pane label="未读" name="unread">//未读信息list</el-tab-pane>
        </el-tabs>
      </el-card>
    </template>
  </campBody>
</template>
<script setup>
import { ref } from 'vue'
import campBody from '../../../component/camp-body.vue'
const activeName = ref('all')

const handleClick = (tab, event) => {
  console.log(tab, event)
}
const showAll = content => {
  // content = content.substring(0, 10) + "...";
}
const tableData = [
  {
    title: '提交审核材料的通知',
    date: '2016-05-03',
    content:
      '服务商您好，您的商品XXXX，订单生成后需要您进行审核，您需要用户提交订单后的24小时之内进行审核，并最终确认订单是否成立生...'
  },
  {
    title: '提交审核材料的通知',
    date: '2016-05-02',
    content:
      '服务商您好，您的商品XXXX，订单生成后需要您进行审核，您需要用户提交订单后的24小时之内进行审核，并最终确认订单是否成立生...'
  }
]
</script>

<style lang="scss" scoped>
.box {
  margin: 24px 20px 2px 24px;
  width: auto;
}
.el-table {
  span {
    margin-left: 10px;
    margin-bottom: 10px;
  }
  h4 {
    display: inline-block;
    margin-left: 10px;
    margin-bottom: 5px;
  }
  .el-button {
    display: inline-block;
    margin-left: 10px;
  }
}
</style>
