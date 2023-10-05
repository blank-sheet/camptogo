import { createRouter, createWebHashHistory } from 'vue-router'
import { officialRoutes } from './modules/official-page'
import { userRoutes } from './modules/user'
import { registerRoutes } from './modules/register'
import { auditRouter } from './modules/audit'
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...officialRoutes, ...userRoutes, ...registerRoutes, ...auditRouter]
})
