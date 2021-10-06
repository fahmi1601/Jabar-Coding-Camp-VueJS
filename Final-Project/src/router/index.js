import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },

  {
    path: '/blogs',
    name: 'Blogs',
    component: () => import('../views/Blogs.vue')
  },

  {
    path: '/manage',
    name: 'Manage',
    component: () => import('../views/Manage.vue'),
    meta: { login: true }
    
  },

  {
    path: '/blog/:id',
    name: 'Blog',
    component: () => import('../views/Blog.vue')
  },

  {
    path: '/search/:query',
    name: 'Search',
    component: () => import('../views/SearchBar.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.login)) {
      let dataStorage = JSON.parse(localStorage.getItem('sanbercode')) //parse data local storage
      let token = dataStorage.auth.token //mengambil data token

      //cek jika panjang token === 0 maka tampilkan alert dan redirect ke halaman utama
      if(token.length === 0) {
          alert('Hanya untuk yang sudah login')
          next('/')
      }else{
          next()
      }
  }else{
      next()
  }
})

export default router
