
import { FilterQuery } from "src/types/types";
import { AuthDto } from "../dtos/auth.dto";


import { AuthEntity, AuthFindOne } from "../entity/auth.entity";

export const  IAUTH_REPOSITORY = 'IAuthRepository'
export interface IAuthRepository{
    /*findOne(
        entityFilterQuery: FilterQuery<AuthFindOne>,
        projection?: Record<string, unknown>
    ):Promise<AuthEntity>
    */
    register(creaUsuarioDto:AuthDto):Promise<any>

    /*login(
        entityFilterQuery: any,
        projection?: Record<string, unknown>
    ):Promise<any>*/
}