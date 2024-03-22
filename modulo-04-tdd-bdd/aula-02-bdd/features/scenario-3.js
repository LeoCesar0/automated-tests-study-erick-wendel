import {
  AfterAll,
  Then,
  When,
} from "@cucumber/cucumber";
import assert from "node:assert";

let _context = {};

AfterAll(function () {
  this.context = _context;
});

When(
  "I create a new user with the following details 2:",
  async function (dataTable) {
    const [data] = dataTable.hashes();

    const response = await this.createUser(data);

    assert.strictEqual(response.status, 201);

    _context.createdUserResult = await response.json();
    assert.ok(_context.createdUserResult.id);

    _context.createdUser  = await this.getUserById(_context.createdUserResult.id)
  }
);

Then("the user should be categorized as an {string}", async function (category) {
  assert.strictEqual(_context.createdUser.category, category)
});
