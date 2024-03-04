<template>
<pre>
<essayText> 
<essayTitle>应用权限申请与使用情况说明</essayTitle> 
<essayDate>发布日期：2022年8月19日
生效日期：2022年8月27日</essayDate>

<essayTextWithWeight>提示条款</essayTextWithWeight>

本文件适用版本号：iOS 1.0，小程序1.0及此后更新版本 

1、为保障营探功能实现与安全稳定运行之目的，我们可能会申请或使用操作系统的相关权限。 

2、为保障您的知情权，我们通过下列列表对可能申请、使用的相关操作系统权限进行展示，您可以根据实际需要对相关权限进行管理。 

3、随着根据营探的升级，申请、使用权限的类型与目的可能会有变动，我们将及时根据这些变动对列表进行调整，以确保您及时获悉权限的申请与使用情况。 

4、请您知悉，我们为营探业务、功能与安全需要，我们可能也会使用第三方SDK，这些第三方也可能会申请或使用相关操作系统权限。 

5、在使用营探的过程中，您可能会使用第三方开发或运营的H5页面或小程序，这些第三方开发的插件或小程序也可能因业务功能所必需而申请或使用相关操作系统权限。 

6、本说明适用于营探平台所提供的各项服务。如有单独使用的场景或目的，将在下述列表中说明。 

<!-- | plist中描述名称                     | 权限功能说明     | 使用场景或目的                                   |
| ----------------------------------- | ---------------- | ------------------------------------------------ |
|     | 定位权限         | 日历/定位消息/小程序中的定位权限                 |
|           | 定位权限         | 日历/定位消息/小程序中的定位权限                 |
|  | 定位权限         | 日历/定位消息/小程序中的定位权限                 |
|    | 向相册中添加内容 | 会话/Doc/邮件等保存图片的需求                    |
|       | 读取相册中内容   | 从相册获取图片并发送到会话/文档/邮件等等相关需求 |
|             | 相机权限申请     | 音视频/相机/扫码等相关需求                       |
|         | 麦克风权限申请   | 音视频/语音消息/语音评论等相关需求               |
|           | 联系人权限申请   | 添加联系人紧急联系人电话                         |
|          | 获取系统日历权限 | 日历相关功能，同步活动日历                       |
|       | 访问本地网络权限 | 连接网络设备等                                   | -->
<table border="1" cellspacing="0">
  <tr>
    <td>plist中描述名称</td>
    <td>权限功能说明</td>
    <td>使用场景或目的</td>
  </tr>
  <tr>
    <td>NSLocationAlwaysUsageDescription</td>
    <td>定位权限</td>
    <td>日历/定位消息/小程序中的定位权限</td>
  </tr>
  <tr>
    <td>NSLocationUsageDescription</td>
    <td>定位权限</td>
    <td>日历/定位消息/小程序中的定位权限</td>
  </tr>
  <tr>
    <td>NSLocationWhenInUseUsageDescription</td>
    <td>定位权限</td>
    <td>日历/定位消息/小程序中的定位权限</td>
  </tr>
  <tr>
    <td>NSPhotoLibraryAddUsageDescription</td>
    <td>向相册中添加内容</td>
    <td>会话/Doc/邮件等保存图片的需求</td>
  </tr>
  <tr>
    <td>NSPhotoLibraryUsageDescription</td>
    <td>读取相册中内容</td>
    <td>从相册获取图片并发送到会话/文档/邮件等等相关需求</td>
  </tr>
  <tr>
    <td>NSCameraUsageDescription</td>
    <td>相机权限申请</td>
    <td>音视频/相机/扫码等相关需求</td>
  </tr>
  <tr>
    <td>NSMicrophoneUsageDescription</td>
    <td>麦克风权限申请</td>
    <td>音视频/语音消息/语音评论等相关需求</td>
  </tr>
  <tr>
    <td>NSContactsUsageDescription</td>
    <td>联系人权限申请</td>
    <td>添加联系人紧急联系人电话</td>
  </tr>
  <tr>
    <td>NSCalendarsUsageDescription</td>
    <td>获取系统日历权限</td>
    <td>日历相关功能，同步活动日历</td>
  </tr>
  <tr>
    <td>NSLocalNetworkUsageDescription</td>
    <td>访问本地网络权限</td>
    <td>连接网络设备等</td>
  </tr>
</table>

 
 
  </essayText> 
</pre>
</template>
<script setup>
import essayTitle from "../essayComponents/essayTitle.vue"
import essayDate from "../essayComponents/essayDate.vue"
import essayTitleH2 from "../essayComponents/essayTitleH2.vue"
import essayTextWithWeight from "../essayComponents/essayTextWithWeight.vue"
import essayHeightLight from "../essayComponents/essayHeightLight.vue"
import essayText from "../essayComponents/essayText.vue"


</script>