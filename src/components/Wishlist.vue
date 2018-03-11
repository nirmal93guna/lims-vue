<template>
    <div>
        <div class="request-result">
            WishList
        </div>

        <!-- <div class="preloader">
            <div class="preloadSpinner">
                <md-progress-spinner class="md-accent" :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
            </div>
            <span>Fetching the WishList</span>
        </div>
         -->
    </div>        
 
</template>

<script>
import authentication from '@/authentication'
// import {firebase} from '@/firebase'
export default {
    name: 'wishlist',
    // props: ['isOnline'],    
    /* computed: {
        isAuthenticated() {
            return authentication.isAuthenticated();
        }
    }, */
    methods: {
        /* logOut() {
            authentication.signOut();
        } */
    }    
 }
</script>

<style>

</style>
