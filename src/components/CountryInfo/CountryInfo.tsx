import React, {useCallback, useEffect, useState} from 'react';
import PostCountries from '../PostCountries/PostCountries';


const CountryInfo: React.FC = () => {

  const [countries, setCountries] = useState<Country[]>([]);
  const [selectCountry, setSelectCountry] = useState<number | null>(null);
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);

  const fetchCountries = useCallback(async () => {
    try {
      const response = await fetch(COUNTRY_URL);
      if (response.ok) {
        const data: Country[] = await response.json();
        setCountries(data);
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  const fetchCountryInfo = useCallback(async (countryCode: string) => {
    try {
      const response = await fetch(`${POST_URL}/${countryCode}`);
      if (response.ok) {
        const data: CountryInfo = await response.json();
        setCountryInfo(data);
      }
    } catch (error) {
      console.error(error);
    }
  },[]);

  useEffect(() => {
    void fetchCountries()
  }, []);



  return (
    <>
    <section className="Countries">
        <h2>Choose The Country!</h2>
      {countries.map((Country) => (
        <PostCountries
          name={Country.name}
          key={Country.id}
          capital={Country.capital}
          borders={Country.borders}
          onClick={() => setSelectCountry(Country.id)}
        />
      ))}
    </section>
    </>
  );
};

export default CountryInfo;