import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

import CardContent from "@/components/CardContent";
import CardHeader from "@/components/CardHeader";
import { changeViewTo } from "@/store/views";
import { Players, Views } from "@/types";
import { resetGameState } from "@/store/thunks/reset"; 
import { AppDispatch, RootState } from "@/store";
import { addedCitiesCountSelector } from "@/store/cities";

const Result = () => {
  const dispatch = useDispatch<AppDispatch>()

  const lastPlayer = useSelector(({ players }: RootState) => players.current)
  const lastAddedCity = useSelector(({ cities }: RootState) => cities.lastAddedCity)
  const citiesCount = useSelector(addedCitiesCountSelector)

  const youLose = useMemo(() => {
    return lastPlayer === Players.YOU
  }, [lastPlayer])

  const startNewgame = () => {
    dispatch(changeViewTo(Views.GAME))
    dispatch(resetGameState())
  }

  const renderHeaderText = () => {
    return youLose ? 'К сожалению, вы проиграли.' : 'Поздравляем, вы победили!'
  }

  return (
    <div className=''>
      <CardHeader>
        <div className="text-xl">
          {renderHeaderText()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-center items-center text-center">
          <span>Всего было перечислено городов: {citiesCount}</span>
          <span>Последний город названный победителем</span>
          <span className="text-2xl font-bold">{lastAddedCity?.display}</span>
        </div>
        <button
          className='block mt-6 m-auto py-2 px-2 bg-violet-600 rounded text-base font-medium text-white'
          onClick={startNewgame}
        >
          Начать новую игру
        </button>
      </CardContent>
    </div>
  );
};

export default Result;
