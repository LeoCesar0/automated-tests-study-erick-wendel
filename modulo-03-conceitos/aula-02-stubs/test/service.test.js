import { it, expect, describe, jest, beforeEach } from "@jest/globals";
import { Service } from "../src/Service.js";
import fs from 'node:fs/promises'

describe("#Service Test Suite", () => {
  const fileName = "users";
  let _service = new Service({
    fileName: fileName
  });

  beforeEach(() => {
    _service = new Service({
      fileName: fileName
    });
  });

  describe("#read", () => {
    it("should throw an error if file doesn't exist", async () => {
      // Arrange

      _service = new Service({
        fileName: `random-file-${Date.now()}`
      });

      // Act

      // Assert
      await expect(() => _service.read()).rejects.toThrow()
    });

    it("should return an empty array if no data is found", async () => {

      // Arrange
      jest.spyOn(fs, fs.readFile.name).mockResolvedValue("")
      // Act
      const data = await _service.read();
      // Assert
      expect(data).toEqual([]);

      // Teardown
      fs.readFile.mockRestore()
    });

    it("should return an array of users with no password", async () => {
      // Arrange
      const user1 = {
        username: "User-1-" + Date.now(),
        password: "abeautifulPassword@" + Date.now()
      };
      const user2 = {
        username: "User-2-" + Date.now(),
        password: "abeautifulPassword@" + Date.now()
      }
      const data = JSON.stringify(user1).concat("\n").concat(JSON.stringify(user2)).concat("\n");

      jest.spyOn(fs, fs.readFile.name).mockResolvedValue(data)

      // Act
      const resultData = await _service.read();

      // Assert
      expect(Array.isArray(resultData)).toBeTruthy();
      expect(resultData.length).toBe(2);
      expect(resultData[0].username).toBe(user1.username);
      expect(resultData[0].password).toBeUndefined();
      expect(resultData[1].username).toBe(user2.username);
      expect(resultData[1].password).toBeUndefined();

      // Teardown
      fs.readFile.mockRestore()
    })

  });
  
});
