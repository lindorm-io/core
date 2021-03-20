import MockDate from "mockdate";
import { EntityBase, IEntityBaseOptions } from "./EntityBase";

jest.mock("uuid", () => ({
  v4: () => "e397bc49-849e-4df6-a536-7b9fa3574ace",
}));

MockDate.set("2020-01-01 08:00:00.000");
const date = new Date("2020-01-01 08:00:00.000");

class Entity extends EntityBase {
  constructor(options: IEntityBaseOptions) {
    super(options);
  }

  create() {
    this.addEvent("created", { created: true });
  }
}

describe("EntityBase.ts", () => {
  let entity: Entity;

  beforeEach(() => {
    entity = new Entity({
      created: date,
      updated: date,
      events: [
        {
          name: "before",
          payload: { payload: true },
          date: date,
        },
      ],
    });
  });

  test("should have all data", () => {
    expect(entity).toMatchSnapshot();
  });

  test("should create", () => {
    entity.create();
    expect(entity).toMatchSnapshot();
  });

  test("should get id", () => {
    expect(entity.id).toBe("e397bc49-849e-4df6-a536-7b9fa3574ace");
  });

  test("should get created", () => {
    expect(entity.created).toBe(date);
  });

  test("should get/set updated", () => {
    expect(entity.created).toBe(date);

    const updated = new Date("2021-01-01 00:00:01");
    entity.updated = updated;

    expect(entity.updated).toBe(updated);
  });

  test("should get events", () => {
    expect(entity.events).toStrictEqual([
      {
        name: "before",
        payload: { payload: true },
        date: date,
      },
    ]);
  });

  test("should get/set version", () => {
    expect(entity.version).toBe(0);

    entity.version = 99;

    expect(entity.version).toBe(99);
  });
});
