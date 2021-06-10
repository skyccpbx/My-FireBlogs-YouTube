import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      requiresAuth: false,
    },
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: () => import(/* webpackChunkName: "Blogs" */ '../views/Blogs.vue'),
    meta: {
      title: '博客',
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
    meta: {
      title: 'Login',
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue'),
    meta: {
      title: 'Register',
      requiresAuth: false,
    },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import(/* webpackChunkName: "ForgotPassword" */ '../views/ForgotPassword.vue'),
    meta: {
      title: 'Forgot Password',
      requiresAuth: false,
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "Admin" */ '../views/Admin.vue'),
    meta: {
      title: 'Admin',
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile.vue'),
    meta: {
      title: 'Profile',
      requiresAuth: true,
    },
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: () => import(/* webpackChunkName: "CreatePost" */ '../views/CreatePost.vue'),
    meta: {
      title: 'Create Post',
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: '/blog-preview',
    name: 'BlogPreview',
    component: () => import(/* webpackChunkName: "PostPreview" */ '../views/BlogPreview.vue'),
    meta: {
      title: 'Preview Blog Post',
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: '/news/:blogid',
    name: 'ViewBlog',
    component: () => import(/* webpackChunkName: "ViewBlog" */ '../views/ViewBlog.vue'),
    meta: {
      title: 'View Blog Post',
      requiresAuth: false,
    },
  },
  {
    path: '/editNews/:blogid',
    name: 'EditBlog',
    component: () => import(/* webpackChunkName: "ViewBlog" */ '../views/EditBlog.vue'),
    meta: {
      title: 'Edit Blog Post',
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

//页面title动态设置
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | FireBlog`
  next()
})

router.beforeEach(async (to, from, next) => {
  let user = firebase.auth().currentUser
  let admin = null
  if (user) {
    let token = await user.getIdTokenResult()
    admin = token.claims.admin
  }
  if (to.matched.some(res => res.meta.requiresAuth)) {
    if (user) {
      if (to.matched.some(res => res.meta.requiresAdmin)) {
        if (admin) {
          return next()
        }
        return next({ name: 'Home' })
      }
      return next()
    }
    return next({ name: 'Home' })
  }
  return next()
})

export default router
