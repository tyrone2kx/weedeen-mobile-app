import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type TState = {
  name: string;
  state_code: string;
};

type TStateList = {
  data: { name: string; iso2: string; iso3: string; states: TState[] };
};

type UseStatesProps = {
  country?: string;
};

export const useGetCountryStates = ({ country }: UseStatesProps = {}) => {
  const fetchStates = async () => {
    const { data } = await axios.post<TStateList>(
      'https://countriesnow.space/api/v0.1/countries/states',
      {
        country,
      },
    );
    return data?.data;
  };

  const response = useQuery({
    queryKey: ['states', country],
    queryFn: fetchStates,
    enabled: !!country,
  });

  return response;
};
