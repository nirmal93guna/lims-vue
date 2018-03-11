import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Recommendations from '@/components/Recommendations'
import SearchBook from '@/components/SearchBook'
import DetailView from '@/components/DetailView'
import BookDetail from '@/components/BookDetail'
import Wishlist from '@/components/Wishlist'
import Acknowledgement from '@/components/Acknowledgement'
import Help from '@/components/Help'
import Notifications from '@/components/Notifications'
import authentication from '../authentication'
import endpoint from '../endpoint'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuthentication: true
      }
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/acknowledgement',
      name: 'Acknowledgement',
      component: Acknowledgement
    },
    {
      path: '/notifications',
      name: 'Notifications',
      component: Notifications
    },
    {
      path: '/search',
      name: 'SearchBook',
      component: SearchBook
     },
    {
      path: '/detail-view/',
      name: 'DetailView',
      props: true,
      component: DetailView
    },
    {
      path:'/book-detail',
      name:'BookDetail',
      props:true,
      component:BookDetail

    },
    {
      path: '/recom',
      name: 'Recommendations',
      component: Recommendations
      /* meta: {
        requiresAuthentication: true
      } */
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: Wishlist
      /* meta: {
        requiresAuthentication: true
      } */
    }
    
  ]
});



// Global route guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuthentication)) {
    // this route requires auth, check if logged in
    if (authentication.isAuthenticated()) {
      // only proceed if authenticated.
      next();
    } else {
      authentication.signIn();
    }
  } else {
    next();
  }
});


export default router;