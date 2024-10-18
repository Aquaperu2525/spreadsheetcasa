import { ICustomQuery, IEntity, IFireOrmQueryLine, IOrderByParams, IRepository, ITransactionRepository, PartialBy } from 'src/types/types';
import { AbstractFirestoreRepository } from './abstractFirestoreRepository';
import { getMetadataStorage } from 'src/metadata/MetadataUtils';

export class BaseFirestoreRepository<T extends IEntity>
  extends AbstractFirestoreRepository<T>
  implements IRepository<T>
{
  async findById(id: string) {
    /*return this.firestoreColRef
      .doc(id)
      .get()
      .then(d => (d.exists ? this.extractTFromDocSnap(d) : null));*/
      let da:Promise<any | null>
      return  da
  }

  async create(item: PartialBy<T, 'id'>): Promise<T> {
    if (this.config.validateModels) {
      const errors = await this.validate(item as T);

      if (errors.length) {
        throw errors;
      }
    }

    if (item.id) {
      const found = await this.findById(item.id);
      if (found) {
        throw new Error(`A document with id ${item.id} already exists.`);
      }
    }

    //const doc = item.id ? this.firestoreColRef.doc(item.id) : this.firestoreColRef.doc();
    console.log(item)

    /*if (!item.id) {
      item.id = doc.id;
    }

    await doc.set(this.toSerializableObject(item as T));

    this.initializeSubCollections(item as T);
*/
    return item as T;
  }

  async update(item: T) {
    if (this.config.validateModels) {
      const errors = await this.validate(item);

      if (errors.length) {
        throw errors;
      }
    }

    // TODO: handle errors
    await this.firestoreColRef.doc(item.id).update(this.toSerializableObject(item));
    return item;
  }

  async delete(id: string): Promise<void> {
    // TODO: handle errors
    await this.firestoreColRef.doc(id).delete();
  }

  async runTransaction<R>(executor: (tran: ITransactionRepository<T>) => Promise<R>) {
    // Importing here to prevent circular dependency
    const { runTransaction } = await import('../util');

    return runTransaction<R>(tran => {
      const repository = tran.getRepository<T>(this.path);
      return executor(repository);
    });
  }

  createBatch() {
    //const { firestoreRef } = getMetadataStorage();
    //return new FirestoreBatch(firestoreRef).getSingleRepository(this.path);
  }

  async execute(
    queries: Array<IFireOrmQueryLine>,
    limitVal?: number,
    orderByObj?: IOrderByParams,
    single?: boolean,
    customQuery?: ICustomQuery<T>
  ): Promise<T[]> {
    let query = queries.reduce<any>((acc, cur) => {
      const op = cur.operator as any;
      return acc.where(cur.prop, op, cur.val);
    }, this.firestoreColRef);

    if (orderByObj) {
      query = query.orderBy(orderByObj.fieldPath, orderByObj.directionStr);
    }

    if (single) {
      query = query.limit(1);
    } else if (limitVal) {
      query = query.limit(limitVal);
    }

    if (customQuery) {
      query = await customQuery(query, this.firestoreColRef);
    }

    return query.get().then(this.extractTFromColSnap);
  }
}