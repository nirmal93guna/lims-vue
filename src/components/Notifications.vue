<template>
  <div>
        <div class="request-result">
            Notifications
        </div>
        <p class="notifPara">
            *Notifications Coming Soon!
        </p>

        <v-touch @tap="notificationPush()">
            <md-button class="md-raised md-accent accent">Notifications</md-button>
        </v-touch>
        <span>
            
        </span>
  </div>
</template>

<script>
import pushmanager from '../pushmanager';
export default {
    name: 'notifications',
    methods: {
        // enablePush: function() {
        //     if('serviceWorker' in navigator) {
        //         console.log('SW present');
        //     }
        //     var reg;
        //     navigator.serviceWorker.ready
        //         .then(function(swreg) {
        //             reg = swreg;
        //             return swreg.pushManager.getSubscription();
        //         })
        //         .then(function(sub) {
        //             if(sub === null) {
        //                 reg.pushManager.subscribe({
        //                     userVisibleOnly: true
        //                 });
        //             } else {

        //             }
        //         })
        // },
        notificationPush: function() {
            Notification.requestPermission();
            // alert('I havent reasched');
            console.log("Notification granted");
            var notification = new Notification("YOUR MESSAGE");
        //     this.enablePush();
            // alert(pushmanager.check);
        }
    }
}
</script>

<style>
.notifPara {
    margin-top: 1em;
    color: #ff4500;
    font-size: larger;
    text-align: center;
}
</style>
