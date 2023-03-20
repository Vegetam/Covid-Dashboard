import React, { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Select from "react-select";
import useSummaryData from "./useSummaryData";
import ErrorBoundary from "./ErrorBoundary";
import locationOptions from "./locationOptions";
import Card from "./SummaryCard";
import BarChart from "./BarChart";
import { FaChartBar, FaBriefcaseMedical, FaDisease, FaSkull } from 'react-icons/fa';
import "./App.css";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function App() {
  const [activeLocation, setActiveLocation] = useState(locationOptions[0].value);
  const [selectedOption, setSelectedOption] = useState(locationOptions[0]);

  const { data: summaryData, isLoading, error, lastUpdated, flagUrl } = useSummaryData(activeLocation);

  const handleLocationChange = useCallback((selectedOption) => {
    setActiveLocation(selectedOption.value);
    setSelectedOption(selectedOption);
  }, []);

  const summaryChartData = useMemo(() => {
    if (summaryData) {
      return [
        { name: "Total Cases", value: summaryData.cases },
        { name: "Today Cases", value: summaryData.todayCases },
        { name: "Total Deaths", value: summaryData.deaths },
        { name: "Today Death", value: summaryData.todayDeaths },
        { name: "Recovered", value: summaryData.recovered },
        { name: "Today Recovery", value: summaryData.todayRecovered },
        { name: "Active", value: summaryData.active },
        { name: "Total tests", value: summaryData.tests },
      ];
    }
    return [];
  }, [summaryData]);

  const formattedValue = summaryData && summaryData.cases ? summaryData.cases.toLocaleString() : '0';

  return (
    <React.Fragment>
      <div className="container">
        <h1 className="title">COVID-19 Summary Dashboard</h1>
        <Select
          className="location-select"
          options={locationOptions}
          value={selectedOption}
          onChange={handleLocationChange}
        />
        <p className="last-updated">
          Last Updated: {lastUpdated ? moment(lastUpdated).format("LLL") : ""}
        </p><br />
        {flagUrl && (
          <img src={flagUrl} alt={`Flag of ${selectedOption.label}`} className="flag" />
        )}

        <div className="grid-container">
          <div className="left-column">
            <ErrorBoundary>
              <BarChart data={summaryChartData} />
            </ErrorBoundary>
          </div>
          <div className="right-column">
            <div className="cards-container">
              <div className="cards-row">
                <ErrorBoundary>
                  <Card
                    label="Total Cases"
                    value={summaryData ? summaryData.cases : 0}
                    color="#FFCC33"
                    icon={<FaBriefcaseMedical />} 
                  /> 
                </ErrorBoundary>
                <ErrorBoundary>
                  <Card
                    label="Today Cases"
                    value={summaryData ? summaryData.todayCases : 0}
                    color="#FFCC33"
                    icon={<FaBriefcaseMedical />}
                  />
                </ErrorBoundary>
              </div>
			  <div className="cards-row">
                <ErrorBoundary>
                  <Card
                    label="Total Deaths"
                    value={summaryData ? summaryData.deaths : 0}
                    color="#FF3300"
                    icon={<FaSkull />}
                  />
                </ErrorBoundary>
                <ErrorBoundary>
                  <Card
                    label="Today Deaths"
                    value={summaryData ? summaryData.todayDeaths : 0}
                    color="#FF3300"
                    icon={<FaSkull />}
                  />
                </ErrorBoundary>
              </div>
              <div className="cards-row">
                <ErrorBoundary>
                  <Card
                    label="Recovered"
                    value={summaryData ? summaryData.recovered : 0}
                    color="#00CC66"
                    icon={<FaDisease />}
                  />
                </ErrorBoundary>
                <ErrorBoundary>
                  <Card
                    label="Today Recovery"
                    value={summaryData ? summaryData.todayRecovered : 0}
                    color="#00CC66"
                    icon={<FaDisease />}
                  />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        {isLoading && <p className="loading">Loading...</p>}
      </div>
    </React.Fragment>
  );
  App.propTypes = {
  data: PropTypes.shape({
    cases: PropTypes.number.isRequired,
    todayCases: PropTypes.number.isRequired,
    deaths: PropTypes.number.isRequired,
    todayDeaths: PropTypes.number.isRequired,
    recovered: PropTypes.number.isRequired,
    todayRecovered: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    tests: PropTypes.number.isRequired,
  }),
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  lastUpdated: PropTypes.string,
  flagUrl: PropTypes.string,
};
}
export default App;