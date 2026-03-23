# App de Gestión de Alérgenos

Estructura base con Next.js + Prisma para modelar ingredientes y productos.

## Modelo de datos

Se define una relación muchos-a-muchos entre `Product` e `Ingredient` usando la tabla pivote `ProductIngredient`.

- Un `Ingredient` tiene el campo `isAllergen`.
- Un `Product` refleja sus alérgenos leyendo los ingredientes relacionados.
- Si cambias `isAllergen` en un ingrediente, todos los productos que lo referencian lo reflejan automáticamente en las consultas.

El esquema está en `prisma/schema.prisma`.

## Arranque rápido

1. Instalar dependencias:

```bash
npm install
```

2. Crear `.env` a partir de `.env.example`.

3. Generar cliente Prisma y migración:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

4. Levantar la app:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).
