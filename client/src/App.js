import "./App.css";
import React, { useState, useEffect } from "react";
import Imgix from "react-imgix";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchArray, setSearchArray] = useState([]);

  useEffect(() => {}, [searchArray]);

  const getMovies = async (sentSearchTerm) => {
    let searchAxios = await axios
      .post("http://localhost:5001/searching", {
        sendToBackend: sentSearchTerm,
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });

    console.log(searchAxios.data);
    setSearchArray(searchAxios.data);
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

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Search Bar using imgix Management API</h1>
        <h4>Test out the search feature by searching for tags. </h4>
        <h4>Search suggestions: cup, t-shirt, and graphics</h4>
        <form onSubmit={handleOnSubmit}>
          <input
            className='search'
            type='search'
            placeholder='Search movie title'
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
        {searchArray.map((value, index) => (
          <Imgix
            src={"https://ix-shop.imgix.net" + value}
            width={100} // This sets what resolution the component should load from the CDN and the size of the resulting image
            height={100}
            key={index}
          />
        ))}
      </header>
    </div>
  );
}

export default App;
