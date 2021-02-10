import React from "react";

const StockList = ({ stocks }) => {
  const renderStock = stocks.map((stock) => {
    return (
      <div className="item" key={stock}>
        {stock}
      </div>
    );
  });
  return (
    <div>
      <div className="ui bulleted list">{renderStock}</div>
    </div>
  );
};

export default StockList;
