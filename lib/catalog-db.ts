import { prisma } from "@/lib/prisma";
import { bakeryCatalog } from "@/lib/sample-products";
import type { Prisma } from "@prisma/client";

type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    ingredientLinks: {
      include: {
        ingredient: true;
      };
    };
  };
}>;

export async function ensureSeedData() {
  const count = await prisma.product.count();
  if (count > 0) return;

  for (const item of bakeryCatalog) {
    const ingredientIds: number[] = [];
    for (const ingredient of item.ingredients) {
      const saved = await prisma.ingredient.upsert({
        where: { name: ingredient.name },
        update: {
          isAllergen: ingredient.isAllergen,
        },
        create: {
          name: ingredient.name,
          isAllergen: ingredient.isAllergen,
        },
      });
      ingredientIds.push(saved.id);
    }

    await prisma.product.create({
      data: {
        name: item.name,
        category: item.category,
        preparation: item.recipe.steps.join("\n"),
        ovenTempC: item.recipe.ovenTempC,
        ovenMinutes: item.recipe.ovenMinutes,
        ingredientLinks: {
          create: ingredientIds.map((ingredientId) => ({
            ingredientId,
          })),
        },
      },
    });
  }
}

export async function getCatalogProducts() {
  await ensureSeedData();

  const products = await prisma.product.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
    include: {
      ingredientLinks: {
        include: {
          ingredient: true,
        },
      },
    },
  });

  return products.map(mapProductFromDb);
}

export async function getAllIngredients() {
  await ensureSeedData();
  return prisma.ingredient.findMany({
    orderBy: { name: "asc" },
  });
}

export async function createProduct(input: {
  name: string;
  category: string;
  ingredientIds: number[];
  preparation: string;
  ovenTempC: number | null;
  ovenMinutes: number | null;
}) {
  const created = await prisma.product.create({
    data: {
      name: input.name,
      category: input.category,
      preparation: input.preparation,
      ovenTempC: input.ovenTempC,
      ovenMinutes: input.ovenMinutes,
      ingredientLinks: {
        create: input.ingredientIds.map((ingredientId) => ({ ingredientId })),
      },
    },
    include: {
      ingredientLinks: {
        include: {
          ingredient: true,
        },
      },
    },
  });

  return mapProductFromDb(created);
}

function mapProductFromDb(product: ProductWithRelations) {
  const ingredients = product.ingredientLinks.map((link) => ({
    id: link.ingredient.id,
    name: link.ingredient.name,
    isAllergen: link.ingredient.isAllergen,
  }));

  return {
    id: product.id,
    name: product.name,
    category: product.category,
    ingredients,
    recipe: {
      steps: product.preparation
        .split("\n")
        .map((step) => step.trim())
        .filter(Boolean),
      ovenTempC: product.ovenTempC,
      ovenMinutes: product.ovenMinutes,
    },
  };
}
