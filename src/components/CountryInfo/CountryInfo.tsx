import React, {useCallback, useEffect, useState} from 'react';
import {Country, InfoCountry} from '../../types';
import {COUNTRY_URL, POST_URL} from '../../constants';

const CountryInfo: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectCountry, setSelectCountry] = useState<string | null>(null);
  const [countryInfo, setCountryInfo] = useState<InfoCountry | null>(null);


  const fetchCountries = useCallback(async () => {
    try {
      const response = await fetch(COUNTRY_URL);
      if (response.ok) {
        const data: Country[] = await response.json();
        setCountries(data);
      } else {
        throw new Error('error fetching countries');
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchCountryInfo = useCallback(async (countryCode: string) => {
    try {
      const response = await fetch(`${POST_URL}/${countryCode}`);
      if (response.ok) {
        const data: InfoCountry = await response.json();
        setCountryInfo(data);
      } else {
        throw new Error('error fetching info about Country');
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    void fetchCountries();
  }, [fetchCountries]);

  const CountryClick = (countryCode: string) => {
    setSelectCountry(countryCode);

    if (countryCode) {
      void fetchCountryInfo(countryCode);
    } else {
      setCountryInfo(null);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary">Select a country</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="list-group-item-primary" style={{maxHeight: '580px'}}>
            {countries.map(country => (
              <button
                key={country.alpha3Code}
                onClick={() => CountryClick(country.alpha3Code)}
                className={`list-group-item list-group-item-action ${selectCountry === country.alpha3Code ? 'active' : ''}`}
              >
                {country.name}
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-8">
          <div id="countryInfo" className="overflow-auto" style={{maxHeight: '400px'}}>
            {selectCountry ? (
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">{countryInfo?.name}</h3>
                  <p className="card-text">
                    This country shares borders with: {countryInfo?.borders?.map((border, index) => (
                    <span key={border}>
                        {border}{index < (countryInfo.borders?.length || 0) - 1 ? ', ' : ''}
                      </span>
                  ))}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-primary">Select a country to show Information</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryInfo;
