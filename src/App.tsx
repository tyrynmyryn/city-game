import { useEffect, useMemo, useState } from 'react';

import { getCities } from '@/api/index';
import { Cities, Views } from '@/types/index';
import Intro from '@/views/Intro';
import Game from '@/views/Game';

const App = () => {
  const [cities, setCities] = useState<Cities>(new Set());
  const [view, setView] = useState<Views>(Views.INTRO);

  useEffect(() => {
    getCities().then(setCities);
  }, []);

  const content = useMemo(() => {
    return {
      [Views.INTRO]: <Intro onStartGame={() => setView(Views.GAME)} />,
      [Views.GAME]: <Game cities={cities} />,
    };
  }, [cities]);

  return (
    <div className='min-w-full min-h-screen flex justify-center items-center font-helvetica'>
      <div className='max-w-xl flex-1'>{content[view]}</div>
    </div>
  );
};

export default App;
