import { ActionConstructorInterface } from './Interfaces/ActionConstructorInterface';
import { GetItemsFilterParams } from './GetItemsAction/GetItemsFilterParams';
import { GetItemsSortingParams } from './GetItemsAction/GetItemsSortingParams';
import { GlobalVariables } from '../GlobalVariables';
import { CRUDAction } from './CRUDActions/CRUDAction';
import { GetModelMetadataAction } from './GetMetadataAction/GetModelMetadataAction';
import { CustomAction } from './CustomAction/CustomAction';
import { GetItemsAction } from './GetItemsAction/GetItemsAction';

export class ActionConstructor implements ActionConstructorInterface {
  filterArr: (string | object)[];
  ordersArr: Array<object>;
  withsArr: Array<string>;
  microserviceName: string;
  modelName: string;
  actionName: string;
  calledAction: string;
  actionParams: Array<object> | object;
  pagination: { per_page: number; page: number };
  id: string | number;
  url: string;
  constructor(url: string) {
    this.filterArr = [];
    this.ordersArr = [];
    this.withsArr = [];
    this.microserviceName = '';
    this.modelName = '';
    this.actionName = '';
    this.calledAction = '';
    this.actionParams = [];
    this.pagination = { per_page: 10, page: 1 };
    this.id = '';
    this.url = url;
    this.setBaseUrl(this.url);
  }
  setBaseUrl(url: string) {
    GlobalVariables.httpBaseUrl = url;
  }
  getMetadata(microserviceName: string, modelName: string): this {
    this.microserviceName = microserviceName;
    this.modelName = modelName;
    this.actionName = 'getMetadata';
    this.calledAction = 'getMetadata';
    return this;
  }
  getItems(microserviceName: string, modelName: string): this {
    this.microserviceName = microserviceName;
    this.modelName = modelName;
    this.actionName = 'getItems';
    this.calledAction = 'getItems';
    return this;
  }
  getItem(microserviceName: string, modelName: string, id: string | number): this {
    this.microserviceName = microserviceName;
    this.modelName = modelName;
    this.actionName = 'getItem';
    this.calledAction = 'getItem';
    this.id = id;
    return this;
  }
  create(microserviceName: string, modelName: string, actionParams: object): this {
    this.microserviceName = microserviceName;
    this.modelName = modelName;
    this.actionParams = actionParams;
    this.actionName = 'create';
    this.calledAction = 'create';
    return this;
  }
  update(microserviceName: string, modelName: string, actionParams: object): this {
    this.microserviceName = microserviceName;
    this.modelName = modelName;
    this.actionParams = actionParams;
    this.actionName = 'update';
    this.calledAction = 'update';
    return this;
  }
  delete(microserviceName: string, modelName: string, actionParams: object): this {
    this.microserviceName = microserviceName;
    this.modelName = modelName;
    this.actionParams = actionParams;
    this.actionName = 'delete';
    this.calledAction = 'delete';
    return this;
  }
  createMany(microserviceName: string, modelName: string, actionParams: object): this {
    this.microserviceName = microserviceName;
    this.modelName = modelName;
    this.actionParams = actionParams;
    this.actionName = 'createMany';
    this.calledAction = 'createMany';
    return this;
  }
  updateMany(microserviceName: string, modelName: string, actionParams: object): this {
    this.microserviceName = microserviceName;
    this.modelName = modelName;
    this.actionParams = actionParams;
    this.actionName = 'updateMany';
    this.calledAction = 'updateMany';
    return this;
  }
  deleteMany(microserviceName: string, modelName: string, actionParams: object): this {
    this.microserviceName = microserviceName;
    this.modelName = modelName;
    this.actionParams = actionParams;
    this.actionName = 'deleteMany';
    this.calledAction = 'deleteMany';
    return this;
  }
  updateManyWithFilter(microserviceName: string, modelName: string, actionParams: object): this {
    this.microserviceName = microserviceName;
    this.modelName = modelName;
    this.actionParams = actionParams;
    this.actionName = 'updateManyRaw';
    this.calledAction = 'updateManyRaw';
    return this;
  }
  deleteManyWithFilter(microserviceName: string, modelName: string, actionParams: object): this {
    this.microserviceName = microserviceName;
    this.modelName = modelName;
    this.actionParams = actionParams;
    this.actionName = 'deleteManyRaw';
    this.calledAction = 'deleteManyRaw';
    return this;
  }
  custom(
    microserviceName: string,
    modelName: string,
    actionName: string,
    actionParams: object
  ): this {
    this.microserviceName = microserviceName;
    this.modelName = modelName;
    this.actionParams = actionParams;
    this.actionName = actionName;
    this.calledAction = 'custom';
    return this;
  }
  getCount(microserviceName: string, modelName: string): this {
    this.microserviceName = microserviceName;
    this.modelName = modelName;
    this.actionName = 'getCount';
    this.calledAction = 'getCount';
    return this;
  }
  filter(filterObject: (string | object)[]): this {
    const newFilterObj = new GetItemsFilterParams(filterObject);
    newFilterObj.checkFilterType();
    this.filterArr = newFilterObj.formFilterObject();
    return this;
  }
  withs(withs: Array<string>): this {
    Array.isArray(withs) ? (this.withsArr = withs) : this.withsArr.push(withs);
    return this;
  }
  order(orders: string[][] | undefined): this {
    this.ordersArr = new GetItemsSortingParams().createOrderObj(orders);
    return this;
  }
  setPagination(perPage: number, page: number): this {
    this.pagination = { per_page: perPage, page: page };
    return this;
  }
  call() {
    return new Promise((resolve, reject) => {
      let result;
      let actionParameters = {
        pagination: this.pagination,
        filter: this.filterArr,
        withs: this.withsArr,
        order: this.ordersArr,
        id: this.id
      };
      GlobalVariables.tokenUST = this.microserviceName;
      switch (this.calledAction) {
        case 'getItems':
        case 'getItem':
        case 'getCount':
          result = new GetItemsAction(
            this.microserviceName,
            this.modelName,
            this.actionName,
            actionParameters
          )
            .axiosConnect(true)
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
          break;
        case 'getMetadata':
          result = new GetModelMetadataAction(
            this.microserviceName,
            this.actionName,
            this.modelName
          )
            .axiosConnect(true)
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
          break;
        case 'custom':
          result = new CustomAction(
            this.microserviceName,
            this.modelName,
            this.actionName,
            this.actionParams
          )
            .axiosConnect(true)
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
          break;
        default:
          result = new CRUDAction(
            this.microserviceName,
            this.modelName,
            this.actionName,
            this.actionParams
          )
            .axiosConnect(true)
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
      }
    });
  }
}