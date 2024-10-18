export type DiscriminatorOptions = {
    name: string;
    schema: any;
    value?: string;
  };
export type ModelDefinition = {
    name: string;
    schema: any;
    collection?: string;
    discriminators?: DiscriminatorOptions[];
  };