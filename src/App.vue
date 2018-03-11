<template>
    <div class="container" v-if="isAuthenticated">
        <div class="md-toolbar md-app-toolbar md-primary md-theme-default md-elevation-4 md-no-elevation header">        
            <div class="headerStyle" >Kalinga Library</div>
            <div class="headerNotif">
              <v-touch @tap="callBack(retrieveView.notifications)">
                <vue-material-icon name="notifications"></vue-material-icon>  
              </v-touch>
            </div>
            <!-- <div class="profileMenu">
                <vue-material-icon name="keyboard_arrow_down"></vue-material-icon>  
            </div> -->
            <div v-if="isAuthenticated" class="profileMenu">

              <div class="profilePic">
                <img id="userImage" class="profile-pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSODALYDYo2dqN0DG_kPNi2X7EAy1K8SpRRZQWkNv9alC62IHggOw" />
              </div>

              <v-touch class="menu__item menu__item--dropdown" 
                          @tap="toggle('ranking')" 
                          v-bind:class="{'open' : dropDowns.ranking.open}">                
                <a class="menu__link menu__link--toggle" href="#">			              
                <md-icon class="tabsIcon">keyboard_arrow_down</md-icon>
                </a>

                <ul class="dropdown-menu">
                  <li class="dropdown-menu__item">
                    <a class="dropdown-menu__link1" href="#">{{userName}}</a>
                  </li>

                  
                  <li class="dropdown-menu__item">
                    <v-touch class="md-layout-item" @tap="callBack(retrieveView.acknowledgement)">
                      <md-icon class="menu-icon">new_releases</md-icon>
                      <a class="dropdown-menu__link" href="#">Acknowledgement</a>
                    </v-touch>
                  </li>

                  <li class="dropdown-menu__item">
                    <v-touch class="md-layout-item" @tap="callBack(retrieveView.help)">
                      <md-icon class="menu-icon">help</md-icon>
                      <a class="dropdown-menu__link" href="#">Help</a>
                    </v-touch>
                  </li>

                  <li class="dropdown-menu__item">
                    <v-touch class="md-layout-item" @tap="logOut()">
                      <md-icon class="menu-icon">exit_to_app</md-icon>
                      <a class="dropdown-menu__link" href="#">Log Out</a>
                    </v-touch>
                  </li>
                                                      
                </ul>
              </v-touch>
             </div>
        </div> 
        <!-- {{user}} -->
        <div class="routeBody">
            <router-view :userid="this.userID" />

        </div>

        <div class="footer">
            <md-bottom-bar md-sync-route>
                <v-touch class="md-layout-item" @tap="callBack(retrieveView.home)"><md-bottom-bar-item class="md-layout-item tabsIcon" md-icon="home"></md-bottom-bar-item></v-touch>
                <v-touch class="md-layout-item" @tap="callBack(retrieveView.search)"><md-bottom-bar-item class="md-layout-item tabsIcon" md-icon="search"></md-bottom-bar-item></v-touch>
                <v-touch class="md-layout-item" @tap="callBack(retrieveView.wishlist)"><md-bottom-bar-item class="md-layout-item tabsIcon" md-icon="favorite_border"></md-bottom-bar-item></v-touch>
                <v-touch class="md-layout-item" @tap="callBack(retrieveView.recommendations)"><md-bottom-bar-item class="md-layout-item tabsIcon" md-icon="bookmark"></md-bottom-bar-item></v-touch>
            </md-bottom-bar>
        </div>




       
        
    </div>

</template>

<script>
import authentication from "./authentication";
// import { isConnected } from "./firebase";
import endpoint from "@/endpoint";

export default {
  name: "app",
  data() {
    return {
      retrieveView: {
        home: "",
        search: "search",
        wishlist: "wishlist",
        recommendations: "recom",
        notifications: "notifications",
        acknowledgement: "acknowledgement",
        help: "help"
      },
      dropDowns: {
        ranking: { open: false}  
      },
      userName: null,
      userID: null
    }
  },

  computed: {
    isAuthenticated() {
      return authentication.isAuthenticated();
    }

  },
  ready: function()
  {
    var self = this
    window.addEventListener('click', function(e){
      if (! e.target.parentNode.classList.contains('menu__link--toggle'))
      {
        self.close()
      }
    }, false)
  },
  methods: {
    callBack(page) {
      // this.close();
      this.$router.push(`/${page}`);
      // console.log(page);
    },    
    logOut(data) {
      // console.log(data);
      authentication.signOut();
    },
    toggle: function(dropdownName)
    {
       this.dropDowns[dropdownName].open = !this.dropDowns[dropdownName].open;
     
    },
    
    close: function()
    {
      for (dd in this.dropDowns)
      {
        this.dropDowns[dd].open = false;    
      }
    }
    
    
  },
  mounted: function() {
        authentication.getUserProfile().then(data => {
          this.userName = data.name;
          this.userID = data.upn.substring(0, 8);
          // console.log(this.userID);
        });    
        authentication.getPhoto().then(data => {
          const request = new XMLHttpRequest();
          request.open('GET', 'https://graph.microsoft.com/beta/me/photo/$value');
          request.setRequestHeader('Authorization', 'Bearer' + data);
          request.responseType = 'blob';
          request.onload = function () {
            if (request.readyState === 4 && request.status === 200) {
              const reader = new FileReader();
              reader.onload = function () {
                // console.log('sending url');
                // document.getElementById('userImage').src = reader.result;
                document.getElementById('userImage').setAttribute('src', reader.result);
              };
              reader.readAsDataURL(request.response);
            }
          };
          request.send(null);
        });
         
  }
};
</script>

<style>
@import "../static/css/main.css";
</style>
