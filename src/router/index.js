import { createRouter, createWebHistory } from 'vue-router'
import CarsPage from '../views/CarsPage.vue'
import CarPage from '../views/CarPage.vue'

const routes = [
    { path: '/', name: 'CarsPage', component: CarsPage },
    { path: '/:id', name: 'CarPage', component: CarPage, props: true },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
