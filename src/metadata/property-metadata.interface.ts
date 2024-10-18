import { PropOptions } from "src/decorators";

export interface PropertyMetadata {
    target: Function;
    propertyKey: string;
    options: PropOptions;
  }