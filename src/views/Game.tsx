/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardContent from '@/components/CardContent';
import CardHeader from '@/components/CardHeader';
import CitiesList from '@/components/CitiesList';
import GameControls from '@/components/GameControls';
import { getTimeWithZero } from '@/helpers/helpers';
import { useTimer } from '@/hooks/useTimer';
import { AppDispatch, RootState } from '@/store';
import { addedCitiesCountSelector, hasValidCitiesSelector } from '@/store/cities';
import { changeViewTo } from '@/store/views';
import { Views } from '@/types';
import { useAI } from '@/hooks/useAI';
import { initCities } from '@/store/thunks/cities';

const Game = () => {
  const dispatch = useDispatch<AppDispatch>()
  const ai = useAI()

  const turnTime = useSelector(({ rules }: RootState) => rules.turnTime);
  const currentPlayer = useSelector(({ players }: RootState) => players.current);
  const lastAddedCity = useSelector(({ cities }: RootState) => cities.lastAddedCity);
  const error = useSelector(({ rules }: RootState) => rules.error)

  const addedCitiesCount = useSelector(addedCitiesCountSelector);
  const hasValidCities = useSelector(hasValidCitiesSelector)

  const { seconds, minutes, stop, restart, timeLeft } = useTimer(turnTime);

  const renderTimer = () => `${getTimeWithZero(minutes)}:${getTimeWithZero(seconds)}`;

  const fieldRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (lastAddedCity) {
      restart()

      fieldRef.current?.scrollTo({
        top: fieldRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [currentPlayer])

  useEffect(() => {
    if (addedCitiesCount && (timeLeft <= 0 || !hasValidCities)) {
      stop()
      dispatch(changeViewTo(Views.RESULT))
    }
  }, [timeLeft, hasValidCities])

  useEffect(() => {
    initGame()
  }, []);

  const initGame = async () => {
    await dispatch(initCities());
    ai.play()
  }

  const remainingPercent = useMemo(() => {
    return Math.max(0, timeLeft / turnTime * 100)
  }, [timeLeft])

  return (
    <div className='flex flex-col'>
      <CardHeader>
        <div className='flex justify-between w-full'>
          <p className='text-base text-black'>Сейчас ваша очередь</p>
        </div>
        <div className='text-xl font-medium'>{renderTimer()}</div>
      </CardHeader>
      <div className='relative w-full h-1 bg-gray-100'>
        <div
          style={{width: `${100 - remainingPercent}%`}}
          className='absolute top-0 left-0 bg-violet-300 h-full transition-all duration-150'
        >
        </div>
      </div>
      <CardContent>
        <div className='relative'>
          <div className='before:curtain-top after:curtain-bottom'>
            <div 
              ref={fieldRef} 
              className='overflow-y-auto relative h-80 -mt-6 py-6 no-scrollbar'
            >
              <CitiesList />
            </div>
          </div>
        </div>
        {!!addedCitiesCount && (
          <div className='flex justify-center pb-4 text-sm text-gray-400'>
            Всего перечислено городов: {addedCitiesCount} городов
          </div>
        )}
        <GameControls />
        <div className={`mt-1 text-sm text-gray-400 transition-opacity duration-150 ${error ? 'opacity-100' : 'opacity-0'}`}>
          { error } &nbsp; 
        </div>
      </CardContent>
    </div>
  );
};

export default Game;
