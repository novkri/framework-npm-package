import { Model } from './Model';
import { ActionGetItemPromise } from './ActionGetItemPromise';
import { ActionError } from './ActionError';
import { ModelMetadata } from './ModelMetadata';
import { ModelMetadataManager } from './ModelMetadataManager';

type OrderItem = {
  column: string;
  direction: string;
};
type Where = Array<Array<string | number> | string | number>;
type FilterItem = {
  field: string;
  condition: string;
  value: Array<string | number> | string | number;
};

export class RetrieveBuilder {
  protected modelName: string;
  protected serviceName: string;
  protected modelMetadata: ModelMetadata;
  protected wheres: Where = [];
  protected orders: OrderItem[] = [];
  protected withs: string[] = [];
  protected modelMetadataManager: ModelMetadataManager;

  constructor(modelName: string, serviceName: string) {
    this.modelMetadataManager = ModelMetadataManager.getInstance();
    this.modelMetadata = this.modelMetadataManager.get(modelName, serviceName);
    this.modelName = modelName;
    this.serviceName = serviceName;
  }

  // TODO: Вложенный where и orWhere

  public where(
    field: string,
    condition: string,
    value: Array<string | number> | string | number,
    boolean: string | undefined = 'and',
    nestedWhereFunction?: Function
  ): this {
    let arrayValues: Array<string | number> = [];
    if (!Array.isArray(value)) {
      if (!this.wheres.length) {
        this.wheres.push([field, condition, value]);
      } else {
        this.wheres.push(boolean, [field, condition, value]);
      }
    } else {
      value.forEach((item) => {
        arrayValues.push([field, condition, item]);
      });
      this.wheres.push(
        arrayValues
          .map((e, i) => (i < arrayValues.length - 1 ? [e, 'and'] : [e]))
          .reduce((a, b) => a.concat(b))
      );
    }
    return this;
  }

  public orWhere(field: string, condition: string, value: string): this {
    this.where(field, condition, value, 'or');
    return this;
  }

  public addWhere(filter: object): this {
    throw new Error('Method not implemented.');
  }

  public addArrayOfWheres(filter: FilterItem[]): this {
    filter.forEach((item) => {
      this.where(item.field, item.condition, item.value);
    });
    return this;
  }

  public with(relation: string | string[]): this {
    Array.isArray(relation) ? (this.withs = relation) : this.withs.push(relation);
    return this;
  }

  public orderBy(column: string, direction: string): this {
    this.orders.push({ column: column, direction: direction });
    return this;
  }

  public addOrderBy(filter: object): this {
    throw new Error('Method not implemented.');
  }

  public addArrayOfOrderBy(orders: Array<Array<string>>): this {
    for (const i in orders) {
      this.orderBy(orders[i][0], orders[i][1]);
    }
    return this;
  }

  public paginate(
    perPage: number,
    page: number
  ): ActionGetItemPromise<Model | Array<Model>, ActionError> {
    throw new Error('Method not implemented.');
  }

  public get(): ActionGetItemPromise<Model | Array<Model>, ActionError> {
    throw new Error('Method not implemented.');
  }

  public first(): ActionGetItemPromise<Model | Array<Model>, ActionError> {
    throw new Error('Method not implemented.');
  }

  public find(key: string | number): ActionGetItemPromise<Model | Array<Model>, ActionError> {
    return this.where(this.modelMetadata.getPrimaryKey(), 'eq', key).first();
  }

  // TODO: Actions Promises
}
