<template>
  <div class="upload" v-if="isEdit == true">
    <div class="title">
      <el-input class="input" placeholder="编辑题目" v-model="ques.title" :disabled="route.query.isEdit == 0"></el-input>
      <el-tooltip content="删除该题目" placement="top">
        <img class="icon" src="../../../../../../assets/icon/del.svg" alt="" @click="delQues()"
          v-show="route.query.isEdit == 1">
      </el-tooltip>
      <el-tooltip content="添加题目描述" placement="top">
        <img class="icon" src="../../../../../../assets/icon/vector.svg" alt="" @click="ques.description = ' '"
          v-show="route.query.isEdit == 1" v-if="ques.description.length == 0">
      </el-tooltip>
    </div>
    <div class="title" v-show="ques.description.length > 0">
      <el-input class="desinput" placeholder="编辑题目说明" v-model="ques.description"
        :disabled="route.query.isEdit == 0"></el-input>
      <el-tooltip content="删除题目描述" placement="top" v-show="route.query.isEdit == 1">
        <img class="icon" src="../../../../../../assets/icon/del.svg" alt="" @click="ques.description = ''">
      </el-tooltip>
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
import { useRoute } from 'vue-router'

const route = useRoute()
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
  padding: 24px 0;
  background-color: #fff;


  .title {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #262626;
    width: 95%;
    word-wrap: break-word;
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
  width: 65%;
}

.upload {
  padding: 1vw;

  .desinput {
    margin: 0.5% 0 0 0;
    width: 65%;
  }

  .title {
    display: flex;

    .icon {
      margin: auto 0 auto 1.2vw;
      width: 1vw;
      height: 1vw;
      font-size: 1vw;
    }

  }
}

.selects {
  margin-top: 3vh;
  display: flex;
  justify-content: right;

  .select {
    width: 12%;
    margin: auto 8px;
  }
}
</style>