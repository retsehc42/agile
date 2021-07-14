<template>
    <div>
        <div class="w-full ">
            <p class="flex justify-end"><span class="py-2 px-3 text-white bg-green-600 rounded cursor-pointer" @click="addval">+ Add New</span></p>
            <div class="bg-white shadow-md rounded my-6">
                <table class="text-left w-full border-collapse"> <!--Border collapse doesn't work on this site yet but it's available in newer tailwind versions -->
                <thead>
                    <tr class="bg-green-400 text-green-700">
                    <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Values</th>
                    <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in agvalues" :key="data.id" :id="data.id" class="text-gray-500 hover:bg-grey-lighter">
                    <td class="py-4 px-6 border-b border-grey-light">{{data.post}}</td>
                    <td class="py-4 px-6 border-b border-grey-light">
                        <a href="#" @click="editval(data)" class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-400 hover:bg-blue-500 mr-4 text-white cursor-pointer">Edit</a>
                        <a href="#" @click="delval(data)" class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red-400 hover:bg-red-500 text-white cursor-pointer">Delete</a>
                    </td>
                    </tr> 
                </tbody>
                </table>
            </div>
            </div>
           <modal name="addvalues">
                <div class="p-6 border-b">
                    <h3 class="text-lg">Add Agile Values</h3>
                </div>
                <div class="p-6 border-b">
                    <form @submit.prevent="onSubmit">
                        <fieldset>
                            <textarea required v-model="values" class="w-full border p-4" placeholder="Agile Values"></textarea>
                            
                        </fieldset>
                        <div class="flex justify-end py-3 space-x-4">
                            <button @click="onClear" class="bg-gray-200 text-gray-700 py-2 px-3">Clear</button>
                            <button class="bg-green-400 text-green-700 py-2 px-3">Submit</button>
                        </div>
                    </form>
                </div>
           </modal>
           <modal name="delvalues">
                <div class="p-6 border-b">
                    <h3 class="text-lg">Delete Agile Values</h3>
                </div>
                <div class="p-6 border-b">
                    Are you sure you want to delete {{deleted.post}}
                     
                </div>
                <div class="p-6">
                    <button @click="deleteval" class="focus:outline-none py-2 px-3 bg-red-400 text-white">Delete</button>
                </div>
           </modal>
           <modal name="editvalues">
                <div class="p-6 border-b">
                    <h3 class="text-lg">Edit Agile Values</h3>
                </div>
                <div class="p-6 border-b">
                    <form @submit.prevent="onSave">
                        <fieldset>
                            <textarea required v-model="edited.post" class="w-full border p-4" placeholder="Agile Values"></textarea>
                            
                        </fieldset>
                        <div class="flex justify-end py-3 space-x-4">
                            <button @click="onClear" class="bg-gray-200 text-gray-700 py-2 px-3">Clear</button>
                            <button class="bg-green-400 text-green-700 py-2 px-3">Save</button>
                        </div>
                    </form>
                </div>
           </modal>
    </div>
</template>
<script>
  import db from '/fb';
  export default {
    props:['agvalues'],
    data() {
        return {
             values: '',
             deleted: {
                 id: '',
                 post: ''
             },
             edited: {
                 id: '',
                 post: ''
             }
        }
    },
    methods: {
      onSave() {
          var newdate = new Date().toLocaleString()
          db.collection('values').doc(this.edited.id).set(
                    {
                        post: this.edited.post,
                        date: newdate, 
                    }
                )
            this.closededit();
      },
      closededit() {
          this.$modal.hide('editvalues');
      },
      editval(data) {
          this.edited.id = data.id;
          this.edited.post = data.post;
          this.$modal.show('editvalues');
      },
      deleteval() {
          console.log(this.deleted.id)
          db.collection('values').doc(this.deleted.id).delete();
                let element = document.getElementById(this.deleted.id)
                    element.classList.add('hidden')
                    this.closed();
      },
      closed() {
          this.$modal.hide('delvalues');
      },
      delval(data) {
          this.deleted.id = data.id;
          this.deleted.post = data.post;
          this.$modal.show('delvalues');
      },
      addval() {
         this.$modal.show('addvalues');
      },
      onClear() { 
          this.values = '';
      },
      onSubmit() {
          const items = {
               post: this.values,
               date: new Date().toLocaleString()
          }
          db.collection('values').add(items).then(() => {
              alert('Successfully added Agile Value')
              this.onClear();
          })
      }
    }
  }
</script>