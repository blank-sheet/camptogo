<template>
  <div class="upload" v-if="isEdit == true">
    <div class="title">
      <el-input class="input" placeholder="编辑题目" v-model="ques.title"></el-input>
      <img class="icon" src="../../../../../../assets/icon/del.svg" alt="" @click="delQues()">
      <img class="icon" src="../../../../../../assets/icon/vector.svg" alt="" @click="ques.description = ' '"
        v-if="ques.description.length == 0">
    </div>
    <div class="title" v-show="ques.description.length > 0">
      <el-input class="desinput" placeholder="编辑题目说明" v-model="ques.description"></el-input>
      <img class="icon" src="../../../../../../assets/icon/del.svg" alt="" @click="ques.description = ''">
    </div>
    <div class="selects" v-if="ques.questionType == 'MULTIPLE_CHOICE'">
      <el-select class="select" placeholder="最少选"></el-select>
      <el-select class="select" placeholder="最多选"></el-select>
    </div>
  </div>
  <div class="noEdit" v-else>
    <div class="title">{{ ques.title }}</div>
    <div class="desc">{{ ques.description }}</div>
    <CampUpload :disabled="true"></CampUpload>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import CampUpload from '../../../../../../component/camp-upload.vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  ques: {
    type: Object
  },
  isEdit: {
    type: Boolean,
    default: true
  },
  theIndex: {
    type: Number,
    default: 0
  }
})
const delFun = inject('delQues')
const delQues = () => {
  delFun(props.theIndex)
}

</script>

<style lang="scss" scoped>
.noEdit {
  padding: 24px;
  background-color: #fff;

  .title {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #262626;
  }

  .desc {
    /* 这是题目说明 */
    height: 24px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
    /* 文字/常规 */
    color: #595959;

  }
}

.input {
  width: 650px;
  height: 32px;
}

.upload {
  padding: 24px;

  .desinput {
    margin: 8px 0 0 0;
    width: 650px;
    height: 32px;
  }

  .title {
    display: flex;

    .icon {
      margin: auto 0 auto 20px;
      width: 16px;
      height: 16px;
      font-size: 16px;
    }

  }
}

.selects {
  margin-top: 24px;
  display: flex;
  justify-content: right;

  .select {
    width: 120px;
    height: 32px;
    margin: auto 8px;
  }
}

</style>