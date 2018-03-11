<template>
  <div v-if="genre">
       <!-- <div>{{genre}}</div> -->
      <div class="searchCondition">
        
            <button class="btnFilter" @click="changeSearch('true')">Title</button>
             <button class="btnFilter" @click="changeSearch('false')">Author</button>
      </div>

      <div>
            <md-card md-with-hover class="searchCard">
                <md-ripple class="formCard">
                        <md-field>
                            <label class="labelInput">Search</label>
                            <md-input type="text" class="searchInput" v-model="search" @keyup="searchModify()"/>
                        </md-field>
                </md-ripple>
            </md-card>
      </div>

        <div class="request-result">
            Search Books
        </div>

      <div v-for="book in listUpdated" :key="book._id">
        
          <md-card md-with-hover class="detailCard">
            <md-ripple>
                <div class="md-layout md-gutter cardLayout">
                  <v-touch class="touchPart" @tap="callBack(retrieveView.BookDetail ,book)">
                    <div class="md-layout-item md-size-25 bookImage">
                        <img :src="book.newImage">
                        <!-- <img src="@/assets/images/noBookAvail.png"> -->
                    </div>
                    <div class="md-layout-item md-size-65 titleContent">
                        <span class="bookTitle">{{book.title}}</span>
                        <span class="authorName">{{book.authors}}</span>
                    </div> 
                  </v-touch>
                    <div class="md-layout-item md-size-10">


                      <md-menu>
                        <md-button class="md-icon-button" md-menu-trigger>
                          <md-icon class="bookMenu">more_vert</md-icon>
                        </md-button>

                        <md-menu-content class="mdMenu">
                          <v-touch @tap="requestBook(book.isbn)">
                            <md-menu-item class="menuColor">
                              <md-icon>pan_tool</md-icon>
                              <span>Request a Book</span>
                            </md-menu-item>
                          </v-touch>

                          <v-touch @tap="wishlistBook(book.isbn)">
                            <md-menu-item>
                              <md-icon>favorite_border</md-icon>
                              <span>Add to Wishlist</span>
                            </md-menu-item>
                          </v-touch>

                          <v-touch @tap="callBack(retrieveView.BookDetail ,book)">
                            <md-menu-item>
                              <md-icon>details</md-icon>
                              <span>Show Detail</span>
                            </md-menu-item>
                          </v-touch>
                        </md-menu-content>
                      </md-menu>

                    </div>
                </div>
            </md-ripple>
          </md-card>      
      </div>

      <div style="color: white;">Hello</div>
      
      
      <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
            <span>{{snackMessage}}</span>
            <md-button class="md-primary" @click="showSnackbar = false">Ok</md-button>
      </md-snackbar>
  </div>
  <div v-else>Not loaded</div>
</template>

<script>
import endpoint from "../endpoint";
export default {
  name: 'detailview',
  props: ['genre', 'userid'],
  data() {
    return {
      list: null,
      listUpdated: null,
      search: '',
      searchSelect: 'true',
      retrieveView: {
        BookDetail: "book-detail"
      },
      dropDowns: {
        ranking: { open: false}  
      },
      showSnackbar: false,
      position: "center",
      duration: 4000,
      isInfinity: false,
      snackMessage: null
    };
  },
  created: function() {
    
  },
  methods: {
    changeSearch: function(value) {
      this.searchSelect = value;
      this.listUpdated = this.list;
      console.log(this.searchSelect);
    },
    searchModify: function() {
      // console.log(this.search);
      if(this.searchSelect == "true") {
        this.listUpdated = this.list.filter(list => {
          return list.title.toLowerCase().includes(this.search.toLowerCase())
        })
      } else {
        this.listUpdated = this.list.filter(list => {
          return list.authors.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    },
    getMyBookId: function(name) {
      this.$http.get(endpoint.getMyBookIDs + name).then(
        function(response) {
            // console.log(response.data);
          var requestFlag = false;
          var bookRate,books = [];
          this.userBookIds = response.data;
          var totalLength =response.data[0].issueDetails.length +response.data[0].requestedBookDetails.length;
        //   console.log(totalLength);
          if (totalLength > 0) {
            let bookIds = [];
            for (let i = 0; i < response.data[0].issueDetails.length; i++) {
              var bookId = response.data[0].issueDetails[i].bookId;
            //   console.log(bookId);              
              var isbn = bookId.slice(0, 13);
              bookIds.push({ isbn: isbn, isRequested: false });
            }
            for (let i = 0;i < response.data[0].requestedBookDetails.length;i++) {
              const isbn = response.data[0].requestedBookDetails[i].isbn;
              bookIds.push({ isbn: isbn, isRequested: true });
            }
            for (let i = 0; i < bookIds.length; i++) {
              this.$http.get(endpoint.getMyBook + bookIds[i].isbn + "/" + name).then(
                function(response) {
                  if (response.data[0].isbn === bookIds[i].isbn) {
                      requestFlag = bookIds[i].isRequested;
                }
            if (requestFlag === false) {
                response.data[0].isIssued = true;
                for (let k = 0; k < response.data[0].issueDetails.length; k++) {
                  if (response.data[0].issueDetails[k].mId === name) {
                    if (response.data[0].issueDetails[k].returnRequest === true) {
                      response.data[0].isReturnRequested = true;
                    } else {
                      response.data[0].isReturnRequested = false;
                    }
                  }
                }
                books.push(response.data[0]);
              } else {
                response.data[0].isReturnRequested = false;
                response.data[0].isIssued = false;
                books.push(response.data[0]);
                this.userIssuedBooks = books;
                // console.log('books',this.userIssuedBooks);
              }
                },
                function(error) {
                  console.log(error.statusText);
                }
              );
            }
          }
        },
        function(error) {
          console.log(error.statusText);
        }
      );
    },
    requestBook: function(isbn) {
      console.log(isbn);
      this.$http.get(endpoint.request +this.userid+"/"+isbn).then(
        function(response) {
            console.log("response.data", response);
            if (response._body === 'failed') {
              this.snackMessage = 'Sorry. Book not available right now...';
              this.showSnackbar = true;
            } else if (response._body === 'Too many requests') {
              // console.log('Too many requests for the same book. Please try later ...');
              this.snackMessage = 'Too many requests for the same book. Please try later ...';
              this.showSnackbar = true;
            } else if (response._body === 'Max') {
              // console.log('Sorry. You can not take more than 3 books ...');
              this.snackMessage = 'Sorry. You can not take more than 3 books ...';
              this.showSnackbar = true;
            } else if (response._body === 'already Issued') {
              // console.log('Sorry. You have already Issued this book ...');
              this.isDisabled = true;
              this.snackMessage = 'Sorry. You have already Issued this book ...';
              this.showSnackbar = true;
            } else if (response._body === 'Already Requested') {
              // console.log('Sorry. You have already Requested this book ...');
              this.isDisabled = true;
              this.snackMessage = 'Sorry. You have already Requested this book ...';
              this.showSnackbar = true;
            } else {
              // console.log('Successfully requested for book. Collect book from kalinga library within 2 days');
              this.snackMessage = 'Successfully requested for book. Collect book from kalinga library within 2 days';
              this.showSnackbar = true;
            }
        },
        function(error) {
            console.log(error.statusText);
        }
      );
    },
    wishlistBook: function(isbn) {
       this.$http.get(endpoint.addtowishlist +this.userid+"/"+isbn).then(
        function(response) {
          this.getMyBookId(this.userid);
        });
    
    },
    toggle: function(dropdownName)
    {
       this.dropDowns[dropdownName].open = !this.dropDowns[dropdownName].open;
     
    },

    callBack(page,isbn) {
    this.$router.push({name: 'BookDetail', params: {isbn:isbn}});
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
    console.log("endpoint.getByCategory", endpoint.getByCategory + this.genre);
    this.$http.get(endpoint.getByCategory + this.genre).then(
      function(response) {
        console.log("pure data",response.data)
        for( let v = 0 ; v < response.data.length ; v++) {
          var strLength = response.data[v].image.length;
          var bookString = response.data[v].image.substring(15, strLength);
          response.data[v].newImage = require('@/assets/images' + bookString);
          // response.data[v].newImage = '@/assets/images/68.png';
          // console.log(response.data[v].newImage);
        }
        this.list = response.data;
        this.listUpdated = this.list;
        console.log("List:", this.list);    

        this.list = this.list.filter(list => {
        return list.title.toLowerCase().includes(this.search.toLowerCase())        
        })
        console.log("Updated", this.list);
      },
      function(error) {
        console.log(error.statusText);
      }
    );
    this.getMyBookId(this.userid);
  }

};
</script>

<style>
.searchCondition {
  height: auto;
  /* border: 1px solid red; */
  margin: 5px;
}
.btnFilter {
  width: 49.25%;
  display: inline-block;
  font-weight: 400;
  line-height: 1.25;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 2px solid rgba(0, 0, 0, 0);
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease-in-out;
  /* box-sizing: border-box; */
}

.btnFilter:active {
  border: 1px solid black;
}

.btnFilter:focus {
  border: 2px solid black;
}
.labelInput {
  color: rgba(0, 0, 0, 0.54);
}
form:focus-within {
  color: blue !important;
}
.searchCard {
  padding-bottom: 10px;
  padding-top: 10px;
  margin-left: 10px;
  border-right-width: 10px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 2px;
  font-family: Roboto, Helvetica Neue, sans-serif;
}
.formCard {
  padding-left: 15px !important;
  padding-right: 15px !important;
  /* line-height: 1.125; */
}
.searchInput {
  border-bottom: 1px solid rgba(0, 0, 0, 0.42) !important;
}
form > md-field:focus > label.labelInput {
  color: blue;
}
.detailCard {
  height: 5em;
  padding: 0.25em 0.5em;
  margin: 1em 0.5em;
  /* box-sizing: border-box; */
}

.titleContent {
  float: left;
  max-width: 75%;
}
.titleContent > .bookTitle {
  font-size: 1rem !important;
  font-weight: 700 !important;
  overflow: hidden !important;
  max-height: 3em !important;
}
.titleContent > .authorName {
  font-size: 0.75rem !important;
}
.bookImage {
  padding-left: 15px !important;
  padding-right: 15px !important;
  margin-right: 0px;
  float: left;
}
.bookImage > img {
  width: 3em;
  height: 4.5em;
  border: 1px solid rgba(0, 0, 0, 0.24);
  background-size: 3em 4.5em;
}
.touchPart {
  float: left;
  width: 90%;
}


.bookOptions {
  color: black;
}




.book__menu {
  color: black !important;
}
.menuColor {
  color: rgba(0,0,0,.87) !important;
}





</style>
