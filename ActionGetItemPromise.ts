import { ActionError } from './ActionError';
import { Model } from './Model';

export class ActionGetItemPromise<T, E> extends Promise<ActionGetItemPromise<T, E>> {
  private promise: ActionGetItemPromise<T, E>;
  [Symbol.toStringTag]: string;

  constructor(
    executor: (resolve: (value?: Model) => void, reject: (reason?: ActionError) => void) => void
  ) {
    super(executor);
    this.promise = new ActionGetItemPromise(executor);
  }

  public then<TResult1 = Model | Array<Model>>(
    onfulfilled?: ((value: Model | Array<Model>) => TResult1 | Promise<TResult1>) | undefined | null
  ): ActionGetItemPromise<TResult1, E> {
    return this.promise.then(onfulfilled);
  }

  public catch<TResult = ActionError>(
    onrejected?: ((reason: ActionError) => TResult | Promise<TResult>) | undefined | null
  ): ActionGetItemPromise<TResult, E> {
    return this.promise.catch(onrejected);
  }

  public finally(onfinally?: (() => void) | undefined | null): Promise<ActionGetItemPromise<T, E>> {
    return this.promise.finally(undefined);
  }
}

// private promise: ActionGetItemPromise<T, E>;
// [Symbol.toStringTag]: string;
//
// constructor(
//     executor: (resolve: (value?: Model) => void, reject: (reason?: ActionError) => void) => void
// ) {
//   this.promise = new ActionGetItemPromise(executor);
// }
//
// public then<TResult1 = Model | Array<Model>>(
//     onfulfilled?: ((value: Model | Array<Model>) => TResult1 | Promise<TResult1>) | undefined | null
// ): ActionGetItemPromise<TResult1, E> {
//   return this.promise.then(onfulfilled);
// }
//
// public catch<TResult = ActionError>(
//     onrejected?: ((reason: ActionError) => TResult | Promise<TResult>) | undefined | null
// ): ActionGetItemPromise<TResult, E> {
//   return this.promise.catch(onrejected);
// }
//
// public finally(onfinally?: (() => void) | undefined | null): Promise<ActionGetItemPromise<T, E>> {
//   return this.promise.finally(undefined);
// }
// readonly [Symbol.toStringTag]: string;
// private promise: ActionGetItemPromise<T>;
//
// constructor(
//   executor: (resolve: (value?: Model) => void, reject: (reason?: ActionError) => void) => void
// ) {
//   this.promise = new ActionGetItemPromise(executor);
// }
//
// catch<TResult = ActionGetItemPromise<ActionError>>(
//   onrejected?: (reason: ActionGetItemPromise<ActionError>) => Promise<TResult>
// ): Promise<TResult> {
//   return this.promise.catch(onrejected);
// }
//
// finally(onfinally?: (() => void) | undefined | null): Promise<ActionGetItemPromise<Model>> {
//   return this.promise.finally(onfinally);
// }
//
// then<TResult1 = ActionGetItemPromise<Model>>(
//   onfulfilled?: (value: ActionGetItemPromise<Model>) => Promise<TResult1>
// ): Promise<TResult1> {
//   return this.promise.then(onfulfilled);
// }
