 <template>
   <div class="booksContainer">
          <md-card md-with-hover>
                <md-ripple class="rippleClass">
                    <div class="row">
                        <div class="md-layout md-gutter">
                            <div class="md-titleBook md-layout-item md-size-33">
                                <img class="bookPhoto" src="@/assets/images/noBookAvail.png">
                            </div>
                            <div class="md-title md-layout-item md-size-66 titleCard">
                                <span class="bookTitle">{{isbn.title}}</span>
                                <span class="authorName">{{isbn.authors}}</span>
                                <span class="authorName">Available: {{isbn.numberOfCopies}}</span>
                            </div> 
                        </div>
                </div>
               <div class="row">
                     <md-button class="md-raised md-accent accent">Request</md-button>
                     <md-button class="md-raised md-accent accent">Add to WishList</md-button>
               </div>
           </md-ripple>
      </md-card>
        <md-card class="disclaimer">
         <md-card-content>
           This book is a property of Mindtree and copyrights are reserved. If this book is taken out of Mindtree 
           Kalinga premises then please note that contents of this book should not be photocopied or scanned as this would lead to integrity breach.
           </md-card-content>
        </md-card>
        <md-card >
         <md-card-content v-if="isbn.description">{{isbn.description}}</md-card-content>
         <h1 v-else>No Description Available !!</h1>
        </md-card>
    </div>
</template>

<script>
import endpoint from "../endpoint";
export default {
  name: "bookdetail",
  props: ["isbn"],
  data() {
    return {
      list: null
    };
  },
  created: function() {
    console.log("isbn", this.isbn);
  }
};
</script>

<style>
.disclaimer{
 margin-top:5px;
 color:red;
}
</style>
 