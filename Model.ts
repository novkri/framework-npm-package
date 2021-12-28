import { RetrieveBuilder } from './RetrieveBuilder';
import { ModelMetadataManager } from './ModelMetadataManager';
import { ModelMetadata } from './ModelMetadata';

export class Model {
  protected modelName: string;
  protected serviceName: string;
  protected attributes: { [index: string]: any } = {};
  protected originalAttributes: { [index: string]: any } = {};
  protected exists: boolean = false;
  protected modelMetadata: ModelMetadata;
  protected modelMetadataManager: ModelMetadataManager;
  protected eventsListeners: { [index: string]: Array<Function> } = {
    updating: [],
    updated: [],
    creating: [],
    created: [],
    saving: [],
    saved: [],
    deleting: [],
    deleted: []
  };

  public constructor(serviceName: string, modelName: string) {
    this.modelName = modelName;
    this.serviceName = serviceName;
    this.modelMetadataManager = ModelMetadataManager.getInstance();
    this.modelMetadata = this.modelMetadataManager.get(this.serviceName, this.modelName);
    this.boot();
  }

  protected boot() {}

  protected registerEventListener(eventName: string, callback: Function) {
    this.eventsListeners[eventName].push(callback);
  }

  public setAttribute(key: string, value: any): void {
    Object.assign(this.attributes, { key: value });
  }

  public fill(object: object): void {
    Object.assign(this.attributes, object);
  }

  public refresh(): void {
    if (!this.exists) {
      throw new Error("Entity doesn't exist. Nothing to refresh");
    }
    let newAttributes = {}; // TODO: Call API for sync changes from server with current model
    this.sync(newAttributes);
  }

  public sync(object: object): void {
    this.fill(object);
    // TODO: Sync current model attributes with object

    this.originalAttributes = this.attributes;
    this.exists = true;
  }

  public getDirtyAttributes(): object {
    let dirtyAttributes: { [index: string]: any } = {};
    if (JSON.stringify(this.originalAttributes) === JSON.stringify(this.attributes)) {
      return {};
    } else {
      Object.keys(this.attributes).forEach((key) => {
        if (this.attributes[key] !== this.originalAttributes[key]) {
          dirtyAttributes[key] = this.attributes[key];
        }
      });
      return dirtyAttributes;
    }
  }

  public retrieveBuilder(): RetrieveBuilder {
    return new RetrieveBuilder(this.modelName, this.serviceName);
  }

  public save(): void {
    // TODO: fire model event `saving`
    if (this.exists) {
      this.update();
    } else {
      this.create();
    }
    // TODO: fire model event `saved`
  }

  public validate(): void {
    // TODO: Implementation
  }

  public create(): void {
    if (this.exists) {
      throw new Error('Entity already exists!');
    } else {
      this.fireModelEvent('creating');
    }
    this.validate();

    // TODO: fire model event `creating`
    // TODO: Query create
    // TODO: fire model event `created`
  }

  public update(): void {
    let dirty = this.getDirtyAttributes();
    if (dirty === {}) {
      return;
    } else {
    }

    this.validate();

    // TODO: fire model event `updating`
    // TODO: Query create with dirty attributes
    // TODO: fire model event `updated`
  }

  protected formRequest() {}

  protected fireModelEvent(eventName: string) {
    if (this.eventsListeners[eventName]) {
    } else {
      return false;
    }
    // TODO: Call listeners from `this.eventsListeners.{eventName}`
    // TODO: Store listeners results in array
    // TODO: Check if in results array exists false value => break process
  }

  public onDeletingEvent(listener: Function): void {
    this.registerEventListener('deleting', listener);
  }

  public onDeletedEvent(listener: Function): void {
    this.registerEventListener('deleted', listener);
  }

  public onUpdatingEvent(listener: Function): void {
    this.registerEventListener('updating', listener);
  }

  public onUpdatedEvent(listener: Function): void {
    this.registerEventListener('updated', listener);
  }

  public onCreatingEvent(listener: Function): void {
    this.registerEventListener('creating', listener);
  }

  public onCreatedEvent(listener: Function): void {
    this.registerEventListener('created', listener);
  }

  public onSavingEvent(listener: Function): void {
    this.registerEventListener('saving', listener);
  }

  public onSavedEvent(listener: Function): void {
    this.registerEventListener('saved', listener);
  }
}

export class Post extends Model {
  public constructor() {
    super('first', 'Post');
  }

  protected boot() {
    super.boot();
    this.registerEventListener('updated', (entity: Model) => {
      console.log('updated');
    });
  }
}
