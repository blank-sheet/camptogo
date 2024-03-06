<template>
  <camp-body :sideWidth="220">
    <template #side>
      <div class="title-yt">营探·规则协议</div>
      <el-input placeholder="搜索" class="searchInput" size="small">
        <template #prefix>
          <el-icon class="el-input__icon">
            <search />
          </el-icon>
        </template>
      </el-input>
      <el-menu class="menu" @select="handleOpen" unique-opened :default-openeds="defaultOpenedsArray" >
        <!-- close-on-click-outside -->
        <el-menu-item index="home">
          <template #title>
            <i class="iconfont icon-homepage"></i>
            首页
          </template>
        </el-menu-item>
        <el-menu-item index="menu">
          <template #title>
            <i class="iconfont icon-liebiao"></i>
            目录<div class="mulu">
              <el-tooltip content="全部收起" placement="top">
                <i class="iconfont fold icon-xiangxiazhankai" @click="updatedefaultOpenedsArray()"></i>
              </el-tooltip>
            </div>
          </template>
        </el-menu-item>
        <el-sub-menu :index="i.toString()" v-for="(f, i) in files" :key="i"
          :class="{ 'selected-submenu': selectedSubmenu.value === i }">
          <template #title>
            <span>{{ f[0] }}</span>
          </template>
          <el-menu-item v-for="(n, j) in f[1]" :index="i + '-' + j" :key="j" @click="updateSelectedSubmenu(i)">
            <div class="text">{{ n }}</div>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </template>
    <template #main>
      <ruleHome v-if="route.params.id === 'home'"></ruleHome>
      <rule-file v-else :index="cur" />
    </template>
  </camp-body>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import campBody from '../../../component/camp-body.vue'
import RuleFile from './rule-file.vue'
import ruleHome from "./ruleHome.vue"
const router = useRouter()
const route = useRoute()
const defaultOpenedsArray = ref([])
const level0 = [
  '工作台指引',
  ['营探风险告知书', '营探安全手册', '营探安全须知', '营探帮助中心', '免责声明']
]
const level1 = [
  '入驻协议',
  [
    '营探用户协议',
    '营探隐私政策',
    '营探优惠券使用规则',
    '营探平台预定和退费须知',
    '营探服务商入驻须知',
    '营探诚信保证金管理规定',
    '平台特色',
    '营探知识产权声明',
    '营探账户注销协议',
    '营探隐私政策(简明版)',
    '第三方合作清单',
    '营探服务商入驻协议及授权条款 - 机构',
    '营探服务商入驻协议及授权条款 - 自然人',
  ]
]
const level2 = [
  '日常管理',
  [
    '营探服务商管理办法',
    '营探服务商收费标准',
    '营探服务商费用核算与结算办法',
    '营探服务商培训办法',
    '营探搜索排名规则',
    '营探信用评价规则',
    '营探交易争议处理规则',
    '营探侵权处理办法',
    '价格说明',
    '退改说明',
    '常见问题',
    '预定须知',
    '营探儿童隐私保护声明及监护人须知',
    '营探敏感个人信息清单',
    '应用权限申请与使用情况说明',
    '个人信息收集清单'
  ]
]
const level3 = [
  '保险',
  [
    '营探定制保险方案',
    '组织者责任保险条款',
    '旅游者人身意外伤害保险条款',
    '附加旅行突发性疾病身故保险条款',
    '附加旅行医疗费用保险条款',
    '附加旅行住院津贴保险条款',
    '附加高风险运动意外伤害保险条款',
    '附加旅行公共交通工具意外伤害保险条款',
    '附加食物中毒保险条款',
    '附加救护车费用保险条款',
    '附加旅行个人责任及宠物责任保险',
    '自由职业者服务协议',
    '灵活就业服务合作协议',
    '营探推荐官返现活动规则'
  ]
]
const files = [level0, level1, level2, level3]
const selectedSubmenu = ref(-1)
const cur = ref('0-0')
const updatedefaultOpenedsArray = ()=>{
  defaultOpenedsArray.value = []
}
const handleOpen = (key, keyPath) => {
  if (key == 'home') {
    router.push('/user/rule/home')
    return
  }
  if (key == 'menu') {
    defaultOpenedsArray.value = []
    return
  }
  router.push('/user/rule/' + key.replace('-', ''))
  cur.value = key
}

const updateSelectedSubmenu = index => {
  selectedSubmenu.value = index
}

onMounted(() => {
  cur.value = route.params.id[0] + '-' + route.params.id.slice(1)
})
</script>

<style lang="scss" scoped>
.text {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.menu {
  margin: 0 2px;
  --el-menu-hover-bg-color: #EDEDED !important;
  overflow: hidden;
  border-right: 0;
  .mulu {
    height: 15px;
    line-height: 15px;
    width: 80%;
    display: flex;
    justify-content: right;

    .fold {
      margin: auto 0;
      color: #707070;

      &:hover {
        background-color: #F5F5F5;
      }
    }
  }

  .iconfont {
    margin: auto 6px auto 0;
  }

  .fold {
    font-size: 12px;
    margin: auto 6px auto 0;
  }

  .el-menu-item {
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    padding: 0 24px 0 36px;
    overflow: hidden;
    display: flex;

    &:hover {
      background-color: #EDEDED;
    }
  }



}

.is-opened {
  span {
    color: #95D600 !important;
  }
}

.is-active {
  background-color: #F5FFC4;
  color: #95D600 !important;
}

.title-yt {
  color: #93d500;
  font-family: PingFang SC;
  font-size: 22px;
  padding-left: 20px;
  height: 50px;
  line-height: 50px;
}

.searchInput {
  width: 80%;
  margin-left: 20px;
  height: 20px;
  line-height: 20px;
  margin-bottom: 10px;
}

::v-deep(.el-input__wrapper) {
  background-color: rgb(244, 246, 245) !important;
}

::v-deep(.el-aside)::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}
</style>

<style lang="scss">
.el-sub-menu__title {
  border-radius: 5px;
  height: 40px;
}
</style>
