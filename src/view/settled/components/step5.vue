<template>
  <div class="step5">
    <div class="title">合作经营信息</div>
    <div class="contain">
      <el-form ref="formRef" :model="userData">
        <CampFormItem class="CampFormItem" label="合作模式" prop="CooperationModel">
          <el-checkbox-group v-model="userData.CooperationModel">
            <el-checkbox label="COMMISSION_INVOICES">佣金发票（营探向商家开的发票）</el-checkbox>
            <el-checkbox label="RESERVE_PRICE_INVOICES">底价发票（商家向营探开的发票）</el-checkbox>
          </el-checkbox-group>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="入驻身份" prop="residencyStatus">
          <el-select class="select" placeholder="请选择" v-model="userData.residencyStatus">
            <el-option v-for="item in travelAgency" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="特殊经营品类" prop="specialCategories"
          v-if="userData.residencyStatus === 'VENUE_OWNER'">
          <el-radio-group v-model="userData.specialCategories">
            <el-radio size="large" :label="true">含特殊经营品类</el-radio>
            <el-radio size="large" :label="false">不含特殊经营品类</el-radio>
          </el-radio-group>
        </CampFormItem>

        <CampFormItem class="CampFormItem" label="品牌类型" prop="brandType">
          <el-checkbox-group v-model="userData.brandType">
            <el-checkbox label="OWN_BRAND">自主品牌</el-checkbox>
            <el-checkbox label="AGENT_BRAND">代理品牌</el-checkbox>
          </el-checkbox-group>
        </CampFormItem>
        <div class="text">品牌使用人和品牌持有人一致，即商标注册证上注册人=开店主体，即品牌商标持有人自己开店；品牌使用人经过持有人授权，品牌持有人为授权方，品牌使用人为被授权方。</div>
       
        <CampFormItem class="CampFormItem" label="保证金">
          <el-input class="baozhengjin" disabled></el-input>元
        </CampFormItem>
        <div class="text">2024年12月31日24点前签约入驻营探的服务商，营探允许服务商先行入驻平台并使用平台基础服务而暂缓缴纳基础保证金。</div>
        
        <CampFormItem class="CampFormItem" label="上传相关资质" v-if="userData.residencyStatus === 'TRAVEL'">
          <div>
            <div class="text2">旅游业务许可证</div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
          </div>
        </CampFormItem>
        <div class="text" v-if="userData.residencyStatus === 'TRAVEL'">
          可上传多张图片，提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。需提供有效的旅游业务许可证，或其他监管部门认可的具有同等法律效力的证件，并且照片清晰完整。<span>查看示例</span>
        </div>
        
        <CampFormItem class="CampFormItem" label="上传相关资质" v-if="userData.residencyStatus === 'VENUE_OWNER'">
          <div>
            <div class="text2">所有权证书</div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
          </div>
        </CampFormItem>
        <div class="text" v-if="userData.residencyStatus === 'VENUE_OWNER'">
          可上传多张图片，提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。
        </div>
        
        <CampFormItem class="CampFormItem" label=""
          v-if="userData.residencyStatus === 'VENUE_OWNER' && userData.specialCategories == true">
          <div>
            <div class="text2">特殊经营品类资质</div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
          </div>
        </CampFormItem>
        <div class="text" v-if="userData.residencyStatus === 'VENUE_OWNER' && userData.specialCategories == true">
          可上传多张图片，提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。
        </div>
        
        <CampFormItem class="CampFormItem" label="上传相关资质" v-if="userData.residencyStatus == 'EDUCATION'">
          <div>
            <div class="text2">教育相关许可证</div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
          </div>
        </CampFormItem>
        <div class="text" v-if="userData.residencyStatus == 'EDUCATION'">
          可上传多张图片，提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。
        </div>
        
        <CampFormItem class="CampFormItem" label="" v-if="userData.residencyStatus == 'EDUCATION'">
          <div>
            <div class="text2">办学许可证</div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
          </div>
        </CampFormItem>
        <div class="text" v-if="userData.residencyStatus == 'EDUCATION'">
          可上传多张图片，提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。
        </div>
        
        <CampFormItem class="CampFormItem" label="" v-if="userData.brandType.includes('OWN_BRAND')">
          <div>
            <div class="text2">商标注册证（选填）</div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
          </div>
        </CampFormItem>
        <div class="text" v-if="userData.brandType.includes('OWN_BRAND')">
          可上传多张图片，提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。
        </div>
        
        <CampFormItem class="CampFormItem" label="" v-if="userData.brandType.includes('AGENT_BRAND')">
          <div>
            <div class="text2">品牌授权书</div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
          </div>
        </CampFormItem>
        <div class="text" v-if="userData.brandType.includes('AGENT_BRAND')">
          可上传多张图片，提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。
        </div>
        
        <CampFormItem class="CampFormItem" :label="userData.residencyStatus === 'OTHER' ? '上传相关资质' : ''"
          v-if="userData.residencyStatus === 'TRAVEL' || userData.residencyStatus === 'OTHER'">
          <div>
            <div class="text2">上传其他备案资质</div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
          </div>
        </CampFormItem>
        <div class="text" v-if="userData.residencyStatus === 'TRAVEL' || userData.residencyStatus === 'OTHER'">
          可上传多张图片，提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。
        </div>
        
        <CampFormItem class="CampFormItem" label="能力证明（选填）">
          <CampUpload v-model:images="userData.evidences"></CampUpload>
        </CampFormItem>
        <div class="text">
          各级奖项、荣誉资质、出版物、职称、职业认证等第三方专业机构出具的相关证明。
        </div>
        
      </el-form>
    </div>
    <div class="btn">
      <el-button @click="handlerTostep4()">上一步</el-button>
      <el-button type="success" @click="handlerTostep6()">下一步</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CampFormItem from '../../../component/camp-form-item.vue'
import CampUpload from '../../../component/camp-upload.vue'
import CampPlace from '../../../component/camp-place.vue'
import { settledApi } from "../../../api/modules/settled/settled"
import { request } from '../../../api/index.js'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const handlerTostep6 = () => {

}
const handlerTostep4 = () => {
  router.push(`/settled/step4/${route.params.type}`)
}
onMounted(() => {
})
const formRef = ref(null)
const select = ref(1)

const travelAgency = [
  {
    label: '旅行社',
    value: 'TRAVEL'
  },
  {
    label: '场地方官方',
    value: 'VENUE_OWNER'
  },
  {
    label: '教培机构',
    value: 'EDUCATION'
  },
  {
    label: '其他',
    value: 'OTHER'
  }
]
const userData = ref({
  providerId: null,
  CooperationModel: [
  ],
  specialCategories: null,
  brandType: [],
  deposit: "",
  residencyStatus: null,
  proofOfCompetency: {
    name: "",
    url: ""
  }
})



</script>

<style lang="scss" scoped>
.step5 {
  width: 80%;
  background-color: #fff;
  border-radius: 0.5vw;
  display: flex;
  flex-direction: column;
  margin: 3vh 0 10% 0;

  .contain {
    display: flex;
    flex-direction: column;
    padding: 2vh 1vw;

    .text {
      padding-left: 9.3vw;
      margin: 0 0 1vh 0;
      font-family: PingFang SC;
      font-size: 0.9vw;
      line-height: 1.4vw;
      color: rgb(140, 140, 140);

      span {
        color: #93D600;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .CampFormItem {
      .text2 {
        white-space: nowrap;
        margin-right: 1vw;
        font-size: 1vw;
        margin: 0 0 5px 0;
      }

      .select {
        width: 20%;
      }

      .baozhengjin {
        width: 15%;
        margin-right: 10px;
      }

      .box {
        display: flex;

        .avatar {
          margin: 0 1vw 0 0;
        }
      }

      .btnSpan {
        color: #595959;
        margin: 0 1vw;
        font-size: 1vw;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }

      .icon-tianjia {
        font-size: 1.2vw;
      }



      .tags {
        display: flex;
        flex-wrap: wrap;

        .tag {
          height: 4.5vh;
          margin: 0 1% 0 0;
        }

        .dashd {
          height: 4.5vh;
        }
      }
    }
  }

  .title {
    font-family: PingFang SC;
    font-size: 1.1vw;
    padding: 2vh 0 2vh 1vw;
    border-bottom: 1px solid rgb(217, 217, 217);
    color: #262626;
  }

  .btn {
    display: flex;
    justify-content: center;
    margin: auto 0 3% 0;
  }
}

.dialog {
  .tags {
    display: flex;
    flex-wrap: wrap;

    .tag {
      height: 3vh;
      line-height: 3vh;
      min-width: 1vw;
      padding: 0.5vh 1vw;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      color: rgba(0, 0, 0, 0.65);
      font-size: 1vw;
      text-align: center;
      margin: 0 1.3vw 2vh 0;
      cursor: pointer;
      transition: 0.2s;
    }

    .activeTag {
      color: #93D600;
      border-color: #93D600;
    }
  }

  .dialog-footer {
    border-top: 1px solid rgb(232, 230, 230);
    padding-top: 1vh;
    margin-top: 10vh;
  }

  .selected {
    font-size: 0.9vw;
    display: inline-block;
    margin: auto 1vw;

    span {
      margin: auto 2px;
      color: #93D600;
    }
  }
}

.dashd {
  border: 2px dashed #BFBFBF;
  background-color: #FAFBFD;
  margin-bottom: 3vh;
}
</style>