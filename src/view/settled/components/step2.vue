<template>
  <div class="step2">
    <div class="title">{{ route.params.type === 'personal' ? '个人入驻' : '机构入驻' }}</div>
    <div class="contain">
      <el-form ref="formRef">
        <CampFormItem class="CampFormItem" label="注册手机">
          <el-input placeholder="请使用公司负责人常用手机号">
            <template #prepend>
              <el-select v-model="select" placeholder="" style="width: 115px">
                <el-option label="中国大陆 +86" :value="1" />
              </el-select>
            </template>
          </el-input>
        </CampFormItem>
        <CampFormItem class="CampFormItem" label="手机验证码">
          <el-input placeholder="请输入短信验证码">
            <template #suffix>
              <div>发送</div>
            </template>
          </el-input>
        </CampFormItem>
      </el-form>
    </div>
    <div class="tips">
      <el-checkbox></el-checkbox>
      <div>我已阅读并同意<span>《营探用户协议》</span><span>《营探隐私政策》</span></div>
    </div>
    <div class="btn">
      <el-button type="success" @click="handlerToStep3()">确认</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CampFormItem from '../../../component/camp-form-item.vue'

const route = useRoute()
const router = useRouter()
const handlerToStep3 = () => {
  router.push(`/settled/step3/${route.params.type}`)
}
onMounted(() => {
})
const formRef = ref(null)
const select = ref(1)
</script>

<style lang="scss" scoped>
.step2 {
  width: 80%;
  height: 50vh;
  background-color: #fff;
  border-radius: 0.5vw;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  transform: translate(0,-50%);
  .contain{
    display: flex;
    flex-direction: column;
    
    .CampFormItem{
      margin: 5vh auto;
      width: 50%;
      .el-input{
        width: 80%;
      }
      .el-select{
        width: 10vw !important;
      }
    }
  }
  .title {
    font-family: PingFang SC;
    font-size: 1.1vw;
    padding: 2vh 0 2vh 1vw;
    border-bottom: 1px solid rgb(217, 217, 217);
    color: #262626;
  }

  .tips {
    display: flex;
    justify-content: center;
    user-select: none;
    div {
      font-size: 1vw;
      margin: auto 1vw;

      span {
        color: #93D600;
        font-family: PingFang SC;
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
      }
    }
  }

  .btn {
    display: flex;
    justify-content: center;
    margin: auto 0 3% 0;
  }
}
</style>