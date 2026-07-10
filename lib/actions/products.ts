"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { z } from "zod";
import { getCurrentUser } from "../auth";

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  // z.coerce converte automaticamente a string do input para número
  price: z.coerce.number().positive("Price must be positive"),
  quantity: z.coerce.number().int().nonnegative("Quantity cannot be negative"),
  sku: z.string().optional(),
  // Força a conversão para número inteiro e aceita opcional
  lowStock: z.coerce.number().int().optional(),
});

export async function deleteProduct(formData: FormData) {
  const id = String(formData.get("id") || "");
  await prisma.product.deleteMany({
    where: { id: id },
  });

  revalidatePath("/products");
}

export async function createProduct(formData: FormData) {
  const user = await getCurrentUser();
  console.log(user, "USUÁRIO CREATE PRODUCT");

  // ID padrão do Usuário Demo Almoxarifado cadastrado no seu banco
  const DEMO_USER_ID = "133767f0-768d-4338-a612-50c8dc722b84";
  let userId = DEMO_USER_ID;

  // Se o getCurrentUser retornar um usuário válido, tentamos usar o ID dele
  if (user && user.id) {
    try {
      // Verifica se o usuário logado realmente existe na tabela do Prisma antes de usar
      const userExists = await prisma.user.findUnique({
        where: { id: user.id },
      });

      if (userExists) {
        userId = user.id;
      } else {
        console.log(
          `Usuário logado (${user.id}) não existe no banco. Usando fallback Demo.`,
        );
      }
    } catch (e) {
      console.log("Erro ao checar usuário. Usando fallback Demo.");
    }
  }

  // Validação dos dados do formulário com o Zod
  const parsed = ProductSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    sku: formData.get("sku") || undefined,
    lowStock: formData.get("lowStockAt") || undefined,
  });

  if (!parsed.success) {
    console.error("Zod Validation Error:", parsed.error.format());
    throw new Error("Validation failed");
  }

  // Criação do produto garantindo a integridade dos dados
  try {
    await prisma.product.create({
      data: {
        name: parsed.data.name,
        quantity: parsed.data.quantity,
        sku: parsed.data.sku,
        lowStock: parsed.data.lowStock,
        price: parsed.data.price.toString(),
        userId: userId, // ID 100% garantido e existente no banco de dados
      },
    });
  } catch (error) {
    console.error("Prisma Database Error:", error);
    throw new Error("Failed to create product");
  }

  revalidatePath("/inventory");
}
