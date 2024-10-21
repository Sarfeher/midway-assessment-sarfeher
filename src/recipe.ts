import { Store } from "./stores/store.type"

export type RecipeType = {
  id: number
  name: string
}

export class Recipe {
  private store;

  constructor(store: Store<RecipeType[]>) {
    this.store = store;
  }

  async readAll() {
    return await this.store.getValue();
  }

  async read(id: number){
    const recipes = await this.store.getValue();
    return recipes.find((recipe) => recipe.id === id) as RecipeType;
  }
}


