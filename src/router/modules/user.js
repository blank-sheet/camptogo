// 商户端路由
export const userRoutes = [
  {
    path: '/user',
    component: () => import('../../view/user/layout/user-layout.vue'),
    children: [
      {
        path: 'workbench',
        component: () => import('../../view/user/workbench/layout/workbench-layout.vue'),
        children: [
          // 基本信息
          {
            path: 'basicInfo',
            name:'basicInfo',
            component: () => import('../../view/user/workbench/basic-Info/basic-info.vue')
          },
          // 商品发布
          {
            path: 'productLunch',
            name:'productLunch',
            component: () => import('../../view/user/workbench/product-lunch/product-lunch.vue')
          },
          {
            path: 'product/:id',
            name: 'product',
            component: () => import('../../view/user/workbench/product-lunch/product-detail.vue')
          },
          {
            path: 'product/:id/rgsForm',
            name: 'rgsForm',
            component: () => import('../../view/user/workbench/product-lunch/product-regForm.vue')
          },
          {
            path: 'schedule/:id',
            name: 'schedule',
            component: () => import('../../view/user/workbench/product-lunch/change-schedule.vue')
          },
          // 商品管理
          {
            path: 'product-manage',
            name: 'product-manage',
            component: () => import('../../view/user/workbench/product-manage/product-manage.vue')
          },
          // 主理人设置
          {
            path: 'provider-setting',
            name: 'provider-setting',
            component: () =>
              import('../../view/user/workbench/provider-setting/ProviderSetting.vue')
          },
          // 订单管理
          {
            path: 'manager-ordering',
            name: 'manager-ordering',
            component: () =>
              import('../../view/user/workbench/manager-ordering/manager-ordering.vue')
          },
          // 使用反馈
          {
            path: 'feedback',
            name: 'feedback',
            component: () => import('../../view/user/workbench/feedback/feedback.vue')
          },
          {
            path: 'progress',
            name: 'mprogress',
            component: () => import('../../view/user/workbench/progress/progress.vue')
          }
        ]
      },
      {
        path: 'rule/:id',
        component: () => import('../../view/user/rules/rule.vue')
      },
      {
        path: 'message',
        component: () => import('../../view/user/message/message.vue')
      },
      {
        path: 'fiance',
        component: () => import('../../view/user/fiance/fiance.vue')
      }
    ]
  }
]
