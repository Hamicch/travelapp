import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store"

Vue.use(VueRouter);

const routes = [

  {
    path: "/",
    name: "home",
    component: Home,
    props: true
  },
  {
    path: "/destination/:slug",
    name: "DestinationDetails",
    props: true,
    component: () => import(/* webpackChunkName: "DestinationDetails" */"../views/DestinationDetails"),
    children: [
      {
        path: ":experienceSlug",
        name: "experienceDetails",
        props: true,
        component: () => import(/* webpackChunkName: "DestinationDetails" */ "../views/ExperienceDetails")
      }
    ],
    beforeEnter: (to, from, next) => {
      const exist = store.destinations.find(
        destination => destination.slug === to.params.slug
      );
      if (exist) {
        next();
      }
      else {
        next({ name: "notFound" });
      }
    }
  },
  {
    path: "/user",
    name: "user",
    component: () => import(/* webpackChunkName: "User" */ "../views/User"),
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "Login" */ "../views/Login")

  },
  {
    path: "/invoice",
    name: "invoice",
    component: () => import(/*  webpackChunkName: "Invoices" */ "../views/Invoices")
  },
  {
    path: "/404",
    alias: "*",
    name: "notFound",
    component: () => import(/*  webpackChunkName: "NotFound" */ "../views/NotFound")
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
  linkExactActiveClass: "travel-app-active-link",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    else {
      const position = {}
      if (to.hash) {
        position.selector = to.hash;
        if (to.hash === "#experience") {
          position.offset = { y: 140 }
        }
        if (document.querySelector(to.hash)) {
          return position;
        }
        return false;
      }
    }
  }

});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.user) {
      next({
        name: "login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
