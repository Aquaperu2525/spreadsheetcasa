import { BaseFirestoreRepository } from "src/common/baseRepository";
import { FirestoreTransaction } from "src/common/firestore.transaction";
import { getMetadataStorage } from "src/metadata/MetadataUtils";
import { EntityConstructorOrPath, IEntity, ITransactionReferenceStorage } from "src/types/types";

export const DEFAULT_DB_CONNECTION = 'DatabaseConnection';
export const MONGOOSE_MODULE_OPTIONS = 'MongooseModuleOptions';
export const MONGOOSE_CONNECTION_NAME = 'MongooseConnectionName';
export const RAW_OBJECT_DEFINITION = 'RAW_OBJECT_DEFINITION';

//funcion que retorna un objeto con una nueva propiedad RAW_OBJECT_DEFINITION, 
//que contiene en su descriptor en objeto {value,enumerable, configurable}
//se accesde con Object.getOwnPropertyDescriptors(myob)
//parametro: definicion es el objeto a ser tratado
export function raw(definition: Record<string, any>) {
  Object.defineProperty(definition, RAW_OBJECT_DEFINITION, {
    value: true, 
    enumerable: false,
    configurable: false,
  });
  return definition;
}
export const runTransaction = async <T>(executor: (tran: FirestoreTransaction) => Promise<T>) => {
  const metadataStorage = getMetadataStorage();

  /*if (!metadataStorage.firestoreRef) {
    throw new Error('Firestore must be initialized first');
  }

  return metadataStorage.firestoreRef.runTransaction(async t => {
    const tranRefStorage: ITransactionReferenceStorage = new Set();
    const result = await executor(new FirestoreTransaction(t, tranRefStorage));

    tranRefStorage.forEach(({ entity, path, propertyKey }) => {
      const record = entity as unknown as Record<string, unknown>;
      record[propertyKey] = getRepository(path);
    });

    return result;
  });*/
};
export function getRepository<T extends IEntity>(
  entityConstructorOrPath: EntityConstructorOrPath<T>
) {
  return _getRepository(entityConstructorOrPath, 'default');
}
type RepositoryType = 'default' | 'base' | 'custom' | 'transaction';
function _getRepository<T extends IEntity = IEntity>(
  entityConstructorOrPath: EntityConstructorOrPath<T>,
  repositoryType: RepositoryType
): BaseFirestoreRepository<T> {
  const metadataStorage = getMetadataStorage();

  /*if (!metadataStorage.firestoreRef) {
    throw new Error('Firestore must be initialized first');
  }*/

  const collection = metadataStorage.getCollection(entityConstructorOrPath);

  const isPath = typeof entityConstructorOrPath === 'string';
  const collectionName =
    typeof entityConstructorOrPath === 'string'
      ? entityConstructorOrPath
      : entityConstructorOrPath.name;

  // TODO: create tests
  if (!collection) {
    const error = isPath
      ? `'${collectionName}' is not a valid path for a collection`
      : `'${collectionName}' is not a valid collection`;
    throw new Error(error);
  }

  const repository = metadataStorage.getRepository(collection.entityConstructor);

  if (repositoryType === 'custom' && !repository) {
    throw new Error(`'${collectionName}' does not have a custom repository.`);
  }

  // If the collection has a parent, check that we have registered the parent
  if (collection.parentEntityConstructor) {
    const parentCollection = metadataStorage.getCollection(collection.parentEntityConstructor);

    if (!parentCollection) {
      throw new Error(`'${collectionName}' does not have a valid parent collection.`);
    }
  }

  if (repositoryType === 'custom' || (repositoryType === 'default' && repository)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new (repository?.target as any)(entityConstructorOrPath);
  } else {
    return new BaseFirestoreRepository<T>(entityConstructorOrPath);
  }
}