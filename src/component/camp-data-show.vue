<template>
  <div class="data-show">
    <section
      v-for="(data, index) in datas"
      :class="{
        link_show: index === 0,
        section_sty: true
      }">
      <div>{{ data.label }}</div>
      <div>{{ data.value }}</div>
      <div></div>
    </section>
  </div>
</template>

<script setup>
defineProps({
  datas: {
    default: [
      {
        label: '标签',
        value: 0
      }
    ]
  }
})
</script>

<style lang="scss" scoped>
.link_show {
  border-right: solid #999 1.5px;
  padding-right: 100px;
  margin-right: -80px;
}
.section_sty {
  height: 80px !important;
}
.data-show {
  margin-left: 24px;
  margin-bottom: 28px;
  background-color: white;
  border-radius: 5px;
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  padding: 20px 0px 20px 0px;
  section {
    :nth-child(1) {
      padding-top: 8px;
      font-size: 14px;
      font-weight: 300;
      color: #333;
    }
    :nth-child(2) {
      font-size: 35px;
      padding-top: 8px;
      font-weight: 300;
      color: #333;
    }
  }
}
</style>
