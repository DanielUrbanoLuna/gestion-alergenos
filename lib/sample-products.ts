import type { Product } from "@/lib/allergen-model";

type Recipe = {
  steps: string[];
  ovenTempC: number | null;
  ovenMinutes: number | null;
};

export type CatalogProduct = Product & {
  category: string;
  recipe: Recipe;
};

let ingredientId = 1;
const i = (name: string, isAllergen = false) => ({
  id: ingredientId++,
  name,
  isAllergen,
});

type CatalogTemplate = {
  category: string;
  name: string;
  ingredients: Array<[string, boolean?]>;
  recipe: Recipe;
};

const createRecipe = (ovenTempC: number | null, ovenMinutes: number | null, steps: string[]): Recipe => ({
  steps,
  ovenTempC,
  ovenMinutes,
});

const catalogTemplates: CatalogTemplate[] = [
  { category: "Croissants y bolleria", name: "Croissant clasico de mantequilla", ingredients: [["Harina de trigo", true], ["Mantequilla", true], ["Azucar"]], recipe: createRecipe(200, 18, ["Laminar masa con mantequilla.", "Formar piezas y fermentar.", "Hornear hasta dorar."]) },
  { category: "Croissants y bolleria", name: "Mini croissant", ingredients: [["Harina de trigo", true], ["Mantequilla", true]], recipe: createRecipe(200, 14, ["Laminar y cortar triangulos pequenos.", "Enrollar y fermentar.", "Hornear hasta dorado ligero."]) },
  { category: "Croissants y bolleria", name: "Croissant integral", ingredients: [["Harina integral de trigo", true], ["Mantequilla", true]], recipe: createRecipe(195, 18, ["Amasar masa integral.", "Laminar con mantequilla.", "Fermentar y hornear."]) },
  { category: "Croissants y bolleria", name: "Croissant de chocolate", ingredients: [["Harina de trigo", true], ["Mantequilla", true], ["Cacao"]], recipe: createRecipe(200, 18, ["Laminar la masa.", "Anadir barrita de chocolate y enrollar.", "Fermentar y hornear."]) },
  { category: "Croissants y bolleria", name: "Croissant de almendra", ingredients: [["Harina de trigo", true], ["Mantequilla", true], ["Almendra", true]], recipe: createRecipe(195, 18, ["Rellenar con crema de almendra.", "Pintar con huevo.", "Hornear hasta dorar."]) },
  { category: "Croissants y bolleria", name: "Napolitana de crema", ingredients: [["Harina de trigo", true], ["Leche", true], ["Huevo", true]], recipe: createRecipe(200, 16, ["Rellenar masa hojaldrada con crema.", "Cerrar bordes y pintar.", "Hornear."]) },
  { category: "Croissants y bolleria", name: "Napolitana de chocolate", ingredients: [["Harina de trigo", true], ["Mantequilla", true], ["Soja", true]], recipe: createRecipe(200, 16, ["Rellenar con crema de cacao.", "Fermentar breve.", "Hornear."]) },
  { category: "Croissants y bolleria", name: "Ensaimada", ingredients: [["Harina de trigo", true], ["Manteca"], ["Azucar"]], recipe: createRecipe(190, 17, ["Amasar y reposar masa.", "Enrollar en espiral.", "Fermentar y hornear."]) },
  { category: "Croissants y bolleria", name: "Caracola de canela", ingredients: [["Harina de trigo", true], ["Mantequilla", true], ["Canela"]], recipe: createRecipe(190, 15, ["Extender masa y espolvorear canela.", "Enrollar y cortar porciones.", "Hornear."]) },
  { category: "Croissants y bolleria", name: "Brioche relleno de crema", ingredients: [["Harina de trigo", true], ["Huevo", true], ["Leche", true]], recipe: createRecipe(180, 20, ["Amasar brioche.", "Rellenar con crema.", "Hornear y enfriar."]) },

  { category: "Paninis y bocadillos", name: "Panini mixto", ingredients: [["Pan de trigo", true], ["Queso", true], ["Jamon york"]], recipe: createRecipe(210, 8, ["Abrir panini y rellenar.", "Prensar en grill o horno.", "Servir caliente."]) },
  { category: "Paninis y bocadillos", name: "Panini de pollo y queso", ingredients: [["Pan de trigo", true], ["Queso", true], ["Pollo"]], recipe: createRecipe(210, 9, ["Rellenar con pollo cocido y queso.", "Prensar o hornear.", "Servir."]) },
  { category: "Paninis y bocadillos", name: "Panini vegetal", ingredients: [["Pan de trigo", true], ["Tomate"], ["Mozzarella", true]], recipe: createRecipe(205, 8, ["Montar tomate, mozzarella y hojas verdes.", "Tostar u hornear.", "Servir."]) },
  { category: "Paninis y bocadillos", name: "Panini caprese", ingredients: [["Pan de trigo", true], ["Mozzarella", true], ["Albahaca"]], recipe: createRecipe(205, 8, ["Rellenar con mozzarella y tomate.", "Anadir albahaca tras horneado.", "Servir caliente."]) },
  { category: "Paninis y bocadillos", name: "Panini cuatro quesos", ingredients: [["Pan de trigo", true], ["Queso", true], ["Leche", true]], recipe: createRecipe(210, 9, ["Mezclar quesos.", "Rellenar panini.", "Hornear hasta fundir."]) },
  { category: "Paninis y bocadillos", name: "Bocadillo de tortilla", ingredients: [["Pan de trigo", true], ["Huevo", true], ["Patata"]], recipe: createRecipe(180, 6, ["Preparar tortilla de patata.", "Montar en pan.", "Calentar en horno antes de servir."]) },
  { category: "Paninis y bocadillos", name: "Bocadillo de lomo y queso", ingredients: [["Pan de trigo", true], ["Lomo"], ["Queso", true]], recipe: createRecipe(200, 7, ["Cocinar lomo a la plancha.", "Montar con queso.", "Gratinar en horno."]) },
  { category: "Paninis y bocadillos", name: "Bocadillo de jamon serrano", ingredients: [["Pan de trigo", true], ["Jamon serrano"]], recipe: createRecipe(180, 4, ["Abrir pan y anadir jamon.", "Calentar ligeramente.", "Servir."]) },
  { category: "Paninis y bocadillos", name: "Bikini mixto", ingredients: [["Pan de molde de trigo", true], ["Queso", true], ["Jamon york"]], recipe: createRecipe(200, 6, ["Montar sandwich.", "Tostar por ambas caras.", "Servir caliente."]) },
  { category: "Paninis y bocadillos", name: "Sandwich vegetal", ingredients: [["Pan de molde de trigo", true], ["Huevo", true], ["Mostaza"]], recipe: createRecipe(180, 5, ["Preparar relleno vegetal.", "Montar sandwich.", "Dar golpe de horno opcional."]) },

  { category: "Pasteleria", name: "Brownie clasico", ingredients: [["Harina de trigo", true], ["Huevo", true], ["Nuez", true]], recipe: createRecipe(180, 28, ["Fundir chocolate y mantequilla.", "Mezclar con huevos y harina.", "Hornear y dejar templar."]) },
  { category: "Pasteleria", name: "Palmera de chocolate", ingredients: [["Harina de trigo", true], ["Mantequilla", true], ["Soja", true]], recipe: createRecipe(200, 14, ["Formar palmeras con hojaldre.", "Hornear hasta dorar.", "Banar con chocolate."]) },
  { category: "Pasteleria", name: "Donut glaseado", ingredients: [["Harina de trigo", true], ["Leche", true], ["Huevo", true]], recipe: createRecipe(190, 11, ["Formar aros de masa.", "Hornear.", "Glasear en templado."]) },
  { category: "Pasteleria", name: "Muffin de arandanos", ingredients: [["Harina de trigo", true], ["Leche", true], ["Huevo", true]], recipe: createRecipe(185, 22, ["Mezclar secos y humedos.", "Anadir arandanos.", "Hornear."]) },
  { category: "Pasteleria", name: "Cheesecake", ingredients: [["Queso crema", true], ["Huevo", true], ["Galleta de trigo", true]], recipe: createRecipe(170, 45, ["Preparar base de galleta.", "Verter relleno de queso.", "Hornear y enfriar."]) },
  { category: "Pasteleria", name: "Tarta de zanahoria", ingredients: [["Harina de trigo", true], ["Huevo", true], ["Nuez", true]], recipe: createRecipe(175, 35, ["Rallar zanahoria y mezclar masa.", "Verter en molde.", "Hornear y cubrir."]) },
  { category: "Pasteleria", name: "Carrot cake porcion", ingredients: [["Harina de trigo", true], ["Huevo", true], ["Nuez", true]], recipe: createRecipe(175, 34, ["Preparar bizcocho de zanahoria.", "Hornear.", "Cortar porciones."]) },
  { category: "Pasteleria", name: "Tarta de manzana", ingredients: [["Harina de trigo", true], ["Huevo", true], ["Mantequilla", true]], recipe: createRecipe(180, 38, ["Forrar molde con masa.", "Anadir manzana laminada.", "Hornear."]) },
  { category: "Pasteleria", name: "Red velvet", ingredients: [["Harina de trigo", true], ["Leche", true], ["Huevo", true]], recipe: createRecipe(175, 30, ["Preparar masa con cacao y colorante.", "Hornear.", "Rellenar con crema."]) },
  { category: "Pasteleria", name: "Cookie con pepitas", ingredients: [["Harina de trigo", true], ["Mantequilla", true], ["Huevo", true]], recipe: createRecipe(180, 12, ["Amasar galleta.", "Formar bolas y aplastar.", "Hornear."]) },

  { category: "Panaderia", name: "Barra clasica", ingredients: [["Harina de trigo", true], ["Agua"], ["Levadura"]], recipe: createRecipe(230, 22, ["Amasar y reposar.", "Formar barras.", "Hornear con vapor inicial."]) },
  { category: "Panaderia", name: "Baguette", ingredients: [["Harina de trigo", true], ["Agua"], ["Levadura"]], recipe: createRecipe(230, 24, ["Fermentar en bloque.", "Formar baguettes.", "Hornear."]) },
  { category: "Panaderia", name: "Chapata", ingredients: [["Harina de trigo", true], ["Agua"], ["Aceite de oliva"]], recipe: createRecipe(220, 20, ["Masa hidratada con pliegues.", "Cortar porciones.", "Hornear."]) },
  { category: "Panaderia", name: "Pan integral", ingredients: [["Harina integral de trigo", true], ["Agua"], ["Levadura"]], recipe: createRecipe(210, 30, ["Amasar masa integral.", "Fermentar en molde.", "Hornear."]) },
  { category: "Panaderia", name: "Pan de centeno", ingredients: [["Harina de centeno", true], ["Agua"], ["Levadura"]], recipe: createRecipe(210, 32, ["Amasar masa de centeno.", "Fermentar.", "Hornear."]) },
  { category: "Panaderia", name: "Pan de semillas", ingredients: [["Harina de trigo", true], ["Sesamo", true], ["Semillas de girasol"]], recipe: createRecipe(210, 28, ["Amasar con semillas.", "Fermentar en baneton.", "Hornear."]) },
  { category: "Panaderia", name: "Mollete", ingredients: [["Harina de trigo", true], ["Agua"], ["Levadura"]], recipe: createRecipe(220, 10, ["Dividir y bolear.", "Fermentar corto.", "Hornear breve."]) },
  { category: "Panaderia", name: "Panecillo brioche", ingredients: [["Harina de trigo", true], ["Mantequilla", true], ["Huevo", true]], recipe: createRecipe(180, 18, ["Amasar brioche.", "Formar panecillos.", "Hornear."]) },
  { category: "Panaderia", name: "Pan de hamburguesa brioche", ingredients: [["Harina de trigo", true], ["Leche", true], ["Huevo", true]], recipe: createRecipe(180, 16, ["Amasar.", "Formar bollos.", "Hornear."]) },
  { category: "Panaderia", name: "Pan de coca", ingredients: [["Harina de trigo", true], ["Agua"], ["Aceite de oliva"]], recipe: createRecipe(220, 15, ["Estirar masa fina.", "Reposar corto.", "Hornear."]) },

  { category: "Salado de horno", name: "Empanada de atun", ingredients: [["Harina de trigo", true], ["Atun", true], ["Huevo", true]], recipe: createRecipe(200, 30, ["Preparar relleno de atun.", "Cerrar empanada.", "Hornear."]) },
  { category: "Salado de horno", name: "Empanada de carne", ingredients: [["Harina de trigo", true], ["Carne picada"], ["Huevo", true]], recipe: createRecipe(200, 32, ["Sofreir relleno de carne.", "Rellenar y cerrar.", "Hornear."]) },
  { category: "Salado de horno", name: "Empanada de pollo", ingredients: [["Harina de trigo", true], ["Pollo"], ["Huevo", true]], recipe: createRecipe(200, 30, ["Preparar relleno de pollo.", "Montar empanada.", "Hornear."]) },
  { category: "Salado de horno", name: "Quiche lorraine", ingredients: [["Harina de trigo", true], ["Leche", true], ["Huevo", true]], recipe: createRecipe(190, 35, ["Forrar molde.", "Anadir mezcla de huevos y nata.", "Hornear."]) },
  { category: "Salado de horno", name: "Quiche vegetal", ingredients: [["Harina de trigo", true], ["Leche", true], ["Huevo", true]], recipe: createRecipe(190, 35, ["Saltear verduras.", "Rellenar base.", "Hornear."]) },
  { category: "Salado de horno", name: "Hojaldre de jamon y queso", ingredients: [["Harina de trigo", true], ["Queso", true], ["Jamon york"]], recipe: createRecipe(200, 18, ["Rellenar hojaldre.", "Cerrar piezas.", "Hornear."]) },
  { category: "Salado de horno", name: "Hojaldre de espinacas y queso", ingredients: [["Harina de trigo", true], ["Queso", true], ["Espinaca"]], recipe: createRecipe(200, 18, ["Preparar relleno.", "Montar en hojaldre.", "Hornear."]) },
  { category: "Salado de horno", name: "Mini pizza margarita", ingredients: [["Harina de trigo", true], ["Queso", true], ["Tomate"]], recipe: createRecipe(230, 10, ["Estirar base.", "Anadir tomate y queso.", "Hornear."]) },
  { category: "Salado de horno", name: "Focaccia de romero", ingredients: [["Harina de trigo", true], ["Aceite de oliva"], ["Romero"]], recipe: createRecipe(220, 18, ["Fermentar masa hidratada.", "Hacer hoyuelos y aceite.", "Hornear."]) },
  { category: "Salado de horno", name: "Coca salada de verduras", ingredients: [["Harina de trigo", true], ["Pimiento"], ["Cebolla"]], recipe: createRecipe(220, 20, ["Extender masa.", "Anadir verduras.", "Hornear."]) },

  { category: "Granja y platos", name: "Sopa de verduras", ingredients: [["Calabacin"], ["Puerro"], ["Apio", true]], recipe: createRecipe(180, 25, ["Preparar verduras cortadas.", "Introducir en bandeja con caldo.", "Hornear y triturar."]) },
  { category: "Granja y platos", name: "Tostada con tomate y aceite", ingredients: [["Pan de trigo", true], ["Tomate"], ["Aceite de oliva"]], recipe: createRecipe(200, 4, ["Cortar pan.", "Tostar.", "Anadir tomate y aceite."]) },
  { category: "Granja y platos", name: "Tostada de aguacate", ingredients: [["Pan de trigo", true], ["Aguacate"], ["Limon"]], recipe: createRecipe(200, 4, ["Tostar pan.", "Preparar aguacate machacado.", "Montar."]) },
  { category: "Granja y platos", name: "Tostada de queso crema y salmon", ingredients: [["Pan de trigo", true], ["Queso crema", true], ["Pescado", true]], recipe: createRecipe(190, 5, ["Tostar pan.", "Untar queso crema.", "Anadir salmon."]) },
  { category: "Granja y platos", name: "Yogur con granola", ingredients: [["Yogur", true], ["Avena", true], ["Frutos secos", true]], recipe: createRecipe(160, 10, ["Tostar granola al horno.", "Servir con yogur.", "Anadir fruta."]) },
  { category: "Granja y platos", name: "Tortilla francesa", ingredients: [["Huevo", true], ["Aceite de oliva"], ["Sal"]], recipe: createRecipe(180, 6, ["Batir huevos.", "Cuajar tortilla.", "Terminar con golpe de horno."]) },
  { category: "Granja y platos", name: "Bowl de frutas", ingredients: [["Fresa"], ["Platano"], ["Kiwi"]], recipe: createRecipe(null, null, ["Lavar y cortar fruta.", "Montar bol.", "Servir frio."]) },
  { category: "Granja y platos", name: "Huevos revueltos", ingredients: [["Huevo", true], ["Leche", true], ["Mantequilla", true]], recipe: createRecipe(180, 5, ["Batir huevos.", "Cocinar suave.", "Acabar en horno suave."]) },
  { category: "Granja y platos", name: "Macedonia natural", ingredients: [["Naranja"], ["Manzana"], ["Pera"]], recipe: createRecipe(null, null, ["Pelar y cortar fruta.", "Mezclar.", "Servir."]) },
  { category: "Granja y platos", name: "Porridge de avena", ingredients: [["Avena", true], ["Leche", true], ["Canela"]], recipe: createRecipe(170, 12, ["Mezclar avena y leche.", "Hornear suave.", "Servir con fruta."]) },

  { category: "Bebidas", name: "Cafe con leche", ingredients: [["Leche", true], ["Cafe"]], recipe: createRecipe(null, null, ["Preparar espresso.", "Emulsionar leche.", "Servir."]) },
  { category: "Bebidas", name: "Capuccino", ingredients: [["Leche", true], ["Cafe"]], recipe: createRecipe(null, null, ["Preparar espresso.", "Texturizar leche.", "Servir con espuma."]) },
  { category: "Bebidas", name: "Chocolate caliente", ingredients: [["Leche", true], ["Cacao"]], recipe: createRecipe(null, null, ["Calentar leche.", "Disolver cacao.", "Servir."]) },
  { category: "Bebidas", name: "Te chai latte", ingredients: [["Leche", true], ["Canela"], ["Jengibre"]], recipe: createRecipe(null, null, ["Infusionar especias.", "Anadir leche.", "Servir caliente."]) },
  { category: "Bebidas", name: "Zumo de naranja natural", ingredients: [["Naranja"]], recipe: createRecipe(null, null, ["Exprimir naranjas.", "Filtrar opcional.", "Servir."]) },
  { category: "Bebidas", name: "Smoothie de frutos rojos", ingredients: [["Fresa"], ["Arandano"], ["Yogur", true]], recipe: createRecipe(null, null, ["Triturar ingredientes frios.", "Ajustar textura.", "Servir."]) },
  { category: "Bebidas", name: "Matcha latte", ingredients: [["Leche", true], ["Te matcha"]], recipe: createRecipe(null, null, ["Disolver matcha.", "Anadir leche espumada.", "Servir."]) },
  { category: "Bebidas", name: "Infusion manzanilla", ingredients: [["Manzanilla"]], recipe: createRecipe(null, null, ["Infusionar agua caliente.", "Reposar 3 minutos.", "Servir."]) },
];

export const bakeryCatalog: CatalogProduct[] = [
  ...catalogTemplates.map((template, index) => ({
    id: index + 1,
    category: template.category,
    name: template.name,
    ingredients: template.ingredients.map(([name, isAllergen = false]) => i(name, isAllergen)),
    recipe: template.recipe,
  })),
];
