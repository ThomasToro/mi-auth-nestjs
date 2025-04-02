import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = 'isPublic'; //esto es una constante que se va a usar para identificar si la ruta es publica o no, se comparte con el guard
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);