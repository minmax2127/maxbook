const routes = [
  {
    path: '/',
    component: () => import('layouts/NoLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/IndexPage.vue') }
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'testing', component: () => import('pages/TestingPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
