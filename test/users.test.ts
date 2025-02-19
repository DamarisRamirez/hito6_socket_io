import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import app from "../src/app"

/***TEST CON UNA RUTA SIN AUTENTICACIÓN***/  

vi.mock("../src/models/user.model", () => {
  return {
    userModel: {
      findAll: vi.fn(async() => [])
    }
  }
})


describe("test users list", () => {
    it("GET / should return code 200", async () => {
      const { statusCode, body } = await request(app).get("/api/v1/users/")
      console.log(body)
      expect(statusCode).toBe(200);
    });
  });
