import { SetMetadata } from "@nestjs/common";
import { Action } from "../../abilities/ability.factory";

export interface PolicyHandler{ //definimos un decorador llamado checkpolicies
    action: Action;//quiero crear/post
    subject: string;//sobre qué entidad ejerceré la acción-entity tarea o product/products
    checkData?: boolean;

}


export const CHECK_POLICIES_KEY='check_policies'//NOMBRE DE NUESTRO DECORADOR
//PARA ACCEDER A NUESTRO DECORADOR DENTRO DE UN GUARD DENTRO DE LAS CONSTANTES


export const CheckPolicies= (...handlers: PolicyHandler[])=>
    SetMetadata(CHECK_POLICIES_KEY, handlers)