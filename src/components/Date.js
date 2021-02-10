import React, { useEffect, useRef, useState } from "react";

const Date = ({ options, onSelectedChange, selected, getStrategies }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
    document.body.addEventListener("click", onBodyClick);

    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);
  const renderedOptions = options.map((option) => {
    if (option === selected) {
      return null;
    }
    return (
      <div
        className="item"
        data-value={option}
        key={option}
        onClick={() => {
          onSelectedChange(option);
          getStrategies(option);
        }}
      >
        {option}
      </div>
    );
  });
  return (
    <div
      ref={ref}
      onClick={() => setOpen(!open)}
      className={`ui selection dropdown ${open ? "visible active" : ""}`}
    >
      <input type="hidden" name="gender" />
      <i className="dropdown icon"></i>
      {/* <div className="default text">Date</div> */}
      <div className="text">{selected}</div>
      <div className={`menu visible $ ${open ? "transition" : ""}`}>
        {renderedOptions}
      </div>
    </div>
  );
};

export default Date;
