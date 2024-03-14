import { createRouter, createWebHashHistory } from 'vue-router'
import { officialRoutes } from './modules/official-page'
import { userRoutes } from './modules/user'
import { registerRoutes } from './modules/register'
import { auditRouter } from './modules/audit'
import { settledRoutes } from './modules/settled'
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...officialRoutes, ...userRoutes, ...registerRoutes, ...auditRouter, ...settledRoutes]
})
