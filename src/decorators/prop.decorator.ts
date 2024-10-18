import { getMetadataStorage } from "src/metadata/MetadataUtils";
import { TypeMetadataStorage } from "src/storages/type-metadata.storage";
import { IEntity, IEntityConstructor } from "src/types/types";
import { RAW_OBJECT_DEFINITION } from "src/util/raw.util";
const TYPE_METADATA_KEY = 'design:type';
/**
 * Interface defining property options that can be passed to `@Prop()` decorator.
 */
export type PropOptions<T = any> = any
 // | Partial<mongoose.SchemaDefinitionProperty<T>>
 // | mongoose.SchemaType;

/**
 * @Prop decorator is used to mark a specific class property as a Mongoose property.
 * Only properties decorated with this decorator will be defined in the schema.
 */
export function Prop(options?: PropOptions): PropertyDecorator {
    return (target: object, propertyKey: string | symbol) => {
      options = (options || {}) as any//mongoose.SchemaTypeOptions<unknown>;
  
      const isRawDefinition = options[RAW_OBJECT_DEFINITION];
      if (!options.type && !Array.isArray(options) && !isRawDefinition) {
        const type = Reflect.getMetadata(TYPE_METADATA_KEY, target, propertyKey);
        //console.log(type)
  
        if (type === Array) {
          options.type = [];
        } else if (type && type !== Object) {
          options.type = type;
        } else {
          throw new CannotDetermineTypeError(
            target.constructor?.name,
            propertyKey as string,
          );
        }
      }
  
      TypeMetadataStorage.addPropertyMetadata({
        target: target.constructor,
        propertyKey: propertyKey as string,
        options: options as PropOptions,
      });
    };
  }
  export class CannotDetermineTypeError extends Error {
    constructor(hostClass: string, propertyKey: string) {
      super(
        `Cannot determine a type for the "${hostClass}.${propertyKey}" field (union/intersection/ambiguous type was used). Make sure your property is decorated with a "@Prop({ type: TYPE_HERE })" decorator.`,
      );
    }
  }
  export function SubCollection(entityConstructor: IEntityConstructor, entityName?: string) {
    return function (parentEntity: IEntity, propertyKey: string) {
      getMetadataStorage().setCollection({
        entityConstructor,
        name: entityName, //|| plural(entityConstructor.name),
        parentEntityConstructor: parentEntity.constructor as IEntityConstructor,
        propertyKey,
      });
    };
  }