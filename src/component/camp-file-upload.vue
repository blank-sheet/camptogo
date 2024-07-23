<template>
  <el-upload
    :limit="5"
    :disabled="disabled"
    name="image"
    :headers="authHeader"
    :on-success="handleSuccess"
    :action="userApi.video"
    v-model:file-list="fileList"
    :class="{
      hiddenUpload: !isArr && files?.length
    }"
    auto-upload
    class="file-uploader"
    list-type="text"
    :on-remove="update"
    :multiple="false"
  >
    <el-button type="primary">上传文件</el-button>
  </el-upload>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, computed, watch } from 'vue'
import { authHeader } from '../api'
import { userApi } from '../api/modules/user/user'

const props = defineProps({
  files: {
    default: ''
  },
  placeHolder: {
    default: '上传文件',
    type: String
  },
  disabled: {
    default: false,
    type: Boolean
  }
})

const isArr = computed(() => Array.isArray(props.files))
const emits = defineEmits(['update:files'])

const hasChange = ref(false)
const fileList = ref([])

watch(
  () => props.files,
  () => {
    if (hasChange.value) return
    if (!isArr.value) {
      fileList.value = props.files ? [{ name: '', url: props.files?.url || props.files }] : []
    } else {
      fileList.value = props.files
    }
  }
)

const handleSuccess = (r, f) => {
  ElMessage({
    message: '上传成功',
    type: 'success'
  })
  update()
}

const update = () => {
  window.queueMicrotask(() => {
    const fileArrs = fileList.value.map(f => {
      if (f.response?.details.image_url) {
        return {
          url: f.response.details.image_url,
          name: f.name
        }
      } else return f
    })
    console.log(fileArrs);
    emits('update:files', fileArrs)
  })
  hasChange.value = true
}
</script>

<style lang="scss">
.file-uploader .el-upload {
  // border-radius: 6px;
  margin-top: 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.file-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

div.hiddenUpload {
  div.el-upload--text {
    display: none;
  }
}

.full {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-icon.file-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>