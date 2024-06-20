import React, {useState} from 'react';

const CountryInfo: React.FC = () => {

  const [countries, setCountries] = useState<Country[]>([]);
  const [selectCountry, setSelectCountry] = useState<string | null>(null);
  const [countryInfo, setCountryInfo] = useState<string | null>(null);



  return (
    <div>
        <h2>Choose The Country!</h2>
    </div>
  );
};

export default CountryInfo;