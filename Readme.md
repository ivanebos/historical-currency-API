## Introduction

This is a historical currentcy API that converts CAD to other currencies based on historical exchange rates for a given date.

This document will guide you through the setup and installation of the API, as well as the testing process.

This api is deployed and can be found here: https://historical-currency-api.onrender.com/api


## Setup & Installation

#### 1. Clone the Repository:
```
git clone https://github.com/ivanebos/historical-currency-API.git
cd historical-currency-API
```

#### 2. Install Dependencies
```
npm install
```

#### 3. Run the Server Locally
```
npm start
```
#### 4. Access the API example
```
curl http://localhost:3000/api?date=2023-01-31&currency=U.S. dollar, daily average&amount_in_cad=100.1234
```


## Testing

### Running Tests
To run the `getExchangeRate.test.js` use the following command:
```
npm test
```

### Test Cases:
**Test Case 1:**

Input:
```
{
    date: "2023-01-31",
    currency: "U.S. dollar, daily average",
    amount_in_cad: 100.1234,
}
```
Expected Output:
```
{
    Status: 200,
    Body: {
      date: "2023-01-31",
      currency: "U.S. dollar, daily average",
      amount_in_cad: 100.1234,
      exchange_rate: 1.335,
      amount_in_currency: 133.664739,
    }
}
```

**Test Case 2:**

Input:
```
{
    date: "2022-01-31",
    currency: "U.S. dollar, daily average",
    amount_in_cad: 100.1234,
}
```
Expected Output:
```
{
    Status: 404,
    Text: "No exchange rate found"
}
```

**Test Case 3:**

Input:
```
{
    date: "2022-01-31",
    currency: "U.S. dollar, daily average"
}
```
Expected Output:
```
{
    Status: 400,
    Text: "Missing required query parameters"
}
```
**Test Case 4:**

Input:
```
 {
    date: "2023-01-32",
    currency: "U.S. dollar, daily average",
    amount_in_cad: 100.1234,
},
```
Expected Output:
```
{
    Status: 400,
    Text: "Invalid date format"
}
```
**Test Case 5:**

Input:
```
{
    date: "2023-01-31",
    currency: "U.E. dollar, daily average",
    amount_in_cad: 100.1234,
}
```
Expected Output:
```
{
    Status: 406,
    Text: "Currency is unsupported"
}
```

**Test Case 6:**

Input:
```
{
    date: "2023-01-31",
    currency: "U.S. dollar, daily average",
    amount_in_cad: "string",
}
```
Expected Output:
```
{
    Status: 400,
    Text: "Invalid amount_in_cad format"
}
```

### Testing output:
Using the test cases above in the `getExchangeRate.test.js` testing file we get the following results.
```
Code Coverage: 95%
Passed test cases: 6
```

## Future Improvements

Caching
- Implement caching for exchange_rate.cvs data to improve performance, especially if the data changes infrequently.

Date Comparison
- Improve code to support various date formats and ensure accurate matching with CSV data.


