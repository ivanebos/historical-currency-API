const request = require("supertest");
const app = require("./server");

describe("All / - Exchange Rate API", () => {
  it("should return the exchange rate for the given date and currency", async () => {
    const res = await request(app).get("/api").query({
      date: "2023-01-31",
      currency: "U.S. dollar, daily average",
      amount_in_cad: 100.1234,
    });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      date: "2023-01-31",
      currency: "U.S. dollar, daily average",
      amount_in_cad: 100.1234,
      exchange_rate: 1.335,
      amount_in_currency: 133.664739,
    });
  });

  it("should return exchange rate not found", async () => {
    const res = await request(app).get("/api").query({
      date: "2022-01-31",
      currency: "U.S. dollar, daily average",
      amount_in_cad: 100.1234,
    });

    expect(res.status).toBe(404);
    expect(res.text).toBe("No exchange rate found");
  });

  describe("Validation Errors", () => {
    test.each([
      [
        "missing amount_in_cad",
        { date: "2023-01-31", currency: "U.S. dollar, daily average" },
        400,
        "Missing required query parameters",
      ],
      [
        "invalid date format",
        {
          date: "2023-01-32",
          currency: "U.S. dollar, daily average",
          amount_in_cad: 100.1234,
        },
        400,
        "Invalid date format",
      ],
      [
        "unsupported currency",
        {
          date: "2023-01-31",
          currency: "U.E. dollar, daily average",
          amount_in_cad: 100.1234,
        },
        406,
        "Currency is unsupported",
      ],
      [
        "invalid amount_in_cad format",
        {
          date: "2023-01-31",
          currency: "U.S. dollar, daily average",
          amount_in_cad: "string",
        },
        400,
        "Invalid amount_in_cad format",
      ],
    ])(
      "should return %s",
      async (_, queryParams, expectedStatus, expectedText) => {
        const res = await request(app).get("/api").query(queryParams);
        expect(res.status).toBe(expectedStatus);
        expect(res.text).toBe(expectedText);
      }
    );
  });
});
