<template>
  <div class="choice" v-if="isEdit == true">
    <div class="title">
      <el-input class="input" placeholder="编辑题目" v-model="ques.title" :disabled="route.query.isEdit == 0"></el-input>
      <img class="icon" src="../../../../../../assets/icon/del.svg" alt="" @click="delQues()" v-show="route.query.isEdit == 1">
      <img class="icon" src="../../../../../../assets/icon/vector.svg" alt="" @click="ques.description = ' '"
        v-if="ques.description.length == 0 && route.query.isEdit == 1">
    </div>
    <div class="title" v-show="ques.description.length > 0">
      <el-input class="desinput" placeholder="编辑题目说明" v-model="ques.description" :disabled="route.query.isEdit == 0"></el-input>
      <img class="icon" src="../../../../../../assets/icon/del.svg" alt="" @click="ques.description = ''">
    </div>
    <div class="options">
      <draggable :disabled="route.query.isEdit == 0" animation="100" v-model="ques.optionList" group="people" @start="drag = true" @end="drag = false"
        item-key="id">
        <template #item="{ element, index }">
          <div class="option">
            <div class="content">
              <img class="icon" src="../../../../../../assets/icon/move.svg" alt="">
              <el-input :disabled="route.query.isEdit == 0" class="input" placeholder="编辑题目" v-model="element.content">
                <template #prefix>
                  <el-radio class="radio" label=" "></el-radio>
                </template>
              </el-input>
              <img class="icon2" src="../../../../../../assets/icon/add.svg" alt="" @click="addOption(index)" v-show="route.query.isEdit == 1">
              <img class="icon2" src="../../../../../../assets/icon/sub.svg" alt="" @click="delOption(index)" v-show="route.query.isEdit == 1">
              <img class="icon2" src="../../../..//../../assets/icon/vector.svg" alt="" @click="showDesc(index)" v-show="route.query.isEdit == 1"
                v-if="element.description.length == 0">
            </div>
            <div class="desc" v-show="element.description.length > 0">
              <el-input class="desinput" placeholder="编辑选项说明" v-model="element.description"></el-input>
              <img class="icon2" src="../../../../../../assets/icon/del.svg" alt="" @click="deldesc(index)">
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
  <div class="noEdit" v-else>
    <div class="title">{{ ques.title }}</div>
    <div class="desc">{{ ques.description }}</div>
    <el-select class="input" placeholder="用户选择">
      <el-option v-for="item in ques.optionList" :key="item" :label="item.content" :value="item.content"></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { ElMessage } from 'element-plus'
import draggable from 'vuedraggable'
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
const addOption = (index) => {
  if (props.ques.optionList.length >= 20) {
    ElMessage.error("选项过多")
    return
  }
  props.ques.optionList.splice(index + 1, 0, {
    content: "",
    description: ""
  })
}
const delOption = (index) => {
  if (props.ques.optionList.length == 1) {
    ElMessage.error("至少保留一个选项")
    return
  }
  props.ques.optionList.splice(index, 1)
}
const deldesc = (index) => {
  props.ques.optionList[index].description = ""
}
const showDesc = (index) => {
  props.ques.optionList[index].description = " "
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


.choice {
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
      user-select: none;
    }

  }
}

.options {
  display: flex;
  flex-direction: column;
  margin-top: 8px;

  .option {
    margin-bottom: 8px;

    .content {
      display: flex;

      .icon {
        margin: auto 10px auto 0;
        width: 16px;
        height: 16px;
        font-size: 16px;
      }
    }

    .desc {
      display: flex;

    }


    .icon2 {
      margin: auto 0 auto 20px;
      width: 16px;
      height: 16px;
      user-select: none;
    }
  }
}

.option-enter-active,
.option-leave-active {
  transition: all 0.5s ease;
}

.option-enter-from,
.option-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>