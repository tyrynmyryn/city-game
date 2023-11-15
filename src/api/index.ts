import { Cities } from '@/types/index';

export const getCities = async (): Promise<Cities> => {
  const list = await fetch('./cities.txt').then((res) => res.text());
  return new Set(list.split('\n'));
};
