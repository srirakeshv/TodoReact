import React, { useState, useEffect } from "react";
import "./todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const TodoList = () => {
  const [active, setActive] = useState(false);
  const [Input, setInput] = useState("");
  const [array, setArray] = useState([]);
  const [strike, setStrikeStates] = useState([]);

  const handleclick = (text) => {
    setActive(true);
    setArray((prevArray) => [...prevArray, text]);
    setStrikeStates((prevStates) => [...prevStates, false]);
    setInput("");
  };

  const removeclick = (text) => {
    const index = array.indexOf(text);
    setArray(array.filter((prevArray) => prevArray !== text));
    setStrikeStates((prevStates) => prevStates.filter((_, i) => i !== index));
  };

  const strikecheck = (text) => {
    const index = array.indexOf(text);
    setStrikeStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  useEffect(() => {
    setActive(array.length > 0);
  }, [array]);

  useEffect(() => {
    console.log(strike);
  }, [strike]);

  return (
    <div className="container">
      <div className="input-text">
        <input
          type="text"
          value={Input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" onClick={() => handleclick(Input)}>
          add <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {active && (
        <div className="main-box">
          {array.map((ar, index) => (
            <div className="box" key={index}>
              <p
                className={strike[index] ? "strike" : ""}
                onClick={() => strikecheck(ar)}
              >
                {ar}
              </p>
              <FontAwesomeIcon
                className="bin"
                icon={faTrashCan}
                onClick={() => removeclick(ar)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
