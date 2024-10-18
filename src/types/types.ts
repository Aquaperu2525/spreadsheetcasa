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
export type IEntityConstructor = Constructor<IEntity>;
// TODO: shouldn't this be in IRepository?
export type WithOptionalId<T extends { id: unknown }> = Pick<T, Exclude<keyof T, 'id'>> &
  Partial<Pick<T, 'id'>>;
export interface IBatchRepository<T extends IEntity> {
  create(item: WithOptionalId<T>): void;
  update(item: T): void;
  delete(item: T): void;
}
export interface IFirestoreBatchSingleRepository<T extends IEntity> extends IBatchRepository<T> {
  commit(): Promise<void>;
}
export type ISubCollection<T extends IEntity> = IRepository<T> & {
  createBatch: () => IFirestoreBatchSingleRepository<T>;
  runTransaction<R = void>(executor: (tran: ITransactionRepository<T>) => Promise<R>): Promise<R>;
};
export interface IEntity {
    id: string;
  }
  export interface ITransactionReference<T = IEntity> {
    entity: T;
    propertyKey: string;
    path: string;
  }
  export type ICustomQuery<T>= (
    query: any,
    firestoreColRef: any
  ) => Promise<T>;

  

  
  export type SpreadSheetModel<T extends IEntity> = IBatchRepository<T>  
export type ITransactionReferenceStorage = Set<ITransactionReference>;
export type EntityConstructorOrPath<T> = Constructor<T> | string;
export interface ValidatorOptions {
    /**
     * If set to true then validator will skip validation of all properties that are undefined in the validating object.
     */
    skipUndefinedProperties?: boolean;
    /**
     * If set to true then validator will skip validation of all properties that are null in the validating object.
     */
    skipNullProperties?: boolean;
    /**
     * If set to true then validator will skip validation of all properties that are null or undefined in the validating object.
     */
    skipMissingProperties?: boolean;
    /**
     * If set to true validator will strip validated object of any properties that do not have any decorators.
     *
     * Tip: if no other decorator is suitable for your property use @Allow decorator.
     */
    whitelist?: boolean;
    /**
     * If set to true, instead of stripping non-whitelisted properties validator will throw an error
     */
    forbidNonWhitelisted?: boolean;
    /**
     * Groups to be used during validation of the object.
     */
    groups?: string[];
    /**
     * If set to true, the validation will not use default messages.
     * Error message always will be undefined if its not explicitly set.
     */
    dismissDefaultMessages?: boolean;
    /**
     * ValidationError special options.
     */
    validationError?: {
      /**
       * Indicates if target should be exposed in ValidationError.
       */
      target?: boolean;
      /**
       * Indicates if validated value should be exposed in ValidationError.
       */
      value?: boolean;
    };
    /**
     * Settings true will cause fail validation of unknown objects.
     */
    forbidUnknownValues?: boolean;
  }
  export enum FirestoreOperators {
    equal = '==',
    notEqual = '!=',
    lessThan = '<',
    greaterThan = '>',
    lessThanEqual = '<=',
    greaterThanEqual = '>=',
    arrayContains = 'array-contains',
    arrayContainsAny = 'array-contains-any',
    in = 'in',
    notIn = 'not-in',
  }
export interface IFireOrmQueryLine {
    prop: string;
    val: IFirestoreVal | IFirestoreVal[];
    operator: FirestoreOperators;
  }

export enum OrderByDirection{
    ACENDENTE = "ASC",
    DESCENDENTE= "DESC"
  }
export interface IOrderByParams {
    fieldPath: string;
    directionStr: OrderByDirection;
  }
export type IWherePropParam<T> = keyof T | ((t: T) => unknown);
export type IFirestoreVal = string | number | Date | boolean | null //| DocumentReference | null;
export interface IQueryable<T extends IEntity> {
    whereEqualTo(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    whereNotEqualTo(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    whereGreaterThan(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    whereGreaterOrEqualThan(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    whereLessThan(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    whereLessOrEqualThan(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    whereArrayContains(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    whereArrayContainsAny(prop: IWherePropParam<T>, val: IFirestoreVal[]): IQueryBuilder<T>;
    whereIn(prop: IWherePropParam<T>, val: IFirestoreVal[]): IQueryBuilder<T>;
    whereNotIn(prop: IWherePropParam<T>, val: IFirestoreVal[]): IQueryBuilder<T>;
    find(): Promise<T[]>;
    findOne(): Promise<T | null>;
    //customQuery(func: ICustomQuery<T>): IQueryBuilder<T>;
  }
  
export interface IOrderable<T extends IEntity> {
    orderByAscending(prop: IWherePropParam<T>): IQueryBuilder<T>;
    orderByDescending(prop: IWherePropParam<T>): IQueryBuilder<T>;
  }
  
export interface ILimitable<T extends IEntity> {
    limit(limitVal: number): IQueryBuilder<T>;
  }
export interface IFirestoreTransaction<T extends IEntity = IEntity> {
    getRepository(entityOrConstructor: EntityConstructorOrPath<T>): IRepository<T>;
  }
export type ITransactionRepository<T extends IEntity> = IRepository<T>;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type PartialWithRequiredBy<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;
export type IQueryBuilder<T extends IEntity> = IQueryable<T> & IOrderable<T> & ILimitable<T>;
export interface IQueryExecutor<T> {
    execute(
      queries: IFireOrmQueryLine[],
      limitVal?: number,
      orderByObj?: IOrderByParams,
      single?: boolean,
      customQuery?: ICustomQuery<T>
    ): Promise<T[]>;
  }
  interface RelativeIndexable<T> {
    /**
     * Takes an integer value and returns the item at that index,
     * allowing for positive and negative integers.
     * Negative integers count back from the last item in the array.
     */
    at(index: number): T | undefined;
}
type Unpacked<T> = T extends (infer U)[] ?
    U :
    T extends ReadonlyArray<infer U> ? U : T;
type QuerySelector<T> = {
  // Comparison
  $eq?: T;
  $gt?: T;
  $gte?: T;
  $in?: [T] extends AnyArray<any> ? Unpacked<T>[] : T[];
  $lt?: T;
  $lte?: T;
  $ne?: T;
  $nin?: [T] extends AnyArray<any> ? Unpacked<T>[] : T[];
  // Logical
  $not?: T extends string ? QuerySelector<T> | RegExp : QuerySelector<T>;
  // Element
  /**
   * When `true`, `$exists` matches the documents that contain the field,
   * including documents where the field value is null.
   */
  $exists?: boolean;
  $type?: string | number;
  // Evaluation
  $expr?: any;
  $jsonSchema?: any;
  $mod?: T extends number ? [number, number] : never;
  $regex?: T extends string ? RegExp | string : never;
  $options?: T extends string ? string : never;
  // Geospatial
  // TODO: define better types for geo queries
  $geoIntersects?: { $geometry: object };
  $geoWithin?: object;
  $near?: object;
  $nearSphere?: object;
  $maxDistance?: number;
  // Array
  // TODO: define better types for $all and $elemMatch
  $all?: T extends AnyArray<any> ? any[] : never;
  $elemMatch?: T extends AnyArray<any> ? object : never;
  $size?: T extends AnyArray<any> ? number : never;
  
};
export type FilterQuery<T> = {
  [P in keyof T]?: Condition<T[P]>;
} & RootQuerySelector<T> & { _id?: Condition<string>; };
export type Condition<T> = T | QuerySelector<T | any> | any;
type RootQuerySelector<T> = {
  /** @see https://www.mongodb.com/docs/manual/reference/operator/query/and/#op._S_and */
  $and?: Array<FilterQuery<T>>;
  /** @see https://www.mongodb.com/docs/manual/reference/operator/query/nor/#op._S_nor */
  $nor?: Array<FilterQuery<T>>;
  /** @see https://www.mongodb.com/docs/manual/reference/operator/query/or/#op._S_or */
  $or?: Array<FilterQuery<T>>;
  /** @see https://www.mongodb.com/docs/manual/reference/operator/query/text */
  $text?: {
    $search: string;
    $language?: string;
    $caseSensitive?: boolean;
    $diacriticSensitive?: boolean;
  };
  /** @see https://www.mongodb.com/docs/manual/reference/operator/query/where/#op._S_where */
  $where?: string | Function;
  /** @see https://www.mongodb.com/docs/manual/reference/operator/query/comment/#op._S_comment */
  $comment?: string;
  $expr?: Record<string, any>;
  // this will mark all unrecognized properties as any (including nested queries)
  [key: string]: any;
};

export type AnyArray<T> = T[] | ReadonlyArray<T>;
export interface IBaseRepository<T extends IEntity> {
    findById(id: string): Promise<T | null>;
    create(item: PartialBy<T, 'id'>): Promise<T>;
    update(item: PartialWithRequiredBy<T, 'id'>): Promise<PartialWithRequiredBy<T, 'id'>>;
    delete(id: string): Promise<void>;
}
export type Constructor<T> = { new (): T };
export type IEntityRepositoryConstructor = Constructor<IRepository<IEntity>>;
export type IRepository<T extends IEntity> = IBaseRepository<T> &
  IQueryBuilder<T> &
  IQueryExecutor<T>;
  export type AnyKeys<T> = { [P in keyof T]?: T[P] | any };
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
