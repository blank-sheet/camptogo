export const PRODUCT_STATUS = {
  // 草稿
  DRAFT: '草稿',
  // 创建待审核
  CREATED_WAIT_REVIEW: '创建待审核',
  // 平台已审核（待核保审核）
  CREATED_REVIEWED: '平台已审核（待核保审核）',
  // 已核保审核（待申请上架）
  UNDERWRITING_REVIEWED: '已核保审核（待申请上架）',
  // 上架待审核
  ONLINE_WAIT_REVIEW: '上架待审核',
  // 已上架(待弃用)
  ONLINE: '已上架',
  // 待开售
  WAIT_SALE: '待开售',
  // 在售中
  ON_SALE: '在售中',
  // 停售
  HALTED_SALES: '停售',
  //履约中
  ONGOING: '履约中',
  // 已取消
  CANCELLED: '已取消',
  // 已完成
  COMPLETE: '已完成'
} as any
export const getProductStatus = (str = '') => {
  return PRODUCT_STATUS[str] || '错误的商品状态'
}
