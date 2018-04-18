
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },

   {
    path: '/generateur',
    component: () => import('layouts/generateur'),
    children: [
      { path: '', component: () => import('pages/generateur') }
    ]
  },

  {
    path: '/configuration',
    component: () => import('layouts/generateur'),
    children: [
      { path: '', component: () => import('pages/configuration') }
    ]
  }, 

  {
    path: '/bugs',
    component: () => import('layouts/generateur'),
    children: [
      { path: '', component: () => import('pages/bugs') }
    ]
  }, 

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
