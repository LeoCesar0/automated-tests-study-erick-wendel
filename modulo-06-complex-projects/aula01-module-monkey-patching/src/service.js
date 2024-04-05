import lokijs from "lokijs";
import { randomUUID } from "node:crypto";
import { COLLECTION_NAME } from "./static";

export class Service {
  #db;
  constructor(dbName) {
    const _db = new lokijs(dbName);
    this.#db = _db.addCollection(COLLECTION_NAME);
  }

  createHero(hero) {
    const item = this.#db.insert({
      ...hero,
      id: randomUUID(),
    });
    return item;
  }

  listHeroes() {
    return this.#db.find();
  }
}
