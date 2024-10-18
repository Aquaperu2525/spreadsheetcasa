import { Injectable } from "@nestjs/common";
import { InjectModel, } from "@nestjs/mongoose";
import {  FilterQuery, UpdateQuery } from 'mongoose';
import { AuthDto } from "../dtos/auth.dto";
import { AuthEntity, AuthFindOne } from "../entity/auth.entity";
import { AuthModel} from "../schema/auth.schema";
import { IAuthRepository } from "./auth.interface.repository";


@Injectable()
export class AuthMongoRepository implements IAuthRepository{
    constructor(
       // @InjectModel(AuthEntity.name) private authModel:AuthModel
    ){}
    async register(registra: AuthDto): Promise<any> {
        //const nuevoUsuario = new this.authModel()//crea o general el ObjectId ;_id
        //nuevoUsuario.email = registra.email;
        //nuevoUsuario.password = registra.password
        //nuevoUsuario.usuarioId = nuevoUsuario._id.toHexString()
        //nuevoUsuario.usuarioFolderId =""
        //nuevoUsuario.logoFolderId =""
       // return await new this.authModel(nuevoUsuario)
    }
}