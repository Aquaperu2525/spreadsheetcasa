import { MetadataStorage } from "./MetadataStorage";

export interface IMetadataStore {
  metadataStorage: MetadataStorage;
}

export function getStore(): IMetadataStore {
  return global as never;
}

function initializeMetadataStorage() {
  const store = getStore();

  if (!store.metadataStorage) {
    store.metadataStorage = new MetadataStorage();
  }
}
export const getMetadataStorage = (): MetadataStorage => {
    const store = getStore();
    initializeMetadataStorage();
  
    return store.metadataStorage;
  };
  /**
 * Returns true if arrays are equal
 *
 * @export
 * @param {Array<unknown>} arr1
 * @param {Array<unknown>} arr2
 * @returns {boolean}
 */
  export function arraysAreEqual(arr1: unknown[], arr2: unknown[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }
  
    return arr1.every((a, i) => a === arr2[i]);
  }