import "./App.css";
import React, { useState } from "react";
import Select from "react-select";
import Card from "./SummaryCard";
import useSummaryData from "./useSummaryData";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  const [activeLocation, setActiveLocation] = useState("IT");
  const [selectedOption, setSelectedOption] = useState(null);

  const locationOptions = [
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

  const {
    data: summaryData,
    isLoading,
    error,
    lastUpdated,
    flagUrl,
  } = useSummaryData(activeLocation);

  const handleLocationChange = (selectedOption) => {
    setActiveLocation(selectedOption.value);
    setSelectedOption(selectedOption);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <ErrorBoundary>
      <div className="App">
        <h1>COVID 19 Dashboard</h1>
        <div className="dashboard-container">
          <div className="dashboard-menu">
            <Select
              options={locationOptions}
              value={selectedOption}
              onChange={handleLocationChange}
              className="dashboard-select"
            />
            <p className="update-date">Last Updated: {lastUpdated.toString()}</p>
            {/* convert the Date object to a string before rendering */}
          </div>
          <div className="dashboard-summary">
            <img src={flagUrl} alt="Country Flag" />
          </div>
          <div className="dashboard-summary">
            <Card title="Total Cases" value={summaryData.cases}  />
            <Card title="Today Cases" value={summaryData.todayCases} />
            <Card title="Total Deaths" value={summaryData.deaths} />
            <Card title="Today Death" value={summaryData.todayDeaths}  />
          </div>
          <div className="dashboard-summary">
            <Card title="Recovered" value={summaryData.recovered}  />
            <Card title="Today Recovery" value={summaryData.todayRecovered}  />
            <Card title="Active" value={summaryData.active}  />
            <Card title="Total tests" value={summaryData.tests}  />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;