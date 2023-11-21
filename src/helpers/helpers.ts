import { Cities, City } from '@/types';

export const prepareCities = (cities: City[]) => {
  return cities.reduce((state: Cities, city) => {
    if (!state[city]) {
      state[city.toLowerCase()] = city;
    }

    return state;
  }, {});
};

export const getTimeWithZero = (time: number) => {
  const string = String(time);
  return string.length >= 2 ? string : `0${string}`;
};

export const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const mock = {
  москва: {
    value: 'москва',
    by: 'you',
    display: 'Москва',
  },
  александров: {
    value: 'александров',
    by: 'ai',
    display: 'Александров',
  },
  владимир: {
    value: 'владимир',
    by: 'you',
    display: 'Владимир',
  },
  рославль: {
    value: 'рославль',
    by: 'ai',
    display: 'Рославль',
  },
  липецк: {
    value: 'липецк',
    by: 'you',
    display: 'Липецк',
  },
  котлас: {
    value: 'котлас',
    by: 'ai',
    display: 'Котлас',
  },
  алексин: {
    value: 'алексин',
    by: 'you',
    display: 'Алексин',
  },
  новосибирск: {
    value: 'новосибирск',
    by: 'ai',
    display: 'Новосибирск',
  },
};
