import { ExtendableError } from "./ExtendableError";

export class EntityCreationError extends ExtendableError {
  constructor(entityName: string) {
    super(`Unable to create Entity ${entityName}`, {
      details: "The create() event has already been called.",
    });
  }
}
