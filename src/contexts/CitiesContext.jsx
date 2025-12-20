/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import { useEffect, useState, useContext } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = { cities: [], isLoading: false, currentCity: {} };

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      //return { ...state, currentCity: action.payload };
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    // setIsLoading(true);
    dispatch({ type: "loading" });
    async function fetchCities() {
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        //console.error("Error fetching cities:", error);
        //alert("Error loading Data...");
        dispatch({ type: "rejected", payload: "1- Error loading cities..." });
      } finally {
        // setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      console.log("ID play ", id, currentCity.id);
      if (id === currentCity.id) return;
      //setIsLoading(true);
      dispatch({ type: "loading" });
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
      //setCurrentCity(data);
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      //console.error("Error fetching cities:", error);
      //alert("1- Error loading Data...");
      dispatch({
        type: "rejected",
        payload: "2- Error loading the city data...",
      });
    }

    //return cities.find((city) => city.id === Number(id));
  }

  async function createCity(newCity) {
    try {
      //setIsLoading(true);
      dispatch({ type: "loading" });
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
      // setCities((cities) => [...cities, data]);
      dispatch({
        type: "city/created",

        payload: data,
      });
      //dispatch();
    } catch (error) {
      //alert("3- Error Posting Data...");
      dispatch({
        type: "rejected",
        payload: "3- Error creating the city data...",
      });
    }
  }

  async function deleteCity(id) {
    try {
      //setIsLoading(true);
      dispatch({ type: "loading" });
      //console.log("Fetching city with id:", id);

      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      console.log("4 -Deleted city data:", id);
      //setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({
        type: "city/deleted",
        payload: id,
      });
    } catch (error) {
      //alert("3- Error Deleting city ...");
      dispatch({
        type: "rejected",
        payload: "3- Error deleting the city data...",
      });
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
