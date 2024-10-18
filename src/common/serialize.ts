import 'reflect-metadata';
import { Constructor } from 'src/types/types';

export const serializeKey = Symbol('Serialize');

export function Serialize(entityConstructor: Constructor<unknown>) {
  return Reflect.metadata(serializeKey, entityConstructor);
}