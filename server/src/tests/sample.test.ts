import request from "supertest";

require("dotenv").config();
describe("sample test", () => {
  test("true == true", () => {
    expect(true).toBe(true);
  });

  test("test base url", async () => {
    const response = await request(process.env.BASE_URL).get("");
    expect(response.status).toBe(200);
  });

  test("invalid endpoint", async () => {
    const response = await request(process.env.BASE_URL).get("/real");
    expect(response.status).toBe(404);
  });
});
