import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import makeStyles from "@material-ui/core/styles/makeStyles";

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

const styles = makeStyles({
  size: {
    fontSize: "3rem",
  },
});

export const CurrencyConverter = () => {
  const [baseCurrency, setBaseCurrency] = useState(currencies[0].value);
  const [destCurrency, setDestCurrency] = useState(currencies[1].value);
  const [baseCurrencyValue, setBaseCurrencyValue] = useState(1);
  const [destCurrencyValue, setDestCurrencyValue] = useState(0);
  const [relativeDestCurrencyValue, setRelativeDestCurrencyValue] = useState(0);
  const classes = styles();

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

  const getNewConversion = (e) => {
    if (e.target.value.length === 0) {
      setBaseCurrencyValue("");
    } else {
      setBaseCurrencyValue(parseFloat(e.target.value));
      console.log(parseFloat(e.target.value));
      const tmp = parseFloat(e.target.value) * destCurrencyValue;
      setRelativeDestCurrencyValue((prev) => tmp);
    }
    console.log(typeof e.target.value);
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

        <input
          style={currencyInput}
          type="number"
          onChange={getNewConversion}
          value={baseCurrencyValue}
        />
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

        <input
          style={currencyInput}
          type="number"
          onChange={getNewConversion}
          value={
            relativeDestCurrencyValue
              ? relativeDestCurrencyValue
              : destCurrencyValue
          }
        />
        {/* TODO: only show converted value */}
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
  padding: "5px",
};

const currencyStyle = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  width: "200px",
};

const currency = {
  fontSize: "3rem",
  margin: "10px",
};

const currencyInput = {
  margin: "5px",
  fontSize: "3rem",
  border: "none",
  textAlign: "center",
  fontFamily: "inherit",
  fontWeight: "lighter",
};
