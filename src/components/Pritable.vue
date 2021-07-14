<template>
    <div>
        <div class="w-full ">
            <p class="flex justify-end"><span class="py-2 px-3 text-white bg-yellow-600 rounded cursor-pointer" @click="addprin">+ Add New</span></p>
            <div class="bg-white shadow-md rounded my-6">
                <table class="text-left w-full border-collapse"> <!--Border collapse doesn't work on this site yet but it's available in newer tailwind versions -->
                <thead>
                    <tr class="bg-yellow-400 text-yellow-700">
                    <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Principles</th>
                    <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in agprinciples" :key="data.id" :id="data.id" class="text-gray-500 hover:bg-grey-lighter">
                    <td class="py-4 px-6 border-b border-grey-light">{{data.post}}</td>
                    <td class="py-4 px-6 border-b border-grey-light">
                        <a href="#" @click="editprin(data)" class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-400 hover:bg-blue-500 mr-4 text-white cursor-pointer">Edit</a>
                        <a href="#" @click="delprin(data)" class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red-400 hover:bg-red-500 text-white cursor-pointer">Delete</a>
                    </td>
                    </tr> 
                </tbody>
                </table>
            </div>
            </div>
            <modal name="addprinciples">
                <div class="p-6 border-b">
                    <h3 class="text-lg">Add Agile Principles</h3>
                </div>
                <div class="p-6 border-b">
                    <form @submit.prevent="onSubmit">
                        <fieldset>
                            <textarea required v-model="principles" class="w-full border p-4" placeholder="Agile Principles"></textarea>
                            
                        </fieldset>
                        <div class="flex justify-end py-3 space-x-4">
                            <button @click="onClear" class="bg-gray-200 text-gray-700 py-2 px-3">Clear</button>
                            <button class="bg-green-400 text-green-700 py-2 px-3">Submit</button>
                        </div>
                    </form>
                </div>
           </modal>
           <modal name="delprinciples">
                <div class="p-6 border-b">
                    <h3 class="text-lg">Delete Agile Principles</h3>
                </div>
                <div class="p-6 border-b">
                    Are you sure you want to delete {{deleted.post}}
                     
                </div>
                <div class="p-6">
                    <button @click="deleteprin" class="focus:outline-none py-2 px-3 bg-red-400 text-white">Delete</button>
                </div>
           </modal>
           <modal name="editprinciples">
                <div class="p-6 border-b">
                    <h3 class="text-lg">Edit Agile Principles</h3>
                </div>
                <div class="p-6 border-b">
                    <form @submit.prevent="onSave">
                        <fieldset>
                            <textarea required v-model="edited.post" class="w-full border p-4" placeholder="Agile Principles"></textarea>
                            
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
    props:['agprinciples'],
    data() {
        return {
             principles: '',
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
          db.collection('principles').doc(this.edited.id).set(
                    {
                        post: this.edited.post,
                        date: newdate, 
                    }
                )
            this.closededit();
      },
      closededit() {
          this.$modal.hide('editprinciples');
      },
      editprin(data) {
          this.edited.id = data.id;
          this.edited.post = data.post;
          this.$modal.show('editprinciples');
      },
      deleteprin() {
          console.log(this.deleted.id)
          db.collection('principles').doc(this.deleted.id).delete();
                let element = document.getElementById(this.deleted.id)
                    element.classList.add('hidden')
                    this.closed();
      },
      closed() {
          this.$modal.hide('delprinciples');
      },
      delprin(data) {
          this.deleted.id = data.id;
          this.deleted.post = data.post;
          this.$modal.show('delprinciples');
      },
      addprin() {
         this.$modal.show('addprinciples');
      },
      onClear() { 
          this.principles = '';
      },
      onSubmit() {
          const items = {
               post: this.principles,
               date: new Date().toLocaleString()
          }
          db.collection('principles').add(items).then(() => {
              alert('Successfully added Agile principles')
              this.onClear();
          })
      }
    }
  }
</script>