<template>
  <div class="home">
     <div id="nav" class="flex justify-end items-center p-4"> 
      <router-link to="/backend" class="text-gray-100 bg-blue-400 py-2 px-3   rounded">Backend</router-link>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// https://firestore.googleapis.com/v1/projects/heroesng2-19571/databases/(default)/documents/values_agile
export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
