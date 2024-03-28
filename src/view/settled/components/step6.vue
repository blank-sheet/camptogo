<template>
  <div class="step5">
    <div class="title">合作签约信息</div>
    <div class="contain">
      <el-form ref="formRef" :model="userData">
        <CampFormItem class="CampFormItem" label="签约人">
          <el-radio-group>
            <el-radio label="公司/法人签约" />
            <el-radio label="公司/法人委托签约" />
          </el-radio-group>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="上传授权委托书">
          <div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
            <div class="text">
              公司/法人授权委托需要上传授权委托书。<span>查看示例</span>
            </div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="证件类型">
          <el-select class="select" placeholder="请选择">
            <el-option v-for="item in documents" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="上传身份证件">
          <div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
            <div class="text">
              1.上传法定代表人身份证件<br>
              &emsp13;(1)中国大陆：须提供二代身份证的正反面照片<br>
              &emsp13;(2)中国香港/澳门/台湾：须提供港澳居民来往内地通行证或台湾居民来往大陆通行证的正反面照片<br>
              &emsp13;(3)海外：须提供护照首页照片<br>
              2.每张图片大小不超过2M，分辨率不低于720*1280。图片必须是最新的纸质证件原件拍照或彩色扫描件，若未使用最新证件照，则将无法通过备案审核。请确保证件四周有圆角，卡证边缘清晰。如有水印，务必放置在证件空白位置，不得遮挡文字和图像信息。<span>查看示例</span>
            </div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="姓名">
          <div>
            <el-input placeholder="请输入"></el-input>
            <div class="text">此处姓名需与上传证件上的姓名一致</div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="身份证件号">
          <div>
            <el-input placeholder="请输入"></el-input>
            <div class="text">
              1.上传身份证件为身份证的身份证号会自动识别身份证号，请商家仔细核对，若有错误请改正；<br>
              2.上传身份证件不为身份证的商家需要自己填写身份证号<br>
              &emsp13;(1)上传证件照为港澳居民来往内地通行证或台湾居民来往大陆通行证填写通行证证件号码<br>
              &emsp13;(2)上传身份证件为护照的请填写护照号码<br>
            </div>

          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="有效期限">
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
            <div class="text">请核对身份证件有效期，确保所填写证件有效期与上传证件信息完全一致，若填写不一致，将无法通过审核。</div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="签约人名下手机号">
          <div>
            <el-input placeholder="请输入请输入经营者手机号"></el-input>
            <div class="text">需填写实际经营者的有效手机号码，且没有给其他人使用过进行备案的。若手机号存在多人重复使用，将无法通过备案审核。</div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="绑定邮箱">
          <el-input placeholder="请绑定经营者邮箱"></el-input>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="申请认证公函">
          <div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
            <div class="text">
              提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。图片必须是最新的纸质证件原件拍照或彩色扫描件，否则将无法通过备案审核。请确保证件四周有圆角，卡证边缘清晰。如有水印，务必放置在证件空白位置，不得遮挡文字和图像信息。<span>下载模板</span>
            </div>
          </div>
        </CampFormItem>
     </el-form>
    </div>
    <div class="btn">
      <el-button @click="handlerTostep5()">上一步</el-button>
      <el-button type="success" @click="handlerTostep7()">下一步</el-button>
    </div>
  </div>
  <el-dialog class="dialog" v-model="isShowModel" title="活动特色(可多选)" width="800" align-center>
    <div class="tags">
      <div class="tag" :class="userData.activityTypeRanges.includes(item.value) ? 'activeTag' : ''"
        v-for="(item, index) in activityTypes" :key="item.value" @click="updateSelected(item.value)">{{
          item.label }}</div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <span class="selected">已选<span>{{ userData.activityTypeRanges.length }}</span>项</span>
        <el-button @click="isShowModel = false">取消</el-button>
        <el-button type="primary" @click="isShowModel = false">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CampFormItem from '../../../component/camp-form-item.vue'
import CampUpload from '../../../component/camp-upload.vue'
import CampDatePicker from '../../../component/camp-date-picker.vue'

import { settledApi } from "../../../api/modules/settled/settled"
import { request } from '../../../api/index.js'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const handlerTostep5 = () => {
  route.go(-1)
}
const handlerTostep7 = () => {
  router.push(`/settled/step7/${route.params.type}`)
}
onMounted(() => {
})
const formRef = ref(null)

const documents = [
  {
    label: '中国居民身份证',
    value: 0
  },
  {
    label: '港澳居民来往内地通行证',
    value: 1
  },
  {
    label: '台湾居民来往大陆通行证',
    value: 2
  },
  {
    label: '护照',
    value: 3
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

const delArea = (index) => {
  if (userData.value.businessAreasList <= 1) {
    ElMessage.error("至少保留一个选项")
    return
  }
  userData.value.businessAreasList.splice(index, 1)
}
const addArea = (index) => {
  if (userData.value.businessAreasList.length >= 20) {
    ElMessage.error("至多添加20个选项")
    return
  }
  userData.value.businessAreasList.splice(index + 1, 0, [])
}


// 活动类型
const activityTypes = [
  {
    label: '亲子营',
    value: '亲子营',
    desc: '【亲子营】指家长陪伴孩子共同参与的，有益于儿童成长的体验式教育形式。'
  },
  {
    label: '亲子单飞营',
    value: '亲子单飞营',
    desc: '【亲子单飞营】指家长与孩子共同参与，有亲子互动环节，也有各自独立安排的体验式教育形式。'
  },
  {
    label: '独立日间营',
    value: '独立日间营',
    desc: '【独立日间营】指孩子短时独立参与的，有益于儿童成长的体验式教育形式。'
  },

  {
    label: '冬夏令营',
    value: '冬夏令营',
    desc: '【夏令营】指在假期期间以团队生活形式参与的，有益于促进生理、心理、社交等能力综合等提升的体验式教育形式。'
  },
  {
    label: '游学',
    value: '游学',
    desc: '【游学】指参与人以游览为主、学习为辅的体验式教育形式。'
  },
  {
    label: '研学',
    value: '研学',
    desc: '【研学】指参与人以研究性学习为主、游览娱乐休闲为辅的体验式教育形式。'
  },

  {
    label: '产融实践',
    value: '产融实践',
    desc: '【产融实践】指参与人根据其已学习掌握的某些特定领域技能和知识，以实践为目标走入实际场景中应用的体验式教育形式。'
  },
  {
    label: '赛事集训',
    value: '赛事集训',
    desc: '【赛事集训】指参与人就某些特定领域以获得竞赛成绩为目标参与的，短期体验式教育形式。'
  },
  {
    label: '其他',
    value: '其他',
    desc: '【其他】不属于上述类型的其他形式活动。'
  }
]
const isShowModel = ref(false)

const updateSelected = (value) => {
  if (userData.value.activityTypeRanges.includes(value)) {
    const index = userData.value.activityTypeRanges.findIndex(ele => (ele == value))
    userData.value.activityTypeRanges.splice(index, 1)
  } else {
    userData.value.activityTypeRanges.push(value)
  }
}

const handleClose = (index) => {
  userData.value.activityTypeRanges.splice(index, 1)
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

      .text2 {
        white-space: nowrap;
        margin-right: 1vw;
        font-size: 1vw;
        margin: 0 0 5px 0;
      }
      .date {
        display: flex;
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