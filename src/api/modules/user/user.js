// 商户端相关的接口
export const userApi = {
  // 获取基础信息
  basicInfo: 'api/e9b849a515a84327b424af7ccdbf2949/v1_0_0/provider/insurance/info/get',
  // 提交静态文件
  video: '/api/e9b849a515a84327b424af7ccdbf2949/v1_0_0/base/funcs/image/upload',
  // 获取商品列表
  getList: '/api/e9b849a515a84327b424af7ccdbf2949/v1_0_0/product/all/provider',
  getProductList: '/api/e9b849a515a84327b424af7ccdbf2949/web/v2_0_0/product/page_get',
  // 基础信息提交审核
  basicInfoSubmit: '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/provider/basic_info/save',
  // 获取基础信息
  getBasiInfo: '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/provider/basic_info/get',
  // 商品提交审核,立即上架
  product: '/api/e9b849a515a84327b424af7ccdbf2949/web/v2_0_0/product/online',
  // 新版:创建商品
  createProduct: '/api/e9b849a515a84327b424af7ccdbf2949/web/v2_0_0/product/create',
  // 新版:提交修改
  updateProduct: '/api/e9b849a515a84327b424af7ccdbf2949/web/v2_0_0/product/create',
  // 新版:获取优势列表
  getFeatures: '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/feature/list',
  // 新版:获取列表列表
  getCategories: '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/category/list',
  // 新版：商品详情
  getProduct: '/api/e9b849a515a84327b424af7ccdbf2949/web/v2_0_0/product/get',
  // 获取上架时的核保信息
  getInsurceAudit: '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/product/insurance/info',
  // 频道
  channel: '/api/e9b849a515a84327b424af7ccdbf2949/v1_0_0/channel/all',
  preview: '/api/e9b849a515a84327b424af7ccdbf2949/v1_0_0/product/create/img',
  // 订单状态数量统计
  ordersInfo: '/api/e9b849a515a84327b424af7ccdbf2949/v1_0_0/order/status/count',
  //提交报名表
  submitTable: '/api/e9b849a515a84327b424af7ccdbf2949/mobile/v1_0_0/enroll/create',
  //获取报名表信息
  getTable: '/api/e9b849a515a84327b424af7ccdbf2949/mobile/v1_0_0/enroll/get',
  //获取报名表信息
  getApplication: '/api/e9b849a515a84327b424af7ccdbf2949/app/v1_0_0/application_form_submission/query',
  //订单的分页查询
  ordersSearch: '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/order/page',
  orderList: '/api/e9b849a515a84327b424af7ccdbf2949/web/v2_0_0/work_ticket/order/page_get',
  confirmOrder: '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/order/confirm',
  refuseOrder: '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/order/refuse',
  //订单审核状态修改
  ordersChange: '/api/e9b849a515a84327b424af7ccdbf2949/v1_0_0/order/update/status',
  // 删除商品
  deleteProduct: '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/product/delete',
  // 获取保险挡位列表
  getInsuranceGrade: '/api/e9b849a515a84327b424af7ccdbf2949/v1_0_0/insurance_grade/get',
  // 获取商品计数
  getCount: '/api/e9b849a515a84327b424af7ccdbf2949/web/v2_0_0/product/count',
  // 新增商品团期
  addSchedule: '/api/e9b849a515a84327b424af7ccdbf2949/web/v2_0_0/product/group_period/create',
  //获取小程序链接
  getLinkAPI: '/api/e9b849a515a84327b424af7ccdbf2949/web/v2_0_0/product/link/get',
  //获取商品二维码
  getQrcodeAPI:'/api/e9b849a515a84327b424af7ccdbf2949/web/v2_0_0/product/qr_code/get',
  //获取报名表存在情况
  getRegistrationFormIsExitAPI: '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/application_form/is_exist',
  //创建报名表
  createRegistrationFormAPI: '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/application_form/create',
  //更新报名表
  updateRegistrationFormAPI: '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/application_form/update',
  //获取报名表详情
  getRegistrationFormAPI: '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/application_form/query',
  // 获取退款信息详情
  getRefundInfo: '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/order_refund_info/query',
  // 第三方人员投保信息创建
  createExternalInsurance: '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/product/external_insurance/create',
  // 第三方人员投保列表
  getExternalInsurance: '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/product/external_insurance/page',
  // 价格确认页分页列表
  getExternalInsurancePrice: '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/product/external_insurance/page_price',
  // 商户确认投保
  comfirmExternalInsurance: '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/product/external_insurance/comfirm',
  // 支付回调
  getPaymentStatus: '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/product/external_insurance/payment_status'
}
