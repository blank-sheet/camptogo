<template>
  <div class="step4">
    <div class="title">主体负责人信息</div>
    <div class="contain">
      <el-form ref="formRef" :model="userData">
        <div v-if="route.params.type != 'personal'">
          <CampFormItem class="CampFormItem" label="营业执照">
            <div>
              <CampUpload></CampUpload>
              <div class="text">1.需提供三证合一的最新营业执照原件扫描件或加盖公司公章的营业执照复印件</div>
              <div class="text">2.确保未在企业经营异常名录中且所售商品在营业执照经营范围内</div>
              <div class="text">3.距离有效期截止时间应在6个月以上</div>
              <div class="text">4.须露出证件四角，请勿遮挡或模糊，保持信息清晰可见</div>
              <div class="text">5.图片尺寸为800*800px以上，支持PNG、JPG和JPEG格式，大小不超过5MB<span>查看示例</span></div>
            </div>
          </CampFormItem>
          <CampFormItem class="CampFormItem" label="公司名称" prop="name">
            <el-input v-model="userData.name" placeholder="请输入公司名称"></el-input>
          </CampFormItem>
          <CampFormItem class="CampFormItem" label="有效期限">
            <div>
              <div class="date">
                <CampFormItem :isShowLabel="false" prop="idValidStart">
                  <CampDatePicker placeholder="选择日期" v-model:date="userData.idValidStart"></CampDatePicker>
                </CampFormItem>
                <i class="iconfont icon-single_arrow"></i>&emsp13;
                <CampFormItem :isShowLabel="false" prop="idValidEnd">
                  <CampDatePicker placeholder="选择日期" v-model:date="userData.idValidEnd"></CampDatePicker>
                </CampFormItem>
                <el-radio-group v-model="isForever"><el-radio label="长期" :value="true"></el-radio></el-radio-group>
              </div>
              <div class="text">温馨提示：新版营业执照需要自行在国家信息网查询营业期限到期日期，且保证填写时间与国家企业信用信息公示系统数据保持一致。</div>
            </div>
          </CampFormItem>
          <CampFormItem class="CampFormItem" label="统一社会信用代码">
            <el-input placeholder=""></el-input>
          </CampFormItem>
          <CampFormItem class="CampFormItem" label="住所">
            <CampPlace placeholder="省 > 市 > 区"></CampPlace>
          </CampFormItem>
          <CampFormItem class="CampFormItem" label="">
            <div>
              <el-input placeholder="街道, 小区, 门牌号等" style="width: 50vw;"></el-input>
              <div class="text">
                温馨提示：住所需要精确到具体房间号，省、市、区无需重复填写，若所填写地址无门牌号且已是最详细地址，在下方“备注”位置说明情况。如“通讯地址已是最详细地址。”若未填写最详细通讯地址，将无法通过备案审核。</div>
            </div>
          </CampFormItem>
        </div>
        <CampFormItem class="CampFormItem" label="上传身份证">
          <div class="box">
            <el-upload :show-file-list="false" accept=".jpg, .jpeg, .png,">
              <img src="../../../assets/sfz1.png" class="avatar" />
            </el-upload>
            <el-upload :show-file-list="false" accept=".jpg, .jpeg, .png,">
              <img src="../../../assets/sfz2.png" class="avatar" />
            </el-upload>
          </div>
          <div class="text">
            图片要求：上传本人身份证，大小不超过2M，分辨率不低于720*1280。图片必须是最新的纸质证件原件拍照或彩色扫描件，若未使用最新证件照，则将无法通过备案审核。请确保证件四周有圆角，卡证边缘清晰。如有水印，务必放置在证件空白位置，不得遮挡文字和图像信息。<span>查看示例</span>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="姓名" prop="realName">
          <el-input placeholder="请输入主体负责人姓名" v-model="userData.realName"></el-input>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="身份证号" prop="realId">
          <div>
            <el-input style="width: 20vw;" v-model="userData.realId" placeholder="请输入主体负责人身份证号" type="password"
              show-password></el-input>
            <div class="text">温馨提示:请核对负责人身份号码</div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="身份证有效期">
          <div>
            <div class="date">
              <CampFormItem :isShowLabel="false" prop="idValidStart">
                <CampDatePicker placeholder="选择日期" v-model:date="userData.idValidStart"></CampDatePicker>
              </CampFormItem>
              <i class="iconfont icon-single_arrow"></i>&emsp13;
              <CampFormItem :isShowLabel="false" prop="idValidEnd">
                <CampDatePicker placeholder="选择日期" v-model:date="userData.idValidEnd"></CampDatePicker>
              </CampFormItem>
              <el-radio-group v-model="isForever">
                <el-radio label="长期" :value="true"></el-radio>
              </el-radio-group>
            </div>
            <div class="text">温馨提示：请核对负责人证件有效期，确保所填写证件有效期与上传证件信息完全一致，若填写不一致，将无法通过审核。</div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="入驻申请函" prop="applicantLetterImg">
          <div>
            <CampUpload v-model:images="userData.applicantLetterImg"></CampUpload>
            <div class="text">
              提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。图片必须是最新的纸质证件原件拍照或彩色扫描件，否则将无法通过备案审核。请确保证件四周有圆角，卡证边缘清晰。如有水印，务必放置在证件空白位置，不得遮挡文字和图像信息。<span>下载模版</span>
            </div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="通讯地址" prop="emailAddressList">
          <CampPlace placeholder="省 > 市 > 区" v-model:location="userData.emailAddressList"></CampPlace>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="" prop="detailAddress">
          <div>
            <el-input placeholder="街道, 小区, 门牌号等" style="width: 50vw;" v-model="userData.detailAddress"></el-input>
            <div class="text" v-if="route.params.type != 'institution'">温馨提示：通讯地址需要精确到具体房间号，省、市、区无需重复填写。通讯地址建议与固定经营区域保持一致。
            </div>
            <div class="text" v-else>
              温馨提示：住所需要精确到具体房间号，省、市、区无需重复填写，若所填写地址无门牌号且已是最详细地址，在下方“备注”位置说明情况。如“通讯地址已是最详细地址。”若未填写最详细通讯地址，将无法通过备案审核。</div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="应急联系人" v-if="route.params.type != 'personal'" prop="emergencyPhone">
          <div>
            <el-input v-model="userData.emergencyPhone" placeholder="请输入法定代表人或实际控制人的有效手机号码"></el-input>
            <div class="text">温馨提示：需填写法定代表人或实际控制人的有效手机号码，且没有给其他人使用过进行备案的。若应急手机号存在多人重复使用，将无法通过备案审核。</div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="备注" prop="describe" v-if="route.params.type != 'personal'">
          <el-input placeholder="请输入备注信息" v-model="userData.describe"></el-input>
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

const userData = ref({
  userId: null,
  name: "",
  email: "",
  identityImgs: [
    {
      url: "",
      name: "身份证正面"
    },
    {
      url: "",
      name: "身份证反面"
    }
  ],
  realName: "",
  realId: "",
  idValidStart: null,
  idValidEnd: null,
  emailAddressList: [],
  applicantLetterImg: {
    url: "",
    name: "认证申请函"
  },
  emergencyPhone: "",
  businessAreasList: [
    []
  ],
  activityTypeRanges: [
  ],
  activityParticipationRange: [
  ],
  evidences: [
    {
      url: "",
      name: "证明材料1"
    }
  ],
  describe: "",
  mobile: "",
  detailAddress: ""
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


    .CampFormItem {
      .date {
        display: flex;

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