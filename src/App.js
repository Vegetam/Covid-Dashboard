import "./App.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import Card from "./SummaryCard";
import moment from 'moment'

// Imports end


function App() {
// App component starts here
const locationList = [
    { value: "IT", label: "Italy" },
    { value: "BE", label: "Belgium" },
    { value: "BG", label: "Bulgary" },
    { value: "CZ", label: "Republic  Czech" },
    { value: "DK", label: "Denmark" },
    { value: "DE", label: "Germany" },
    { value: "EE", label: "Estonia" },
    { value: "IE", label: "Ireland" },
    { value: "EL", label: "Greece" },
    { value: "ES", label: "Spain" },
    { value: "FR", label: "France" },
    { value: "HR", label: "Croatia" },
    { value: "CY", label: "Cipro" },
    
  ];
const [activeLocation, setActiveLocation] = useState("IT");
const [lastUpdated, setlastUpdated] = useState("");
const [summaryData, setSummaryData] = useState({});
const [flag, setFlag] =  useState("");

//const baseUrl = "https://api.opencovid.ca";
const baseUrl= "https://disease.sh/v3/covid-19/countries/"
  useEffect(() => {
    getSummaryData();
    getVersion();
  }, [activeLocation]);


const getVersion = async () => {
  const res = await fetch(`${baseUrl}`);
  const data = await res.json();

};

const getSummaryData = async (location) => {
    if (activeLocation === "Italy") {
        return;
    }
    let res = await fetch(`${baseUrl}${activeLocation}`);
    let resData = await res.json();
   // let summaryData = resData.data[0];
   let summaryData = resData;
    let formattedData = {};
	//let flagData = JSON.parse(summaryData.countryInfo.flag);
    let flagData = summaryData.countryInfo.flag;
    Object.keys(summaryData).map(
      (key) => (formattedData[key] = summaryData[key].toLocaleString())
    );
    console.log(formattedData)
    setSummaryData(formattedData);
	setFlag(flagData);
    let updated = moment(summaryData.updated).format("DD/MM/YYYY")
    setlastUpdated(updated);
  };

//return statement goes below this
  return (
    <div className="App">
      <h1>COVID 19 Dashboard </h1>
      <div className="dashboard-container">
      <div className="dashboard-menu ">
          <Select
            options={locationList}
            onChange={(selectedOption) =>
              setActiveLocation(selectedOption.value)
            }
            defaultValue={locationList.filter(
              (options) => options.value === activeLocation
            )}
            className="dashboard-select"
          />
          <p className="update-date">
            Last Updated : {lastUpdated}
          </p>
        </div>
	<div className="dashboard-summary">
		<img src={flag} />
	</div>
    <div className="dashboard-summary">
          <Card title="Total Cases" value={summaryData.cases} />
          <Card
            title="Today Cases"
            value={summaryData.todayCases}
          />
          <Card title="Total Deaths" value={summaryData.deaths  } />
          <Card
            title="Today Death"
            value={summaryData.todayDeaths}
          />
        </div>
		<div className="dashboard-summary">
          <Card title="Recovered" value={summaryData.recovered} />
          <Card
            title="Today Recovery"
            value={summaryData.todayRecovered}
          />
          <Card title="Active" value={summaryData.active  } />
          <Card
            title="Total tests"
            value={summaryData.tests}
          />
        </div>
    </div>
    </div>
  );
}

export default App;