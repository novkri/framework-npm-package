import { EventHandler } from './EventHandler';
export class NewModel {
  modelName: string | undefined;
  modelItems: Array<object> = [];
  modelMetadata: Array<object> = [];
  connection: EventHandler = new EventHandler();

  constructor(modelName?: string, modelId?: string) {
    this.modelName = modelName;
  }
}
