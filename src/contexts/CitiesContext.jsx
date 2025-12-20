/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useEffect, useState, useContext } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

//const initialState

//function reducer(state,action){}

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    // fetch("http://localhost:8000/cities")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setCities(data);
    //     setIsLoading(false);
    //   });
    async function fetchCities() {
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        //console.error("Error fetching cities:", error);
        alert("Error loading Data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      console.log("Fetching city with id:", id);
      const response = await fetch(`${BASE_URL}/cities/${id["id"]}`);
      // console.log(
      //   " url " +
      //     JSON.stringify(response.json()) +
      //     " " +
      //     `${BASE_URL}/cities/${id["id"]}`
      // );
      const data = await response.json();
      console.log("2 -Fetched city data:", data);
      setCurrentCity(data);
    } catch (error) {
      //console.error("Error fetching cities:", error);
      alert("1- Error loading Data...");
    } finally {
      setIsLoading(false);
    }

    //return cities.find((city) => city.id === Number(id));
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      //console.log("Fetching city with id:", id);
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("3 -Posted city data:", data);
      setCities((cities) => [...cities, data]);
    } catch (error) {
      alert("3- Error Posting Data...");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      //console.log("Fetching city with id:", id);

      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      console.log("4 -Deleted city data:", id);
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      alert("3- Error Deleting city ...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error(
      "useCities(CitiesContext) must be used within a CitiesProvider"
    );
  }
  return context;
}

export { CitiesProvider, useCities };
