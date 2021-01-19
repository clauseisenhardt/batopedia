//import { Ingredient } from '../shared/ingredient.model';

export class Photo {
  public species: string;
  public location: string;
  public imagePath: string;
//  public ingredients: Ingredient[];

  constructor(species: string, location: string, imagePath: string) {
    this.species = species;
    this.location = location;
    this.imagePath = imagePath;
//   this.ingredients = ingredients;
  }
}
