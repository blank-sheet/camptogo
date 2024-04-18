<template>
  <div class="step4">
    <div class="title">机构基本信息</div>
    <div class="contain">
      <el-form ref="formRef" :model="userData">
        <CampFormItem class="CampFormItem" label="执照类型" prop="name">
          <el-select class="select" v-model="userData.licenseType" placeholder="请选择执照类型">
            <el-option v-for="item in licence" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </CampFormItem>
        <div v-loading="loading">
          <CampFormItem class="CampFormItem" label="营业执照">
            <div>
              <CampUpload v-model:images="userData.businessLicense"></CampUpload>
            </div>
          </CampFormItem>
          <div class="text">请根据登记证书选择结果上传执照类型材料。<span>执照上传说明</span></div>

          <CampFormItem class="CampFormItem" label="机构全称" prop="institutionName">
            <el-input v-model="userData.institutionName" placeholder="请输入机构全称"></el-input>
          </CampFormItem>

          <CampFormItem class="CampFormItem" label="统一社会信用代码" prop="authNumber">
            <el-input placeholder="请输入统一社会信用代码/注册号" v-model="userData.authNumber"></el-input>
          </CampFormItem>

          <CampFormItem class="CampFormItem" label="机构类型" prop="institutionType">
            <el-select class="select" v-model="userData.businessLicense" placeholder="请选择机构类型">
              <el-option v-for="item in institutionType" :key="item.value" :value="item.value"
                :label="item.label"></el-option>
            </el-select>
          </CampFormItem>

          <CampFormItem class="CampFormItem" label="法定代表人" prop="legalPersonName">
            <el-input v-model="userData.legalPersonName" placeholder="请输入机构法定代表"></el-input>
          </CampFormItem>
          <div class="zheceziben">
            <CampFormItem class="CampFormItem" label="注册资本" prop="registeredCapital">
              <el-input type="number" placeholder="请输入数字" v-model="userData.registeredCapital"></el-input>
            </CampFormItem>
            <CampFormItem class="CampFormItem" :isShowLabel="false" prop="registeredCapitalUnit">
              <el-select class="select" placeholder="单位" v-model="userData.registeredCapitalUnit">
                <el-option v-for="item in unit" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </CampFormItem>
          </div>

          <CampFormItem class="CampFormItem" label="成立日期" prop="establishDate">
            <CampDatePicker placeholder="日期选择" v-model:date="userData.establishDate"></CampDatePicker>
          </CampFormItem>

          <CampFormItem class="CampFormItem" label="执照有效期">
            <div>
              <div class="date">
                <CampFormItem :isShowLabel="false" prop="licenceStartTime">
                  <CampDatePicker placeholder="日期选择" v-model:date="userData.licenceStartTime"></CampDatePicker>
                </CampFormItem>
                <i class="iconfont icon-single_arrow"></i>&emsp13;
                <CampFormItem :isShowLabel="false">
                  <CampDatePicker :disabled="isForever" placeholder="日期选择" v-model:date="userData.licenceEndTime">
                  </CampDatePicker>
                </CampFormItem>
                <el-radio-group v-model="isForever">
                  <el-radio label="长期" :value="true"></el-radio>
                </el-radio-group>
              </div>
            </div>
          </CampFormItem>
          <div class="text">请保证填写时间与国家企业信用信息公示系统数据保持一致。</div>

          <CampFormItem class="CampFormItem" label="经营范围" prop="businessAddress">
            <div>
              <el-input placeholder="请输入" style="width: 50vw;" v-model="userData.businessAddress"></el-input>
            </div>
          </CampFormItem>
          <div class="text">请保证与国家企业信用信息公示系统数据保持一致。</div>

          <CampFormItem class="CampFormItem" label="执照注册地" prop="licenseRegistrationPlace">
            <CampPlace @update:location="isSame = false" placeholder="国家 > 省 > 市 > 区"
              v-model:location="userData.licenseRegistrationPlace"></CampPlace>
          </CampFormItem>

          <CampFormItem class="CampFormItem" label="" prop="licenseRegistrationPlaceDetail">
            <div>
              <el-input placeholder="请填写详细地址" style="width: 50vw;" @change="isSame = false"
                v-model="userData.licenseRegistrationPlaceDetail"></el-input>
            </div>
          </CampFormItem>
          <div class="text">请保证与国家企业信用信息公示系统数据保持一致。</div>
        </div>

        <CampFormItem class="CampFormItem" label="实际通讯地址" prop="correspondenceAddress">
          <div class="place">
            <CampPlace @update:location="isSame = false" class="item" placeholder="国家 > 省 > 市 > 区"
              v-model:location="userData.correspondenceAddress">
            </CampPlace>
            <el-radio-group class="item" v-model="isSame">
              <el-radio :label="true"
                @click="userData.correspondenceAddress = userData.licenseRegistrationPlace, userData.correspondenceAddressDetail = userData.licenseRegistrationPlaceDetail">与执照注册地一致</el-radio>
            </el-radio-group>
          </div>
        </CampFormItem>

        <CampFormItem class="CampFormItem" label="" prop="correspondenceAddressDetail">
          <div>
            <el-input placeholder="请填写详细地址" style="width: 50vw;" v-model="userData.correspondenceAddressDetail"
              @change="isSame = false"></el-input>
          </div>
        </CampFormItem>
        <div class="text">住所需要精确到具体门牌号最详细地址，省、市、区无需重复填写。</div>

        <CampFormItem class="CampFormItem" label="主要经营区域" prop="mainBusinessAreas">
          <div>
            <div style="display:flex;margin: 0 0 10px 0;" v-for="(item, index) in userData.mainBusinessAreas" :key="item">
              <CampPlace placeholder="国家 > 省 > 市 > 区" v-model:location="userData.mainBusinessAreas[index]"></CampPlace>
              <span class="btnSpan" @click="addArea(index)">添加</span>
              <span class="btnSpan" @click="delArea(index)">删除</span>
            </div>
          </div>
        </CampFormItem>
        <div class="text">
          最多填写三个区域，用于推送及搜索服务。主要经营区域若在中国境内需要精确到省市区，经营区域若包含省内/市内所有区域，选择全域。如“湖北省武汉市全域”、“湖北省全域”。经营区域涉及到海外，需要精确到市。若包含州内所有区域，选择全域。如“美国纽约州全域”。
        </div>

        <CampFormItem class="CampFormItem" label="主营业务介绍" prop="businessIntroduction">
          <el-input type="textarea" autosize placeholder="请输入" maxlength="500" showWordLimit style="width: 50vw;"
            v-model="userData.businessIntroduction"></el-input>
        </CampFormItem>
        <div class="text">请描述主营业务及特色、优势，并附相关链接于填写框内，限500字。</div>

      </el-form>
    </div>
    <div class="btn">
      <el-button type="success" @click="handlerTostep5()">下一步</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CampFormItem from '../../../component/camp-form-item.vue'
import CampDatePicker from '../../../component/camp-date-picker.vue'
import CampUpload from '../../../component/camp-upload.vue'
import CampPlace from '../../../component/camp-place.vue'
import { ElMessage } from 'element-plus'

const text = ref('')
const route = useRoute()
const router = useRouter()
const handlerTostep5 = () => {
  const valid = validateForm(formRef.value)
  valid.then(res => {
    if (res) {
      //发送添加表单请求
    } else {

    }
  })
}
onMounted(() => {
})
const formRef = ref(null)
const licence = [
  {
    label: '企业法人营业执照',
    value: 'ENTERPRISE_LEGAL_PERSON'
  },
  {
    label: '民办非企业单位登记证书',
    value: 'PRIVATE_NON_ENTERPEISE'
  },
  {
    label: '事业单位法人证书',
    value: 'PUBLIC_INSTITUTION'
  },
  {
    label: '政府机关统一社会信用代码证书',
    value: 'GOVERNMENT_ORGANS'
  },
  {
    label: '社会团体法人证书',
    value: 'SOCIAL_GROUP'
  },
  {
    label: '宗教活动场所登记证',
    value: 'RELIGIOUS_ACTIVITY'
  }

]
const institutionType = [
  {
    label: '旅行社总社',
    value: 'TRAVEL_AGENCY'
  },
  {
    label: '景区',
    value: 'SCENIC_SPOT'
  },
  {
    label: '代理商',
    value: 'AGENT'
  },
  {
    label: '旅行社分社',
    value: 'TRAVEL_AGENCY_BRANCHES'
  },
]
const unit = [
  {
    label: '万人民币',
    value: '万人民币'
  },
  {
    label: '亿人民币',
    value: '亿人民币'
  }
]

const userData = ref(
  {
    userId: null,
    name: "机构商户测试入驻",
    mobile: "18912345678",
    licenseType: "ENTERPRISE_LEGAL_PERSON",
    businessLicense: [
      {
        url: "https://example.com/license.pdf",
        name: "Business License",
        type: "BUSINESS_LICENSE"
      }
    ],
    institutionName: "ABC Company",
    authNumber: "12345678901234",
    institutionType: "TRAVEL_AGENCY",
    legalPersonName: "法人姓名",
    registeredCapital: 10,
    registeredCapitalUnit: "万人民币",
    establishDate: "2022-01-01",
    licenceStartTime: "2022-01-01",
    licenceEndTime: "2025-01-01",
    businessScope: "销售商品、提供服务",
    licenseRegistrationPlace: [
      "China",
      "Guangdong",
      "Shenzhen",
      "Futian District",
      " No. 123 Zhenxing Road"
    ],
    correspondenceAddress: [
      "China",
      "Guangdong",
      "Shenzhen",
      "Nanshan District",
      " No. 456 Liuxian Avenue"
    ],
    mainBusinessAreas: [
      [
        "China",
        "Guangdong",
        "Shenzhen",
        "某某区",
        "某某街道"
      ],
      [
        "China",
        "浙江省",
        "Guangzhou",
        "Tianhe District",
        "某某街道"
      ]
    ],
    businessIntroduction: "主营业务介绍",
    cooperationModel: [
      "COMMISSION_INVOICES",
      "RESERVE_PRICE_INVOICES"
    ],
    residencyStatus: "VENUE_OWNER",
    specialCategories: true,
    brandType: [
      "OWN_BRAND",
      "AGENT_BRAND"
    ],
    deposit: 10,
    qualificationLicense: [
      {
        url: "https://example.com/qualification.pdf",
        name: "所有权证书",
        type: "OWNERSHIP_LICENSE"
      },
      {
        url: "https://example.com/qualification.pdf",
        name: "特殊经营品类材料",
        type: "SPECIAL_PRODUCT_LICENSE"
      }
    ],
    isEntrust: false,
    documentType: "CHINESE_RESIDENT_ID_CARD",
    identityImgs: [
      {
        url: "https://example.com/id-front.jpg",
        name: "ID Card Front",
        type: "IDENTITY"
      },
      {
        url: "https://example.com/id-back.jpg",
        name: "ID Card Back",
        type: "IDENTITY"
      }
    ],
    realName: "Jane Doe",
    realId: "123456789012345",
    idValidStart: "2022-01-01",
    idValidEnd: "2027-01-01",
    phone: "0987654321",
    email: "john.doe@example.com",
    applicantLetterImg: [
      {
        url: "https://example.com/application-letter.pdf",
        name: "Application Letter",
        type: "APPLICANT_LETTER"
      }
    ]
  }
)
watch(() => userData.value, (newV) => {
  if (newV.licenceStartTime && newV.licenceEndTime) {
    isForever.value = false
  }
}, { deep: true })
watch(() => userData.value.businessLicense, (newV, oldV) => {
  if (newV.length > 0 && newV[0].url.length > 0) {
    recognize(newV[0])
  }
})
//身份证是否长期
const isForever = ref(false)
watch(() => isForever.value, (newV) => {
  if (newV) {
    userData.value.licenceEndTime = ''
  }
})
const isSame = ref(false)

const validateForm = (formEl) =>
  formEl.validate((valid) => {
    if (document.querySelector('.is-error')) {
      document.querySelector('.is-error').scrollIntoView()
    }
    return valid
  })


const delArea = (index) => {
  if (userData.value.mainBusinessAreas.length <= 1) {
    ElMessage.error("至少保留一个选项")
    return
  }
  userData.value.mainBusinessAreas.splice(index, 1)
}
const addArea = (index) => {
  if (userData.value.mainBusinessAreas.length >= 3) {
    ElMessage.error("至多添加3个选项")
    return
  }
  userData.value.mainBusinessAreas.splice(index + 1, 0, [])
}
const loading = ref(false)
</script>

<style lang="scss" scoped>
.step4 {
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

    .zheceziben {
      display: flex;
      margin: 0 0 20px 0;

      .CampFormItem {
        width: 30%;
        margin: auto 10px auto 0;


        .btnSpan {
          color: #595959;
          font-size: 1vw;
          cursor: pointer;
          margin: auto 0.8vw;

          &:hover {
            text-decoration: underline;
          }
        }

        .select {
          width: 30%;
        }
      }
    }



    .CampFormItem {
      .place {
        width: 100%;
        display: flex;

        .item {
          width: 25%;
        }
      }

      .date {
        display: flex;

      }

      .btnSpan {
        color: #595959;
        margin: 0 0.8vw;
        font-size: 1vw;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }

      .box {
        display: flex;

        .avatar {
          margin: 0 1vw 0 0;
        }
      }



      .select {
        width: 20%;
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
</style>