<template>
  <el-dialog v-model="show" title="修改商品详情" width="55%">
    <el-form ref="formRef" :model="form">
      <div>
        <CampFormItem label="划线价格：" prop="price_original">
          <el-input-number
            :min="0"
            style="width: 170px"
            v-model.number="form.price_original"
            controls-position="right"
          />

          <span class="desc">*原价（单位：元）</span>
          <el-tooltip
            content="划线是将之前的商品价格用横线划去的标识方式，划线价格可以是商品的正品零<br>售价、商家指导价或该商品曾经展示过的销售价格，并非原价，仅供消费者参考。"
            raw-content
            placement="top-start"
          >
            <el-icon><QuestionFilled /></el-icon>
          </el-tooltip>
        </CampFormItem>
      </div>
      <div>
        <CampFormItem label="未划线价格：" prop="price_selling">
          <el-input-number
            :min="0"
            style="width: 170px"
            v-model="form.price_selling"
            controls-position="right"
          />
          <span class="desc">*原价（单位：元）</span>
          <el-tooltip
            content="未划线价格指商品的实时标价，实际售价，<br>但实际成交价格以订单结算页面为准。"
            raw-content
            placement="top-start"
          >
            <el-icon><QuestionFilled /></el-icon>
          </el-tooltip>
        </CampFormItem>
      </div>
      <div>
        <CampFormItem label="上架频道" prop="price_selling">
          <el-select class="m-2" placeholder="请选择上架频道">
            <el-option
              v-for="item in upOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </CampFormItem>
      </div>

      <div>
        <CampFormItem label="库存：" prop="product_number">
          <span>本平台可报名 </span>
          <el-input-number
            :min="0"
            v-model="form.product_number"
            controls-position="right"
            placeholder="整数"
          />
          <span class="dess">人</span>
          <span class="desc">*不得高于活动总人数</span>
        </CampFormItem>
      </div>

      <!-- <div class="item">暂时不做
        <span style="margin-right: 7px">订单自动审核：</span>
        <CampFormItem label="库存：" prop="product_number">
          <el-switch style="margin-right: 10px" />
          <el-tooltip content="666" raw-content placement="top-start">
            <el-icon><QuestionFilled /></el-icon>
          </el-tooltip>
          <span class="desc"
            >*开启后，若订单生成已满18小时或活动即将开始但商家仍未处理订单，订单将自动审核通过；不开启，订单将自动审核不通过。</span
          >
        </CampFormItem>
      </div> -->
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">返回</el-button>
        <el-button type="primary" @click="show = false"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineExpose } from "vue";
import CampFormItem from "../../../../../component/camp-form-item.vue";
const show = ref(false);
const form = ref({
  price_original: 0,
  price_selling: 0,
  product_number: 0,
});
const upOptions = [
  {
    value: "Option1",
    label: "默认推送",
  },
  {
    value: "Option2",
    label: "近期开营",
  },
  {
    value: "Option3",
    label: "特别推荐",
  },
  {
    value: "Option4",
    label: "优选名师",
  },
];
defineExpose({
  showDialog: () => {
    show.value = true;
  },
});
</script>

<style lang="scss" scoped>
.desc {
  color: #838383;
  position: relative;
  left: 0.7em;
}
span {
  margin-right: 10px;
}
.dess {
  margin-left: 10px;
}
</style>
