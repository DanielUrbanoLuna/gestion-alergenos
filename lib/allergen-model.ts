export type Ingredient = {
  id: number;
  name: string;
  isAllergen: boolean;
};

export type Product = {
  id: number;
  name: string;
  ingredients: Ingredient[];
};

export type ProductWithAllergenInfo = Product & {
  hasAllergens: boolean;
  allergens: Ingredient[];
};

export function enrichProductsWithAllergenInfo<T extends Product>(
  products: T[],
): Array<T & { hasAllergens: boolean; allergens: Ingredient[] }> {
  return products.map((product) => {
    const allergens = product.ingredients.filter((ingredient) => ingredient.isAllergen);

    return {
      ...product,
      allergens,
      hasAllergens: allergens.length > 0,
    };
  });
}
