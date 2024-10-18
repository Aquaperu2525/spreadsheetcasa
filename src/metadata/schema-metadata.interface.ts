import { PropertyMetadata } from "./property-metadata.interface";
export interface mysOpcionesEnLugarDeMongo{
  option1:string;
  opcion2:string;
}
export interface SchemaMetadata {
    target: Function;
    options?: mysOpcionesEnLugarDeMongo//mongoose.SchemaOptions;
    properties?: PropertyMetadata[];
  }