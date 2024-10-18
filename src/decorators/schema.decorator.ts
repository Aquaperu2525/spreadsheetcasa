import { getMetadataStorage } from "src/metadata/MetadataUtils";
import { mysOpcionesEnLugarDeMongo } from "src/metadata/schema-metadata.interface";
import { TypeMetadataStorage } from "src/storages/type-metadata.storage";
import { IEntityConstructor } from "src/types/types";

const mysOpcionesEnLugarDeMongoConcreto:mysOpcionesEnLugarDeMongo = 
  {opcion2:"opcion real",option1:"opcion concreta"}
//se ejecuta esta fuuncion por cada decorador que se tenga

/**
 * Interface defining schema options that can be passed to `@Schema()` decorator.
 */
export type SchemaOptions<T = any> = any//mongoose.SchemaOptions;//se necesita definir propiedades que sean de algun tipo.

/**
 * @Schema decorator is used to mark a class as a Mongoose schema.
 * Only properties decorated with this decorator will be defined in the schema.
 */
export function Schema(options?: SchemaOptions): ClassDecorator {
  return (target: Function) => {
    options = (options || {}) as any
    
    TypeMetadataStorage.addSchemaMetadata({
      target,
      options
    });
    //console.log(TypeMetadataStorage)
  };
}
export function Collection(entityName?: string) {
  return function (entityConstructor: IEntityConstructor) {
    const name = entityName //|| plural(entityConstructor.name);
    getMetadataStorage().setCollection({
      name,
      entityConstructor,
    });
  };
}