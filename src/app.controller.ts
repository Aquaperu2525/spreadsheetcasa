import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { getRepository, raw } from './util';
import { isTargetEqual } from './util/is-target-equal-util';
import { Collection, Prop, Schema, SubCollection } from './decorators';
import { SchemaFactory } from './factories/schemafactorie';
import { ISubCollection } from './types/types';
class su{
  id:string
  mysu:string

}
@Schema()
export class my{
  @Prop()
  id:string
  @Prop()
  propiedad_my:string
}
@Collection()
class tu{
  id:string;
  propiedad_tu:string;
  @SubCollection(su,'mierda')
  suid?:ISubCollection<su>
}


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    //const CatSchema =SchemaFactory.createForClass(my);
  // console.log({"catschema":CatSchema})
    return this.appService.getHello();
  }
}
