<template>
  <div class="image-clipper-container">
    <el-dialog v-model="dialogVisible" custom-class="dialog-container" title="图像裁剪器"
      :close-on-click-modal="false" :close-on-press-escape="false" @close="cancel" width="1000px" append-to-body>
      <div class="cropper-content">
        <div class="cropper-box">
          <div class="cropper">
            <VueCropper ref="cropper" :key="randomNum" :img="option.img" :outputSize="option.size" :outputType="option.outputType"
              :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox"
              :original="option.original" :autoCrop="option.autoCrop" :fixed="option.fixed"
              :fixedNumber="option.fixedNumber" :centerBox="option.centerBox" :infoTrue="option.infoTrue"
              :fixedBox="option.fixedBox" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight"
              @realTime="realTime" />
          </div>
          <div class="cropper-tool">
            <el-button type="text" :icon="Switch" @click="switchRatio"></el-button>
            <el-button type="text" :icon="RefreshLeft" @click="rotateLeft"></el-button>
            <el-button type="text" :icon="RefreshRight" @click="rotateRight"></el-button>
            <el-button type="text" :icon="ZoomOut" @click="changeScale(-1)"></el-button>
            <el-button type="text" :icon="ZoomIn" @click="changeScale(1)"></el-button>
          </div>
        </div>
        <!--预览效果图-->
        <div class="effect-preview">
          <div class="preview-title">效果预览</div>
          <div class="show-preview">
            <div class="preview">
              <div :style="`background:url(${previewImg}) center / contain no-repeat;width: 302px;height: 280px;`"></div>
            </div>
          </div>
          <div class="upload-box">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :file-list="fileList"
              :on-change="fileChange" accept=".jpg,.JPG,.png,.PNG,.jpeg,.JPEG" :http-request="changeImage">
              <el-button type="text" icon="el-icon-upload2">上传</el-button>
            </el-upload>
          </div>
          <div class="preview-info">
            <span></span>
            <span>文件大小：{{ fileSize }}KB</span>
          </div>
          <div class="image-require">
            <div class="image-require-title">图片要求</div>
            <div class="image-require-content">仅支持上传JPG、JPEG和PNG格式，图片大小不能超过2M</div>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="completeCrop">保 存</el-button>
      </template>
    </el-dialog>
  </div>
</template>
  
<script setup>
import { ref, watch } from 'vue';
import { VueCropper } from 'vue-cropper';
import "vue-cropper/dist/index.css";
import { userApi } from '../api/modules/user/user'
import { Switch, RefreshRight, RefreshLeft, ZoomOut, ZoomIn } from '@element-plus/icons-vue'
  
const props = defineProps({
  // 控制裁剪组件弹窗显隐
  isVisible: {
    default: false
  },
  imageUrl: {
    default: ''
  },
  imageName: {
    default: ''
  }
})
const emits = defineEmits(['complete', 'cancel'])

const cropper = ref(null)
const dialogVisible = ref(false);
const previewImg = ref('');
const fileSize = ref(0);
const fileList = ref([]);
const cropH = ref(200);
const cropW = ref(200);
const img64Result = ref('');
const isStraight = ref(true) // 判断裁剪框比例，true比例为3:2，false比例为2:3
const randomNum = ref(Date.now())
  
const option = ref({
  img: '',
  info: true,
  outputSize: 1,
  outputType: 'png',
  canScale: true,
  autoCrop: true,
  canMove: false,
  canMoveBox: true,
  autoCropWidth: 600,
  autoCropHeight: 400,
  fixedBox: false, // 固定截图框大小，不允许改变
  fixed: true, // 固定截图框比例
  fixedNumber: [3, 2],
  full: false,
  original: false,
  centerBox: true,
  infoTrue: true
});

watch(
  () => props.isVisible,
  (newVal,oldVal) => {
    dialogVisible.value = newVal
  }
)

watch(() => props.imageUrl, (newVal, oldVal) => {
    console.log(newVal);
    option.value.img = newVal
  }, { immediate: true }
)

watch(
  () => previewImg,
  (newVal,oldVal) => {
    getImageSize(newVal).then(res => {
      fileSize.value = res;
    });
  }
)

// 裁切完成后处理
const completeCrop = async () => {
  const imageFile = base64ToFile(previewImg.value, props.imageName);
  console.log(imageFile);
  console.log(previewImg.value);
  await saveBase64Image(previewImg.value)
  // emits('complete', imageFile, previewImg.value);
  dialogVisible.value = false;
};

// 关闭裁剪框
const cancel = () => {
  emits('cancel');
  dialogVisible.value = false;
};

// 实时预览
const realTime = (data) => {
  cropper.value.getCropData(res => {
    previewImg.value = res;
  });
  cropH.value = cropper.value.cropH;
  cropW.value = cropper.value.cropW;
};

// 向左旋转
const rotateLeft = () => {
  cropper.value.rotateLeft();
};

// 向右旋转
const rotateRight = () => {
  cropper.value.rotateRight();
};

// 图片缩放
const changeScale = (num) => {
  num = num || 1;
  cropper.value.changeScale(num);
};

// 重新上传图片
const changeImage = (file) => {
  console.log(file);
  console.log(fileList.value);
};

// 文件发生变化
const fileChange = async (file) => {
  const isLt2M = file.size <= 2 * 1024 * 1024;
  if (!isLt2M) {
    ElMessage.error('上传文件大小不能超过2MB!')
    return
  } else {
    // 该方法得到是图片的本地路径,需转为base64
    let img = await getBase64(file.raw);
    option.value.img = img;
  }
}

// 将图片转为base64格式
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      img64Result.value = reader.result
    }
    reader.onerror = (error) => {
      reject(error)
    }
    reader.onloadend = () => {
      resolve(img64Result.value)
    }
  })
}

// 切换比例
const switchRatio = () => {
  if (isStraight.value) {
    option.value.fixedNumber = [2, 3]
    isStraight.value = false
  } else {
    option.value.fixedNumber = [3, 2]
    isStraight.value = true
  }
  randomNum.value = Date.now();
}

const dataURLtoBlob = (dataurl) => { 
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
      
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

// 将base64图片转为文件
const base64ToFile = (base64Path, fileName) => {
  const blob = dataURLtoBlob(base64Path);
  const file = new File([blob], fileName);
  return file
}

// 根据图片路径获取图片大小
const getImageSize = async (imagePath) => {
  try {
    const response = await fetch(imagePath);
    let sizeInKB = null;
    const contentLength = response.headers.get('Content-Length');
    if (contentLength) {
      sizeInKB = Math.round(parseInt(contentLength) / 1024);
    } else {
      const blob = await response.blob();
      sizeInKB = Math.round(blob.size / 1024);
    }
    return sizeInKB;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

const saveBase64Image = (base64Img, fileName) => {
  return new Promise((resolve, reject) => {
    const byteCharacters = atob(base64Img.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'saved_image.png';
    document.body.appendChild(a);

    a.addEventListener('click', () => {
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      resolve();
    });

    a.click();
  });
}
</script>
  
<style scoped lang="scss">
div {
  box-sizing: border-box;
}

::v-deep .cropper-tool {
  .el-button {
    margin-left: 0;
  }
}

.dialog-container {
  .cropper-content {
    display: flex;
    display: -webkit-flex;
  
    .cropper-box {
      display: flex;
  
      .cropper {
        width: 600px;
        height: 600px;
      }
  
      .cropper-tool {
        display: flex;
        flex-direction: column;
        align-items: center;
        // margin-left: 5px;
        .el-button {
          font-size: 20px;
        }
      }
    }
  
    .effect-preview {
      margin-left: 10px;
      background-color: #f2f2f2;
      padding: 10px;
      .preview-title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }
  
      .show-preview {
        width: 302px;
        height: 280px;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        background: #cccccc;
        overflow: hidden;
  
        .preview {
          overflow: hidden;
          background: #cccccc;
          max-height: 100%;
          max-width: 100%;
          width: 100%;
  
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }
  
      .upload-box {
        width: 100%;
        height: 40px;
        padding: 0 10px;
        background-color: #fff;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
  
      .preview-info {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }

      .image-require {
        margin-top: 10px;
        .image-require-title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .image-require-content {
          margin: 5px 0;
        }
      }
    }
  }
}
</style>