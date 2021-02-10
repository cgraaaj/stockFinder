import React, { useState } from "react";
import Date from "./Date";
import Strategy from "./Strategy";
import Sector from "./Sector";
import StockList from "./Stocks";
import axios from "axios";

var data = null;
var datee = null;
var dateOptions = [];
var strategyOptions = [];
var strategyy = null;
var sectorOptions = [];
var stocks = [];

console.log(`http://${process.env.REACT_APP_APIHOST}/strategies`)
axios
  .get(`http://${process.env.REACT_APP_APIHOST}:${process.env.REACT_APP_APIPORT}/strategies`)
  .then((res) => {
    data = res.data;
    data.map((d) => dateOptions.push(d.date));
  });

const getStrategies = (date) => {
  strategyOptions = [];
  datee = date;
  data
    .filter((d) => d.date === date)[0]
    .strategy.map((s) => {
      strategyOptions.push(s.name);
    });
};

const getSectors = (strat) => {
  sectorOptions = [];
  strategyy = strat;
  data
    .filter((d) => d.date === datee)[0]
    .strategy.filter((s) => s.name === strat)[0]
    .sectors.map((s) => sectorOptions.push(s.name));
};

const getStocks = (sector) => {
  stocks = data
    .filter((d) => d.date === datee)[0]
    .strategy.filter((s) => s.name === strategyy)[0]
    .sectors.filter((s) => s.name === sector)[0].stocks;
};

export default () => {
  const [dateSelected, dateSetSelected] = useState(dateOptions[0]);
  const [strategySelected, strategySetSelected] = useState(strategyOptions[0]);
  const [sectorSelected, secortSetSelected] = useState(sectorOptions[0]);
  return (
    <div className="ui container" style={{ marginTop: "10px" }}>
      <div className="ui horizontal segments">
        <Date
          selected={dateSelected}
          onSelectedChange={dateSetSelected}
          getStrategies={getStrategies}
          options={dateOptions}
        />
        <Strategy
          selected={strategySelected}
          onSelectedChange={strategySetSelected}
          getSectors={getSectors}
          options={strategyOptions}
        />
        <Sector
          selected={sectorSelected}
          onSelectedChange={secortSetSelected}
          getStocks={getStocks}
          options={sectorOptions}
        />
      </div>
      <StockList stocks={stocks} />
    </div>
  );
};
