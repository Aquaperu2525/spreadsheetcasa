import { Type } from '@nestjs/common';
import { DefinitionsFactory } from './definicion.factori';
import { TypeMetadataStorage } from 'src/storages/type-metadata.storage';

export class SchemaFactory {
    static createForClass<TClass = any>(
      target: Type<TClass>,
    )//: mongoose.Schema<TClass>
     {
      console.log({"target de chamefactoru":target})
      const schemaDefinition = DefinitionsFactory.createForClass(target);
      console.log({"schemadefinicion":schemaDefinition})
      const schemaMetadata =
        TypeMetadataStorage.getSchemaMetadataByTarget(target);
        console.log({"schema metadata":schemaMetadata})
      const schemaOpts = schemaMetadata?.options;
  //console.log(schemaDefinition,schemaOpts)
      /*return new mongoose.Schema<TClass>(
        schemaDefinition as SchemaDefinition<SchemaDefinitionType<TClass>>,
        schemaOpts as mongoose.SchemaOptions<any>,
      );*/
    }
  }