<template>
  <div style="display: flex;">
    <draggable :list="fileList" item-key="uid" @change="draChange" class="xqImgs">
      <template #item="{ element, index }">
        <div class="flx-center xqImg">
          <el-image
            style="width: 148px; height: 148px; object-fit: contain; border-radius: 10px; margin-right: 10px;"
            :src="element.url"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="fileList"
            :initial-index="4"
            v-loading="loading && index == fileList.length - 1"
            fit="cover"
          />
          <!-- <img :src="element.url" alt="" /> -->
          <div class="content-wrap">
            <div class="content">
              <el-icon class="plus cup" @click="handlePictureCardPreview(element)"><CirclePlus /></el-icon>
              <el-icon class="delete cup" @click="handlePictureRemove(element)"><Delete /></el-icon>
            </div>
          </div>
        </div>
      </template>
    </draggable>
    <el-upload :limit="5" :disabled="disabled" name="image" :headers="authHeader" :on-success="handleSuccess" :action="userApi.video"
      v-model:file-list="fileList" :on-change="onChange" :class="{
        hiddenUpload: !isArr && images?.length
      }" auto-upload class="camp-uploader" list-type="picture-card" :on-remove="update" accept=".jpg, .jpeg, .mp4,.png,"
      :multiple="false" :show-file-list="false">
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
  </div>

  <el-dialog v-model="dialogVisible" width="600" align-center >
    <img w-full :src="dialogImageUrl" style="width: 100%;" alt="Preview Image" />
  </el-dialog>

  <el-dialog v-model="dialogVisible1" custom-class="dialog-container" title="图像裁剪器" top="5vh"
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
            <div :style="`background:url(${clipperImg}) center / contain no-repeat;width: 302px;height: 280px;`"></div>
          </div>
        </div>
        <div class="upload-box">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :file-list="fileList"
            :on-change="fileChange" accept=".jpg,.JPG,.png,.PNG,.jpeg,.JPEG" :http-request="changeImage">
            <el-button type="text" icon="el-icon-upload2">重新上传</el-button>
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
      <el-button type="primary" @click="completeCrop">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import { CirclePlus, Delete } from '@element-plus/icons-vue'
import { VueCropper } from 'vue-cropper';
import "vue-cropper/dist/index.css";
import draggable from 'vuedraggable'
import { ElMessage } from 'element-plus'
import { ref, computed, watch } from 'vue'
import { authHeader, request } from '../api'
import { userApi } from '../api/modules/user/user'
import { Switch, RefreshRight, RefreshLeft, ZoomOut, ZoomIn } from '@element-plus/icons-vue'
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
const dialogImageUrl = ref(null)
const dialogVisible = ref(false)

const cropper = ref(null)
const dialogVisible1 = ref(false);
const previewImg = ref('');
const fileSize = ref(0);
const cropH = ref(200);
const cropW = ref(200);
const img64Result = ref('');
const loading = ref(false)
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

const clipperImg = ref(null)

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

const onChange = (e) => {
  console.log(e);
  loading.value = true
  if (e?.response) {
    loading.value = false
    option.value.img = e?.response?.details?.image_url
    clipperImg.value = e?.response?.details?.image_url
    dialogVisible1.value = true
  }
  return false
}

// 裁切完成后处理
const completeCrop = async () => {
  const imageFile = base64ToFile(clipperImg.value, props.imageName);
  let byteString = atob(clipperImg.value.split(',')[1]);
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const timestamp = new Date().getTime();
  let file = new File([ab], `image_${timestamp}.jpg`, {type: 'image/jpeg'});
  let formData = new FormData();
  formData.append('image', file);
  request.post(
    userApi.video, 
    formData, 
    { 
      message: false, 
      loading: false 
    }, 
    {
      'Content-Type': 'multipart/form-data'
    }
  ).then(res => {
    for (let i = 0; i < fileList.value.length; i++) {
      const item = fileList.value[i];
      if (item.url == option.value.img || item?.response?.details?.image_url == option.value.img) {
        fileList.value[i].url = res?.details?.image_url
        fileList.value[i].name = `image_${timestamp}.jpg`
      }
    }
    
    update()
  })
  // await saveBase64Image(previewImg.value)
  // emits('complete', imageFile, previewImg.value);
  dialogVisible1.value = false;
};

// 关闭裁剪框
const cancel = () => {
  emits('cancel');
  dialogVisible1.value = false;
};

// 实时预览
const realTime = (data) => {
  cropper.value.getCropData(res => {
    clipperImg.value = res;
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

const draChange = () => {
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
  })
  hasChange.value = true
}
const handlePictureCardPreview = e => {
	dialogImageUrl.value = e.url;
	dialogVisible.value = true;
};
const handlePictureRemove = (e) => {
  window.queueMicrotask(() => {
    let fileListCopy = JSON.parse(JSON.stringify(fileList.value))
    fileList.value = fileListCopy.filter(element => element.uid !== e.uid)
    const imageArrs = fileListCopy.filter(element => element.uid !== e.uid).map(f => {
      if (f.response?.details.image_url) {
        return {
          url: f.response.details.image_url,
          name: f.name
        }
      } else return f
    })
    emits('update:images', imageArrs)
  })
  hasChange.value = true
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

<style lang="scss" scoped>
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

.xqImgs {
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	.xqImg {
		position: relative;
		overflow: hidden;
    cursor: pointer;
		&:hover {
			.content-wrap {
				display: block;
			}
		}
		.content-wrap {
			position: absolute;
			display: none;
			z-index: 99999999;
			border-radius: 10px;
      left: 0;
      top: 0;
			width: 148px;
			height: 148px;
			margin-right: 10px;
			background: rgba($color: #000000, $alpha: 0.4);
			.content {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.plus {
					color: #fff;
					font-size: 18px;
					margin-right: 10px;
				}
				.delete {
					color: #fff;
					font-size: 18px;
					margin-right: 10px;
				}
			}
		}
 
		img {
			width: 148px;
			height: 148px;
			object-fit: contain;
			border-radius: 10px;
			margin-right: 10px;
		}
	}
}

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
        // margin-left: 0px;
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
