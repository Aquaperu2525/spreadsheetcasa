import { Prop, Schema } from "src/decorators";
import { SchemaFactory } from "src/factories/schemafactorie";
import { Model } from "src/types/types";


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
export type AuthModel = Model<AuthSchema>