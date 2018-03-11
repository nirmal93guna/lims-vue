<template>
  <div class="helpContent">
      <div class="imageCarousel">
        <img v-if="imageValue == 1" class="imageHelp" src="@/assets/images/Manual1.png" />
        <img v-if="imageValue == 2" class="imageHelp" src="@/assets/images/Manual2.png" />
        <img v-if="imageValue == 3" class="imageHelp" src="@/assets/images/Manual3.png" />
        <img v-if="imageValue == 4" class="imageHelp" src="@/assets/images/Manual4.png" />

      </div>
  </div>
</template>

<script>
export default {
  name: 'help',
  data() {
      return {
          imageValue: 1,
          valueChange: [1,2,3,4]
      }
  },
  mounted: function() {
        var self = this;
        var change = 0;
        setInterval(function() {            
            if(change == 4) { change = 0; }
            self.imageValue = self.valueChange[change]; 
            change++;
        }, 4000);
    },
}
</script>

<style>
.helpContent {
    padding: 1em;
}
.imageHelp {
    width: 100vw;
    height: 86vh !important;
}

</style>
