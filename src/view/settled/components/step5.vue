<template>
  <div class="step5">
    <div class="title">主体负责人信息</div>
    <div class="contain">
      <el-form ref="formRef" :model="userData">
        <div v-if="route.params.type != 'personal'">
          <CampFormItem class="CampFormItem" label="申请认证公函">
            <div>
              <CampUpload></CampUpload>
              <div class="text">
                提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。图片必须是最新的纸质证件原件拍照或彩色扫描件，否则将无法通过备案审核。请确保证件四周有圆角，卡证边缘清晰。如有水印，务必放置在证件空白位置，不得遮挡文字和图像信息。<span>下载模版</span>
              </div>
            </div>
          </CampFormItem>
          <CampFormItem class="CampFormItem" label="经营资质">
            <div>
              <CampUpload></CampUpload>
              <div class="text">
                温馨提示：各级奖项、荣誉资质、出版物、职称、职业认证等第三方专业机构出具的相关证明。<span>上传资质说明</span>
              </div>
            </div>
          </CampFormItem>
        </div>
        <CampFormItem class="CampFormItem" label="应急手机号" v-if="route.params.type == 'personal'" prop="emergencyPhone">
          <div>
            <el-input placeholder="请输入" v-model="userData.emergencyPhone"></el-input>
            <div class="text">
              温馨提示：需填写除主体负责人以外的有效手机号码，且没有给其他人使用过进行备案的。若应急手机号存在多人重复使用，将无法通过备案审核。填写应急手机号是为了在紧急情况下能够及时联系到您，以确保能够快速解决问题或提供支持。
            </div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="主要经营区域">
          <div>
            <div style="display:flex" v-for="(item,index) in userData.businessAreasList" :key="item">
              <CampPlace placeholder="省 > 市 > 区" v-model:location="userData.businessAreasList[index]"></CampPlace><span class="btnSpan" @click="addArea(index)">添加</span><span
                class="btnSpan" @click="delArea(index)">删除</span>
            </div>
            <div class="text">
              温馨提示：主要经营区域若在中国境内需要精确到省市区，经营区域若包含省内/市内所有区域，选择全域。如“湖北省武汉市全域”、“湖北省全域”。经营区域涉及到海外，需要精确到市。若包含州内所有区域，选择全域。如“美国纽约州全域”。最多填写三个区域。
            </div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="服务内容标识">
          <div>
            <div class="tags">
              <el-tag class="tag" closable type="info"></el-tag>
              <el-button class="dashd"><i class="iconfont icon-tianjia"></i>点击选择</el-button>
            </div>
            <div class="text">
              温馨提示：按照个人实际经营情况选择对应内容，建议1-2个。个人主体不可以选择经营性质、企业/单位性质；个人应选择与个人经营范围、资质相符合的内容。若选择内容与主体性质、经营范围不相符，将无法通过备案审核。<span>查看服务内容标识选择指引</span>
            </div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="个人能力证明" v-if="route.params.type == 'personal'">
          <div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
            <div class="text">
              温馨提示：各级奖项、荣誉资质、出版物、职称、职业认证等第三方专业机构出具的相关证明, 可上传多张图片。
            </div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="主营业务介绍" prop="describe">
          <div>
            <el-input type="textarea" autosize placeholder="例: 我是非遗传承人" v-model="userData.describe"></el-input>
            <div class="text">请具体描述个人实际经营内容、主要服务内容，该信息为营探法务部门审核重要依据，字数限制20-200，若有已发布产品的链接请粘贴于填写框内。</div>
          </div>
        </CampFormItem>
      </el-form>
    </div>
    <div class="btn">
      <el-button @click="handlerTostep4()">上一步</el-button>
      <el-button type="success" @click="handlerTostep6()">完成</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
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
  console.log(userData.value.businessAreasList);
}
const handlerTostep4 = () => {
  router.push(`/settled/step4/${route.params.type}`)
}
onMounted(() => {
})
const formRef = ref(null)
const select = ref(1)


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
    "研学",
    "游学",
    "亲子活动"
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

const delArea = (index)=>{
  if(userData.value.businessAreasList<=1){
    ElMessage.error("至少保留一个选项")
    return
  }
  userData.value.businessAreasList.splice(index,1)
}
const addArea = (index)=>{
  if(userData.value.businessAreasList.length>=20){
    ElMessage.error("至多添加20个选项")
    return
  }
  userData.value.businessAreasList.splice(index+1,0,[])
}
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


    .CampFormItem {
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

      .tags{
        display: flex;
        flex-wrap: wrap;
        .tag{
          height: 4.5vh;
          margin: 0 1% 0 0;
        }
        .dashd{
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


.dashd {
  border: 2px dashed #BFBFBF;
  background-color: #FAFBFD;
  margin-bottom: 3vh;
}</style>