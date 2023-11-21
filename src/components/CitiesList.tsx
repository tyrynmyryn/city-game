import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { addedCitiesCountSelector } from '@/store/cities';
import { City, Players } from '@/types';

const Empty = () => (
  <p className='flex justify-center items-center h-full text-sm text-gray-400'>
    Первый участник вспоминает города...
  </p>
);

const List = () => {
  const addedCities = useSelector((state: RootState) => state.cities.addedCities);

  const classesMap = {
    [Players.YOU]: 'ml-auto rounded-ee-none bg-violet-500 text-white',
    [Players.AI]: 'mr-auto bg-violet-50 rounded-es-none text-gray-700',
  };

  const classes = (city: City) => {
    const initial = 'w-fit py-1.5 px-3 rounded-xl';
    const by = addedCities[city].by;
    const addition = classesMap[by];
    return `${initial} ${addition}`;
  };

  return Object.values(addedCities).map(({ value, display }) => (
    <div
      key={value}
      className={classes(value)}
    >
      {display}
    </div>
  ));
};

const CitiesList = () => {
  const addedCitiesCount = useSelector(addedCitiesCountSelector);

  return !addedCitiesCount ? <Empty /> : <List />;
};

export default CitiesList;
