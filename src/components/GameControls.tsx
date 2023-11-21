/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import iconPlay from '@/assets/icon-play.svg';
import { AppDispatch, RootState } from '@/store';
import { addCity, addedCitiesCountSelector, setEnteredCity } from '@/store/cities';
import { isYourTurnSelector } from '@/store/players';
import { Errors, Players } from '@/types';
import { setError } from '@/store/rules';

const GameControls = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentPlayer = useSelector(({ players }: RootState) => players.current);
  const enteredCity = useSelector(({ cities }: RootState) => cities.enteredCity);
  const lastValidChar = useSelector(({ rules }: RootState) => rules.lastValidChar);
  const addedCities = useSelector(({ cities }: RootState) => cities.addedCities)
  const validCities = useSelector(({ cities }: RootState) => cities.validCities);
  const error = useSelector(({ rules }: RootState) => rules.error)

  const isYourTurn = useSelector(isYourTurnSelector);
  const addedCitiesCount = useSelector(addedCitiesCountSelector);
  const inputPlaceholder = useMemo(() => {
    const placeholderForYou = !addedCitiesCount
      ? 'Напишите любой город, например: Где вы живете?'
      : `Знаете город на букву “${lastValidChar.at(-1)?.toUpperCase()}”?`;

    return currentPlayer !== Players.YOU ? 'Ожидаем ответа соперника...' : placeholderForYou;
  }, [lastValidChar, currentPlayer]);

  const onAddCity = () => {
    const key = enteredCity.toLowerCase()

    if (validCities[key]) {
      dispatch(addCity({ city: enteredCity, by: currentPlayer }));
      dispatch(setEnteredCity(''));
    } else {
      dispatch(setError(Errors.NOT_VALID))
    }

    if (addedCities[key]) {
      dispatch(setError(Errors.ALREADY_ADD))
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    error && dispatch(setError(''))
    dispatch(setEnteredCity(e.target.value));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === 'Enter' && onAddCity();
  };
  return (
    <div
      className={`flex justify-center items-center gap-4 p-3 mt-1 bg-cool-gray-100 rounded-md outline outline-0 outline-violet-300 transition-opacity duration-150
        ${!isYourTurn && 'bg-cool-gray-50'} 
        ${error && 'outline-2'}
      `}
    >
      <input
        disabled={!isYourTurn}
        formNoValidate={true}
        className='w-full mt-1 bg-transparent focus:outline-none placeholder:text-base placeholder:text-gray-700 disabled:placeholder:text-gray-400'
        placeholder={inputPlaceholder}
        value={enteredCity}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />
      <button
        disabled={!isYourTurn}
        className='block p-1.5 bg-violet-600 rounded-md transition duration-150 focus:outline-none enable:hover:bg-opacity-80 disabled:bg-gray-400'
        onClick={onAddCity}
      >
        <img src={iconPlay} />
      </button>
    </div>
  );
};

export default GameControls;
