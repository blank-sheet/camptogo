<template>
  <div class="ques">
    <component :ques="props.ques" :isEdit="isEdit" @click="isEdit = true" :is="getComponentName" :theIndex="theIndex">
    </component>
    <div class="oprations" v-if="isEdit == true">
      <div class="text" @click="addQues()">此题后插入新题</div>
      <el-select :disabled="route.query.isEdit == 0" class="select" v-model="ques.isRequired">
        <el-option :value="1" label="必答"></el-option>
        <el-option :value="0" label="非必答"></el-option>
      </el-select>
      <el-select :disabled="route.query.isEdit == 0" class="select" style="marginLeft:0" v-model="ques.questionType">
        <el-option value="SINGLE_CHOICE" label="单选"></el-option>
        <el-option value="MULTIPLE_CHOICE" label="多选"></el-option>
        <el-option value="FILL_IN_THE_BLANKS" label="填空"></el-option>
        <el-option value="DROPDOWN_SINGLE_CHOICE" label="下拉框单选"></el-option>
        <el-option value="PICTURE" label="上传图片"></el-option>
      </el-select>
      <el-button class="btn" type="success" @click="isEdit = false">{{ route.query.isEdit == 1 ? '完成编辑' : '完成查看'
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import choice from "./quesTemps/choice.vue"
import fill from "./quesTemps/fill.vue"
import selection from "./quesTemps/selection.vue"
import upLoad from "./quesTemps/upload.vue"
import { ref, computed, inject } from 'vue'
import { useRoute } from "vue-router"
const route = useRoute()
const props = defineProps({
  ques: Object,
  theIndex: {
    type: Number,
    default: 0
  }
})
const isEdit = ref(false)
const getComponentName = computed(() => {
  if (props.ques.questionType == 'SINGLE_CHOICE' || props.ques.questionType == 'MULTIPLE_CHOICE') {
    return choice
  } else if (props.ques.questionType == 'FILL_IN_THE_BLANKS') {
    return fill
  } else if (props.ques.questionType == 'DROPDOWN_SINGLE_CHOICE') {
    return selection
  } else {
    return upLoad
  }
})


const addFun = inject('addQues')
const addQues = () => {
  if (route.query.isEdit == 1) {
    addFun(props.theIndex)
  }
  return
}

defineExpose({
  isEdit
})
</script>

<style lang="scss" scoped>
.ques {
  background-color: rgb(250, 250, 250);
  border-bottom: 1px dashed rgba(0, 0, 0, 0.15);
}

.oprations {
  display: flex;
  margin-top: 24px;
  padding-bottom: 20px;

  .text {
    /* 此题后插入新题 */
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    /* identical to box height, or 157% */
    /* 品牌色/标准 */
    color: #93D600;
    margin: auto 5px;
  }

  .select {
    width: 120px;
    height: 32px;
    margin: auto 8px auto auto;
  }

  .btn {
    margin: auto 8px
  }

  .btn {}
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