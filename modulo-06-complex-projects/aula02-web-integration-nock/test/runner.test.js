import { it, expect, describe } from "@jest/globals";
import { fetchByPage } from "../src/runner";
import nock from "nock";
import charactersPage01 from "./fixtures/characters/page-01.json";

describe("Runner Test Suite", () => {
  it("should fetch by page", async () => {
    const scope = nock("https://rickandmortyapi.com/api")
      .get("/character")
      .query({ page: 1 })
      .reply(200, charactersPage01);

    const result = await fetchByPage(1);

    expect(result).toEqual([
      {
        id: 1,
        name: "Rick Sanchez",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
    ]);

    scope.done();
  });
});
