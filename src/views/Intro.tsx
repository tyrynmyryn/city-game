import CardContent from '@/components/CardContent';
import CardHeader from '@/components/CardHeader';

interface Props {
  onStartGame?: () => void;
}

const Intro = ({ onStartGame }: Props) => {
  const rules = [
    'Запрещается повторение городов.',
    'Названий городов на твердый “ъ” и мягкий “ъ” знак нет. Из-за этого бы пропускаем эту букву и игрок должен назвать город на букву стоящую перед ъ или ь знаком.',
    'Каждому игроку дается 2 минуты на размышления, если спустя это время игрок не вводит слово он считается проигравшим',
  ];

  return (
    <div className='flex flex-col gap-1.5'>
      <CardHeader>
        <h1 className='text-base text-black'>Игра в города на время</h1>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-gray-700'>Цель: Назвать как можно больше реальных городов.</p>
        <ul className='mt-6 text-sm text-gray-700 list-disc list-inside'>
          {rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
        <button
          className='block mt-6 m-auto py-2 px-2 bg-violet-600 rounded text-base font-medium text-white'
          onClick={onStartGame}
        >
          Начать игру
        </button>
      </CardContent>
    </div>
  );
};

export default Intro;
