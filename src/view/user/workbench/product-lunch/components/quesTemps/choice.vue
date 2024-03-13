<template>
  <div class="choice" v-if="isEdit == true">
    <div class="title">
      <el-input autosize type="textarea" class="input" placeholder="编辑题目" v-model="ques.title"
        :disabled="route.query.isEdit == 0"></el-input>
      <el-tooltip content="删除该题目" placement="top">
        <img class="icon" src="../../../../../../assets/icon/del.svg" v-show="route.query.isEdit == 1" alt=""
          @click="delQues()">
      </el-tooltip>
      <el-tooltip content="添加题目描述" placement="top" v-if="ques.description.length == 0 && route.query.isEdit == 1">
        <img class="icon" src="../../../../../../assets/icon/vector.svg" alt="" @click="ques.description = ' '">
      </el-tooltip>
    </div>
    <div class="title" v-show="ques.description.length > 0">
      <el-input class="desinput" placeholder="编辑题目说明" v-model="ques.description"
        :disabled="route.query.isEdit == 0"></el-input>
      <el-tooltip content="删除题目描述" placement="top">
        <img class="icon" src="../../../../../../assets/icon/del.svg" alt="" @click="ques.description = ''">
      </el-tooltip>
    </div>
    <div class="options">
      <draggable :disabled="route.query.isEdit == 0" animation="100" v-model="ques.optionList" group="people"
        @start="drag = true" @end="drag = false" item-key="id">
        <template #item="{ element, index }">
          <div class="option">
            <div class="content">
              <img class="icon" src="../../../../../../assets/icon/move.svg" alt="">
              <el-input class="input" placeholder="编辑题目" v-model="element.content" :disabled="route.query.isEdit == 0">
                <template #prefix>
                  <el-radio class="radio" label=" "></el-radio>
                </template>
              </el-input>
              <el-tooltip content="插入选项" placement="top" v-show="route.query.isEdit == 1">
                <img class="icon2" src="../../../../../../assets/icon/add.svg" alt="" @click="addOption(index)">
              </el-tooltip>
              <el-tooltip content="删除该选项" placement="top" v-show="route.query.isEdit == 1">
                <img class="icon2" src="../../../../../../assets/icon/sub.svg" alt="" @click="delOption(index)">
              </el-tooltip>
              <el-tooltip content="添加选项描述" placement="top"
                v-if="route.query.isEdit == 1 && element.description.length == 0">
                <img class="icon2" src="../../../..//../../assets/icon/vector.svg" alt="" @click="showDesc(index)">
              </el-tooltip>
            </div>
            <div class="desc" v-show="element.description.length > 0">
              <el-input :disabled="route.query.isEdit == 0" class="desinput" placeholder="编辑选项说明"
                v-model="element.description"></el-input>
              <el-tooltip content="删除选项描述" placement="top">
                <img class="icon2" src="../../../../../../assets/icon/del.svg" alt="" @click="deldesc(index)">
              </el-tooltip>
            </div>
          </div>
        </template>
      </draggable>
    </div>
    <div class="selects" v-if="ques.questionType == 'MULTIPLE_CHOICE'">
      <el-select class="select" v-model="ques.minCount" placeholder="最少选">
        <el-option v-for="(item, index) in ques.optionList" :value="index + 1" :label="index + 1 + '项'"
          v-show="index + 1 <= ques.optionList.length"></el-option>
      </el-select>
      <el-select class="select" v-model="ques.maxCount" placeholder="最多选">
        <el-option v-for="(item, index) in ques.optionList" :value="index + 1" :label="index + 1 + '项'"
          v-show="index + 1 >= ques.minCount && index + 1 <= ques.optionList.length"></el-option>
      </el-select>
    </div>
  </div>
  <div class="noEdit" v-else @click="isEdit = true">
    <div class="title">{{ ques.title || "请输入题目" }}</div>
    <div class="desc">{{ ques.description }}</div>
    <div class="items">
      <div class="item" v-for="item in ques.optionList" :key="item" v-if="ques.optionList.length > 0">
        <div class="i-contain">
          <el-radio-group v-model="radio2"><el-radio :value="item.content"></el-radio>
          </el-radio-group>
          {{ item.content || '请输入选项' }}
        </div>
        <div class="text">{{ item.description || '' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'
import { ElMessage } from 'element-plus'
import draggable from 'vuedraggable'
import { useRoute } from 'vue-router'
const radio2 = ref('undefine')
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
const addFun = inject('addQues')
const addQues = () => {
  addFun(props.theIndex)
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
.selects {
  margin-top: 3vh;
  display: flex;
  justify-content: right;

  .select {
    width: 12%;
    margin: auto 0.5%;
  }
}

.noEdit {
  padding: 24px 0;
  background-color: #fff;
  cursor: pointer;

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

  .items {
    .item {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #585858;

      .i-contain {
        width: 80%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .text {
        font-size: 12px;
        margin-left: 20px;
      }
    }
  }
}

.input {
  width: 65%;
}


.choice {
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
      user-select: none;
      cursor: pointer;

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
        margin: auto 0.5vw auto 0;
        width: 1vw;
        height: 1vw;
        font-size: 1vw;
        cursor: pointer;

      }
    }

    .desc {
      display: flex;

    }


    .icon2 {
      margin: auto 0 auto 1.2vw;
      width: 1vw;
      height: 1vw;
      font-size: 1vw;
      user-select: none;
      cursor: pointer;
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