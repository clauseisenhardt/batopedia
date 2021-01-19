export interface SpeciesI {
  name: string;
  description: string;
  imagePath: string;
}

export class Species {
  constructor(
    public name: string,
    public description: string,
    public imagePath: string) {}
}
