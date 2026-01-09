import nigeriaLgas from '@wd/utils/nigeriaStatesLgas';

const getNigeriaLgasByState = (state?: string) => {
  if (!state) return [];

  // Remove string " State" using regex
  // Due to current api to get states
  const trimmedState = state.toLowerCase().replace(' state', '');

  const selectedState = nigeriaLgas.find(
    states => states.state.toLowerCase() === trimmedState,
  );

  return selectedState?.lgas || [];
};

export default getNigeriaLgasByState;
