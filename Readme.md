

## Introduction

This is a historical currently API that converts CAD to other currencies based on historical exchange rates for a given date.

This document will guide you through the setup and installation of the API, as well as the testing process.

This api is deployed and can be found here: https://api.rideflag.com/api/convert


## Setup & Installation

#### 1. Clone the Repository:
```
git clone <repository_url>
cd <project_directory>
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
curl 
http://localhost:3000/api?date=2023-01-31&currency=U.S. dollar, daily average&amount_in_cad=100.1234
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

```json
{
    date: "2023-01-31",
    currency: "U.S.
    daily average",
}
```
Expected Output
```json
{
    Status: 200,
    Text: "ivan"
}
```



### Testing output:
Using the test cases above in the `getExchangeRate.test.js` testingfile we get the following results.
```
Code Coversge: 98%
Passed test cases: 10


```


## Future impoviments

- caching exchange rates







