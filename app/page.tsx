"use client";

import { useMemo, useState } from "react";

import { enrichProductsWithAllergenInfo } from "@/lib/allergen-model";
import { bakeryCatalog } from "@/lib/sample-products";

export default function Home() {
  const products = useMemo(() => enrichProductsWithAllergenInfo(bakeryCatalog), []);
  const categories = useMemo(
    () => [...new Set(bakeryCatalog.map((item) => item.category))],
    [],
  );
  const categoryByProductId = useMemo(
    () => new Map(bakeryCatalog.map((item) => [item.id, item.category])),
    [],
  );

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const productsInSelectedCategory = useMemo(() => {
    if (!selectedCategory) return [];
    return products.filter(
      (product) => categoryByProductId.get(product.id) === selectedCategory,
    );
  }, [categoryByProductId, products, selectedCategory]);

  const selectedProduct = useMemo(
    () => productsInSelectedCategory.find((product) => product.id === selectedProductId) ?? null,
    [productsInSelectedCategory, selectedProductId],
  );

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 p-8">
      <header>
        <h1 className="text-3xl font-bold">Gestión de Alérgenos</h1>
        <p className="mt-2 text-zinc-600">
          Catalogo base de panaderia granja con propagacion automatica de alergenos.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1) Escoge una categoria</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setSelectedCategory(category);
                setSelectedProductId(null);
              }}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selectedCategory === category
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {selectedCategory && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2) Escoge un producto</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {productsInSelectedCategory.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => setSelectedProductId(product.id)}
                className={`rounded-lg border p-3 text-left transition ${
                  selectedProductId === product.id
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 bg-white hover:bg-zinc-50"
                }`}
              >
                {product.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {selectedProduct && (
        <section className="space-y-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
          <h2 className="text-2xl font-semibold">3) Alergenos del producto</h2>
          <p className="text-zinc-700">
            Producto: <span className="font-semibold">{selectedProduct.name}</span>
          </p>
          <p className="text-zinc-700">
            Estado: {selectedProduct.hasAllergens ? "Contiene alergenos" : "Sin alergenos"}
          </p>
          <p className="text-zinc-700">
            Alergenos detectados:{" "}
            {selectedProduct.allergens.length > 0
              ? selectedProduct.allergens.map((a) => a.name).join(", ")
              : "Ninguno"}
          </p>

          <div className="mt-2 rounded-md border border-zinc-200 bg-zinc-50 p-3">
            <h3 className="text-lg font-semibold text-zinc-900">Preparacion y coccion</h3>
            <p className="text-sm text-zinc-700">
              Temperatura:{" "}
              {selectedProduct.recipe.ovenTempC !== null
                ? `${selectedProduct.recipe.ovenTempC} C`
                : "No aplica (sin horno)"}
            </p>
            <p className="text-sm text-zinc-700">
              Tiempo:{" "}
              {selectedProduct.recipe.ovenMinutes !== null
                ? `${selectedProduct.recipe.ovenMinutes} minutos`
                : "No aplica (sin horno)"}
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-zinc-800">
              {selectedProduct.recipe.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {!selectedCategory && (
        <section className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-600">
          Primero elige una categoria para mostrar sus productos.
        </section>
      )}
    </main>
  );
}
