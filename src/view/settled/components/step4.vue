<template>
  <div class="step4">
    <div class="title">机构基本信息</div>
    <div class="contain">
      <el-form ref="formRef" :model="userData">
        <CampFormItem class="CampFormItem" label="执照类型" prop="name">
          <el-select class="select" v-model="userData.name" placeholder="请选择执照类型">
            <el-option v-for="item in licence" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="营业执照">
          <div>
            <CampUpload></CampUpload>
            <div class="text">请根据登记证书选择结果上传执照类型材料。<span>执照上传说明</span></div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="机构全称" prop="name">
          <el-input v-model="userData.name" placeholder="请输入机构全称"></el-input>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="统一社会信用代码">
          <el-input placeholder="请输入统一社会信用代码/注册号"></el-input>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="机构类型" prop="name">
          <el-select class="select" v-model="userData.name" placeholder="请选择机构类型">
            <el-option></el-option>
          </el-select>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="法定代表人" prop="name">
          <el-input v-model="userData.name" placeholder="请输入机构法定代表"></el-input>
        </CampFormItem>
        <div class="zheceziben">
          <CampFormItem class="CampFormItem" label="注册资本">
            <el-input type="number" placeholder="请输入数字"></el-input>
          </CampFormItem>
          <CampFormItem class="CampFormItem" :isShowLabel="false">
            <el-select class="select" placeholder="单位">
              <el-option></el-option>
            </el-select>
          </CampFormItem>
        </div>
        <CampFormItem class="CampFormItem" label="成立日期">
          <CampDatePicker placeholder="日期选择" v-model:date="userData.idValidStart"></CampDatePicker>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="执照有效期">
          <div>
            <div class="date">
              <CampFormItem :isShowLabel="false" prop="idValidStart">
                <CampDatePicker placeholder="日期选择" v-model:date="userData.idValidStart"></CampDatePicker>
              </CampFormItem>
              <i class="iconfont icon-single_arrow"></i>&emsp13;
              <CampFormItem :isShowLabel="false" prop="idValidEnd">
                <CampDatePicker placeholder="日期选择" v-model:date="userData.idValidEnd"></CampDatePicker>
              </CampFormItem>
              <el-radio-group v-model="isForever">
                <el-radio label="长期" :value="true"></el-radio>
              </el-radio-group>
            </div>
            <div class="text">请保证填写时间与国家企业信用信息公示系统数据保持一致。</div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="经营范围">
          <div>
            <el-input placeholder="请输入" style="width: 50vw;" v-model="userData.detailAddress"></el-input>
            <div class="text">请保证与国家企业信用信息公示系统数据保持一致。</div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="执照注册地" prop="emailAddressList">
          <CampPlace placeholder="国家 > 省 > 市 > 区" v-model:location="userData.emailAddressList"></CampPlace>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="" prop="detailAddress">
          <div>
            <el-input placeholder="请填写详细地址" style="width: 50vw;" v-model="userData.detailAddress"></el-input>
            <div class="text">请保证与国家企业信用信息公示系统数据保持一致。</div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="实际通讯地址" prop="emailAddressList">
          <div class="place">
            <CampPlace class="item" placeholder="国家 > 省 > 市 > 区" v-model:location="userData.emailAddressList"></CampPlace>
            <el-radio-group class="item">
              <el-radio label="与执照注册地一致" ></el-radio>
            </el-radio-group>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="" prop="detailAddress">
          <div>
            <el-input placeholder="请填写详细地址" style="width: 50vw;" v-model="userData.detailAddress"></el-input>
            <div class="text">住所需要精确到具体门牌号最详细地址，省、市、区无需重复填写。</div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="主要经营区域">
          <div>
            <div style="display:flex;margin: 0 0 10px 0;" v-for="(item, index) in userData.businessAreasList" :key="item">
              <CampPlace placeholder="国家 > 省 > 市 > 区" v-model:location="userData.businessAreasList[index]"></CampPlace>
              <span class="btnSpan" @click="addArea(index)">添加</span>
              <span class="btnSpan" @click="delArea(index)">删除</span>
            </div>
            <div class="text">
              最多填写三个区域，用于推送及搜索服务。主要经营区域若在中国境内需要精确到省市区，经营区域若包含省内/市内所有区域，选择全域。如“湖北省武汉市全域”、“湖北省全域”。经营区域涉及到海外，需要精确到市。若包含州内所有区域，选择全域。如“美国纽约州全域”。
            </div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="主营业务介绍" prop="describe">
          <div>
            <el-input type="textarea" autosize placeholder="请输入" maxlength="500" showWordLimit
              v-model="userData.describe"></el-input>
            <div class="text">请描述主营业务及特色、优势，并附相关链接于填写框内，限500字。</div>
          </div>
        </CampFormItem>
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

const route = useRoute()
const router = useRouter()
const handlerTostep5 = () => {
  const valid = validateForm(formRef.value)
  if (!valid) {
    router.push(`/settled/step5/${route.params.type}`)
  }
}
onMounted(() => {
})
const formRef = ref(null)
const licence = [
  {
    label: '企业法人营业执照',
    value: 0
  },
  {
    label: '民办非企业单位登记证书',
    value: 1
  },
  {
    label: '事业单位法人证书',
    value: 2
  },
  {
    label: '政府机关统一社会信用代码证书',
    value: 3
  },
  {
    label: '社会团体法人证书',
    value: 4
  },
  {
    label: '宗教活动场所登记证',
    value: 5
  }

]

const userData = ref({
  userId: null,
  name: "",
  email: "",
  identityImgs: [
    {
      url: "http://example.com/identity1.jpg",
      name: "身份证正面"
    },
    {
      url: "http://example.com/identity2.jpg",
      name: "身份证反面"
    }
  ],
  realName: "张三",
  realId: "1234567890",
  idValidStart: "2023-01-01",
  idValidEnd: "2028-12-31",
  emailAddressList: [
    "中国",
    "安徽省",
    "合肥市",
    "蜀山区",
    "长江西路130号"
  ],
  applicantLetterImg: {
    url: "http://example.com/applicant_letter.jpg",
    name: "认证申请函"
  },
  emergencyPhone: "",
  businessAreasList: [
    []
  ],
  activityTypeRanges: [
  ],
  activityParticipationRange: [
    "亲子",
    "单飞"
  ],
  evidences: [
    {
      url: "http://example.com/evidence1.jpg",
      name: "证明材料1"
    },
    {
      url: "http://example.com/evidence2.jpg",
      name: "证明材料2"
    }
  ],
  describe: "",
  mobile: ""
})
watch(() => userData.value, (newV) => {
  if (newV.idValidStart || newV.idValidEnd) {
    isForever.value = false
  }
}, { deep: true })
//身份证是否长期
const isForever = ref(false)


const validateForm = (formEl) =>
  formEl.validate((valid) => {
    if (document.querySelector('.is-error')) {
      document.querySelector('.is-error').scrollIntoView()
    }
    return valid
  })


const delArea = (index) => {
  if (userData.value.businessAreasList <= 1) {
    ElMessage.error("至少保留一个选项")
    return
  }
  userData.value.businessAreasList.splice(index, 1)
}
const addArea = (index) => {
  if (userData.value.businessAreasList.length >= 3) {
    ElMessage.error("至多添加3个选项")
    return
  }
  userData.value.businessAreasList.splice(index + 1, 0, [])
}
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

      .text {
        margin: 1vh 0 0 0;
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
</style>