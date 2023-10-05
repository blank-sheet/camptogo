export const auditRouter = [
  {
    path: '/audit',
    component: () => import('../../view/audit/layout/audit-layout.vue'),
    children: [
      // 基本信息审核
      {
        path: 'basicInfo',
        component: () => import('../../view/audit/basic-info/basic-info-audit.vue')
      },
      {
        path: 'provider',
        component: () => import('../../view/audit/provider/provider-audit.vue')
      },
      {
        path: 'product',
        component: () => import('../../view/audit/product/ProductAudit.vue')
      },
      {
        path: 'insurence',
        component: () => import('../../view/audit/Insurence/InsurenceAudit.vue')
      }
    ]
  },
  {
    path: '/login/audit',
    component: () => import('../../view/audit/login/audit-login.vue')
  }
]
