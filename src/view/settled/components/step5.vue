<template>
  <div class="step5">
    <div class="title">合作经营信息</div>
    <div class="contain">
      <el-form ref="formRef" :model="userData">
        <CampFormItem class="CampFormItem" label="合作模式">
          <el-checkbox-group>
            <el-checkbox label="佣金发票（营探向商家开的发票）" value="Value A" />
            <el-checkbox label="底价发票（商家向营探开的发票）" value="Value A" />
          </el-checkbox-group>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="入驻身份">
          <el-select class="select" placeholder="请选择">
            <el-option v-for="item in travelAgency" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="特殊经营品类">
          <el-radio-group>
            <el-radio value="1" size="large">含特殊经营品类</el-radio>
            <el-radio value="1" size="large">不含特殊经营品类</el-radio>
          </el-radio-group>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="品牌类型">
          <div>
            <el-checkbox-group>
              <el-checkbox label="自主品牌" value="Value A" />
              <el-checkbox label="代理品牌" value="Value A" />
            </el-checkbox-group>
            <div class="text">品牌使用人和品牌持有人一致，即商标注册证上注册人=开店主体，即品牌商标持有人自己开店；品牌使用人经过持有人授权，品牌持有人为授权方，品牌使用人为被授权方。</div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="主要经营区域">
          <div>
            <div>
              <el-input class="baozhengjin" disabled></el-input>元
            </div>
            <div class="text">2024年12月31日24点前签约入驻营探的服务商，营探允许服务商先行入驻平台并使用平台基础服务而暂缓缴纳基础保证金。</div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="上传相关资质">
          <div>
            <div class="text2">旅游业务许可证</div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
            <div class="text">
              可上传多张图片，提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。需提供有效的旅游业务许可证，或其他监管部门认可的具有同等法律效力的证件，并且照片清晰完整。<span>查看示例</span>
            </div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="">
          <div>
            <div class="text2">所有权证书</div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
            <div class="text">
              可上传多张图片，提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。
            </div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="">
          <div>
            <div class="text2">特殊经营品类资质</div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
            <div class="text">
              可上传多张图片，提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。
            </div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="">
          <div>
            <div class="text2">教育相关许可证</div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
            <div class="text">
              可上传多张图片，提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。
            </div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="">
          <div>
            <div class="text2">办学许可证</div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
            <div class="text">
              可上传多张图片，提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。
            </div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="">
          <div>
            <div class="text2">商标注册证（选填）</div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
            <div class="text">
              可上传多张图片，提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。
            </div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="">
          <div>
            <div class="text2">品牌授权书</div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
            <div class="text">
              可上传多张图片，提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。
            </div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="">
          <div>
            <div class="text2">上传其他备案资质</div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
            <div class="text">
              可上传多张图片，提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。
            </div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="能力证明（选填）">
          <div>
            <CampUpload v-model:images="userData.evidences"></CampUpload>
            <div class="text">
              各级奖项、荣誉资质、出版物、职称、职业认证等第三方专业机构出具的相关证明。
            </div>
          </div>
        </CampFormItem>
      </el-form>
    </div>
    <div class="btn">
      <el-button @click="handlerTostep4()">上一步</el-button>
      <el-button type="success" @click="handlerTostep6()">下一步</el-button>
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
import CampPlace from '../../../component/camp-place.vue'
import { settledApi } from "../../../api/modules/settled/settled"
import { request } from '../../../api/index.js'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const handlerTostep6 = () => {
  console.log(userData.value.businessAreasList)
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
    label:'旅行社',
    value:0
  },
  {
    label:'场地方官方',
    value:1
  },
  {
    label:'教培机构',
    value:2
  },
  {
    label:'其他',
    value:3
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
        margin:0 0 5px 0;
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