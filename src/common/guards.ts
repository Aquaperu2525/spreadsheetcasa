export function isTimestamp(x: unknown): x is any {
    return typeof x === 'object' && x !== null && 'toDate' in x;
  }
  
  export function isGeoPoint(x: unknown): x is any {
    return typeof x === 'object' && x !== null && x.constructor.name === 'GeoPoint';
  }
  
  export function isDocumentReference(x: unknown): x is any {
    return typeof x === 'object' && x !== null && x.constructor.name === 'DocumentReference';
  }
  
  export function isObject(x: unknown): x is Record<string, unknown> {
    return typeof x === 'object';
  }