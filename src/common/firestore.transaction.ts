import { getMetadataStorage } from "src/metadata/MetadataUtils";
import { EntityConstructorOrPath, IEntity, IFirestoreTransaction, ITransactionReferenceStorage } from "src/types/types";

const metadataStorage = getMetadataStorage();

export class FirestoreTransaction implements IFirestoreTransaction {
  constructor(
    private transaction: any,
    private tranRefStorage: ITransactionReferenceStorage
  ) {}

  getRepository<T extends IEntity = IEntity>(entityOrConstructor: EntityConstructorOrPath<T>) {
    /*if (!metadataStorage.firestoreRef) {
      throw new Error('Firestore must be initialized first');
    }*/

    return null// {entityOrConstructor, this.transaction, this.tranRefStorage}//new TransactionRepository<T>(entityOrConstructor, this.transaction, this.tranRefStorage);
  }
}