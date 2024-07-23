<template>
  <!-- 查看报名表抽屉 -->
  <el-drawer v-model="show" title="查看退款信息" :with-header="false" size="40%">
    <h4>这是一个商品名称<div>{{}}</div><el-divider /></h4>
    <div>
      <el-form :model="formData" label-width="160px" readonly>
        <el-row v-for="(question, index) in info" :key="index">
          <el-col :span="24">
            <el-form-item :label="question.title">
              <template v-if="question.questionType === 'FILL_IN_THE_BLANKS'">
                <el-input v-model="details[index].answers" disabled></el-input>
              </template>
              <template v-else-if="question.questionType === 'SINGLE_CHOICE'">
                <el-radio-group v-model="details[index].optionIds[0]" disabled>
                  <el-radio v-for="option in question.optionList" :key="option.applicationFormOptionId" :label="option.applicationFormOptionId" :value="option.applicationFormOptionId">{{ option.content }}</el-radio>
                </el-radio-group>
              </template>
              <template v-else-if="question.questionType === 'MULTIPLE_CHOICE'">
                <el-checkbox-group v-model="details[index].optionIds" disabled>
                  <el-checkbox :value="option.applicationFormOptionId" v-for="option in question.optionList" :label="option.applicationFormOptionId" :key="option.applicationFormOptionId">{{ option.content }}</el-checkbox>
                </el-checkbox-group>
              </template>
              <template v-else-if="question.questionType === 'DROPDOWN_SINGLE_CHOICE'">
                <el-select v-model="details[index].optionIds[0]" style="width: 240px" disabled>
                  <el-option v-for="option in question.optionList" :key="option.applicationFormOptionId" :label="option.content" :value="option.applicationFormOptionId"/>
                </el-select>
              </template>
              <template v-else-if="question.questionType === 'PICTURE'">
                <el-image
                  v-for="(item, index) in details[index].answers.split(',')"
                  :key="index"
                  style="width: 100px; height: 100px"
                  :src="baseURL + item"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="[baseURL + details[index].answers]"
                  :initial-index="4"
                  fit="cover"
                />
              </template>
              <template v-else-if="question.questionType === 'MULTI_LINE_TEXT'">
                <el-input type="textarea" v-model="details[index].answers" disabled></el-input>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { request } from '../../../../../api'
import { userApi } from '../../../../../api/modules/user/user'
const show = ref(false)
const baseURL = "https://www.camptogo.com"
const details = ref([])
const info = ref([
  {
    applicationFormQuestionId: 252,
    title: "姓名",
    applicationFormId: 0,
    isRequired: 1,
    isFixed: 1,
    minCount: null,
    maxCount: null,
    description: "请填写您的姓名",
    questionType: "FILL_IN_THE_BLANKS",
    optionList: []
  },
  {
    applicationFormQuestionId: 253,
    title: "性别",
    applicationFormId: 0,
    isRequired: 1,
    isFixed: 1,
    minCount: null,
    maxCount: null,
    description: "请填写您的性别",
    questionType: "SINGLE_CHOICE",
    optionList: [
      {
        applicationFormId: 0,
        applicationFormQuestionId: 253,
        content: "男",
        description: "男性",
        associatedQuestionList: null,
        applicationFormOptionId: 497
      },
      {
        applicationFormId: 0,
        applicationFormQuestionId: 253,
        content: "女",
        description: "女性",
        associatedQuestionList: null,
        applicationFormOptionId: 498
      }
    ]
  },
  {
    applicationFormQuestionId: 254,
    title: "国家",
    applicationFormId: 0,
    isRequired: 0,
    isFixed: 1,
    minCount: null,
    maxCount: null,
    description: "请填写您所属的所属国家",
    questionType: "FILL_IN_THE_BLANKS",
    optionList: []
  },
  {
    applicationFormQuestionId: 255,
    title: "家乡/地区",
    applicationFormId: 0,
    isRequired: 0,
    isFixed: 1,
      minCount: null,
      maxCount: null,
      description: "请填写您所属的家乡或地区",
      questionType: "FILL_IN_THE_BLANKS",
      optionList: []
    },
    {
      applicationFormQuestionId: 256,
      title: "出生年月日",
      applicationFormId: 0,
      isRequired: 0,
      isFixed: 1,
      minCount: null,
      maxCount: null,
      description: "请填写您的出生年月日",
      questionType: "FILL_IN_THE_BLANKS",
      optionList: []
    },
    {
      applicationFormQuestionId: 257,
      title: "上传证件照",
      applicationFormId: 0,
      isRequired: 0,
      isFixed: 1,
      minCount: null,
      maxCount: null,
      description: "请上传您的身份证件文件",
      questionType: "PICTURE",
      optionList: []
    },
    {
      applicationFormQuestionId: 258,
      title: "电话号码",
      applicationFormId: 0,
      isRequired: 1,
      isFixed: 1,
      minCount: null,
      maxCount: null,
      description: "请填写您的联系电话",
      questionType: "FILL_IN_THE_BLANKS",
      optionList: []
    },
    {
      applicationFormQuestionId: 259,
      title: "紧急联系人姓名",
      applicationFormId: 0,
      isRequired: 1,
      isFixed: 1,
      minCount: null,
      maxCount: null,
      description: "请填写您的紧急联系人姓名",
      questionType: "FILL_IN_THE_BLANKS",
      optionList: []
    },
    {
      applicationFormQuestionId: 260,
      title: "紧急联系人电话号码",
      applicationFormId: 0,
      isRequired: 1,
      isFixed: 1,
      minCount: null,
      maxCount: null,
      description: "请填写您的紧急联系人电话号码",
      questionType: "FILL_IN_THE_BLANKS",
      optionList: []
    },
    {
      applicationFormQuestionId: 262,
      title: "身高/cm",
      applicationFormId: 0,
      isRequired: 0,
      isFixed: 1,
      minCount: null,
      maxCount: null,
      description: "请填写您的身高",
      questionType: "FILL_IN_THE_BLANKS",
      optionList: []
    },
    {
      applicationFormQuestionId: 263,
      title: "体重/kg",
      applicationFormId: 0,
      isRequired: 0,
      isFixed: 1,
      minCount: null,
      maxCount: null,
      description: "请填写您的体重",
      questionType: "FILL_IN_THE_BLANKS",
      optionList: []
    },
    {
      applicationFormQuestionId: 264,
      title: "鞋码/EUR",
      applicationFormId: 0,
      isRequired: 0,
      isFixed: 1,
      minCount: null,
      maxCount: null,
      description: "请填写您的鞋码",
      questionType: "FILL_IN_THE_BLANKS",
      optionList: []
    },
    {
      applicationFormQuestionId: 265,
      title: "过敏反应",
      applicationFormId: 0,
      isRequired: 1,
      isFixed: 1,
      minCount: null,
      maxCount: null,
      description: "请选择您是否有过敏反应",
      questionType: "SINGLE_CHOICE",
      optionList: [
        {
          applicationFormId: 0,
          applicationFormQuestionId: 265,
          content: "有",
          description: "存在过敏反应",
          associatedQuestionList: null,
          applicationFormOptionId: 499
        },
        {
          applicationFormId: 0,
          applicationFormQuestionId: 265,
          content: "无",
          description: "不存在过敏反应",
          associatedQuestionList: null,
          applicationFormOptionId: 500
        }
      ]
    },
    {
      applicationFormQuestionId: 266,
      title: "请列出过敏源",
      applicationFormId: 0,
      isRequired: 0,
      isFixed: 1,
      minCount: null,
      maxCount: null,
      description: "请填写您的过敏源",
      questionType: "MULTI_LINE_TEXT",
      optionList: []
    },
    {
      applicationFormQuestionId: 269,
      title: "健康状况",
      applicationFormId: 0,
      isRequired: 0,
      isFixed: 1,
      minCount: null,
      maxCount: null,
      description: "请选择您的健康状况",
      questionType: "SINGLE_CHOICE",
      optionList: [
        {
          applicationFormId: 0,
          applicationFormQuestionId: 269,
          content: "健康",
          description: "当前健康状况健康",
          associatedQuestionList: null,
          applicationFormOptionId: 503
        },
        {
          applicationFormId: 0,
          applicationFormQuestionId: 269,
          content: "一般",
          description: "当前健康状况一般",
          associatedQuestionList: null,
          applicationFormOptionId: 504
        },
        {
          applicationFormId: 0,
          applicationFormQuestionId: 269,
          content: "较差",
          description: "当前健康状况较差",
          associatedQuestionList: null,
          applicationFormOptionId: 505
        }
      ]
    },
    {
      applicationFormQuestionId: 270,
      title: "请填写健康状况说明",
      applicationFormId: 0,
      isRequired: 0,
      isFixed: 1,
      minCount: null,
      maxCount: null,
      description: "请填写您的健康状况说明",
      questionType: "MULTI_LINE_TEXT",
      optionList: []
    },
    {
      applicationFormQuestionId: 271,
      title: "是否需要特殊照顾",
      applicationFormId: 0,
      isRequired: 1,
      isFixed: 1,
      minCount: null,
      maxCount: null,
      description: "请选择您是否需要特殊照顾",
      questionType: "SINGLE_CHOICE",
      optionList: [
        {
          applicationFormId: 0,
          applicationFormQuestionId: 271,
          content: "需要",
          description: "需要特殊照顾",
          associatedQuestionList: null,
          applicationFormOptionId: 506
        },
        {
          applicationFormId: 0,
          applicationFormQuestionId: 271,
          content: "不需要",
          description: "不需要特殊照顾",
          associatedQuestionList: null,
          applicationFormOptionId: 507
        }
      ]
    },
  {
    applicationFormQuestionId: 272,
    title: "请填写需要特殊照顾的原因",
    applicationFormId: 0,
    isRequired: 0,
    isFixed: 1,
    minCount: null,
    maxCount: null,
    description: "请填写您需要特殊照顾的原因",
    questionType: "MULTI_LINE_TEXT",
    optionList: []
  }
])

defineExpose({
  getInfo: (id = 0, userId = 0, productId = 0) => {
    Promise.all([
      request.post(userApi.getRegistrationFormAPI, { productId: productId }),
      request.post(userApi.getApplication, { orderId: id, userId: userId })
    ]).then(responses => {
      const registrationFormResponse = responses[0];
      const applicationResponse = responses[1];

      info.value = (registrationFormResponse as any).details?.questionList;
      details.value = Object.values((applicationResponse as any).details);

      show.value = true;
    }).catch(error => {
      console.error(error);
    });
  }
})
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  margin: 20px 0;

  img {
    height: 20px;
    width: 20px;
    margin-right: 10px;

  }

  span {
    color: #00000073;
    height: 20px;
    line-height: 20px;
    size: 14px;
    font-weight: 400;
  }
}

.item {
  color: rgba(38, 38, 38, 1);
  font-weight: 400;
  margin-left: 30px;
  padding: 10px 0;
  display: flex;
  width: 90%;

  span {
    width: 20%;
    word-wrap: break-word;
    color: rgba(0, 0, 0, 0.65);
  }

  div {
    width: 80%;
    white-space: pre-wrap;
    word-break: break-all;
    img{
      width: 60%;
      height: 20vh;
      border-radius: 10px;
    }
  }

}</style>
