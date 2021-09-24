<template>
  <div>
         
         <input v-model="task" placeholder="Add task" @keyup.enter="addTask"></input>
         <button @click="addTask">Add task</button>
         
         <h1>All tasks</h1>
         <div :class="task.is_done? 'task_div done' : 'task_div'" v-for="(task, i) in taskLists" :key="i" @click="markDoneOrUndone(task)">
            <p>ID : {{task.id}} ==> {{task.task_name}}</p>
            <button @click.stop="deleteTask(i, task.id)">Delete task</button>
         </div>
          
  </div>
</template>


<script>
const axios = require('axios');
export default {
   data(){
       return {
         taskLists : [ ], 
         task: ''
       }
   },
   methods: {
     async markDoneOrUndone(task){
         let obj = {
            task_name : task.task_name,
            is_done : !task.is_done,
            id: task.id
         }
         const res = await axios.post('http://127.0.0.1:3333/updateTask', obj)
         if(res.status == 200){
            this.$set(task, 'is_done', false)
            task.is_done = !task.is_done
         }else{
            console.log('something went wrong', res)
         }
     },
     async deleteTask(index, id){
         const res = await axios.post('http://127.0.0.1:3333/deleteTask', {id: id})
         if(res.status == 200){
            this.taskLists.splice(index, 1)
         }else{
            console.log('something went wrong', res)
         }
     },
     async addTask(){
         if(this.task == '') return alert('please add task')
         const res = await axios.post('http://127.0.0.1:3333/createTask', {task_name: this.task})
         if(res.status == 200){
            // res.data.is_done = false
            this.taskLists.push(res.data)
            this.task = ''
         }else{
            console.log('something went wrong', res)
         }
     }
   },

   async created(){
       const res = await axios.get('http://127.0.0.1:3333/getAllToDo')
       if(res.status == 200){
           this.taskLists = res.data
       }else{
           console.log('something went wrong', res)
       }
      
   }
}
</script>

<style scoped>
 .pointer{
    cursor: pointer;
 }
 .done{
    background : green !important;
 }

 .task_div{
    background: #e5e5e5;
    padding: 9px;
    margin-bottom: 2px;
    cursor: pointer;
 }
</style>