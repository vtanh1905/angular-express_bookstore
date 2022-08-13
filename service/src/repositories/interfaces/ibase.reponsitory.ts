export interface IBaseReponsitory<EntityType>{
  find(limit: number, skip: number): Promise<EntityType[]>;
  findOne(_id: any): Promise<EntityType | object>;
  count(): Promise<number>;
  create(entity: EntityType): Promise<any>;
  deleteOne(_id: string): Promise<any>;
  updateOne(_id: any, entity: EntityType): Promise<any>;
}