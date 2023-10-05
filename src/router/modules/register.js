export const registerRoutes = [
  {
    path: '/register/:encodedStr',
    component: () => import('../../view/register/register.vue')
  }
]
