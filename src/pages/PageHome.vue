<template>
  <q-page class="relative-position" >
        <q-scroll-area class="absolute full-width full-height">
<div class = "q-py-lg q-px-md row">
<div class="col">
   
      <q-input 
       v-model="newQweetContent"
       class="new-qweet"
       placeholder="What's happeing?" 
        maxlength="280"
        bottom-slots
        counter
        autogrow
       >
        <template v-slot:before>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar4.jpg">
          </q-avatar>
        </template>

    
      </q-input>
  </div>

  <div class="col col-shrink ">
    <q-btn 
        @click = 'addNewQweet'
        :disable="!newQweetContent"
         class="q-mb-lg"
         color="primary"
         label="Sweet"
         rounded
         unelevated
         no-caps
      />

  </div>

  
</div>

<q-separator
 class="divider"
 size="10px" 
 color="grey-2"/>

 <q-list separator >
   
  <transition-group 
     appear
     enter-active-class="animated fadeIn slow"
     leave-active-class="animated fadeOut slow"
    >


      <q-item
       v-for="qweet in qweets"
      :key="qweet.id"
       class="qweet q-py-md"
       >
        <q-item-section avatar top>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar4.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
          <strong>
           
          </strong>
             <span class="text-grey-7">
                    @Sebin thomas
                     <br class='lt-md'>&bull; {{ relativeDate(qweet.date) }}
        

             </span>



          </q-item-label>
          <q-item-label class="qweet-content text-body1" >
          {{qweet.content}}
          </q-item-label>

             <div class="qweet-icons row justify-between">
                       <q-btn 
                       flat round color="grey"
                       icon = "far fa-comment" 
                        size="sm" 
                        />


                         <q-btn 
                       flat round color="grey"
                       icon = "fas fa-retweet" 
                        size="sm" 
                        />


                         <q-btn 
                       @click = "toggleLiked(qweet)"
                       :color="qweet.liked  ?'pink' : 'grey' "
                       :icon = "qweet.liked ? 'fas fa-heart' : 'far fa-heart' " 
                        size = "sm"
                       flat
                       round
                        />

                         <q-btn
                  @click="deleteQweet(qweet)"
                  color="grey"
                  icon="fas fa-trash"
                  size="sm"
                  flat
                  round
                />
        
                  </div>

        </q-item-section>

    
      </q-item>
  </transition-group>
      <!-- <q-separator inset="item" /> -->

     


     
    </q-list>

   </q-scroll-area>
  </q-page>
</template>

<script>

import db from 'src/boot/firebase'
import { formatDistance, subDays } from 'date-fns'

export default {
  name: 'PageHome',
 data(){

    return{ 
          newQweetContent:'',
          qweets: [
          //  {
          //    id: 'ID1',
          //    content: 'lorem gbkhnv knbbhnm hn mb j hnb hnb hbkb c  nc  vb',
          //    date: 1611653238221,
          //    liked:false
          //  },

          //  {
          //    id: 'ID1',
          //    content: 'lorem gbkhnv knbbhnm hn mb j hnb hnb hbkb c  nc vb',
          //    date: 1611653252444,
          //    liked:true
          //  },

          ]
    }
 
 },

methods:{
   addNewQweet(){
  
  let newQweet = {
  content: this.newQweetContent,
    date: Date.now(),
    liked: false
   }


   db.collection('qweets').add(newQweet).then(function(docRef){
    console.log('Document written with Id', docRef.id);
    }).catch(function(error){
      console.error('Error adding document',error)
    })

      this.newQweetContent = ''
   },
   //this.qweets.push(newQweet)
    deleteQweet(qweet){
     db.collection('qweets').doc(qweet.id).delete().then(function(){
       console.log('Document succesfully deleted!');
     } ).catch(function(error){

         console.error('Error removing document:' ,  error);

     })
},
    

   
   relativeDate(value) {
    return formatDistance(value, new Date())
   },

 toggleLiked(qweet){
  
  db.collection('qweets').doc(qweet.id).update({
  liked : !qweet.liked
  })

  .then(function(){
    console.log('Document successfully updated !')
    
  })
  .catch(function(error){

    console.log('Error updating document: ',error)

  })
 
    } 
  },


  


 filters:{
  

  
 },

 mounted(){

  db.collection('qweets').orderBy('date').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {

    let qweetChange = change.doc.data()
    qweetChange.id = change.doc.id
if(change.type === 'added'){
console.log('New Sweet:',qweetChange)
this.qweets.unshift(qweetChange)
}

if(change.type === 'modified'){
  console.log('Modified Sweet:', qweetChange);
  let index = this.qweets.findIndex(qweet => qweet.id === qweetChange.id)
  Object.assign(this.qweets[index],qweetChange)

}

if(change.type === 'removed'){
console.log('Removed sweet:', qweetChange)
let index  =  this.qweets.findIndex(qweet => qweet.id === qweetChange.id)
this.qweets.splice(index,1)


}

  })

  })
  

  }

}


</script>


<style lang=sass>
.new-qweet
  textarea
    font-size: 19px
    line-height: 1.4 !important

.divider 
  border-top: 1px solid 
  border-bottom: 1px solid
  border-color: $grey-4

.qweet-content 
  white-space:pre-line

.qweet-icons
    margin-left: -5px


.qweet:not(:first-child)
   border-top: 1px solid rgba(0,0,0,12)  
</style>
