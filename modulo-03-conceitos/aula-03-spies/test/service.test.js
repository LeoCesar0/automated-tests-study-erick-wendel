import { it, expect, describe, jest, beforeEach } from "@jest/globals";
import { Service } from "../src/Service.js";
import crypto from "node:crypto";
import fs from "node:fs/promises";

describe("#Service Test Suite", () => {
  const fileName = "users";
  let _service = new Service({
    fileName: fileName,
  });

  const HASHED_PASSWORD = "hashed_password1d98198189";

  describe("#create", () => {
    beforeEach(() => {
      // if(crypto.createHash.mockRestore) {
      //   crypto.crea
      // }
      jest.spyOn(crypto, 'createHash').mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue(HASHED_PASSWORD),
      });

      jest.spyOn(fs, 'appendFile').mockResolvedValue();
    });

    it("should call crypto and appendFile with the right arguments", async () => {
      // Arrange
      const createdAt = new Date().toISOString();
      const user = {
        username: "username",
        password: "anicePassword",
      };

      jest.spyOn(Date.prototype, Date.prototype.toISOString.name).mockReturnValue(createdAt)

      // Act
      await _service.create(user);

      // Assert
      expect(crypto.createHash).toHaveBeenCalledWith(
        'sha256'
      );
      expect(crypto.createHash().update).toHaveBeenCalledWith(
        user.password
      )
      expect(crypto.createHash().digest).toHaveBeenCalledWith('hex')

      expect(fs.appendFile).toHaveBeenCalledWith(
        `./static/${fileName}.ndjson`,
        JSON.stringify({
          username: user.username,
          password: HASHED_PASSWORD,
          createdAt: createdAt,
        }).concat("\n")
      );

    });
  });
});
