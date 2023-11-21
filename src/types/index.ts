export type City = string;
export type Cities = Record<City, string>;
export type AddedCity = {
  value: City;
  display: City;
  by: Players;
};

export enum Views {
  INTRO = 'intro',
  GAME = 'game',
  RESULT = 'result'
}

export enum Players {
  YOU = 'you',
  AI = 'ai',
}

export enum Errors {
  NOT_VALID = 'Такого города нет или он введен с неправильной буквы',
  ALREADY_ADD = 'Этот город уже был назван'
}
