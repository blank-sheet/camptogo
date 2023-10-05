<template>
  <div class="manager-setting">
    <h3>主理人设置</h3>
    <div>
      <el-form>
        <el-card class="block">
          <el-form-item label="主理人名称：">
            <el-input
              v-model="form.name"
              style="width: 300px"
              placeholder="请输入品牌名、主理人本名或机构名称"></el-input>
            <el-tooltip
              content="常用品牌名须与认证名称相关，无需<br>使用机构全称；若常用品牌名与入驻<br>认证名称完全无关，请在下方“主理<br>人证明材料”处上传商标注册证、使<br>用授权等证明。"
              raw-content
              placement="top-start">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="主理人简称：">
            <el-input
              style="width: 300px"
              v-model="form.abbr"
              placeholder="请输入主理人简称，限6个字以内"
              maxlength="6"
              show-word-limit></el-input>
            <span class="grayLabel"> *可能会用于不同模块的推送 </span>
          </el-form-item>
          <el-form-item label="主理人头像：">
            <div style="display: block">
              <span class="grayLabel"
                >请上传1张高质量横版形象照，图片比例为1:1，支持jpg/png，小于1M。</span
              >
              <CampUpload v-model:images="form.avatarSquare" />
            </div>
          </el-form-item>
          <el-form-item label="主理人版头图：">
            <div style="display: block">
              <span class="grayLabel"
                >请上传1张高质量头像，并确保该图片不存在侵犯他人知识产权的风险，若头像包含您已注册的商标，请在“主理人证明材料”处上传商标注册证。图片比例为1:1，支持jpg/png，小于1M。</span
              >
              <CampUpload v-model:images="form.portrait" />
            </div>
          </el-form-item>
          <el-form-item label="主理人证明材料:">
            <div style="display: block">
              <span class="grayLabel"
                >若主理人名称、主理人简称、主理人头像、主理人版头图涉及文字或图形商标使用的，请在此处上传相关证明材料。彩色图片，支持jpg/png。</span
              >
              <CampUpload v-model:images="form.evidences" />
            </div>
          </el-form-item>
          <el-form-item label="主理人简介：">
            <el-input
              v-model="form.describe"
              type="textarea"
              placeholder="请输入主理人介绍或团队介绍"
              maxlength="300"
              show-word-limit />
          </el-form-item>
          <el-form-item label="主理人风采图：">
            <div style="width: 100%">
              <span class="grayLabel"
                >请上传2-4张高质量横版风采图，图片比例为3:2，支持jpg/png格式，单张图片小于2M，可拖动图片排序:1，支持jpg/png，小于1M。</span
              >
            </div>

            <CampUpload v-model:images="form.show" />
          </el-form-item>
          <el-form-item label="荣誉资质展示：">
            <div style="display: block">
              <span class="grayLabel"
                >*请上传营业执照及其它荣誉资质“原件”“彩色”扫描件，涉及个人敏感信息的内容须在“证件号码”处打码，图片比例不限，支持jpg/png格式，上传数量不限，单张图片小于2M</span
              >
              <CampUpload v-model:images="form.honor" />
            </div>
          </el-form-item>
        </el-card>
      </el-form>
    </div>
    <camp-footer>
      <el-button type="success" @click="createProvider">提交审核</el-button>
    </camp-footer>
  </div>
</template>

<script setup>
import CampFooter from '../../../../component/camp-footer.vue'
import CampUpload from '../../../../component/camp-upload.vue'
import { ref, onMounted } from 'vue'
import { request } from '../../../../api'
import { useStore } from '../../../../store'
const store = useStore()
const form = ref({
  providerId: 74,
  identifier: null,
  isActive: false,
  name: null,
  describe: null,
  exclusive: false,
  mobile: null,
  email: null,
  wechat: null,
  abbr: null,
  avatarSquare: {},
  portrait: {},
  show: [],
  honor: [],
  evidences: []
})
const createProvider = () => {
  request
    .post(
      '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/provider/update',
      {
        providerId: store.providerId,
        ...form.value
      },
      { message: true }
    )
    .then(initilize)
}
const initilize = () => {
  request
    .post('/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/provider/get', {
      providerId: store.providerId
    })
    .then(r => {
      form.value = r.details
    })
}
onMounted(initilize)
</script>

<style lang="scss">
.manager-setting {
  .el-form-item {
    margin: 16px 0;
  }
  .el-card__body {
    padding-right: 48px;
  }
}
h3 {
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

.block {
  width: fit-content;
  margin-right: 42px;
  margin-left: 24px;
  margin-bottom: 16px;
  min-width: 1000px;

  .bBody {
    margin-left: 30px;

    > * {
      margin-top: 30px;
    }
  }

  .settingMoudle {
    font-size: 14px;
  }

  .itemLabelTit {
    text-indent: 2em;
    display: inline-block;
  }

  .formItem {
    display: flex;
  }

  .grayLabel {
    font-family: 'PingFang SC';
    font-style: normal;
    margin: 8px 0px;
    font-size: 12px;
    float: left;
    line-height: 20px;
    white-space: break-spaces;
  }
}
.timeCheckbox {
  :deep(.el-checkbox__inner) {
    border-radius: 50% !important;
    overflow: hidden;
  }
}
</style>
