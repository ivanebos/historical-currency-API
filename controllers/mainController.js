const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

exports.getExtchangeRate = (req, res) => {
  //***Validate query parameters***
  const { date, currency, amount_in_cad } = req.query;

  //Missing required query parameters
  if (!date || !currency || !amount_in_cad) {
    return res.status(400).send("Missing required query parameters");
  }

  //Invalid date format
  if (isNaN(new Date(date))) {
    return res.status(400).send("Invalid date format");
  }

  //Invalid amount_in_cad format
  if (isNaN(Number(amount_in_cad))) {
    return res.status(400).send("Invalid amount_in_cad format");
  }

  //***Parse the CSV file***
  let exchange_rate = null;
  let unsupportedCurrency = true;

  // Multi OS support
  const filePath = path.join(__dirname, "../data/exchange_rates.csv");

  fs.createReadStream(filePath)
    .on("error", () => {
      return res.status(500).send("Internal Server Error");
    })
    .pipe(csv({ separator: ",", headers: true }))
    // Loop through each row of the CSV file
    .on("data", (row) => {
      if (row._1 !== currency) return; //Check if currency is a match
      unsupportedCurrency = false; //Set unsupported currency to false
      if (row._0 !== date) return; //Check if data is a match

      if (row._2 === null) {
        //Check if duplicate is found
        return res.status(400).send("Duplicate data found");
      }

      //Set exchange rate
      exchange_rate = row._2;
    })

    //Return Result
    .on("end", () => {
      if (unsupportedCurrency) {
        return res.status(406).send("Currency is unsupported");
      }

      if (!exchange_rate) {
        return res.status(404).send("No exchange rate found");
      }

      const amount_in_currency = amount_in_cad * exchange_rate;
      res.json({
        date,
        currency,
        amount_in_cad: Number(amount_in_cad),
        exchange_rate: Number(exchange_rate),
        amount_in_currency,
      });
    });
};
