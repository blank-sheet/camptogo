export const settledRoutes = [
  {
    path: '/settled',
    name: 'settled',
    component: () => import('../../view/settled/index.vue'),
    children: [
      {
        path: 'step1',
        name: 'step1',
        component: () => import('../../view/settled/components/step1.vue')
      },
      {
        path: 'step2/:type',
        name: 'step2',
        component: () => import('../../view/settled/components/step2.vue')
      },
      {
        path: 'step3/:type',
        name: 'step3',
        component: () => import('../../view/settled/components/step3.vue')
      }
    ]
  }
]