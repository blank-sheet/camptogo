<template>
  <div class="regform">
    <el-form ref="formRef" label-width="400px">
      <product-form title="商品信息">
        <template #form>
          <div class="fullname"><span>商品名称：</span>{{ route.query.name }}</div>
        </template>
      </product-form>
      <product-form title="基本信息">
        <template #form>
          <CampFormItem label="姓名" :labelTop="true">
            <el-input class="input" disabled placeholder="请输入"></el-input>
          </CampFormItem>
          <CampFormItem label="性别" :labelTop="true">
            <el-radio-group disabled>
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </CampFormItem>
          <CampFormItem label="国家" :labelTop="true">
            <el-input class="input" disabled placeholder="请输入"></el-input>
          </CampFormItem>
          <CampFormItem label="家乡/地区" :labelTop="true">
            <el-input class="input" disabled placeholder="请输入"></el-input>
          </CampFormItem>
          <CampFormItem label="出生年月日" :labelTop="true">
            <CampDatePicker disabled /> <span class="desc">x岁</span>
          </CampFormItem>
          <CampFormItem label="证件照" :labelTop="true">
            <CampUpload disabled />
          </CampFormItem>
          <CampFormItem label="电话号码" :labelTop="true">
            <el-input class="input" disabled placeholder="请输入"></el-input>
          </CampFormItem>
        </template>
      </product-form>
      <product-form title="紧急联系人信息">
        <template #form>
          <CampFormItem label="紧急联系人姓名" :labelTop="true">
            <el-input class="input" disabled placeholder="请输入"></el-input>
          </CampFormItem>
          <CampFormItem label="紧急联系人电话号码" :labelTop="true">
            <el-input class="input" disabled placeholder="请输入"></el-input>
          </CampFormItem>
          <CampFormItem label="与紧急联系人的关系" :labelTop="true">
            <el-input class="input" disabled placeholder="请输入"></el-input>
          </CampFormItem>
        </template>
      </product-form>
      <product-form title="基本身体情况">
        <template #form>
          <CampFormItem label="身高/cm" :labelTop="true">
            <el-input class="input" disabled placeholder="请输入"></el-input>
          </CampFormItem>
          <CampFormItem label="体重/kg" :labelTop="true">
            <el-input class="input" disabled placeholder="请输入"></el-input>
          </CampFormItem>
          <CampFormItem label="鞋码/EUR" :labelTop="true">
            <el-input class="input" disabled placeholder="请输入"></el-input>
          </CampFormItem>
          <CampFormItem label="血型" :labelTop="true">
            <el-input class="input" disabled placeholder="请输入"></el-input>
          </CampFormItem>
        </template>
      </product-form>
      <product-form title="基本健康状况">
        <template #form>
          <CampFormItem label="过敏反应" :labelTop="true">
            <el-radio-group disabled>
              <el-radio :label="0">有</el-radio>
              <el-radio :label="1">无</el-radio>
            </el-radio-group>
          </CampFormItem>
          <CampFormItem label="请列出过敏源" :labelTop="true">
            <el-input type="textarea" class="input" disabled placeholder="请输入"></el-input>
          </CampFormItem>
          <CampFormItem label="饮食需求" :labelTop="true">
            <el-radio-group disabled>
              <el-radio :label="0">有</el-radio>
              <el-radio :label="1">无</el-radio>
            </el-radio-group>
          </CampFormItem>
          <CampFormItem label="请列出饮食需求" :labelTop="true">
            <el-input type="textarea" class="input" disabled placeholder="请输入"></el-input>
          </CampFormItem>
          <CampFormItem label="健康状况" :labelTop="true">
            <el-radio-group disabled>
              <el-radio :label="0">健康</el-radio>
              <el-radio :label="1">一般</el-radio>
              <el-radio :label="1">较差</el-radio>
            </el-radio-group>
          </CampFormItem>
          <CampFormItem label="请填写健康状况说明" :labelTop="true">
            <el-input type="textarea" class="input" disabled placeholder="请输入"></el-input>
          </CampFormItem>
          <CampFormItem label="是否需要特殊照顾" :labelTop="true">
            <el-radio-group disabled>
              <el-radio :label="0">需要</el-radio>
              <el-radio :label="1">不需要</el-radio>
            </el-radio-group>
          </CampFormItem>
          <CampFormItem label="请填写需要特殊照顾的原因" :labelTop="true">
            <el-input type="textarea" class="input" disabled placeholder="请输入"></el-input>
          </CampFormItem>
        </template>
      </product-form>
      <product-form title="自定义信息">
        <template #form>
          <quesTion v-for="(item, index) in questionList" :key="item" :ques="item" :theIndex="index" :id="index"
            ref="childDoms">
          </quesTion>
        </template>
      </product-form>
      <div class="savebtn">
        <el-button class="button" type="success" @click="createReForm()">完成编辑</el-button>
      </div>
    </el-form>
    <el-tooltip class="box-item" content="自定义更多题目" placement="top">
      <div class="btn" @click="addQues(questionList.length)">
        <img class="icon icon1" src="../../../../assets/icon/magic_2_line.svg" alt="">
        <img class="icon icon2" src="../../../../assets/icon/Vector2.svg" alt="">
        <img class="icon icon3" src="../../../../assets/icon/Vector3.svg" alt="">
      </div>
    </el-tooltip>


  </div>
</template>

<script setup>
import ProductForm from './components/product-form.vue'
import CampFormItem from '../../../../component/camp-form-item.vue'
import CampDatePicker from '../../../../component/camp-date-picker.vue'
import CampUpload from '../../../../component/camp-upload.vue'
import quesTion from "./components/quesTion.vue"
import { request } from '../../../../api'
import { userApi } from '../../../../api/modules/user/user'
import { ref, provide, onMounted } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const route = useRoute()
const router = useRouter()
const childDoms = ref([])
onMounted(() => {
  getRegForm()
})
const questionList = ref([])
const delQues = (index) => {
  questionList.value.splice(index, 1)
}
provide('delQues', delQues)
const addQues = (index) => {
  questionList.value.splice(index + 1, 0, {
    title: "",
    isRequired: 1,
    description: "",
    questionType: "SINGLE_CHOICE",
    optionList: [
      {
        content: "",
        description: ""
      },
      {
        content: "",
        description: ""
      }
    ]
  })
}
provide('addQues', addQues)
//获取报名表
const getRegForm = async () => {
  await request.post(userApi.getRegistrationFormAPI, {
    productId: route.params.id
  }).then(res => {
    questionList.value = res?.details?.questionList || []
  })
}
//创建报名表
const createReForm = async () => {
  for (let i = 0; i < childDoms.value.length; i++) {
    if (childDoms.value[i].isEdit) {
      ElMessage.error('题目未保存')
      const scroll = document.getElementById(i)
      scroll.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
  }
  if (questionList.value.length == 0) {
    ElMessage.error("请填写相关问题")
    return
  }
  for (let i = 0; i < questionList.value.length; i++) {
    const element = questionList.value[i]
    if (element.title.length == 0) {
      ElMessage.error('题目不能为空')
      const scroll = document.getElementById(i)
      scroll.scrollIntoView({ behavior: "smooth", block: "center" })
      const childs = scroll.querySelector('.noEdit')
      childs.click()
      return
    }
    if (element.optionList.length == 0) {
      const scroll = document.getElementById(i)
      scroll.scrollIntoView({ behavior: "smooth", block: "center" })
      const childs = scroll.querySelector('.noEdit')
      childs.click()
      return
    }
    if (element.questionType == 'SINGLE_CHOICE' || element.questionType == 'MULTIPLE_CHOICE' || element.questionType == 'DROPDOWN_SINGLE_CHOICE') {
      for (let j = 0; j < element.optionList.length; j++) {
        const ele = element.optionList[j]
        if (ele.content.length == 0) {
          ElMessage.error('选项内容不能为空')
          const scroll = document.getElementById(i)
          scroll.scrollIntoView({ behavior: "smooth", block: "center" })
          const childs = scroll.querySelector('.noEdit')
          childs.click()
          return
        }
      }
    }

  }
  await request.post(userApi.createRegistrationFormAPI, {
    productId: Number(route.params.id),
    questionList: questionList.value
  }).then(res => {
    ElMessage.success(res.msg)
    router.push(`/user/workbench/product/${route.params.id}`)
  })
}


</script>

<style lang="scss" scoped>
.fullname {
  display: flex;
  padding: 20px 0 10px 0;
}

.savebtn {
  display: flex;
  justify-content: center;
  margin: 30px auto;

  .button {
    width: 300px;
    height: 32px;
  }
}

.btn {
  user-select: none;
  width: 40px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  position: fixed;
  left: 93%;
  bottom: 70px;

  .icon {
    width: 18px;
    height: 18px;
    margin: auto;
    transition: 0.2s;
  }

  .icon2 {
    display: none;
  }

  .icon3 {
    display: none;
  }

  &:hover {
    .icon1 {
      display: none;
    }

    .icon2 {
      display: inline-block;
    }

    .icon3 {
      display: none;
    }
  }

  &:active {
    background-color: #F5FFC4;

    .icon1 {
      display: none;
    }

    .icon2 {
      display: none;
    }

    .icon3 {
      display: inline-block;
    }
  }
}

.regform {
  width: 100%;

  .desc {
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
  }

  .el-form {
    width: 80%;

    .product-form {
      width: 100%;

      .input {
        width: 64%;
      }

      .el-radio-group {
        display: flex;
        flex-direction: column;

        .el-radio {
          margin: 0;
        }
      }
    }
  }
}
</style>