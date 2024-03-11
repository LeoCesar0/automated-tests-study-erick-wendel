import { it, expect, describe, jest, beforeEach, afterEach } from "@jest/globals";
import { Tasks } from "../src/Tasks";

describe("Tasks Test suite", () => {
  let _tasks = new Tasks();

  beforeEach(() => {
    _tasks = new Tasks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should run all tasks correctly", () => {
    // Arrange
    const tasks = [
      {
        name: "Task-to-run-in-2s",
        fn: jest.fn(),
        timeOut: 2000,
      },
      {
        name: "Task-to-run-in-1s",
        fn: jest.fn(),
        timeOut: 1000,
      },
      {
        name: "Task-to-run-in-5s",
        fn: jest.fn(),
        timeOut: 5000,
      },
      {
        name: "Task-to-run-in-12s",
        fn: jest.fn(),
        timeOut: 12000,
      },
    ];

    // Act

    tasks.forEach((task) => {
      _tasks.add(task);
    });
    _tasks.run();

    // Assert

    // expect all to have not been called

    expect(tasks.at(0).fn).not.toHaveBeenCalled()
    expect(tasks.at(1).fn).not.toHaveBeenCalled()
    expect(tasks.at(2).fn).not.toHaveBeenCalled()
    expect(tasks.at(3).fn).not.toHaveBeenCalled()

    // fast-forward time
    jest.advanceTimersByTime(1000);

    // expect second task to have been called
    expect(tasks.at(1).fn).toHaveBeenCalled()
    expect(tasks.at(0).fn).not.toHaveBeenCalled()
    expect(tasks.at(2).fn).not.toHaveBeenCalled()
    expect(tasks.at(3).fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1000);

    // expect first task to have been called
    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(2).fn).not.toHaveBeenCalled()
    expect(tasks.at(3).fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(3000);
    // expect third task to have been called
    expect(tasks.at(2).fn).toHaveBeenCalled()
    expect(tasks.at(3).fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(7000);

    // expect all to have been called
    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).toHaveBeenCalled()
    expect(tasks.at(2).fn).toHaveBeenCalled()
    expect(tasks.at(3).fn).toHaveBeenCalled()

    // expect all to have been called once
    expect(tasks.at(0).fn).toHaveBeenCalledTimes(1)
    expect(tasks.at(1).fn).toHaveBeenCalledTimes(1)
    expect(tasks.at(2).fn).toHaveBeenCalledTimes(1)
    expect(tasks.at(3).fn).toHaveBeenCalledTimes(1)
  });
});
