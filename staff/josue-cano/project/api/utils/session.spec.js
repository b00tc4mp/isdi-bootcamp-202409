import "dotenv/config";

import * as chai from "chai";
import jwt from "jsonwebtoken";

const { expect } = chai;

import validateToken from "./session.js";

describe("validateToken (session.js)", () => {
  const secret = process.env.JWT_SECRET;

  it("succeeds on valid token", () => {
    const payload = {
      sub: "user123",
      firstName: "Josue",
      lastName: "Cano",
      email: "josuecano@delgado.com",
      exp: Math.floor(Date.now() / 1000) + 3600, // 1-hour expiration
    };

    const token = jwt.sign(payload, secret);

    const result = validateToken(token);

    expect(result).to.be.true;
  });

  it("fails on invalid token", () => {
    const invalidToken = "this.is.an.invalid.token";

    const result = validateToken(invalidToken);

    expect(result).to.be.false;
  });

  it("fails on expired token", () => {
    const expiredPayload = {
      sub: "user123",
      firstName: "Josue",
      lastName: "Cano",
      email: "josuecano@delgado.com",
      exp: Math.floor(Date.now() / 1000) - 3600, // 1-hour in the past
    };

    const expiredToken = jwt.sign(expiredPayload, secret);

    const result = validateToken(expiredToken);

    expect(result).to.be.false;
  });

  it("fails on token signed with a different secret", () => {
    const payload = {
      sub: "user123",
      firstName: "Josue",
      lastName: "Cano",
      email: "josuecano@delgado.com",
      exp: Math.floor(Date.now() / 1000) + 3600, // 1-hour expiration
    };

    const tokenWithWrongSecret = jwt.sign(payload, "wrongsecret");

    const result = validateToken(tokenWithWrongSecret);

    expect(result).to.be.false;
  });
});
