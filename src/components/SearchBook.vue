<template>
   <div>
        <div class="md-layout md-gutter searchLayout">
            <div class="md-layout-item layoutItem" >
               <v-touch @tap="callBack(retrieveView.DetailView ,'Technology')"> 
                <!--  <v-touch @tap="getBookByGenre('Technology')">  -->
                <md-card md-with-hover class="genreCard">
                    <md-ripple>
                        <md-card-media class="iconBlock">
                            <md-icon class="iconType">games</md-icon>
                        </md-card-media>
                        <md-card-header class="cardType">Technology</md-card-header>
                    </md-ripple>
                </md-card></v-touch>
            </div>
            <div class="md-layout-item layoutItem">
                <v-touch @tap="callBack(retrieveView.DetailView ,'Science')">   
                <md-card md-with-hover class="genreCard">
                    <md-ripple class="">
                        <md-card-media class="iconBlock">
                            <md-icon class="iconType">fingerprint</md-icon>
                        </md-card-media>
                        <md-card-header class="cardType">Science</md-card-header>
                    </md-ripple>
                </md-card></v-touch>
            </div>
            <div class="md-layout-item layoutItem">
                <v-touch @tap="callBack(retrieveView.DetailView ,'Fiction')"> 
                <md-card md-with-hover class="genreCard">
                    <md-ripple class="">
                        <md-card-media class="iconBlock">
                            <md-icon class="iconType">face</md-icon>
                        </md-card-media>
                        <md-card-header class="cardType">Fiction</md-card-header>
                    </md-ripple>
                </md-card></v-touch>
            </div>
        </div>

        <div class="md-layout md-gutter searchLayout">
            <div class="md-layout-item layoutItem">
                <v-touch @tap="callBack(retrieveView.DetailView ,'GK')">  
                <md-card md-with-hover class="genreCard">
                    <md-ripple class="">
                        <md-card-media class="iconBlock">
                            <md-icon class="iconType">highlight</md-icon>
                        </md-card-media>
                        <md-card-header class="cardType">GK</md-card-header>
                    </md-ripple>
                </md-card></v-touch>
            </div>
            <div class="md-layout-item layoutItem">
                <v-touch @tap="callBack(retrieveView.DetailView ,'Business')"> 
                <md-card md-with-hover class="genreCard">
                    <md-ripple class="">
                        <md-card-media class="iconBlock">
                            <md-icon class="iconType">work</md-icon>
                        </md-card-media>
                        <md-card-header class="cardType">Business</md-card-header>
                    </md-ripple>
                </md-card></v-touch>
            </div>
            <div class="md-layout-item layoutItem">
                <v-touch @tap="callBack(retrieveView.DetailView ,'Management')">  
                <md-card md-with-hover class="genreCard">
                    <md-ripple class="">
                        <md-card-media class="iconBlock">
                            <md-icon class="iconType">supervisor_account</md-icon>
                        </md-card-media>
                        <md-card-header class="cardType">Management</md-card-header>
                    </md-ripple>
                </md-card></v-touch>
            </div>
        </div>

        <div class="md-layout md-gutter searchLayout">
            <div class="md-layout-item layoutItem">
                <v-touch @tap="callBack(retrieveView.DetailView ,'Sports')"> 
                <md-card md-with-hover class="genreCard">
                    <md-ripple class="">
                        <md-card-media class="iconBlock">
                            <md-icon class="iconType">accessibility</md-icon>
                        </md-card-media>
                        <md-card-header class="cardType">Sports</md-card-header>
                    </md-ripple>
                </md-card></v-touch>
            </div>
            <div class="md-layout-item layoutItem">
                <v-touch @tap="callBack(retrieveView.DetailView ,'History')">  
                <md-card md-with-hover class="genreCard">
                    <md-ripple class="">
                        <md-card-media class="iconBlock">
                            <md-icon class="iconType">history</md-icon>
                        </md-card-media>
                        <md-card-header class="cardType">History</md-card-header>
                    </md-ripple>
                </md-card></v-touch>
            </div>
            <div class="md-layout-item layoutItem">
                <v-touch @tap="callBack(retrieveView.DetailView ,'Others')">
                <md-card md-with-hover class="genreCard">
                    <md-ripple class="">
                        <md-card-media class="iconBlock">
                            <md-icon class="iconType">gesture</md-icon>
                        </md-card-media>
                        <md-card-header class="cardType">Others</md-card-header>
                    </md-ripple>
                </md-card></v-touch>
            </div>
        </div> 

    </div>
</template>

<script>
import endpoint from "../endpoint";
export default {
  name: "search",
  data() {
    return {
      retrieveView: {
        DetailView: "detail-view"
      }};
  },
  methods: {
    callBack(page,genre) {
    //   this.$router.push(`/search/${page}/`+genre);
    this.$router.push({name: 'DetailView', params: {genre:genre}});
    //   this.$router.push(`/search/${page}`);      
    }
    
  }
};
</script>

<style>
.searchLayout {
  padding: 5px;
}

.layoutItem {
  height: 8em !important;
}

.layoutItem:after {
  width: 100%;
  height: 100%;
  display: block;
  /* background: #ef9a9a; */
  content: " ";
}
.genreCard {
  height: 7em;
  margin: 0.5em;
}
.mediaIcon {
  color: black;
}
.cardType {
  font-family: Roboto, Helvetica Neue, sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  padding: 0 !important;
}
.iconBlock {
  height: 4em;
  text-align: center;
  line-height: 4em;
}
.iconBlock > .iconType {
  color: black !important;
}
</style>
