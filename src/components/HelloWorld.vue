<template>
  <div class="frontend">
     
    <div class="flex">
      <div class="w-full p-8">
        <h1 class="text-center text-2xl font-bold mb-10">Agile Values</h1>
        <values :values="values"></values>
      </div>
      <div class="w-full p-8">
        <h1 class="text-center text-2xl font-bold mb-10">Agile Principles</h1>
        
        <principles :principles="principles"></principles>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios,axios)
export default {
  name: 'HelloWorld',
  data() {
    return {
      values: [],
      principles: []
    }
  },
  mounted() {
    Vue.axios.get('https://firestore.googleapis.com/v1/projects/heroesng2-19571/databases/(default)/documents/values')
    .then((resp) => {
      this.values = resp.data.documents.sort();
      console.log(resp.data.documents)
    })

    Vue.axios.get('https://firestore.googleapis.com/v1/projects/heroesng2-19571/databases/(default)/documents/principles')
    .then((resp) => {
      this.principles = resp.data.documents.sort();
      console.log(resp.data.documents)
    })
  }
}
</script>
 
</style>
