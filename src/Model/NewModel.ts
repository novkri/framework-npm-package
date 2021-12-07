import {EventHandler} from './EventHandler'
export class NewModel {
  modelName: string | undefined;
  modelItems: Array<object> = [];
  modelMetadata: Array<object> = [];
  connection: EventHandler = new EventHandler();

  constructor(modelName?: string, modelId?: string) {
    this.modelName = modelName;
  }

  initObserver() {}

  static getMetadata(microserviceName: string) {
    let instance = new this();
    instance.connection.sendRequest()
  }

  static getItems(
    microserviceName: string,
    filters: Array<object>,
    orders: Array<object>,
    withs: Array<string>,
    pagination: Array<string>
  ) {
    let instance = new this();
    instance.connection.filters(filters).orders(orders).sendRequest()
  }
  static getItem(modelId: string, withs: Array<string>) {}
  static create() {}
  static update() {}
  static delete() {}
  static subscribe() {}
  static unsubscribe() {}
}
