import { Injectable } from '@nestjs/common';
import { InjectModel } from './common/mongoose.decorator';
import { my } from './app.controller';
import { Model, SpreadSheetModel } from './types/types';
import { BlogService } from './blog.service';


@Injectable()
export class AppService {
  //constructor(@InjectModel(BlogService.name) private readonly jo:Model<BlogService>){}
  getHello(): string {
    //const createdCat = new this.jo(BlogService)

    //console.log({"console de jo":createdCat})
    //const createdCat = new this.catModel(my);
    //return createdCat.save();
    return 'Hello World!';
  }
}
