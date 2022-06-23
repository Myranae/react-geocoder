import { useState } from "react";

const LocationForm = (props) => {
  const [formFields, setFormFields] = useState({
    city: "",
  });

  const onCityChange = (event) => {
    setFormFields({ ...formFields, city: event.target.value });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const coordinates = props.onSearch(formFields.city);

    props.onAddCity({
      city: formFields.city,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor="cityField">City: </label>
      <input
        name="cityField"
        type="text"
        value={formFields.city}
        onChange={onCityChange}
      />
      <button type="submit" value="Search Now!">
        Search Now!
      </button>
      <h2>Results for: {formFields.city}</h2>
      <ul>
        <li>Latitude: </li>
        <li>Longitude: </li>
      </ul>
    </form>
  );
};

export default LocationForm;
