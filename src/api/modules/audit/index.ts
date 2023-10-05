export const auditApi = {
  // 获取商品审核列表
  productList: '/api/e9b849a515a84327b424af7ccdbf2949/web/v2_0_0/work_ticket/product/page_get',
  // 商品审核通过:
  productApprove: '/api/e9b849a515a84327b424af7ccdbf2949/web/v2_0_0/work_ticket/approve',
  // 商品/保险审核不通过
  productOrInsurenceReject: '/api/e9b849a515a84327b424af7ccdbf2949/web/v2_0_0/work_ticket/reject',
  // 保险审核通过
  insurenceApprove: '/api/e9b849a515a84327b424af7ccdbf2949/web/v2_0_0/work_ticket/approve',
  // 获取核保列表:
  insurenceList: '/api/e9b849a515a84327b424af7ccdbf2949/web/v2_0_0/work_ticket/product/page_get',
  // 审核通过,保险因子
  insurenceApproveInfo:
    '/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/product/insurance/pre_conform'
}
