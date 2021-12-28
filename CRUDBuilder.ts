import { ModelMetadata } from './ModelMetadata';
import { ModelMetadataManager } from './ModelMetadataManager';
import {ActionGetItemPromise} from "./ActionGetItemPromise";
import {Model} from "./Model";
import {ActionError} from "./ActionError";

export class CRUDBuilder {
  protected modelName: string;
  protected serviceName: string;
  protected modelMetadata: ModelMetadata;
  protected modelMetadataManager: ModelMetadataManager;

  constructor(modelName: string, serviceName: string) {
    this.modelMetadataManager = ModelMetadataManager.getInstance();
    this.modelMetadata = this.modelMetadataManager.get(modelName, serviceName);
    this.modelName = modelName;
    this.serviceName = serviceName;
  }
  public create(): ActionGetItemPromise<Model | Array<Model>, ActionError> {
    throw new Error('Method not implemented.');
  }
}
