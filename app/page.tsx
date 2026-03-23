"use client";

import { useEffect, useMemo, useState } from "react";

import { enrichProductsWithAllergenInfo } from "@/lib/allergen-model";
import { bakeryCatalog, type CatalogProduct } from "@/lib/sample-products";

type IngredientOption = { id: number; name: string; isAllergen: boolean };

export default function Home() {
  const [catalog, setCatalog] = useState<CatalogProduct[]>([]);
  const [ingredientOptions, setIngredientOptions] = useState<IngredientOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newPreparationText, setNewPreparationText] = useState("");
  const [newTemp, setNewTemp] = useState("");
  const [newMinutes, setNewMinutes] = useState("");
  const [selectedIngredientNames, setSelectedIngredientNames] = useState<string[]>([]);

  const products = useMemo(() => enrichProductsWithAllergenInfo(catalog), [catalog]);
  const categories = useMemo(() => [...new Set(catalog.map((item) => item.category))], [catalog]);
  const categoryByProductId = useMemo(
    () => new Map(catalog.map((item) => [item.id, item.category])),
    [catalog],
  );

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsRes, ingredientsRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/ingredients"),
        ]);
        const productsData = await productsRes.json();
        const ingredientsData = await ingredientsRes.json();

        setCatalog(productsData.products ?? bakeryCatalog);
        setIngredientOptions(ingredientsData.ingredients ?? []);
      } catch {
        setCatalog(bakeryCatalog);
        const fallbackIngredients = Array.from(
          new Map(
            bakeryCatalog
              .flatMap((product) => product.ingredients)
              .map((ingredient) => [
                ingredient.name,
                {
                  id: ingredient.id,
                  name: ingredient.name,
                  isAllergen: ingredient.isAllergen,
                },
              ]),
          ).values(),
        );
        setIngredientOptions(fallbackIngredients);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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

  const closeModal = () => {
    setIsModalOpen(false);
    setNewName("");
    setNewCategory("");
    setNewPreparationText("");
    setNewTemp("");
    setNewMinutes("");
    setSelectedIngredientNames([]);
  };

  const toggleIngredient = (ingredientName: string) => {
    setSelectedIngredientNames((prev) =>
      prev.includes(ingredientName)
        ? prev.filter((name) => name !== ingredientName)
        : [...prev, ingredientName],
    );
  };

  const handleCreateProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void (async () => {
      const cleanName = newName.trim();
      const cleanCategory = newCategory.trim();
      if (!cleanName || !cleanCategory || selectedIngredientNames.length === 0) return;

      const preparation = newPreparationText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .join("\n");
      if (!preparation) return;

      const ingredientIds = selectedIngredientNames
        .map((name) => ingredientOptions.find((option) => option.name === name)?.id)
        .filter((id): id is number => Boolean(id));

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          category: cleanCategory,
          ingredientIds,
          preparation,
          ovenTempC: newTemp.trim() ? Number(newTemp) : null,
          ovenMinutes: newMinutes.trim() ? Number(newMinutes) : null,
        }),
      });

      if (!response.ok) return;
      const data = await response.json();
      const created: CatalogProduct = data.product;
      if (!created) return;

      setCatalog((prev) => [...prev, created]);
      setSelectedCategory(created.category);
      setSelectedProductId(created.id);
      closeModal();
    })();
  };

  if (loading) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center p-8">
        <p className="text-zinc-600">Cargando catalogo desde SQLite...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 p-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Alérgenos</h1>
          <p className="mt-2 text-zinc-600">
            Catalogo base de panaderia granja con propagacion automatica de alergenos.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          + Anadir Nuevo Producto
        </button>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Anadir producto</h2>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-md border border-zinc-300 px-2 py-1 text-sm hover:bg-zinc-100"
              >
                Cerrar
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Nombre del producto</label>
                <input
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                  placeholder="Ej: Pan de Centeno"
                  className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Categoria</label>
                <select
                  value={newCategory}
                  onChange={(event) => setNewCategory(event.target.value)}
                  className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
                  required
                >
                  <option value="">Selecciona una categoria</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Ingredientes (selector multiple)</p>
                <div className="grid max-h-48 gap-2 overflow-y-auto rounded-md border border-zinc-200 p-3 sm:grid-cols-2">
                  {ingredientOptions.map((option) => (
                    <label key={option.id} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedIngredientNames.includes(option.name)}
                        onChange={() => toggleIngredient(option.name)}
                      />
                      <span>
                        {option.name}
                        {option.isAllergen ? " (alergeno)" : ""}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Modo de Preparacion</label>
                <textarea
                  value={newPreparationText}
                  onChange={(event) => setNewPreparationText(event.target.value)}
                  placeholder="Escribe cada paso en una linea nueva."
                  rows={4}
                  className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
                  required
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Temperatura (C)</label>
                  <input
                    type="number"
                    min={0}
                    value={newTemp}
                    onChange={(event) => setNewTemp(event.target.value)}
                    className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Tiempo de horno (min)</label>
                  <input
                    type="number"
                    min={0}
                    value={newMinutes}
                    onChange={(event) => setNewMinutes(event.target.value)}
                    className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
              >
                Guardar producto
              </button>
            </form>
          </div>
        </div>
      )}

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
