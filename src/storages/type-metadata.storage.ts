import { Type } from '@nestjs/common';
import { PropertyMetadata } from 'src/metadata/property-metadata.interface';
import { SchemaMetadata } from 'src/metadata/schema-metadata.interface';
import { isTargetEqual } from 'src/util/is-target-equal-util';

export class TypeMetadataStorageHost {
    private schemas = new Array<SchemaMetadata>();
    private properties = new Array<PropertyMetadata>();
  
    addPropertyMetadata(metadata: PropertyMetadata) {
      this.properties.unshift(metadata);
    }
  
    addSchemaMetadata(metadata: SchemaMetadata) {
      this.compileClassMetadata(metadata);
      this.schemas.push(metadata);
    }
  
    getSchemaMetadataByTarget(target: Type<unknown>): SchemaMetadata | undefined {
      console.log({"schemas":this.schemas})
      return this.schemas.find((item) => item.target === target);
    }
  
    private compileClassMetadata(metadata: SchemaMetadata) {
      const belongsToClass = isTargetEqual.bind(undefined, metadata);
     // console.log(belongsToClass)
  
      if (!metadata.properties) {
        metadata.properties = this.getClassFieldsByPredicate(belongsToClass);
      }
    }
  
    private getClassFieldsByPredicate(
      belongsToClass: (item: PropertyMetadata) => boolean,
    ) {
      return this.properties.filter(belongsToClass);
    }
  }
  const globalRef = global as any;
  export const TypeMetadataStorage: TypeMetadataStorageHost =
  globalRef.MongoTypeMetadataStorage ||
  (globalRef.MongoTypeMetadataStorage = new TypeMetadataStorageHost());