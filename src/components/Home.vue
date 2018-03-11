<template>
    <div class="homeRoute"> 
        <div class="request-result">
            Requested Books
        </div>
        <!-- <div v-if="userIssuedBooks == null" class="loadSpinner">
            <md-progress-spinner class="md-accent" :md-diameter="100" :md-stroke="10" md-mode="indeterminate">                
            </md-progress-spinner>


        </div> -->
        <div class="booksContainer">
            <div class="bookCards" v-for="books in userIssuedBooks" :key="userIssuedBooks._id">
                <md-card md-with-hover class="cardHeight">
                    <md-ripple class="rippleClass">
                        <div class="row">
                            <div class="md-layout md-gutter">
                                <div class="md-titleBook md-layout-item md-size-33">
                                    <!-- <img class="bookPhoto" src="@/assets/images/noBookAvail.png"> -->
                                    <img class="bookPhoto" :src="books.newImage">
                                </div>
                                <div class="md-title md-layout-item md-size-66 titleCard">
                                    <span class="bookTitle">{{books.title}}</span>
                                    <span class="authorName">{{books.authors}}</span>
                                    <span class="dueDateClass" v-if="books.isIssued && !books.isReturnRequested">Due Date: {{books.dueDate}}</span>
                                </div> 
                            </div>
                        </div>

                        <div class="row actionSpace">
                            <div class="availableBooks">Available: {{books.available}}</div>
                            <div class="buttonAction">
                                <v-touch @tap="cancelBook(books.isbn)" v-if="!books.isReturnRequested && !books.isIssued" >  
                                    <md-button class="md-raised md-accent accent buttonHeight">Cancel</md-button>
                                </v-touch>
                                <v-touch @tap="renewBook(books.issueDetails)" v-if="!books.isReturnRequested && books.isIssued && books.issueDetails[0].isRenewable">
                                    <md-button class="md-raised md-accent accent buttonHeight">Renew</md-button>
                                </v-touch>
                                <v-touch @tap="returnBook(books)" v-if="!books.isReturnRequested && books.isIssued">
                                    <md-button class="md-raised md-accent accent buttonHeight">Return</md-button>
                                </v-touch>
                            </div>                            
                        </div>
                        <div class="row collection" v-if="!books.isIssued && !books.isReturnRequested">
                            Please collect this book from the library!
                        </div>
                                      
                    </md-ripple>
                </md-card>
            </div>
        </div>




        <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
            <span>{{snackMessage}}</span>
            <md-button class="md-primary" @click="showSnackbar = false">Ok</md-button>
        </md-snackbar>

        

    </div>
 
</template>

<script>
import authentication from "../authentication";
import endpoint from "../endpoint";
import { firebase } from "@/firebase";
export default {
  name: "home",
  props: ['userid'],
  data: function() {
    return {
      userIssuedBooks: null,
      userBookIds: null,
      showSnackbar: false,
      position: "center",
      duration: 4000,
      isInfinity: false,
      snackMessage: null,
      userID: null,
    };
  },
  methods: {
    getMyBookId: function(name) {
      this.$http.get(endpoint.getMyBookIDs + name).then(
        function(response) {
            //  console.log("pure-data",response.data);
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
              // if(this.userID === books.) {
              //   books.dueDate = response.data[0].issueDetails[i].dueDate;
              // }

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
                // var count = 0;
                for( let v = 0 ; v < books.length ; v++) {
                  for( let u = 0 ; u < books[v].issueDetails.length ; u++)
                  if(this.userID === books[v].issueDetails[u].mId) {
                    books[v].dueDate = books[v].issueDetails[u].dueDate;
                  }
                  var strLength = books[v].image.length;
                  var bookString = books[v].image.substring(15, strLength);
                  // books[v].newImage = "@" + books[v].image.substring(1, strLength);
                  // console.log(bookString);
                  // books[v].newImage = require('@/assets/images/68.png');
                  books[v].newImage = require('@/assets/images' + bookString);
                  // console.log(count++);
                }

                this.userIssuedBooks = books;
                console.log('books',this.userIssuedBooks);
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
    cancelBook: function(isbn){
      console.log('isbn',isbn);
      this.$http.get(endpoint.declineRequest +this.userID+"/"+isbn).then(
        function(response) {
            console.log("response.data", response);
            if(response.status === 200){
            // alert('Book Removed');
                this.snackMessage= "Book Removed Successfully"                
                this.getMyBookId(this.userID);
                this.showSnackbar = true;
            }
        },
        function(error) {
            console.log(error.statusText);
        }
      );
    },
    renewBook: function(issueDetails) {
      for (let v = 0; v < issueDetails.length; v++) {
        if(issueDetails[v].mId === this.userID) {
          this.$http.get(endpoint.renewBook + issueDetails[v].bookId +"/"+this.userID).then(
            function(response) {
              if(response != ''){
                this.snackMessage= "Book Renewed Successfully";                
                this.getMyBookId(this.userID);
                this.showSnackbar = true;
              }
            },
            function(error) {
              console.log(error.statusText);
            }
          );
        }  
      }
    },
    returnBook: function(books) {
      for (let v = 0; v < books.issueDetails.length; v++) {     
        if (books.issueDetails[v].mId === this.userID) {
          this.$http.get(endpoint.returnRequest + this.userID +"/"+books.issueDetails[v].bookId).then(
            function(response) {
              if (response.body === 'success') {
                books.issueDetails[v].returnRequest = "true";
                this.snackMessage= "Successfully Requested! Kindly go and Submit the book to the Library!";                
                // console.log(books);
                this.getMyBookId(this.userID);
                this.showSnackbar = true;

              }
            },
            function(error) {
              console.log(error.statusText);
            }
          );
        }
      }
    }
  }, 
 mounted: function() {
     authentication.getUserProfile().then(data => {
      this.userID = data.upn.substring(0, 8);
      console.log('data',data);
      this.getMyBookId(this.userID);
    });
        // this.getMyBookId(this.userid);
        // console.log(this.userid);
 }
};
</script>

<style>
.homeRoute {
    margin: 0;
    box-sizing: border-box;
    /* border: 1px solid red; */
}
.loadSpinner {
    margin-top: 50px;
    width: 100%;
    height: 400px;
    padding: 20px;
    z-index: 3;
    position: absolute;
    border: 1px solid red;
}
.booksContainer {
    width: 100%;
    /* border: 2px solid red; */
    /* box-sizing: content-box; */
    /* box-sizing: inherit; */
}
.bookCards {
  /* border: 1px solid red; */
  /* margin: 1.25em .5em; */
  margin-bottom: 1.25em;
  height: 13.5em;
  width: 100%;
  /* height: 20px; */
  padding: 24px 10px;
  display: block;
  /* border: 1px solid black; */
}
.cardHeight {
  height: inherit;
}
.buttonHeight {
  height: 34px;
}
.row {
  margin-right: -15px;
  margin-left: -15px;
  /* border: 1px solid red; */
}
.rippleClass {
  padding: 24px 16px;
}
.md-card-header {
  padding: 0px !important;
}
.titleCard {
  padding-right: 15px !important;
  padding-left: 15px !important;
}
.md-titleBook {
  height: 7em;
  /* border: 1px solid blue; */
  padding-left: 15px !important;
  padding-right: 15px !important;
}

.cardContent {
  width: 100%;
}
.bookPhoto {
  width: 5em !important;
  height: 7em !important;
}
.actionSpace {
  height: 36px;
  margin-left: -15px;
  margin-right: -15px;
}
.availableBooks {
  float: left;
  font-size: 0.9em;
  padding: 0.75em 0 0 0;
  font-weight: 700;
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
  margin: -5px;
}
.buttonAction {
  float: right;
  margin: -5px;
}
.accent {
  background-color: #f53d3d;
  color: white;
  margin-right: 3em;
}
.collection {
  padding-top: 2px;
  padding-bottom: 2px;
  margin-top: 0.25em;
  background-color: #eaeded;
}
.dueDateClass {
  font-size: 1rem !important;
}
</style>
 