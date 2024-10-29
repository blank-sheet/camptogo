<template>
  <div>
    <input ref="excelUploadInput" class="excelUploadInput" type="file" accept=".xlsx, .xls" @change="handleClick">
    <div class="drop" :style="{width: width + 'px', height: height + 'px', border: border ? '1.4px solid transparent' : 'none'}" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      将文件拖拽到此区域或
      <el-button :loading="loading" link style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">
        点击添加
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus'
import * as XLSX from 'xlsx';

const props = defineProps({
  width: {
    type: Number,
    default: 600
  },
  height: {
    type: Number,
    default: 160
  },
  border: {
    type: Boolean,
    default: false
  },
  beforeUpload: {
    type: Function
  },
  onSuccess: {
    type: Function
  }
})

const loading = ref(false);
const excelData = ref({
  header: null,
  results: null
});
const excelUploadInput = ref(null)

const generateData = ({ header, results }) => {
  excelData.value.header = header;
  excelData.value.results = results;
  props.onSuccess && props.onSuccess(excelData.value);
};

const handleDrop = (e) => {
  e.stopPropagation();
  e.preventDefault();
  if (loading.value);
  const files = e.dataTransfer.files;
  console.log(files);
  if (files.length !== 1) {
    ElMessage.error('只支持上传一个文件！')
    return;
  }
  const rawFile = files[0];

  if (!isExcel(rawFile)) {
    ElMessage.error('只支持上传后缀为.xlsx、.xls、.csv的文件')
    return false;
  }
  upload(rawFile);
  e.stopPropagation();
  e.preventDefault();
};

const handleDragover = (e) => {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
};

const handleUpload = () => {
  excelUploadInput.value.click();
};

const handleClick = (e) => {
  const files = e.target.files      
  const rawFile = files[0];
  if (!rawFile) return;
  upload(rawFile);
};

const upload = (rawFile) => {
  excelUploadInput.value = null;

  console.log(props.beforeUpload);
  

  if (!props.beforeUpload) {
    readerData(rawFile);
    return;
  }
  const before = props.beforeUpload(rawFile);
  if (before) {
    readerData(rawFile)
  }
};

const readerData = (rawFile) => {
  loading.value = true;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const header = getHeaderRow(worksheet)
      const results = XLSX.utils.sheet_to_json(worksheet);
      generateData({ header, results });
      loading.value = false;
      resolve();
    };
    reader.readAsArrayBuffer(rawFile);
  });
};

const isExcel = (file) => {
  return /\.(xlsx|xls|csv)$/.test(file.name);
};

const getHeaderRow = (sheet) => {
  const headers = [];
  const range = XLSX.utils.decode_range(sheet['!ref']);
  let C;
  const R = range.s.r;
  for (C = range.s.c; C <= range.e.c; ++C) {
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
    let hdr = 'UNKNOWN ' + C;
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
    headers.push(hdr);
  }
  return headers;
};
</script>

<style lang="scss" scoped>
.excelUploadInput{
  display: none;
  z-index: -9999;
}
.drop{
  // border: 2px dashed #bbb;
  border: 1.4px solid transparent;
  background: linear-gradient(white, white) padding-box, repeating-linear-gradient(-45deg, #ccc 0, #ccc 0.5em, white 0, white 0.75em);
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
