import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import app from "../src/app"

/***TEST CON UNA RUTA QUE REQUIERE AUTENTICACIÓN***/  

vi.mock("../src/models/patient.model", () => {
  return {
    patientModel: {
        getAllPatients: vi.fn(async() => [])
    }
  }
})

vi.mock("../src/middlewares/jwt.middleware", () => {
    return {
      verifyToken: vi.fn((req, res, next) => {
        req.email = "mocked@example.com";
        req.uid = "mocked-uid";
        next();
      }),
    };
  });
  
  describe("test patients list", () => {
    it("GET should return patients", async () => {
      const { statusCode, body } = await request(app).get("/api/v1/patients/");
      console.log(body);
  
      expect(statusCode).toBe(200);
    });
  });
