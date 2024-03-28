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
      },
      {
        path: 'step4/:type',
        name: 'step4',
        component: () => import('../../view/settled/components/step4.vue')
      },
      {
        path: 'step5/:type',
        name: 'step5',
        component: () => import('../../view/settled/components/step5.vue')
      },
      {
        path: 'step6/:type',
        name: 'step6',
        component: () => import('../../view/settled/components/step6.vue')
      },
      {
        path: 'step7/:type',
        name: 'step7',
        component: () => import('../../view/settled/components/step7.vue')
      },
      {
        path: 'step8/:type',
        name: 'step8',
        component: () => import('../../view/settled/components/step8.vue')
      },
      {
        path: 'step9/:type',
        name: 'step9',
        component: () => import('../../view/settled/components/step9.vue')
      }
    ]
  }
]