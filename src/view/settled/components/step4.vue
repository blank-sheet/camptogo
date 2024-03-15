<template>
  <div class="step4">
    <div class="title">主体负责人信息</div>
    <div class="contain">
      <el-form ref="formRef">
        <CampFormItem class="CampFormItem" label="上传身份证">
          <div class="box">
            <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" accept=".jpg, .jpeg, .png,">
              <img src="../../../assets/sfz1.png" class="avatar" />
            </el-upload>
            <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" accept=".jpg, .jpeg, .png,">
              <img src="../../../assets/sfz2.png" class="avatar" />
            </el-upload>
          </div>
          <div class="text">
            图片要求：上传本人身份证，大小不超过2M，分辨率不低于720*1280。图片必须是最新的纸质证件原件拍照或彩色扫描件，若未使用最新证件照，则将无法通过备案审核。请确保证件四周有圆角，卡证边缘清晰。如有水印，务必放置在证件空白位置，不得遮挡文字和图像信息。<span>查看示例</span>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="姓名">
          <el-input placeholder="请输入主体负责人姓名"></el-input>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="身份证号">
          <div>
            <el-input style="width: 20vw;" placeholder="请输入主体负责人身份证号" type="password" show-password></el-input>
            <div class="text">温馨提示:请核对负责人身份号码</div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="有效期限">
          <div>
            <div>
              <CampDatePicker placeholder="选择日期"></CampDatePicker><i class="iconfont icon-single_arrow"></i>&emsp13;
              <CampDatePicker placeholder="选择日期"></CampDatePicker><el-radio-group><el-radio
                  label="长期"></el-radio></el-radio-group>
            </div>
            <div class="text">温馨提示：请核对负责人证件有效期，确保所填写证件有效期与上传证件信息完全一致，若填写不一致，将无法通过审核。</div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="入驻申请函">
          <div>
            <CampUpload></CampUpload>
            <div class="text">
              提交的图片需符合以下规定：大小不超过2M，分辨率不低于720*1280。图片必须是最新的纸质证件原件拍照或彩色扫描件，否则将无法通过备案审核。请确保证件四周有圆角，卡证边缘清晰。如有水印，务必放置在证件空白位置，不得遮挡文字和图像信息。<span>下载模版</span>
            </div>
          </div>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="通讯地址">
          <CampPlace placeholder="省 > 市 > 区"></CampPlace>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="">
          <div>
            <el-input placeholder="街道, 小区, 门牌号等" style="width: 50vw;"></el-input>
            <div class="text">温馨提示：通讯地址需要精确到具体房间号，省、市、区无需重复填写。通讯地址建议与固定经营区域保持一致。</div>
          </div>
        </CampFormItem>
      </el-form>
    </div>
    <div class="btn">
      <el-button type="success" @click="handlerToStep4()">下一步</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CampFormItem from '../../../component/camp-form-item.vue'
import CampDatePicker from '../../../component/camp-date-picker.vue'
import CampUpload from '../../../component/camp-upload.vue'
import CampPlace from '../../../component/camp-place.vue'

const route = useRoute()
const router = useRouter()
const handlerTostep4 = () => {
  router.push(`/settled/step4/${route.params.type}`)
}
onMounted(() => {
})
const formRef = ref(null)
const select = ref(1)
</script>

<style lang="scss" scoped>
.step4 {
  width: 80%;
  background-color: #fff;
  border-radius: 0.5vw;
  display: flex;
  flex-direction: column;
  margin: 3vh 0;

  .contain {
    display: flex;
    flex-direction: column;
    padding: 1vh 1vw;


    .CampFormItem {
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