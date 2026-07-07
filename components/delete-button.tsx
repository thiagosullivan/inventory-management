"use client";

import { deleteProduct } from "@/lib/actions/products";
import React, { useState } from "react";

export default function DeleteButton({ product }: { product: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await deleteProduct(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form action={handleDelete}>
      <input type="hidden" name="id" value={product} />
      <button className="text-red-600 hover:text-red-900 cursor-pointer">
        Delete
      </button>
      {isLoading ? <span className="loader"></span> : ""}
    </form>
  );
}
