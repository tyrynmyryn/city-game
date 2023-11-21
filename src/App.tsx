/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { Views } from '@/types/index';
import Game from '@/views/Game';
import Intro from '@/views/Intro';
import Result from '@/views/Result';

const App = () => {
  const view = useSelector((state: RootState) => state.views.view);

  const content = useMemo(() => {
    const views = {
      [Views.INTRO]: <Intro />,
      [Views.GAME]: <Game />,
      [Views.RESULT]: <Result />,
    };

    return views[view];
  }, [view]);

  return (
    <div className='min-w-full min-h-screen flex justify-center items-center font-helvetica'>
      <div className='max-w-xl flex-1'>{content}</div>
    </div>
  );
};

export default App;
