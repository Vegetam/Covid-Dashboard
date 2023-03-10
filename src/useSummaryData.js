import { useState, useEffect } from "react";
import axios from "axios";

const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

const useSummaryData = (location) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [flagUrl, setFlagUrl] = useState(null);

  useEffect(() => {
    let cache = JSON.parse(localStorage.getItem("covidCache") || "{}");
    let cachedData = cache[location];

    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      setData(cachedData.data);
      setLastUpdated(new Date(cachedData.lastUpdated));
      setFlagUrl(cachedData.flagUrl);
      setIsLoading(false);
    } else {
      axios
        .get(`https://disease.sh/v3/covid-19/countries/${location}?strict=true`)
        .then((response) => {
          const apiData = response.data;
          const formattedData = {
            cases: apiData.cases || 0,
            todayCases: apiData.todayCases || 0,
            deaths: apiData.deaths || 0,
            todayDeaths: apiData.todayDeaths || 0,
            recovered: apiData.recovered || 0,
            todayRecovered: apiData.todayRecovered || 0,
            active: apiData.active || 0,
            tests: apiData.tests || 0,
          };
          setData(formattedData);
          setLastUpdated(new Date(apiData.updated));
          setFlagUrl(apiData.countryInfo.flag);
          setIsLoading(false);
          cache[location] = {
            data: formattedData,
            lastUpdated: apiData.updated,
            flagUrl: apiData.countryInfo.flag,
            timestamp: Date.now(),
          };
          localStorage.setItem("covidCache", JSON.stringify(cache));
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }
  }, [location]);

  return { data, isLoading, error, lastUpdated, flagUrl };
};

export default useSummaryData;