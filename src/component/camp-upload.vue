<template>
  <el-upload :limit="5" :disabled="disabled" name="image" :headers="authHeader" :on-success="handleSuccess" :action="userApi.video"
    v-model:file-list="fileList" :class="{
      hiddenUpload: !isArr && images?.length
    }" auto-upload class="camp-uploader" list-type="picture-card" :on-remove="update" accept=".jpg, .jpeg, .mp4,.png,"
    :multiple="false">
    <el-icon class="camp-uploader-icon">
      <div class="relative full">
        <Plus /><br /><span style="font-size: 14px; font-style: normal">{{ placeHolder }}</span>
      </div>
    </el-icon>
    <div class="absolute w-[100%] h-full bg-cover flex justify-center items-center"
      :style="{ 'background-image': `url(${bgImage})` }" v-if="bgImage">
      <span class=" text-black">点击上传</span>
    </div>
  </el-upload>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref, computed, watch } from 'vue'
import { authHeader } from '../api'
import { userApi } from '../api/modules/user/user'
const props = defineProps({
  images: {
    default: ''
  },
  placeHolder: {
    default: '上传图片',
    type: String
  },
  bgImage: {
    default: '',
    type: String
  },
  disabled: {
    default: false,
    type: Boolean
  }
})
const isArr = computed(() => Array.isArray(props.images))
const emits = defineEmits(['update:images'])
// 处理第一次渲染,序列化fieList
const hasChange = ref(false)
const fileList = ref([])
watch(
  () => props.images,
  () => {
    if (hasChange.value) return
    // 传递的是字符串
    if (!isArr.value) {
      fileList.value = props.images ? [{ name: '', url: props.images?.url || props.images }] : []
      // 传递的是个数组
    } else {
      fileList.value = props.images
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
    const imageArrs = fileList.value.map(f => {
      if (f.response?.details.image_url) {
        return {
          url: f.response.details.image_url,
          name: f.name
        }
      } else return f
    })
    emits('update:images', imageArrs)
    // if (!isArr.value) {
    //   const imgStr = fileList.value[0]?.response.details.image_url || ''
    //   const imgObj = {
    //     name: props.images?.name || ' ',
    //     url: fileList.value[0]?.response.details.image_url || ''
    //   }
    //   console.log(fileList.value);
    //   console.log(imgStr);
    //   console.log(imgObj);
    //   emits('update:images', !props.images?.length ? imgObj : imgStr)
    // } else {
    //   const imageArrs = fileList.value.map(f => {
    //     if (f.response?.details.image_url) {
    //       return {
    //         url: f.response.details.image_url,
    //         name: f.name
    //       }
    //     } else return f
    //   })
    //   console.log(imageArrs);
    //   emits('update:images', imageArrs)
    // }
  })
  hasChange.value = true
}
</script>

<style lang="scss">
.camp-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style lang="scss">
.camp-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.camp-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

div.hiddenUpload {
  div.el-upload--picture-card {
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

.el-icon.camp-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
