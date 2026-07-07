"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";

export async function deleteProduct(formData: FormData) {
  const id = String(formData.get("id") || "");
  await prisma.product.deleteMany({
    where: { id: id },
  });

  revalidatePath("/products");
}
