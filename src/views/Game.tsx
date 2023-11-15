import { Cities } from '@/types/index';
import CardHeader from '@/components/CardHeader';
import CardContent from '@/components/CardContent';

interface Props {
  cities?: Cities;
}

const Game = ({ cities }: Props) => {
  return (
    <div className='flex flex-col'>
      <CardHeader></CardHeader>
      <CardContent></CardContent>
    </div>
  );
};

export default Game;
