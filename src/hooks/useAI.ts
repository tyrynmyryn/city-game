/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AI } from '@/ai';
import { AppDispatch, RootState } from '@/store';
import { Players } from '@/types';
import { getRandomNumber } from '@/helpers/helpers';
import { addCity } from '@/store/cities';

export const useAI = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ai = new AI();

  const [isPlay, setIsPlay] = useState(false)
  const currentPlayer = useSelector(({ players }: RootState) => players.current);
  const validCities = useSelector(({ cities }: RootState) => cities.validCities);

  useEffect(() => {
    if (currentPlayer === Players.AI && isPlay) {
      const cities = Object.keys(validCities);
      const ranmonIndex = getRandomNumber(0, cities.length - 1);
      const thinkingTime = getRandomNumber(1, 10);

      ai.think(thinkingTime).then(() => {
        dispatch(
          addCity({
            city: cities[ranmonIndex],
            by: Players.AI,
          })
        );
      });
    }
  }, [currentPlayer, isPlay]);

  const play = () => {
    setIsPlay(true)
  }

  return {
    play
  }
};
