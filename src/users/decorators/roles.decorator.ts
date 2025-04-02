//definir los roles que vamos a usar en el proyecto
import { SetMetadata } from '@nestjs/common';
//
export const Roles = (...roles: string[]) => SetMetadata('roles',roles);

//los metadatos son formas que tenemos para modificar el comportamiento de una clase, un metodo o una propiedad
//en este caso estamos creando un decorador que se llama roles y le pasamos los roles que queremos asignar a la ruta
