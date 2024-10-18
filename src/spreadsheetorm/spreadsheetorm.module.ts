import { DynamicModule, Module, Provider } from '@nestjs/common';
export interface AnyObject {
    [k: string]: any
  }
interface SessionStarter {

    /**
     * Starts a [MongoDB session](https://www.mongodb.com/docs/manual/release-notes/3.6/#client-sessions)
     * for benefits like causal consistency, [retryable writes](https://www.mongodb.com/docs/manual/core/retryable-writes/),
     * and [transactions](http://thecodebarbarian.com/a-node-js-perspective-on-mongodb-4-transactions.html).
     */
    startSession(options?: any): Promise<any>;
  }

  export interface AcceptsDiscriminator {
    /** Adds a discriminator type. */
    discriminator<D>(
      name: string | number,
      schema: any,
      value?: string | number | DiscriminatorOptions
    ): Model<D>;
    discriminator<T, U>(
      name: string | number,
      schema: any,
      value?: string | number | DiscriminatorOptions
    ): U;
  }

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

@Module({})
export class SpreadsheetormModule {
    static forFeature(
        models: ModelDefinition[] = [],
        connectionName?: string,): DynamicModule{
            const providers = createMongooseProviders(connectionName, models);
    console.log(providers)
    return {
      module: SpreadsheetormModule,
      global: true,
      providers:providers ,
      exports: providers
    };

    }
}
export function createMongooseProviders(
    connectionName?: string,
    options: ModelDefinition[] = [],
  ): Provider[] {
    return options.reduce(
      (providers, option) => [
        ...providers,
        ...(option.discriminators || []).map((d) => ({
          provide: getModelToken(d.name, connectionName),
          useFactory: (model: Model<any>) =>
            model.discriminator(d.name, d.schema, d.value),
          inject: [getModelToken(option.name, connectionName)],
        })),
        
      ],
      [] as Provider[],
    );
  }
export function getModelToken(model: string, connectionName?: string) {
    if (connectionName === undefined) {
        console.log("connectionname undefined es")
      return `${model}`;
    }
   
  }

  export interface Model<
  TRawDocType,
  > extends
  NodeJS.EventEmitter,
  AcceptsDiscriminator,
  SessionStarter {
  new <DocType = Partial<TRawDocType>>(doc?: DocType, fields?: any | null, options?: boolean | AnyObject): any;

  /**
   * Deletes all of the documents that match `conditions` from the collection.
   * Behaves like `remove()`, but deletes all documents that match `conditions`
   * regardless of the `single` option.
   */
  deleteMany(
    filter?: TRawDocType,
    options?: null
  )
  deleteMany(
    filter: TRawDocType
  );

  /**
   * Deletes the first document that matches `conditions` from the collection.
   * Behaves like `remove()`, but deletes at most one document regardless of the
   * `single` option.
   */
  deleteOne(
    filter?: TRawDocType,
    options?: null
  )
  deleteOne(
    filter: TRawDocType
  );
  events: NodeJS.EventEmitter;

  findById<ResultDoc>(
    id: any,
    projection: TRawDocType | null | undefined,
    options: TRawDocType & { lean: true }
  );
  findById<ResultDoc>(
    id: any,
    projection?: TRawDocType,
    options?: TRawDocType
  )
  findById<ResultDoc>(
    id: any,
    projection?: TRawDocType
  )
  /** Inserts one or more new documents as a single `insertMany` call to the MongoDB server. */
  insertMany(
    docs: Array<TRawDocType>
  ): Promise<Array<any>>;
  
  
}