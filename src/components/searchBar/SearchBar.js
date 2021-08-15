import React, { useEffect } from "react";
import "./searchBar.css";
import Input from "../input/Input";

function SearchBar({ setVal, searchTerm, setSearchTerm }) {
  useEffect(() => {}, []);

  const handleChange = event => {
    const { value } = event.target;
    setSearchTerm(value);
    console.log(value);
    setVal(value);
  };

  // const onKeyPress = event => {};

  return (
    <div className="input_container">
      <Input
        type={"text"}
        className={"form-control"}
        placeholder={"guess the name tv"}
        onChange={handleChange}
        onKeyPress={onKeyPress}
        value={searchTerm}
      />
    </div>
  );
}
export default SearchBar;
