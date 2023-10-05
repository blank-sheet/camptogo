<template>
  <div class="user">
    <campHeader>
      <campNav :nav-options="navOptions" :solid="true" />
      <div class="Serviceicon">
        <el-icon>
          <Service />
        </el-icon>
      </div>
    </campHeader>
    <RouterView />
  </div>
</template>

<script setup>
import campNav from '../../../component/camp-nav.vue'
import campHeader from '../../../component/camp-header.vue'
const navOptions = [
  {
    label: '工作台',
    navTo: '/user/workbench/basicInfo'
  },
  // {
  //   label: '资管系统',
  //   navTo: '/user/fiance'
  // },
  {
    label: '规则协议',
    navTo: '/user/rule/00'
  },
  {
    label: '公告通知',
    navTo: '/user/message'
  }
]
</script>

<style lang="scss">
.user {
  header {
    .camp-nav {
      .solid-active {
        font-size: 16px;
        opacity: 1;
      }

      span {
        font-size: 14px;
        opacity: 0.45;
      }
    }
  }
}

.Serviceicon {

  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  position: relative;
  margin: 0 20px;
  cursor: pointer;

  .el-icon {
    width: 20px;
    height: 20px;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    color: #93d500;
  }

  &:hover::after {
    content: '';
    position: absolute;
    top: 40px;
    background-image: url(../../../assets/severbackground.png);
    background-size: cover;
    width: 200px;
    height: 242px;
  }

  &:hover::before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 65px;
    background-image: url(../../../assets/serverimg.png);
    background-size: cover;
    width: 150px;
    height: 185px;
  }
}
</style>
