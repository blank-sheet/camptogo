<template>
  <div>
    <el-dialog v-model="dialogVisible" custom-class="dialog-container" title="保险规则"
      :close-on-click-modal="false" :close-on-press-escape="false" @close="cancel" width="1280px" append-to-body>
      <div class="agreement-container">
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          style="width: 220px;"
        >
          <el-menu-item v-for="(item, index) in menuList" :key="index" :index="index">
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="item.name"
              placement="right"
            >
              <span class="menu-item">{{ item.name }}</span>
            </el-tooltip>
          </el-menu-item>
        </el-menu>
        <iframe v-if="dialogVisible" :src="menuList[selectIndex].url" style="width: 1000px; height: 660px; margin-left: 10px;"></iframe>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  // 控制弹窗显隐
  isVisible: {
    default: false
  }
})

const emits = defineEmits(['cancel'])

const dialogVisible = ref(false)
const selectIndex = ref(0)
// 有空再优化吧
// 做成通用协议展示弹窗
const menuList = ref([{
  name: '保险方案07v1.pdf',
  url: '/media/%E4%BF%9D%E9%99%A9%E6%96%B9%E6%A1%8807v1.pdf'
},{
  name: '天安财产保险股份有限公司组织者责任保险条款.pdf',
  url: '/media/%E5%A4%A9%E5%AE%89%E8%B4%A2%E4%BA%A7%E4%BF%9D%E9%99%A9%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E7%BB%84%E7%BB%87%E8%80%85%E8%B4%A3%E4%BB%BB%E4%BF%9D%E9%99%A9%E6%9D%A1%E6%AC%BE.pdf'
},{
  name: '旅游者人身意外伤害保险（互联网）条款（注册号：C00002232312021122843263）.pdf',
  url: '/media/%E6%97%85%E6%B8%B8%E8%80%85%E4%BA%BA%E8%BA%AB%E6%84%8F%E5%A4%96%E4%BC%A4%E5%AE%B3%E4%BF%9D%E9%99%A9%EF%BC%88%E4%BA%92%E8%81%94%E7%BD%91%EF%BC%89%E6%9D%A1%E6%AC%BE%EF%BC%88%E6%B3%A8%E5%86%8C%E5%8F%B7%EF%BC%9AC00002232312021122843263%EF%BC%89.pdf'
},{
  name: '旅游者人身意外伤害保险（互联网）附加旅行住院津贴保险条款-C00002232522021122945163.pdf',
  url: '/media/%E6%97%85%E6%B8%B8%E8%80%85%E4%BA%BA%E8%BA%AB%E6%84%8F%E5%A4%96%E4%BC%A4%E5%AE%B3%E4%BF%9D%E9%99%A9%EF%BC%88%E4%BA%92%E8%81%94%E7%BD%91%EF%BC%89%E9%99%84%E5%8A%A0%E6%97%85%E8%A1%8C%E4%BD%8F%E9%99%A2%E6%B4%A5%E8%B4%B4%E4%BF%9D%E9%99%A9%E6%9D%A1%E6%AC%BE-C00002232522021122945163.pdf'
},{
  name: '旅游者人身意外伤害保险（互联网）附加旅行个人责任及宠物责任保险条款-C00002230922021122945503.pdf',
  url: '/media/%E6%97%85%E6%B8%B8%E8%80%85%E4%BA%BA%E8%BA%AB%E6%84%8F%E5%A4%96%E4%BC%A4%E5%AE%B3%E4%BF%9D%E9%99%A9%EF%BC%88%E4%BA%92%E8%81%94%E7%BD%91%EF%BC%89%E9%99%84%E5%8A%A0%E6%97%85%E8%A1%8C%E4%B8%AA%E4%BA%BA%E8%B4%A3%E4%BB%BB%E5%8F%8A%E5%AE%A0%E7%89%A9%E8%B4%A3%E4%BB%BB%E4%BF%9D%E9%99%A9%E6%9D%A1%E6%AC%BE-C00002230922021122945503.pdf'
},{
  name: '旅游意外保险附加旅行公共交通工具意外伤害保险条款.pdf',
  url: '/media/%E6%97%85%E6%B8%B8%E6%84%8F%E5%A4%96%E4%BF%9D%E9%99%A9%E9%99%84%E5%8A%A0%E6%97%85%E8%A1%8C%E5%85%AC%E5%85%B1%E4%BA%A4%E9%80%9A%E5%B7%A5%E5%85%B7%E6%84%8F%E5%A4%96%E4%BC%A4%E5%AE%B3%E4%BF%9D%E9%99%A9%E6%9D%A1%E6%AC%BE.pdf'
},{
  name: '附加食物中毒保险条款.docx',
  url: '/media/%E9%99%84%E5%8A%A0%E9%A3%9F%E7%89%A9%E4%B8%AD%E6%AF%92%E4%BF%9D%E9%99%A9%E6%9D%A1%E6%AC%BE.docx'
},{
  name: '附加旅行医疗费用保险条款.docx',
  url: '/media/%E9%99%84%E5%8A%A0%E6%97%85%E8%A1%8C%E5%8C%BB%E7%96%97%E8%B4%B9%E7%94%A8%E4%BF%9D%E9%99%A9%E6%9D%A1%E6%AC%BE.docx'
},{
  name: '附加旅行突发性疾病身故保险条款.docx',
  url: '/media/%E9%99%84%E5%8A%A0%E6%97%85%E8%A1%8C%E7%AA%81%E5%8F%91%E6%80%A7%E7%96%BE%E7%97%85%E8%BA%AB%E6%95%85%E4%BF%9D%E9%99%A9%E6%9D%A1%E6%AC%BE.docx'
},{
  name: '附加救护车费用保险条款.docx',
  url: '/media/%E9%99%84%E5%8A%A0%E6%95%91%E6%8A%A4%E8%BD%A6%E8%B4%B9%E7%94%A8%E4%BF%9D%E9%99%A9%E6%9D%A1%E6%AC%BE.docx'
},{
  name: '附加高风险运动意外伤害保险条款.docx',
  url: '/media/%E9%99%84%E5%8A%A0%E9%AB%98%E9%A3%8E%E9%99%A9%E8%BF%90%E5%8A%A8%E6%84%8F%E5%A4%96%E4%BC%A4%E5%AE%B3%E4%BF%9D%E9%99%A9%E6%9D%A1%E6%AC%BE.docx'
}])

watch(
  () => props.isVisible,
  (newVal,oldVal) => {
    dialogVisible.value = newVal
  }
)

const handleSelect = (e) => {
  selectIndex.value = e
  console.log(e);
}

// 关闭弹窗
const cancel = () => {
  emits('cancel');
  dialogVisible.value = false;
};

</script>
<style lang="scss" scoped>
.agreement-container {
  display: flex;
  .menu-item {
    width: 240px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>