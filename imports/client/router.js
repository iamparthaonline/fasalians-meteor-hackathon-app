import VueRouter from 'vue-router';

const router = new VueRouter({
  base: '/',
  routes: [
    {
      path: '/',
      redirect() {
        if (Meteor.userId()) return {name: 'dashboard'};
        return {name: 'login'};
        // return {name: 'forum'};
      },
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/login/index.vue'),
      beforeEnter: (_, _1, next) => {
        if (Meteor.userId()) next({name: 'dashboard', replace: true});
        else next();
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./pages/dashboard/index.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/forum',
      name: 'forum',
      component: () => import('./pages/forum/index.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '*',
      name: 'notFound',
      component: () => import('./pages/404/index.vue'),
    },
  ],
  mode: 'history',
});

router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (Meteor.userId()) {
      if (Meteor.user()) next();
      else {
        Tracker.autorun(t => {
          const user = Meteor.user();
          if (user) {
            next();
            t.stop();
          }
        });
      }
    } else next({name: 'login', replace: true});
  } else next();
});

Meteor.startup(() => {
  Meteor.subscribe('userData');
});

export default router;
