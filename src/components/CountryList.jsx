/* eslint-disable react/prop-types */

import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

function CountryList({ cities, isLoading }) {
  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length) {
    return (
      <Message
        message={"Add your first city by clicking on a city on the map."}
      ></Message>
    );
  }
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((c) => c.country).includes(city.country)) {
      return [
        ...arr,
        { id: city.id, country: city.country, emoji: city.emoji },
      ];
    } else {
      return arr;
    }
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
