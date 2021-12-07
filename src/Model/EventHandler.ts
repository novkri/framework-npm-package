import rxjs from 'rxjs';

export class EventHandler {
  sendRequest() {}
  filters(filters: Array<object>): this {
    return this;
  }
  orders(orders:Array<object>): this {
    return this;
  }
  withs(withs:Array<string>): this {
    return this;
  }
  pagination(pagination:{page:number, perPage: number}): this {
    return this;
  }
}
