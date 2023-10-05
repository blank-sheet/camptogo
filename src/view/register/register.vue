<template>
  <main>
    <div class="mainbox">
      <h5 style="display: none">update-test</h5>
      <img src="../../assets/camptogoLogo.png" alt="" />
      <div style="margin-bottom: 10px">
        <h3>用户信息</h3>
        <ul>
          <li>Mobile:{{ useInfo.mobile }}</li>
          <li>Email:{{ useInfo.email }}</li>
        </ul>
      </div>
      <ElForm>
        <h5>用户名</h5>
        <ElFormItem>
          <ElInput v-model="form.username" />
        </ElFormItem>
        <h5>密码</h5>
        <ElFormItem>
          <ElInput v-model="form.password" type="password" show-password />
        </ElFormItem>
        <ElButton @click="submit" type="success">提交</ElButton>
      </ElForm>
    </div>
  </main>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { request } from '../../api'
import { ElMessage } from 'element-plus'
const useInfo = reactive({
  mobile: '',
  email: ''
})
const form = reactive({
  username: '',
  password: ''
})
const submit = () => {
  if (form.username.length < 6 || form.username.length > 20 || /[^\d\w]/i.test(form.username)) {
    ElMessage('用户名长度6-20位，要求包含大、小写字母和数字中的任一项或任意组合')
    return
  }
  //http://localhost:5173/#/register/==LhUMEK-sW2wlwlsyWl=KLYME-EM8IMVh8g%3CAYLkchgh%7CAhL==
  if (form.password.length < 6 || form.password.length > 20 || !/\w/.test(form.password)) {
    ElMessage('密码长度6-20位,包含字母和数字')
    return
  }

  request
    .post('/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/provider/register', {
      mobile: encode_ez(useInfo.mobile),
      email: useInfo.email,
      username: form.username,
      password: encode_ez(form.password)
    })
    .then(response => {
      console.log(response)
      if (response.Code == 200) {
        ElMessage({
          message: '提交成功',
          type: 'success'
        })
        setTimeout(() => {
          window.location.href = 'https://www.camptogo.com/'
        }, 1000)
      } else if (response.Code == 999) {
        ElMessage('请先到小程序实名认证账号')
      } else {
        ElMessage('不明出错原因，请联系服务商')
      }
    })
}
onMounted(() => {
  const router = useRoute()
  const decodedStr = decode_ez(router.params.encodedStr)
  const [, mobile, , email] = decodedStr.split(/=|&/).filter(Boolean)
  useInfo.mobile = mobile
  useInfo.email = email
})

function decode_ez(_) {
  var __ENCRYPTION_KEY =
    '                                 "$_#(=[>+.&\']|~Ts2W5lzy0w!}*-;\\<bad7ouxHOZXvrjCQ9fp1NPnmRB@?^,`{YUASKigtMeGEL8hkIV4cJD36Fq)/%: '

  let res = ''
  let _dict = null
  for (const v in ((res = ''), (_dict = new Map()), __ENCRYPTION_KEY))
    _dict[__ENCRYPTION_KEY[v]] = v
  for (const v in ((_dict[' '] = 99), _)) res += String.fromCharCode(_dict[_[v]])
  return res
}
function encode_ez(_) {
  var __ENCRYPTION_KEY =
    '                                 "$_#(=[>+.&\']|~Ts2W5lzy0w!}*-;\\<bad7ouxHOZXvrjCQ9fp1NPnmRB@?^,`{YUASKigtMeGEL8hkIV4cJD36Fq)/%: '
  let res = ''
  for (const v in ((res = ''), _)) res += __ENCRYPTION_KEY[_[v].charCodeAt(0)]
  return res
}
</script>

<style lang="scss">
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  .mainbox {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 330px;
    border-radius: 10px;
    padding: 35px;
    margin-bottom: 20px;
    box-shadow: 1px 1px 10px 4px rgb(227, 227, 227);
    img {
      width: 200px;
      height: auto;
      margin-bottom: 20px;
    }
    h3 {
      font-size: 14px;
      color: #666;
      padding: 10px 0 0 0;
      margin-bottom: 5px;
    }
    li {
      list-style: none;
      font-size: 14px;
      font-weight: 400;
      color: #999;
      padding: 6px 0px 0px 0px;
    }
    div {
      font-size: 20px;
      font-weight: bold;
    }
    h5 {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      margin: 10px 0 0 0;
    }
    .el-input__wrapper {
      width: 276px;
    }
    .el-form-item {
      padding: 0;
      margin: 0;
      .el-form-item__content {
        padding: 10px 0 0 0;
      }
    }
    .el-button {
      width: 297px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 30px 0 0 0;
      background-color: #93d900;
      font-size: 14px;
    }
  }
}
</style>
