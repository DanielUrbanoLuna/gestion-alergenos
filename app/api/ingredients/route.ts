import { NextResponse } from "next/server";

import { getAllIngredients } from "@/lib/catalog-db";

export async function GET() {
  const ingredients = await getAllIngredients();
  return NextResponse.json({ ingredients });
}
