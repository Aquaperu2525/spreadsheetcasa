import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';

import { my } from './app.controller';
import { InjectModel } from './common/mongoose.decorator';
import { Prop, Schema } from './decorators';
import { SchemaFactory } from './factories/schemafactorie';
import { Model } from './types/types';

export class AuthEntity{
    usuarioId:string;
    email:string;
    password:string;
    usuarioFolderId:string
    logoFolderId:string
 
}
export type AuthModel = Model<AuthSchema>

@Injectable()
export class AuthMongoRepository {
    constructor(
        @InjectModel(AuthEntity.name) private authModel:AuthModel
    ){}
    async actualizaFolderId(entityFilterQuery: any, entity: Partial<AuthEntity>,): Promise<any> {

        const macho:any = await this.authModel

}
}


@Injectable()
export class BlogService {

   // constructor(@InjectModel("my") private readonly blog:any){}

    async getAllBlogs() {
        
    }

}
@Schema()
class AuthSchema {
    @Prop()
    usuarioId: string;
    @Prop()
    email:string;
    @Prop()
    password:string;
    @Prop()
    usuarioFolderId:string
    @Prop()
    logoFolderId:string
 
   

} 
export const AUTH_SCHEMA =  SchemaFactory.createForClass(AuthSchema)