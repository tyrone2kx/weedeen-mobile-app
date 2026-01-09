import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type ICountryList = {
  data: { name: string; flag: string; iso2: string; iso3: string }[];
};

export const useCountries = () => {
  const fetchCountries = async () => {
    const { data } = await axios.get<ICountryList>(
      'https://countriesnow.space/api/v0.1/countries/flag/images',
    );
    return data?.data;
  };

  const response = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
  });

  return response;
};
