import { Module, Provider } from '@nestjs/common';
//import { HttpModule } from '@nestjs/axios';
import { DynamicModule } from '@nestjs/common';
import { getModelToken } from './common/mongoose.util';
import { Model, ModelDefinition } from './types/types';
export const enum EFOLDERSIDS {
  CONFIG = "CONFIG",
  FOLDERBASEID = "FOLDERBASEID",
  FOLDERLOGOSID = "FOLDERLOGOSID", 
  FOLDERARCHIVOSID = "FOLDERARCHIVOSID",
  CONFIG_SHEETID_FILE="CONFIG_SHEETID_FILE"
}

@Module({
    //imports: [HttpModule],
})
export class GoogledrivecasaModule {
    /**
   *
   * @param googleDriveConfig your config file/all config fields
   * @param googleDriveFolderId your Google Drive folder id
   */
  static register(
    models: ModelDefinition[] = [],
    connectionName?: string,
  ): DynamicModule {
    const providers = createMongooseProviders(connectionName, models);
    console.log(providers)
    return {
      module: GoogledrivecasaModule,
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