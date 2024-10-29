<template>
  <div class="insurance-container">
    <div class="insurance-title">查看投保信息</div>
    <div class="insurance-box">
      <div>
        <div class="info-title">保险价格及保障内容</div>
        <div class="insurance-table">
          <div class="normal">天安责任险20万档</div>
          <section class="greensection">
            <div>年龄区间</div>
            <div>保费</div>
          </section>
          <section>
            <div>
              <p>1-5周岁</p>
            </div>
            <div>
              <p>20（单位：元每人每天）</p>
            </div>
          </section>
          <section>
            <div>
              <p>6-11周岁</p>
            </div>
            <div>
              <p>30（单位：元每人每天）</p>
            </div>
          </section>
          <section>
            <div>
              <p>12-70周岁</p>
            </div>
            <div>
              <p>40（单位：元每人每天）</p>
            </div>
          </section>
        </div>
        <div class="info-title text-small">保障内容</div>
        <div class="info-text">
          <p>1、保障在组织活动过程中，因疏忽或过失造成第三者人身伤亡或财产损失，依据组织者应承担的经济赔偿责任，保险公司按照保险合同的约定负责赔偿。</p>
          <p>2、保障因保险事故而被提起仲裁或者诉讼的，对应支付的仲裁或诉讼费用以及其它必要的，合理的费用，经保险公司事先书面同意，保险公司按照合同约定负责赔偿。</p>
        </div>
        <div class="insurance-table">
          <div class="normal">天安意外险20万档</div>
          <section class="greensection">
            <div>天安意外险20万档</div>
            <div>20（单位：元每人每天）</div>
          </section>
        </div>
        <div class="info-title text-small">保障内容</div>
        <div class="info-text">
          <p>1、保障在组织活动过程中，因疏忽或过失造成第三者人身伤亡或财产损失，依据组织者应承担的经济赔偿责任，保险公司按照保险合同的约定负责赔偿。</p>
          <p>2、保障因保险事故而被提起仲裁或者诉讼的，对应支付的仲裁或诉讼费用以及其它必要的，合理的费用，经保险公司事先书面同意，保险公司按照合同约定负责赔偿。</p>
        </div>
        <div class="info-title" style="margin: 36px 0 20px;">保险条款</div>
        <div class="insurance-btn"><el-button type="primary" plain color="rgba(51, 137, 210, 1)" :icon="Link">成都市安全生产责任保险条款2020版.docx</el-button></div>
        <div class="info-title" style="margin-top: 36px;">投保须知</div>
        <div class="info-title text-small" style="margin-top: 20px;">责任免除</div>
        <div class="info-text">
          <p>出现下列任一情形时，保险人不负责赔偿: </p>
          <p>(一)被保险人未取得合法生产经营资格或从事不符合许可证规定的生产经营范围活动的;</p>
          <p>(二)被保险人被政府有关部门责令停业整顿期间或被政府有关部门责令关闭后擅自生产经营的。</p>
          <p>下列原因造成的损失，费用和责任，保险人不负责赔偿:</p>
          <p>(一)被保险人的故意行为;</p>
          <p>(二)战争、敌对行动、军事行为、武装冲突、罢工、暴动、民众骚乱、恐怖活动</p>
        </div>
        <div class="info-link">投保前请先阅读<a>《投保人声明》</a>、<a>《客户告知书》</a>及<a>《保险经纪业务委托协议》</a>的全部内容，并已知晓同意该保险产品<a>《保险条款》</a>内容，特别是保险人已明确说明的免除责任条款及法律后果。</div>
        <div class="info-text" style="margin: 20px 0;">本页面由英大长安保险经纪有限公司管理并运营，请您仔细阅读投保须知、保险条款免责说明、被保险人同意声明以及个人信息保护政策、客户告知书等其他内容。为确保您的投保权益，您的投保信息轨迹将被记录。</div>
        <div class="insurance-btns">
          <el-button @click="router.go(-1)">返回</el-button>
          <el-button type="primary" @click="router.go(-1)">确认</el-button>
        </div>
      </div>
    </div>
	</div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { Link } from '@element-plus/icons-vue'
import { ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from 'vue-router'
import pagination from '../../../../component/pagination.vue'
import { userApi } from "../../../../api/modules/user/user";
import { request } from "../../../../api";

const router = useRouter()

</script>

<style lang="scss" scoped>
.insurance-title {
  background-color: #fff;
  font-size: 16px;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}
.info-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}
.info-text {
  font-size: 14px;
  color: rgba(88, 88, 88, 1);
  p {
    margin-bottom: 10px;
  }
}
.text-small {
  font-size: 14px;
}
.info-link {
  font-size: 14px;
  color: rgba(188, 188, 188, 1);
  margin-top: 16px;
  a {
    color: rgba(51, 137, 210, 1);
  }
  a:hover {
    cursor: pointer;
  }
}
.insurance-container {
  padding: 20px 24px;
  .insurance-box {
    // margin: 20px 0;
		background-color: #fff;
		padding: 15px 20px;
  }
}
.insurance-btns {
  display: flex;  
  align-items: center;
  justify-content: center;
  margin: 36px 0 20px;
}
.insurance-table {
  font-family: PingFang SC;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  p {
    display: inline;
    margin: 10px;
  }

  .twocolum {
    padding-bottom: 10px;
  }

  .normal {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 1px solid #f2f2f2;

    .el-button {
      margin-left: 10px;
      border: 1px dashed #000000;
      width: 296px;
      font-size: 14px;
    }
  }

  .btn-center {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border: 1px solid #f2f2f2;

    .el-button {
      margin-left: 10px;
      border: 1px dashed #000000;
      font-size: 14px;
    }
  }

  .greensection {
    background: #f2ffd7;
    color: #93d500;
    display: flex;
    text-align: center;
  }

  section {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;

    >div {
      width: 50%;
      border: 1px solid #f2f2f2;
      margin: 0;
      padding: 10px;
      text-align: center;
    }

    .refund-delete {
      position: absolute;
      right: -40px;
      top: 20px;
    }
  }
}
</style>
<style lang="scss">
.insurance-btn {
  .el-button--primary:hover,
  .el-button--primary:focus {
    background-color: rgba(51, 137, 210, 1) !important;
    border-color: rgba(51, 137, 210, 1) !important;
  }
}
</style>