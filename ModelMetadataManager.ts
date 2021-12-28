import { ModelMetadata } from './ModelMetadata';

type StoreItem = {
  [key: string]: ModelMetadata;
};
type Store = {
  [key: string]: StoreItem;
};

export class ModelMetadataManager {
  private store: Store = {};
  private static instance: ModelMetadataManager;

  private constructor() {}

  public static getInstance(): ModelMetadataManager {
    if (!ModelMetadataManager.instance) {
      ModelMetadataManager.instance = new ModelMetadataManager();
    }
    return ModelMetadataManager.instance;
  }

  public get(serviceName: string, modelName: string): ModelMetadata {
    if (this.store?.[serviceName]?.[modelName]) {
      return this.store[serviceName][modelName];
    } else {
      return this.getMetadataFromServer(serviceName, modelName);
    }
  }

  public getMetadataFromServer(serviceName: string, modelName: string): ModelMetadata {
    // create connection
    // return response
  }
}
