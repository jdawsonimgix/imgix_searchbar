import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchArray, setSearchArray] = useState();

  useEffect(() => {}, [searchArray]);

  const getMovies = async (sentSearchTerm) => {
    let searchAxios = await axios
      .get("http://localhost:5001/searching")
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });

    console.log(searchAxios.data);
    setSearchArray(searchAxios.data);
    // console.log(searchAxios.data.data);
    // console.log(console.log(searchAxios.data.data.length));

    // console.log(searchAxios.data.data[0].attributes.origin_path);
    // tempArray.push(searchAxios.data.data[0].attributes.origin_path);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      getMovies(searchTerm);
      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const testReturnResult = () => {
    console.log(searchArray);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <button onClick={testReturnResult}>test</button>
        <h1>search</h1>
        <form onSubmit={handleOnSubmit}>
          <input
            className='search'
            type='search'
            placeholder='Search movie title'
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
    </div>
  );
}

export default App;
