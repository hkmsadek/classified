import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TestsController {

  async test(ctx : HttpContextContract){
     return {msg : 'nice'}

  }
  async testDynamicRoute(ctx : HttpContextContract){
     return {
        name : `My name is ${ctx.params.username}`
     }
  }

}
