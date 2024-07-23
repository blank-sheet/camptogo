export const auditRouter = [
  {
    path: '/audit',
    component: () => import('../../view/audit/layout/audit-layout.vue'),
    children: [
      // 基本信息审核
      {
        path: 'basicInfo',
        name: 'audit-basicInfo',
        component: () => import('../../view/audit/basic-info/basic-info-audit.vue')
      },
      {
        path: 'provider',
        name: 'audit-provider',
        component: () => import('../../view/audit/provider/provider-audit.vue')
      },
      {
        path: 'product',
        name: 'audit-product',
        component: () => import('../../view/audit/product/ProductAudit.vue')
      },
      {
        path: 'insurence',
        name: 'audit-insurence',
        component: () => import('../../view/audit/Insurence/InsurenceAudit.vue')
      },
      {
        path: 'refund',
        name: 'audit-refund',
        component: () => import('../../view/audit/refund/refund-audit.vue')
      },
    ]
  },
  {
    path: '/login/audit',
    component: () => import('../../view/audit/login/audit-login.vue')
  },
  {
    path: '/insurence',
    component: () => import('../../view/audit/layout/insurance-layout.vue'),
    children: [
      {
        path: 'audit',
        name: 'insurence-audit',
        component: () => import('../../view/audit/Insurence/InsurenceAudit.vue')
      }
    ]
  }
]
