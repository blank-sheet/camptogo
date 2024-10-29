<template>
    <ElDialog :model-value="show" @close="$emit('update:show', false)" title="实名认证">
        <ElForm>
            <div class=" text-black my-[10px]" style="font-size: 16px;">基本信息</div>
            <p>*您所填写姓名、证件号码应当与申请认证公函中被授权人信息保持一致。</p>
            <ElFormItem label="姓名">

                <ElInput placeholder="请输入真实姓名" />
            </ElFormItem>
            <ElFormItem label="身份证">

                <ElInput placeholder="请输入身份证号" />

            </ElFormItem>
            <ElFormItem label="联系号码">
                <ElInput placeholder="请输入联系人手机号" />

            </ElFormItem>
            <ElFormItem label="银行卡号">
                <ElInput placeholder="请输入银行卡号" />

            </ElFormItem>
            <ElFormItem label="请上传身份证照片">
                <div class="flex m-[25px]">
                    <CampUpload class=" mr-[40px]" place-holder="点击上传" bg-image="/id_2.png" />
                    <CampUpload place-holder="点击上传" bg-image="/id_1.png" />
                </div>
            </ElFormItem>
            <p>*您填写的证件号码和您上传的证件原件照片属于敏感个人信息，您的主动插入并点击提交代表您充分知悉并同意我们基于认证目的的处理该信息。请仔细阅读并充分了解<a>《个人信息采集清单》</a>
                规定的平台对您个人信息处理的规则。</p>
        </ElForm>
        <template #footer>
            <ElButton type="primary" @click="handleSubmit">提交</ElButton>
        </template>
    </ElDialog>
</template> 

<script setup lang="ts">
import { ElButton, ElDialog, ElForm, ElFormItem } from 'element-plus';
import CampUpload from '../../../../../component/camp-upload.vue';
defineProps({
    show: Boolean,
    ediable: Boolean
})
const emits = defineEmits(['update:show'])
const handleSubmit = () => {
    emits('update:show', false)
}
</script> 
<style lang="scss">
.el-dialog {
    color: black;

    header {
        border-bottom: 1px solid lightgray;
        margin-right: 0;
    }

    .el-input {
        width: 350px !important;
    }

    .el-form-item {
        margin: 15px 0;
    }

    .el-form-item__label {
        color: black;
    }

    p {
        font-size: 16px;
        margin: 0 5px;
        line-height: 24px;
        color: gray;
    }

    a {
        color: var(--el-color-primary);
        cursor: pointer;
    }
}
</style> 
 