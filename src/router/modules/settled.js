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
      }
    ]
  }
]