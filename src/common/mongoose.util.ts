import { DEFAULT_DB_CONNECTION } from "src/util";

export function getModelToken(model: string, connectionName?: string) {
    if (connectionName === undefined) {
        console.log("connectionname undefined es")
      return `${model}`;
    }
    return `${getConnectionToken(connectionName)}/${model}`;
  }
  export function getConnectionToken(name?: string) {
    return name && name !== DEFAULT_DB_CONNECTION
      ? `${name}Connection`
      : DEFAULT_DB_CONNECTION;
  }