import { it, expect, describe, jest, beforeEach } from "@jest/globals";
import { runner } from "../src/runner";
import lokijs from "lokijs";
import { COLLECTION_NAME, DB_NAME } from "../src/static";

const EXPECTED_UUID = "000000";

jest.mock("node:crypto", () => ({
  randomUUID: jest.fn(() => EXPECTED_UUID),
}));

const LOKI_META_DATA = {
  meta: {
    revision: 0,
    created: Date.now(),
    version: 0,
  },
  $loki: 1,
};

jest.mock("lokijs");

const configureDriverDB = (
  initialData = [{ collection: COLLECTION_NAME, data: [] }]
) => {
  const spies = {
    db: null,
    addCollection: null,
    insert: null,
    find: null,
  };

  const seedDB = () => {
    const _dbData = {};
    initialData.forEach(({ collection, data }) => {
      _dbData[collection] = data;
    });
    return _dbData;
  };

  spies.db = lokijs.mockImplementationOnce((dbName) => {
    const _dbData = seedDB();
    const addCollection = (spies.addCollection = jest.fn((collectionName) => {
      const insert = (spies.insert = jest.fn((data) => {
        const item = {
          ...data,
          ...LOKI_META_DATA,
        };
        _dbData[collectionName].push(item);
        return item;
      }));
      const find = (spies.find = jest.fn(() => {
        return _dbData[collectionName];
      }));
      return {
        insert,
        find,
      };
    }));

    return { addCollection };
  });

  return spies;
};

describe("Complex Test Suite", () => {
  const INITIAL_DB_DATA = [
    {
      collection: COLLECTION_NAME,
      data: [
        {
          id: 1,
          name: "Spider Man",
          power: "Sucks",
          ...LOKI_META_DATA,
        },
      ],
    },
  ];

  it("runner", async () => {
    const hero = { name: "Flash", power: "Speed" };

    const spies = configureDriverDB(INITIAL_DB_DATA);

    const createdHero = runner(hero);

    const expectedInsertCall = {
      ...hero,
      id: EXPECTED_UUID,
    };
    const expectedInsertResult = {
      ...hero,
      ...LOKI_META_DATA,
      id: EXPECTED_UUID,
    };

    expect(spies.db).toHaveBeenNthCalledWith(1, DB_NAME);
    expect(spies.addCollection).toHaveBeenNthCalledWith(1, COLLECTION_NAME);
    expect(spies.insert).toHaveBeenNthCalledWith(1, expectedInsertCall);
    expect(spies.insert).toHaveReturnedWith(expectedInsertResult);
    expect(spies.find).toHaveBeenNthCalledWith(1);

    expect(createdHero.id).toEqual(EXPECTED_UUID);
  });
});
