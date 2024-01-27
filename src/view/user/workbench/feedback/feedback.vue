<template>
  <div class="feed-back">
    <!-- 标题 -->
    <div class="title">使用反馈</div>
    <!-- 主体 -->
    <div>
      <el-form label-width="130px" label-position="left">
        <el-card class="block">
          <el-form-item label="反馈类别：">
            <el-input placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="反馈内容：">
            <el-input
              style="width: 500px"
              :maxlength="200"
              :rows="4"
              type="textarea"
              placeholder="请描述问题"
              resize="none"
            />
          </el-form-item>

          <el-form-item label="反馈人姓名：">
            <el-input placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系手机：">
            <el-input placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="联系邮箱：">
            <el-input placeholder="请输入邮箱地址"></el-input>
          </el-form-item>
        </el-card>
      </el-form>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.feed-back {
  width: calc(100% - 100px);
}
.title {
  font-family: PingFang SC;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 24px;
  margin-bottom: 16px;
  margin-left: 24px;
}

.block {
  // width: 80%;
  margin-left: 24px;
  margin-bottom: 16px;
  min-width: 1000px;
  .el-form-item {
    display: flex;
  }
  .grayLabel {
    font-family: "PingFang SC";
    font-style: normal;
    margin-left: 10px;
    font-size: 12px;
    color: #8a8a8a;
    float: left;
    line-height: 20px;
    white-space: nowrap;
  }

  .el-input__inner {
    border-radius: 50% !important;
    overflow: hidden;
  }
}
</style>
