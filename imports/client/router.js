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
      path: '/explore',
      name: 'explore',
      component: () => import('./pages/explore/index.vue'),
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
      path: '/forum/:userId',
      name: 'user-forum',
      component: () => import('./pages/forum/index.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('./pages/forum/postDetail.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '*',
      name: 'notFound',
      component: () => import('./pages/404/index.vue'),
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: () => import('./pages/onboarding/index.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./pages/profile/index.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/edit-profile',
      name: 'editProfile',
      component: () => import('./pages/editProfile/index.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('./pages/report/index.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/report-details/:id',
      name: 'report-details',
      component: () => import('./pages/reportDetails/index.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/report-list',
      name: 'report-list',
      component: () => import('./pages/reportsList/index.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/public-profile/user/:userId',
      name: 'public-profile',
      component: () => import('./pages/TheRealPublicProfile/index.vue'),
      meta: {
        requiresAuth: true,
      },
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
