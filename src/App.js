import LocationForm from "./components/LocationForm";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const kBaseUrl = "https://us1.locationiq.com/v1/search.php";

  const getLatAndLong = (city) => {
    const locationKey = process.env.API_KEY;

    let latitude, longitude;

    return axios
      .get(kBaseUrl, {
        params: {
          key: locationKey,
          q: city,
          format: "json",
        },
      })
      .then((response) => {
        latitude = response.data[0].lat;
        longitude = response.data[0].lon;
        console.log(
          `For ${city}, longitude is ${longitude} and latitude is ${latitude}.`
        );
        return { latitude, longitude };
      })
      .catch((error) => {
        console.log(`Encountered an error with getLatAndLong: ${error}`);
        throw new Error("Error finding location.");
      });
  };

  const [searchedCities, setSearchedCities] = useState([]);

  const addCityDetails = (newCity) => {
    const newCityList = [...searchedCities];

    newCityList.push({
      city: newCity.city,
      latitude: newCity.latitude,
      longitude: newCity.longitude,
    });

    setSearchedCities(newCityList);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Get Latitude and Longitude</h1>
        <LocationForm onAddCity={addCityDetails} onSearch={getLatAndLong} />
      </header>
    </div>
  );
}

export default App;
