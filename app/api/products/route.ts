import { NextResponse } from "next/server";

import { createProduct, getCatalogProducts } from "@/lib/catalog-db";

export async function GET() {
  const products = await getCatalogProducts();
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body?.name ?? "").trim();
  const category = String(body?.category ?? "").trim();
  const preparation = String(body?.preparation ?? "").trim();
  const ingredientIds = Array.isArray(body?.ingredientIds)
    ? body.ingredientIds
        .map((value: unknown) => Number(value))
        .filter((value: number) => Number.isInteger(value))
    : [];

  const ovenTempC =
    body?.ovenTempC === null || body?.ovenTempC === undefined || body?.ovenTempC === ""
      ? null
      : Number(body.ovenTempC);
  const ovenMinutes =
    body?.ovenMinutes === null || body?.ovenMinutes === undefined || body?.ovenMinutes === ""
      ? null
      : Number(body.ovenMinutes);

  if (!name || !category || !preparation || ingredientIds.length === 0) {
    return NextResponse.json(
      { error: "Faltan datos obligatorios para crear el producto." },
      { status: 400 },
    );
  }

  const product = await createProduct({
    name,
    category,
    preparation,
    ingredientIds,
    ovenTempC,
    ovenMinutes,
  });

  return NextResponse.json({ product }, { status: 201 });
}
