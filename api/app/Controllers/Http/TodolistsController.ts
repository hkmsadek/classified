import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Todolist from "App/Models/Todolist";

export default class TodolistsController {

    async createTask({request} : HttpContextContract){
      let obj = {
          task_name : request.all().task_name
       }
       return Todolist.create(obj)
    }
    async getAllToDo(){
        let allTasks = await Todolist.query().select('id', 'task_name', 'is_done')
        return {
           msg : 'sucess',
           data : allTasks
        }
    }
    async getSingleListItem({params} : HttpContextContract){
      return Todolist.query().where('id', params.id).first()
    }
    async updateTask({request} : HttpContextContract){
       let data = request.all()
       return Todolist.query().where('id', data.id).update({
           'task_name' : data.task_name,
           'is_done' : data.is_done
       })
    }
    async deleteTask({request} : HttpContextContract){
       let data = request.all()
       return Todolist.query().where('id', data.id).delete()
    }


}


