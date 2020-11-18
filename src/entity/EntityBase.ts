import { TObject } from "../typing";
import { v4 as uuid } from "uuid";

export interface IEntity {
  id: string;
  version: number;
  created: Date;
  updated: Date;
  events?: Array<IEntityEvent>;
}

export interface IEntityBaseOptions {
  id?: string;
  version?: number;
  created?: Date;
  updated?: Date;
  events?: Array<IEntityEvent>;
}

export interface IEntityEvent {
  name: string;
  payload: TObject<any>;
  date: Date;
}

export abstract class EntityBase implements IEntity {
  protected _id: string;
  protected _created: Date;
  protected _updated: Date;
  protected _events: Array<IEntityEvent>;
  protected _version: number;

  protected constructor(options: IEntityBaseOptions = {}) {
    this._id = options.id || uuid();
    this._created = options.created || new Date();
    this._updated = options.updated || new Date();
    this._events = options.events || [];
    this._version = options.version || 0;
  }

  public get id(): string {
    return this._id;
  }

  public get created(): Date {
    return this._created;
  }

  public get updated(): Date {
    return this._updated;
  }
  public set updated(updated: Date) {
    this._updated = updated;
  }

  public get events(): Array<IEntityEvent> {
    return this._events;
  }

  public get version(): number {
    return this._version;
  }
  public set version(version: number) {
    this._version = version;
  }

  protected abstract create(): void;

  protected addEvent(name: string, payload: TObject<any>): void {
    this._events.push({
      name,
      payload,
      date: new Date(),
    });
  }
}
