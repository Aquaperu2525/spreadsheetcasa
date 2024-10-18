import { Provider } from '@nestjs/common';
import { Connection, Document, Model } from 'mongoose';
import { ModelDefinition } from './interfaces/model.definicion';
import { getConnectionToken, getModelToken } from './common/mongoose.util';
/*import { getConnectionToken, getModelToken } from './common/mongoose.utils';
import { AsyncModelFactory, ModelDefinition } from './interfaces';
*/
export function createMongooseProviders(
  connectionName?: string,
  options: ModelDefinition[] = [],
): Provider[] {
  return options.reduce(
    (providers, option) => [
      ...providers,
      ...(option.discriminators || []).map((d) => ({
        provide: getModelToken(d.name, connectionName),
        useFactory: (model: Model<Document>) =>
          model.discriminator(d.name, d.schema, d.value),
        inject: [getModelToken(option.name, connectionName)],
      })),
      {
        provide: getModelToken(option.name, connectionName),
        useFactory: (connection: Connection) => {
          const model = connection.models[option.name] ? connection.models[option.name] : connection.model(
            option.name,
            option.schema,
            option.collection,
          );
          return model;
        },
        inject: [getConnectionToken(connectionName)],
      },
    ],
    [] as Provider[],
  );
}
