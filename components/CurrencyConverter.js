import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";

const currencies = [
  {
    value: "EUR",
    name: "Euro",
  },
  {
    value: "USD",
    name: "US Dollars",
  },
  {
    value: "GBP",
    name: "British Pound",
  },
];

export const CurrencyConverter = () => {
  const [baseCurrency, setBaseCurrency] = useState(currencies[0].value);
  const [destCurrency, setDestCurrency] = useState(currencies[1].value);
  const [destCurrencyValue, setDestCurrencyValue] = useState(0);

  useEffect(() => {
    if (baseCurrency === destCurrency) {
      setDestCurrencyValue(1);
    } else {
      axios
        .get(
          `https://api.exchangeratesapi.io/latest?symbols=${destCurrency}&base=${baseCurrency}`
        )
        .then((res) => {
          console.log(res.data.rates[destCurrency]);
          setDestCurrencyValue(
            Math.round(res.data.rates[destCurrency] * 100) / 100
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [baseCurrency, destCurrency]);

  const changeCurrency = (e) => {
    if (e.target.name === "baseCurrency") {
      setBaseCurrency(e.target.value);
    } else {
      setDestCurrency(e.target.value);
    }
  };

  return (
    <div style={mainStyle}>
      <div style={currencyStyle}>
        <TextField
          select
          name="baseCurrency"
          label="Currency"
          helperText={"Select the base currency"}
          value={baseCurrency}
          onChange={changeCurrency}
        >
          {currencies.map((cur) => (
            <MenuItem key={cur.value} value={cur.value}>
              {cur.name}
            </MenuItem>
          ))}
        </TextField>

        <p style={currency}>1</p>
      </div>

      <div style={currencyStyle}>
        <TextField
          select
          name="destCurrency"
          label="Currency"
          helperText={"Select the destination currency"}
          value={destCurrency}
          onChange={changeCurrency}
        >
          {currencies.map((cur) => (
            <MenuItem key={cur.value} value={cur.value}>
              {cur.name}
            </MenuItem>
          ))}
        </TextField>

        <p style={currency}>{destCurrencyValue}</p>
      </div>
    </div>
  );
};

const mainStyle = {
  width: "100%",
  margin: "auto",
  display: "flex",
  justifyContent: "space-evenly",
  fontWeight: "lighter",
  border: "3px solid #CCCCCC",
  borderRadius: "15px",
};

const currencyStyle = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
};

const currency = {
  fontSize: "3rem",
  margin: "10px",
};
