<template>
  <div class="fill" v-if="isEdit == true">
    <div class="title">
      <el-input autosize type="textarea" :disabled="route.query.isEdit == 0" class="input" placeholder="编辑题目"
        v-model="ques.title"></el-input>
      <el-tooltip content="删除该题目" placement="top">
        <img class="icon" src="../../../../../../assets/icon/del.svg" alt="" @click="delQues()"
          v-show="route.query.isEdit == 1">
      </el-tooltip>
      <el-tooltip content="添加题目描述" placement="top" v-if="route.query.isEdit == 1 && ques.description.length == 0">
        <img class="icon" src="../../../../../../assets/icon/vector.svg" alt="" @click="ques.description = ' '">
      </el-tooltip>
    </div>
    <div class="title" v-show="ques.description.length > 0">
      <el-input :disabled="route.query.isEdit == 0" class="desinput" placeholder="编辑题目说明"
        v-model="ques.description"></el-input>
      <el-tooltip content="删除题目描述" placement="top">
        <img class="icon" src="../../../../../../assets/icon/del.svg" alt="" @click="ques.description = ''">
      </el-tooltip>
    </div>
  </div>
  <div class="noEdit" v-else>
    <div class="title">{{ ques.title }}</div>
    <div class="desc">{{ ques.description }}</div>
    <el-input type="textarea"  :rows="2" class="input" disabled placeholder="用户填写"></el-input>
  </div>
</template>

<script setup>
import { inject } from 'vue'
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
  padding: 2vh 0;
  background-color: #fff;
  cursor: pointer;

  .title {
    font-family: 'PingFang SC';
    font-style: normal;
    font-size: 1vw;
    line-height: 1.6;
    color: #262626;
    width: 95%;
    word-wrap: break-word;
  }

  .desc {
    /* 这是题目说明 */
    font-family: 'PingFang SC';
    font-style: normal;
    font-size: 0.8vw;
    line-height: 1.6;
    /* 文字/常规 */
    color: #595959;
    width: 90%;
    word-wrap: break-word;
    margin: 1vh 0;
  }
}

.input {
  width: 65%;
}

.fill {
  padding: 1vw;

  .desinput {
    margin: 0.5% 0 0 0;
    width: 65%;
  }

  .title {
    display: flex;
    margin: 0 auto 0 0;

    .icon {
      margin: auto 0 auto 1.2vw;
      width: 1vw;
      height: 1vw;
      font-size: 1vw;
      cursor: pointer;

    }

  }
}
</style>