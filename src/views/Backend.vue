<template>
  <div class="backend">
    <div id="nav" class="flex justify-start items-center p-4"> 
      <router-link to="/" class="text-white bg-green-400 py-2 px-3   rounded">Frontend</router-link>
    </div> 
    <div class="flex ">
      <div class="w-full p-8">
        <valtable :agvalues="agvalues"></valtable>
      </div>
      <div class="w-full p-8">
         <pritable :agprinciples="agprinciples"></pritable>
      </div>
    </div>
  </div>
</template>
<script> 
import db from '/fb'
export default {
  data() {
    return {
      agvalues:[],
      agprinciples:[]
    }
  },
  created() {
            db.collection('values').orderBy("date", "desc").onSnapshot(res => {
            const updates = res.docChanges();
            updates.forEach(change => {
                if (change.type == 'added') {
                    this.agvalues.push({
                        ...change.doc.data(),
                        id: change.doc.id
                    })
                    console.log('refreshed') 
                } else if (change.type == 'removed') {
                console.log('successfully deleted')
                } else {
                    alert('successfully updated please do refresh the page')
                }
            })
            }),

            db.collection('principles').orderBy("date", "desc").onSnapshot(res => {
            const updates = res.docChanges();
            updates.forEach(change => {
                if (change.type == 'added') {
                    this.agprinciples.push({
                        ...change.doc.data(),
                        id: change.doc.id
                    })
                    console.log('refreshed') 
                } else if (change.type == 'removed') {
                console.log('successfully deleted')
                } else {
                    alert('successfully updated please do refresh the page')
                }
            })
            })
 

        }, 
}
</script>



