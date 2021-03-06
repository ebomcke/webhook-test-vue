import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";
import Home from "./views/Home.vue";
import Account from "./views/Account.vue";
import Endpoints from "./views/Endpoints.vue";
import Endpoint from "./views/Endpoint.vue";
import Webhooks from "./views/Webhooks.vue";
import Webhook from "./views/Webhook.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/account",
      name: "account",
      component: Account,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/endpoints",
      name: "endpoints",
      component: Endpoints,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/endpoints/:id",
      name: "endpoint",
      component: Endpoint,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/webhooks",
      name: "webhooks",
      component: Webhooks,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/webhooks/:id",
      name: "webhook",
      component: Webhook,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    next("/");
  } else {
    next();
  }
});

export default router;
