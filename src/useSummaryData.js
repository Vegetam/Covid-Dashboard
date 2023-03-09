import { useState, useEffect } from "react";
import axios from "axios";

const useSummaryData = (countryCode) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [flagUrl, setFlagUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://disease.sh/v3/covid-19/countries/${countryCode}?yesterday=true&strict=true`
        );
        setData(data);
        setIsLoading(false);
        setLastUpdated(data.updated ? new Date(data.updated) : null);
        setFlagUrl(data.countryInfo.flag);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchData();
  }, [countryCode]);

  return { data, isLoading, error, lastUpdated, flagUrl };
};

export default useSummaryData;