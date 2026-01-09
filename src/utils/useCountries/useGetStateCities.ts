import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type TCityList = {
  data: string[];
};

type UseCitiesProps = {
  state?: string;
  country?: string;
};

export const useGetStateCities = ({ state, country }: UseCitiesProps = {}) => {
  const fetchCities = async () => {
    const { data } = await axios.post<TCityList>(
      'https://countriesnow.space/api/v0.1/countries/state/cities',
      {
        state,
        country,
      },
    );
    return data?.data;
  };

  const response = useQuery({
    queryKey: ['cities', state, country],
    queryFn: fetchCities,
    enabled: !!state && !!country,
  });

  return response;
};
