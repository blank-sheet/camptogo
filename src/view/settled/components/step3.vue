<template>
  <div class="step3">
    <div class="title">{{ route.params.type === 'personal' ? '个人入驻' : '机构入驻' }}</div>
    <div class="contain">
      <el-form ref="formRef" :model="userData">
        <CampFormItem class="CampFormItem" label="注册邮箱" prop="email">
          <el-input placeholder="请设置公司负责人邮箱为登录名" v-model="userData.email">
          </el-input>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="邮箱验证码" prop="captcha">
          <el-input placeholder="请输入邮箱验证码" v-model="userData.captcha">
            <template #suffix>
              <div @click="getVerifyCode" style="cursor: pointer;">{{ showTime || '发送' }}</div>
            </template>
          </el-input>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="设置密码" prop="password">
          <el-input placeholder="请设置至少12位字符 (包含英文大小写、字符)" type="password" show-password
            v-model="userData.password"></el-input>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="校对密码" prop="password2">
          <el-input placeholder="请确认自己的密码" type="password" show-password v-model="userData.password2"></el-input>
        </CampFormItem>
      </el-form>
    </div>
    <div class="tips">
      <el-checkbox></el-checkbox>
      <div>我已阅读并同意<span>《营探用户协议》</span><span>《营探隐私政策》</span></div>
    </div>
    <div class="btn">
      <el-button type="success" @click="handlerToStep4()">注册帐号并入驻</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CampFormItem from '../../../component/camp-form-item.vue'
import { settledApi } from "../../../api/modules/settled/settled"
import { request } from '../../../api/index.js'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const handlerToStep4 = () => {
  const valid = validateForm(formRef.value)
  if (valid) {

  } else {
    router.push(`/settled/step4/${route.params.type}`)
  }

}
onMounted(() => {
})
const formRef = ref(null)
const select = ref(1)
const userData = ref({
  email: null,
  captcha: null,
  password: null,
  password2: null
})


const showTimer = ref(null)
const showTime = ref('发送')
const changeShowTIme = () => {
  if (showTimer.value) {
    clearTimeout(showTimer.value)
  }
  showTimer.value = setTimeout(() => {
    if (showTime.value == 0) {
      showTime.value = '发送'
      clearTimeout(showTimer.value)
    }
    showTime.value -= 1
    changeShowTIme()
  }, 1000)
}

const preTime = ref(0)
const getVerifyCode = async () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (userData.value.email) {
    if (!emailRegex.test(userData.value.email)) {
      ElMessage.error("请输入正确邮箱")
      return
    }
  } else {
    ElMessage.error("请输入邮箱")
    return
  }
  const now = Date.now()
  if (now - preTime.value >= 60000) {
    preTime.value = now
    showTime.value = 60
    changeShowTIme()
    await request.post(settledApi.getEmailCaptchaAPI, {
      email: userData.value.email
    }).then(res => {
      console.log(res)
    })
  } else {
    ElMessage.warning("请勿频繁发送请求")
    return
  }
}


const validateForm = (formEl) =>
  formEl.validate((valid) => {
    if (document.querySelector('.is-error')) {
      document.querySelector('.is-error').scrollIntoView()
    }
    return valid
  })
</script>

<style lang="scss" scoped>
.step3 {
  width: 80%;
  height: 80vh;
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
    margin: auto 0;

    .CampFormItem {
      margin: 5vh auto;
      width: 50%;

      .el-input {
        width: 80%;
      }

      .el-select {
        width: 10vw !important;
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
</style>