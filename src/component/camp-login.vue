<template>
  <div>
    <el-form label-position="top" ref="loginForm" label-width="100px">
      <el-form-item label="请输入用户名">
        <el-input style="width: 300px" v-model="loginData.username"></el-input>
      </el-form-item>
      <el-form-item label="请输入密码">
        <el-input style="width: 300px" type="password" v-model="loginData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" style="margin-top: 20px">立即登录</el-button>
        <el-button v-show="showAuditButton" @click="router.push('/audit')">审核端</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'
import { request } from '../api/index'
const props = defineProps({
  loginTo: {
    default: 'user/workbench/basicInfo'
  }
})
const router = useRouter()
const loginData = reactive({
  username: '',
  password: ''
})
const response = ref(null)
const role = ref(null)
const showAuditButton =
  window.location.href.includes('127.0.0.1') || window.location.href.includes('localhost')
const submitForm = () => {
  request
    .post(
      '/api/e9b849a515a84327b424af7ccdbf2949/v1_0_0/user/get',
      {
        username: loginData.username,
        password: encode_ez(loginData.password)
        // password: loginData.password
      },
      { message: true, loading: true }
    )
    .then(res => {
      if (res && res.Code == 200) {
        response.value = res
        useStore().setUserInfo(res.details)
        window.localStorage.setItem(
          window.location.href,
          JSON.stringify({
            u: loginData.username,
            p: loginData.password
          })
        )
      }
    })
    .catch(error => {
      console.error('Request failed:', error);
    })
    .finally(() => {
      if (response.value && response.value?.Code == 200) {
        router.push(response.value.details.role == 'AUDITOR' ? '/audit' : response.value.details.role == 'INSURANCE_COMPANY' ? '/insurence/audit' : props.loginTo)
      }
    })
}
onMounted(() => {
  let preData = window.localStorage.getItem(window.location.href)
  if (preData) {
    preData = JSON.parse(preData)
    loginData.username = preData.u
    loginData.password = preData.p
  }
})

function encode_ez(_) {
  var __ENCRYPTION_KEY =
    '                                 "$_#(=[>+.&\']|~Ts2W5lzy0w!}*-;\\<bad7ouxHOZXvrjCQ9fp1NPnmRB@?^,`{YUASKigtMeGEL8hkIV4cJD36Fq)/%: '
  let res = ''
  for (const v in ((res = ''), _)) res += __ENCRYPTION_KEY[_[v].charCodeAt(0)]
  return res
}
</script>

<style lang="scss" scoped></style>
