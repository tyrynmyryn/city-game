export interface IAI {
  think(time: number): Promise<unknown>
}

export class AI implements IAI {
  public async think(time: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time * 1000);
    });
  }
}
