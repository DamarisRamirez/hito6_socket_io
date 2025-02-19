import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import express from "express"

const app =express ()

app.get("/", (req, res) => {
    res.status(200).json({ok:true})
})

describe("test express", () => {
    it("GET / should return code 200", async () => {
      const response = await request(app).get("/")
      const statusCode = response.statusCode;
      expect(statusCode).toBe(200);
    });
  });
