export class ModelMetadata {
  protected primaryKey: string = 'id';

  public getPrimaryKey(): string {
    throw new Error('Method not implemented.');
  }
}
