export interface ComputerObj {
  name: string;
  img: string;
}

export class getComputerData {
  url: string;
  constructor() {
    this.url = "https://randomuser.me/api/";
  }

  async fetchData(): Promise<ComputerObj> {
    const response = await fetch(this.url);
    const data = await response.json();

    const computerData = data.results[0];
    const {
      name: { first: playerName },
      picture: { large: image },
    } = computerData;

    const computer = { name: playerName, img: image };

    return computer;
  }
}
