<template>
  <div class="basic-info">
    <div class="title">基本信息</div>
    <div>
      <el-form>
        <el-card shadow="always" class="block" id="1">
          <div class="settingMoudle" style="display: flex; align-items: center">
            <div class="gray">账户信息</div>
          </div>
          <div class="main-message">
            <div class="bind_account">
              <div style="margin-right: 50px">绑定账户：</div>
              <div class="bind_account_message">
                <div class="conent">
                  <span style="margin-right: 48px; ">绑定手机：</span>
                  <span>{{ userMobile }}</span>
                  <el-icon style="margin-left: 12px">
                    <View v-if="showMobile" @click="showMobile = !showMobile" class="view" />
                    <Hide v-else @click="showMobile = !showMobile" class="hide" />
                  </el-icon>
                  <span class="alarm">*该手机为系统默认手机号之后用于收平台通知，请注意查看短信</span>
                </div>
                <div class="conent">
                  <span style="margin-right: 75px;">姓名：</span>
                  <span> {{ userName }}</span>
                </div>
                <div class="conentf">
                  <span>身份证号：{{ info.legalRealId }}</span>
                </div>
              </div>
            </div>
            <div class="bind_email">
              <span style="margin-right: 50px; font-weight: 400">绑定邮箱：</span>
              <span style="color: #999">{{ store.user?.provider.email }}</span>
              <span class="alarm">*该邮箱为系统默认邮箱之后用于收平台通知，请及时查看邮件</span>
            </div>
            <div class="certified_statu">
              <span style="margin-right: 50px; font-weight: 400">认证状态：</span>
              <el-icon v-show="isIdentify">
                <SuccessFilled color="#93D900" />
              </el-icon>
              <span style="margin: 0 10px; color: #999">{{
                isIdentify ? '已认证' + ' ' + isIdentify : '未认证'
              }}</span>
              <span class="alarm" v-if="isIdentify">
                <span class=" mr-5 text-green-600" @click="showIdentifyDialog = true">查看实名认证信息</span>
                *如需要更改认证信息，请联系客服</span>
              <span v-else class=" text-green-600 cursor-pointer" @click="showIdentifyDialog = true">去认证</span>
              <IdentifyDialog v-model:show="showIdentifyDialog" :ediable="true" />
            </div>
          </div>
        </el-card>
        <el-card class="block" id="2">
          <div class="settingMoudle" style="display: flex; align-items: center">
            <div class="gray">认证信息</div>
          </div>
          <div class="bBody">
            <el-form-item label="认证类型：">
              <campCascader placeholder="请选择认证类型" v-model="info.authType" :options="applicantTypes">
              </campCascader>
              <el-select placeholder="请选择认证证件类型" v-model="info.credentialType">
                <el-option label="居民身份证" value="D_CARD" :disabled="!isPeson"></el-option>
                <el-option label="护照" value="PASSPORT" :disabled="!isPeson"></el-option>
                <el-option label="营业执照" value="BUSINESS_LICENSE" :disabled="isPeson"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="营业执照：" v-show="!isPeson" style="margin: 0">
              <div style="color: gray">
                请上传加盖公章的彩色扫描件，确保内容清晰完整，个体工商户须加捺指印（支持jpg/png格式，小于2M）。
                <CampUpload v-model:images="info.businessLicense" style="margin-top: 8px; margin-bottom: -4px" />
              </div>
            </el-form-item>
            <el-form-item label="认证名称：">
              <el-input v-model="info.authName" placeholder="与认证证件上的名称保持一致" style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="认证号码：">
              <el-input v-model="info.authNumber" placeholder="与认证证件上的号码保持一致" style="width: 300px"></el-input><el-tooltip
                content="法人、非法人组织和个体工商户认证<br>请填写统一社会信用代码，个人认证<br>请填写身份证号或护照号" raw-content placement="top-start">
                <el-icon>
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="成立日期：" v-show="!isPeson">
              <el-date-picker value-format="YYYY-MM-DDTHH:mm" v-model="info.establishDate" type="date"
                placeholder="年/月/日" />
            </el-form-item>
            <el-form-item label="经营住所：" v-show="!isPeson">
              <CampPlace v-model:location="info.businessAddress" /><el-tooltip content="填写的注册地址请与认证证件上保持一致" raw-content
                placement="top-start">
                <el-icon>
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="法定代表人：" v-show="!isPeson">
              <el-input placeholder="姓名" v-model="info.legalPersonName"></el-input>
              <el-input placeholder="请输入电话号码" v-model="info.legalPersonPhone"></el-input>
              <el-input placeholder="请输入身份证号" v-model="info.legalRealId"></el-input><el-tooltip
                content="*与认证证件保持一致。若您不是法<br>人，属于个体工商户或非法人组织，<br>请填写个体工商户经营者、个人独资<br>企业投资者、合伙企业执行事务合伙<br>人等主要负责人。"
                raw-content placement="top-start">
                <el-icon>
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="实际控制人">
              <div>
                <div v-for="(item, index) in info.controllerList" style="margin-bottom: 20px">
                  <ElSelect style="margin-bottom: 10px" placeholder="请选择实际控制人类型" v-model="item.authType">
                    <ElOption label="自然人" value="自然人"></ElOption>
                    <ElOption label="机构" value="机构"></ElOption>
                  </ElSelect>
                  <div>
                    <div v-if="item.authType === '自然人'">
                      <ElInput placeholder="姓名" v-model="item.name"></ElInput>
                      <ElInput placeholder="请输入身份证号" v-model="item.idCard"></ElInput>
                    </div>
                    <div v-else>
                      <ElInput placeholder="请填写机构名称" v-model="item.name"></ElInput>
                    </div>
                    <template v-if="index == info.controllerList.length - 1">
                      <div class="add" @click="() =>
                        info.controllerList.push({
                          authType: null,
                          name: null,
                          idCard: null
                        })
                        ">
                        + 如有多位实际控制人,请点击添加
                      </div>
                      <div class="add" @click="info.controllerList.splice(-1, 1)">- 删除</div>
                    </template>
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="实际受益人">
              <div>
                <div v-for="(item, index) in info.beneficiaryList" style="margin-bottom: 20px">
                  <ElSelect style="margin-bottom: 10px" placeholder="请选择实际受益人类型" v-model="item.authType">
                    <ElOption label="自然人" value="自然人"></ElOption>
                    <ElOption label="机构" value="机构"></ElOption>
                  </ElSelect>
                  <div>
                    <div v-if="item.authType === '自然人'">
                      <ElInput placeholder="姓名" v-model="item.name"></ElInput>
                      <ElInput placeholder="请输入身份证号" v-model="item.idCard"></ElInput>
                    </div>
                    <div v-else>
                      <ElInput placeholder="请填写机构名称" v-model="item.name"></ElInput>
                    </div>
                    <template v-if="index == info.beneficiaryList.length - 1">
                      <div class="add" @click="() =>
                        info.beneficiaryList.push({
                          authType: null,
                          name: null,
                          idCard: null
                        })
                        ">
                        + 如有多位实际控制人,请点击添加
                      </div>
                      <div class="add" @click="info.beneficiaryList.splice(-1, 1)">- 删除</div>
                    </template>
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="身份证件：">
              <div class="grayLabel" style="margin-left: 0; display: block; width: 100%">
                <span class="grayLabel" style="margin-left: 0; display: block; width: 100%;white-space: break-spaces;">
                  <p>
                    1.若您属于法人或非法人组织，请上传法定代表人或主要负责人（如个人独资企业投资者、合伙企业执行事务合伙人等）的有效身份证复印件，身份证正、反面复印在同一张A4纸上，港澳台人士请上传港澳台居民居住证、港澳居民来往内地通行证、台湾居民来往大陆通行证等有效身份证件，外籍人士请上传护照复印件，加盖公章。图片须为彩色，支持jpg/png格式。
                  <p>2.若您属于个人或个体工商户，请上传有效身份证复印件，正、反面复印在同一张A4纸上，亲笔签名并捺指印。图片须为彩色，支持jpg/png格式。</p>
                  </p>
                </span>
                <div></div>
              </div>
              <CampUpload v-model:images="info.identityImg" style="margin-top: 8px" />
            </el-form-item>
            <el-form-item label="行政许可证明">
              <p class="grayLabel" style="margin-left: 0; display: block; width: 100%">
                若您的经营范围属于根据法律规定需要办理行政许可的特殊行业，须提交相应经营许可证明。如有其他行政许可证明，请提供清晰完整的彩色图片，支持jpg/png格式，小于2M。</p>
              <CampUpload v-model:images="info.adminLicenseImgs" />
            </el-form-item>
          </div>
        </el-card>
        <el-card class="block" id="3">
          <div class="settingMoudle" style="display: flex; align-items: center">
            <div class="gray">财税信息</div>
          </div>
          <div class="bBody">
            <el-form-item label="开户银行：">
              <el-input style="width: 350px" v-model="info.taxPayerBankName" placeholder="需填写至支行网点全称"></el-input>
            </el-form-item>
            <el-form-item label="银行账号：">
              <el-input v-model="info.taxPayerBankAccount" placeholder="输入账号请勿空格"></el-input>
            </el-form-item>
            <el-form-item label="通讯地址：">
              <CampPlace v-model:location="info.taxPayerCountry" />
              <el-input v-model="info.taxPayerDetailedAddress" style="width: 300px"
                placeholder="请输入详细地址"></el-input><el-tooltip content="通讯地址用于在日后业务联系、发票<br>等事宜中邮寄送达相关材料" raw-content
                placement="top-start">
                <el-icon>
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="手机号码：">
              <el-input style="width: 300px" v-model="info.taxPayerMobile" placeholder="请填写财务负责人手机号码"></el-input>
              <span class="grayLabel">*后续如有涉及财税信息的问题，平台将通过该号码与您联系，请注意查看短信</span>
            </el-form-item>
          </div>
        </el-card>
        <el-card class="block" id="4">
          <div class="settingMoudle" style="display: flex; align-items: center">
            <div class="gray">认证申请</div>
          </div>
          <div class="bBody">
            <el-form-item label="认证申请函：">
              <span class="grayLabel" style="margin-left: 0; display: block; width: 100%">
                <div style="white-space: normal">
                  1.若您属于个人，请下载相应模板，填写、打印并签字、捺指印后上传彩色图片，支持jpg/png格式。
                </div>
                <div style="white-space: normal">
                  2.若您属于法人、非法人组织或个体工商户，请下载相应模板，填写、打印并签章后上传彩色图片，个体工商户须加捺指印，支持jpg/png格式。
                </div>
                <a
                  href="https://bikatoo-mnemosyne.oss-cn-chengdu.aliyuncs.com/camptogo/%E6%9C%BA%E6%9E%84%E3%80%8A%E7%94%B3%E8%AF%B7%E8%AE%A4%E8%AF%81%E5%85%AC%E5%87%BD%E3%80%8B%E6%A8%A1%E7%89%88-2023-V5.1.docx">点击下载认证申请函模板</a>
                <a
                  href="https://bikatoo-mnemosyne.oss-cn-chengdu.aliyuncs.com/camptogo/%E4%B8%AA%E4%BA%BA%E3%80%8A%E5%85%A5%E9%A9%BB%E7%94%B3%E8%AF%B7%E5%87%BD%E3%80%8B%E6%A8%A1%E7%89%88.docx">点击下载个人入驻申请函模板</a>
              </span>
              <CampUpload v-model:images="info.applicantLetterImg" />
            </el-form-item>
          </div>
        </el-card>
        <el-card class="block" id="5">
          <div class="settingMoudle" style="display: flex; align-items: center">
            <div class="gray">业务信息</div>
          </div>
          <div class="bBody">
            <el-form-item label="官网地址：">
              <el-input style="width: 300px" v-model="info.officialWebSite" placeholder="请输入官网首页网址(若没有请填写“无”)"></el-input>
            </el-form-item>
            <el-form-item label="业务介绍：">
              <el-input v-model="info.businessIntroduction" type="textarea"
                placeholder="限200字,公司介绍内容应包括:主营业务的品类、特色、主要经营的地区、服务的受众群体年龄、荣誉奖项等" />
            </el-form-item>
            <el-form-item label="人员规模：">
              <el-select v-model="info.staffSize" placeholder="请输入人员规模">
                <el-option v-for="p in peopleSize" :value="p" :label="p" :key="p" />
              </el-select>
            </el-form-item>
          </div>
        </el-card>
      </el-form>
    </div>
    <CampFooter>
      <el-button type="success" @click="submit">提交审核</el-button>
    </CampFooter>
  </div>
  <nav class="product-nav">
    <ul>
      <li v-for="(nav, index) in navs" :class="{
        nav: true,
        'nav-active': index == activeNav - 1
      }">
        <span></span>
        <span @click="goToPosition(index + 1)">
          {{ nav }}
        </span>
      </li>
    </ul>
  </nav>
  <ElDialog v-model="showDialog" title="营探提醒">
    <p>
      尊敬的服务商，感谢您选择营探。为与您建立长期稳定积极的合作关系，在填写基本信息之前，请您仔细阅读并同意以下全部条款。更多协议及政策可通过工作台”规则协议“查看。如您对协议有任何疑问，可向营探平台客服咨询。
      您使用或继续使用我们的服务，即意味着同意以下条款。
    </p>
    <ul>
      <li><a href="/#/user/rule/20">《营探服务商管理办法》</a></li>
      <li><a href="/#/user/rule/11">《营探隐私政策》</a></li>
      <li><a href="/#/user/rule/26">《营探交易争议处理规则》</a></li>
      <li><a href="/#/user/rule/27">《营探侵权处理办法》</a></li>
      <li><a href="/#/user/rule/24">《营探搜索排名规则》</a></li>
      <li><a href="/#/user/rule/23">《营探服务商培训办法》</a></li>
      <li><a href="/#/user/rule/10">《营探用户协议》</a></li>
      <li><a href="/#/user/rule/25">《营探信用评价规则》</a></li>
    </ul>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="showDialog = false">确认</el-button>
      </span>
    </template>
  </ElDialog>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useStore } from '../../../../store'
import { applicantTypes, peopleSize } from './common/options'
import { request } from '../../../../api'
import { userApi } from '../../../../api/modules/user/user.js'
import CampUpload from '../../../../component/camp-upload.vue'
import CampFooter from '../../../../component/camp-footer.vue'
import CampPlace from '../../../../component/camp-place.vue'
import campCascader from '../../../../component/camp-cascader.vue'
import IdentifyDialog from './components/IdentifyDialog.vue'
const activeNav = ref(0)
const showDialog = ref(true)
const showIdentifyDialog = ref(false)
const isIdentify = computed(() => {
  return store.user.provider?.dateCreated
})
const navs = ['账户信息', '认证信息', '财税信息', '认证申请', '业务信息']
const setActive = id => {
  activeNav.value = id
}
// 隐藏显示信息逻辑部分
const showMobile = ref(false)
//隐藏电话中间4位
const userMobile = computed(() => {
  if (!store.user) return {}
  const mobile = store.user.provider?.mobile
  if (!showMobile.value) {
    return mobile.slice(0, 3) + '****' + mobile.slice(7)
  } else return mobile
})
//隐藏姓名后两位
const userName = computed(() => {
  const name = store.user.provider?.name
  if (!showMobile.value) {
    return name.slice(0, 2) + '**'
  } else return name
})
const store = useStore()
const isPeson = computed(() => info.value.authType == 4)
let info = ref({
  providerId: null,
  authType: null,
  credentialType: null,
  businessLicense: {},
  authName: null,
  authNumber: null,
  establishDate: null,
  businessAddress: null,
  legalPersonName: null,
  legalPersonPhone: null,
  legalRealId: null,
  identityImg: {},
  legalRealId: null,
  adminLicenseImgs: [],
  controllerList: [
    {
      authType: null,
      name: null,
      idCard: null
    }
  ],
  beneficiaryList: [
    {
      authType: null,
      name: null,
      idCard: null
    }
  ],
  taxPayerBankName: null,
  taxPayerBankAccount: null,
  taxPayerCountry: null,
  taxPayerProvinceCity: null,
  taxPayerDetailedAddress: null,
  applicantLetterImg: {},
  officialWebSite: null,
  businessIntroduction: null,
  staffSize: null
})
const submit = () => {
  request.post(
    userApi.basicInfoSubmit,
    {
      ...info.value,
      providerId: store.providerId
    },
    {
      message: true,
      loading: true
    }
  )
}
onMounted(() => {
  request
    .post(userApi.getBasiInfo, {
      providerId: store.providerId
    })
    .then(res => {
      if (res.details) info.value = res.details
      if (!info.value.controllerList.length) {
        info.value.controllerList = [
          {
            authType: null,
            name: null,
            idCard: null
          }
        ]
      }
      if (!info.value.beneficiaryList.length) {
        info.value.beneficiaryList = [
          {
            authType: null,
            name: null,
            idCard: null
          }
        ]
      }
    })
})
//导航逻辑
const goToPosition = id => {
  setActive(id)
  const element = document.getElementById(id)
  element.scrollIntoView()
}
</script>

<style lang="scss">
.basic-info {
  .el-card {
    width: 1000px;
  }

  span {
    font-size: 12px;
  }

  .el-form-item {
    margin: 24px 0;
  }

  .el-input {
    width: auto;
    margin-right: 10px;
  }

  .gray {
    white-space: normal;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0px;
    text-align: left;
  }
}

.el-card__body {
  padding-left: 24px;
  padding-right: 48px;
}

.title {
  font-family: PingFang SC;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 24px;
  margin-bottom: 16px;
  margin-left: 24px;
}

.add {
  margin-top: 20px;
  cursor: pointer;
  border: 1px dotted black;
  display: flex;
  padding: 0 10px;
  justify-content: center;
  align-items: center;
}

.block {
  margin-left: 24px;
  margin-bottom: 16px;

  .bBody {
    margin-left: 24px;

    >* {
      margin-top: 30px;
    }
  }

  .conent {
    margin-bottom: 16px !important;
  }

  .settingMoudle {
    font-size: 14px;
  }

  .itemLabelTit {
    text-indent: 2em;
    display: inline-block;
  }

  .grayLabel {
    font-family: 'PingFang SC';
    white-space: break-spaces;
    font-style: normal;
    margin-left: 0px;
    font-size: 12px;
    color: #8a8a8a;
    float: left;
  }
}

.timeCheckbox {
  :deep(.el-checkbox__inner) {
    border-radius: 50% !important;
    overflow: hidden;
  }
}

.alarm {
  color: #999;
  font-size: 14px;
  margin-left: 20px;
}

.account-title {
  font-family: PingFang SC;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
}

.el-dialog {
  a {
    color: #93d900;
    text-decoration: none;
  }

  li {
    list-style: none;
    margin: 10px;
  }
}

.main-message {
  margin-left: 24px;
  columns: #2c2c2c;
  font-size: 14px;
  font-weight: 400;

  span {
    font-size: 14px;
  }

  .bind_account {
    margin-bottom: 40px;
    margin-top: 20px;
    display: flex;
    margin-right: 20px;

    .bind_account_message {
      display: flex;
      flex-direction: column;
      font-weight: 400;

      .conent {
        margin-bottom: 30px;
      }

      .conentf {
        margin-bottom: 0px;
      }
    }
  }

  .bind_email {
    margin-bottom: 40px;
    font-weight: 400;
  }

  .certified_statu {
    margin-bottom: 10px;
    font-weight: 400;
  }
}

.hide {
  position: relative;

  top: 2px;

  :hover {
    color: #93d900;
  }

  cursor: pointer;
}

.view {
  position: relative;
  top: 2px;

  :hover {
    color: #93d900;
  }

  cursor: pointer;
}

.el-form-item__label {
  font-size: 14px;
}

.product-nav {
  position: fixed;
  left: 1300px;
  top: 130px;
  border-left: 2px solid lightgray;

  li {
    list-style: none;
    min-width: 70px;
    margin: 14px;
    cursor: pointer;
  }

  .nav-active {
    span {
      position: relative;
      height: 30px;
      color: var(--el-color-primary);
    }

    span:before {
      content: '';
      position: absolute;
      left: -16px;
      width: 2px;
      height: 100%;
      background-color: var(--el-color-primary);
      transform: scale(1.5, 2);
      z-index: 10;
    }
  }

  span {
    position: relative;
    color: #8a8a8a;
  }
}
</style>
