import { City } from '@/types/index';

export const getCities = async (): Promise<City[]> => {
  const list = await fetch('./cities.txt').then((res) => res.text());
  return list.split('\n');
};
