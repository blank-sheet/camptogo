<template>
  <div class="step2">
    <div class="title">{{ route.params.type === 'personal' ? '个人入驻' : '机构入驻' }}</div>
    <div class="contain">
      <el-form ref="formRef" :model="userDate">
        <CampFormItem class="CampFormItem" label="注册手机" prop="phoneNumber">
          <el-input placeholder="请使用公司负责人常用手机号" v-model="userDate.phoneNumber" @blur="isError = false">
            <template #prepend>
              <CampFormItem :is-show-label="false" prop="select">
                <el-select v-model="userDate.select" placeholder="" style="width: 120px" :class="isError?'error':''">
                  <el-option label="中国大陆 +86" :value="1" />
                </el-select>
              </CampFormItem>
            </template>
          </el-input>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="手机验证码" prop="captcha">
          <el-input placeholder="请输入短信验证码" v-model="userDate.captcha">
            <template #suffix>
              <div @click="getVerifyCode" style="cursor: pointer;" :style="{ 'color': isReadyToSend ? '#93D600' : '' }">{{
                showTime || '发送' }}</div>
            </template>
          </el-input>
        </CampFormItem>
      </el-form>
    </div>
    <div class="tips">
      <el-checkbox></el-checkbox>
      <div>我已阅读并同意<span>《营探用户协议》</span><span>《营探隐私政策》</span></div>
    </div>
    <div class="btn">
      <el-button type="success" @click="handlerToStep3()">确认</el-button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CampFormItem from '../../../component/camp-form-item.vue'
import { settledApi } from "../../../api/modules/settled/settled"
import { request } from '../../../api/index.js'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const handlerToStep3 = async () => {
  const valid = validateForm(formRef.value)
  if (valid) {
    isError.value = true
    return
  } else {
    await request.post(settledApi.phoneVerifyAPI, {
      phoneNumber: userDate.value.phoneNumber,
      captcha: userDate.value.captcha
    }).then(res => {
      if (res.details.isRegistered == true) {
        router.push(`/settled/step3/${route.params.type}`)
      }
    })
  }

}
onMounted(() => {
})
const formRef = ref(null)
const userDate = ref({
  phoneNumber: null,
  captcha: null,
  select:1
})

const showTimer = ref(null)
const showTime = ref('发送')
const changeShowTIme = () => {
  if (showTimer.value) {
    clearTimeout(showTimer.value)
  }
  showTimer.value = setTimeout(() => {
    if (showTime.value == 0) {
      showTime.value = '重新发送'
      clearTimeout(showTimer.value)
    }
    showTime.value -= 1
    changeShowTIme()
  }, 1000)
}
const preTime = ref(0)
const getVerifyCode = async () => {
  const phoneNumberRegex = /^1[3-9]\d{9}$/
  if (userDate.value.phoneNumber) {
    if (!phoneNumberRegex.test(userDate.value.phoneNumber)) {
      ElMessage.error("请输入正确手机号")
      return
    }
  } else {
    ElMessage.error("请输入手机号")
    return
  }
  const now = Date.now()
  if (now - preTime.value >= 60000) {
    preTime.value = now
    showTime.value = 60
    changeShowTIme()
    await request.post(settledApi.getPhoneCaptchaAPI, {
      phoneNumber: userDate.value.phoneNumber
    }).then(res => {
      console.log(res)
    })
  } else {
    ElMessage.warning("验证码仍有效, 请勿重复操作")
    return
  }
}
const isError = ref(false)
const status = ref(true)
const validateForm = (formEl) =>
  formEl.validate((valid) => {
    if (document.querySelector('.is-error')) {
      document.querySelector('.is-error').scrollIntoView()
    }
    return valid
  })

const isReadyToSend = computed(() => {
  if ((showTime.value == '重新发送' || showTime.value == '发送') && userDate.value.phoneNumber && userDate.value.phoneNumber.length == 11) {
    return true
  }
  return false
})
</script>

<style lang="scss" scoped>
.step2 {
  width: 80%;
  height: 50vh;
  background-color: #fff;
  border-radius: 0.5vw;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);

  .contain {
    display: flex;
    flex-direction: column;

    .CampFormItem {
      margin: 5vh auto;
      width: 50%;

      .el-input {
        width: 80%;
      }

      .el-select {
        width: 10vw !important;
      }

    
      .error {
        box-sizing: border-box;
        border: 2px solid #f56c6c;
        border-right: 0px;
        border-radius: 5px 0 0 5px;
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

  .tips {
    display: flex;
    justify-content: center;
    user-select: none;

    div {
      font-size: 1vw;
      margin: auto 1vw;

      span {
        color: #93D600;
        font-family: PingFang SC;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .btn {
    display: flex;
    justify-content: center;
    margin: auto 0 3% 0;
  }
}

.el-select {
  background-color: #fff;
}
</style>